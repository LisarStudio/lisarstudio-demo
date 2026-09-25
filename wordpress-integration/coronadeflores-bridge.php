<?php
/**
 * Plugin Name: Corona de Flores - Frontend & Flow REST Bridge
 * Plugin URI: https://coronadeflores.cl
 * Description: Puente de integración oficial entre el nuevo Frontend React y WooCommerce / Flow. Muestra la nueva tienda en la portada y procesa pedidos con datos de condolencia y pasarela Flow.
 * Version: 2.0.0
 * Author: Lisar Studio
 * Author URI: https://lisarstudio.com
 * Text Domain: coronadeflores-bridge
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CDF_BRIDGE_VERSION', '2.0.0');
define('CDF_BRIDGE_PATH', plugin_dir_path(__FILE__));
define('CDF_BRIDGE_URL', plugin_dir_url(__FILE__));

/**
 * 1. Inicialización de Endpoints REST API
 */
add_action('rest_api_init', function () {
    // Endpoint para procesar compras desde React y conectar con Flow
    register_rest_route('coronadeflores/v1', '/create-order', [
        'methods' => 'POST',
        'callback' => 'cdf_rest_create_order',
        'permission_callback' => '__return_true'
    ]);

    // Endpoint para catálogo
    register_rest_route('coronadeflores/v1', '/catalog', [
        'methods' => 'GET',
        'callback' => 'cdf_rest_get_catalog',
        'permission_callback' => '__return_true'
    ]);
});

/**
 * 2. Renderizado Automático del Frontend React en la Portada / Tienda
 */
add_action('template_include', 'cdf_serve_react_frontend', 9999);

function cdf_serve_react_frontend($template) {
    // No interceptar áreas administrativas, REST API, login o llamadas AJAX
    if (is_admin() || wp_doing_ajax() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return $template;
    }

    // Permitir acceso a wp-login.php y wp-admin
    if (strpos($_SERVER['REQUEST_URI'] ?? '', 'wp-login.php') !== false || strpos($_SERVER['REQUEST_URI'] ?? '', 'wp-admin') !== false) {
        return $template;
    }

    // Permitir llamadas de pasarelas de pago (Flow, Webpay) y confirmaciones WooCommerce
    if (isset($_GET['wc-api']) || isset($_GET['order-received']) || isset($_GET['flow_return']) || isset($_GET['wc-ajax'])) {
        return $template;
    }

    // Si el usuario quiere ver el WordPress clásico mediante parámetro
    if (isset($_GET['classic_wp']) && $_GET['classic_wp'] == '1') {
        return $template;
    }

    $app_index = CDF_BRIDGE_PATH . 'app/index.html';
    $app_url = CDF_BRIDGE_URL . 'app/';
    $html = '';

    if (file_exists($app_index)) {
        // Modo 1: Aplicación empaquetada localmente
        $html = file_get_contents($app_index);
        $html = str_replace('href="./', 'href="' . $app_url, $html);
        $html = str_replace('src="./', 'src="' . $app_url, $html);
    } else {
        // Modo 2: Carga en tiempo real desde CDN GitHub Pages
        $cdn_base = 'https://lisarstudio.github.io/lisarstudio-demo/';
        $response = wp_remote_get($cdn_base, ['timeout' => 10]);
        if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
            $html = wp_remote_retrieve_body($response);
            $app_url = $cdn_base;
            $html = str_replace('href="/lisarstudio-demo/', 'href="' . $cdn_base, $html);
            $html = str_replace('src="/lisarstudio-demo/', 'src="' . $cdn_base, $html);
            $html = str_replace('href="./', 'href="' . $cdn_base, $html);
            $html = str_replace('src="./', 'src="' . $cdn_base, $html);
        } else {
            return $template;
        }
    }

    // Inyectar configuración de URLs para scripts y WooCommerce Bridge
    $asset_config = sprintf(
        "<script>
            window.__CDF_ASSET_BASE__ = '%s';
            window.__CORONADEFLORES_CONFIG__ = {
                restUrl: '%s',
                createOrderUrl: '%s',
                siteUrl: '%s'
            };
        </script>",
        esc_url($app_url),
        esc_url(rest_url()),
        esc_url(rest_url('coronadeflores/v1/create-order')),
        esc_url(home_url('/'))
    );

    // Inyectar config en el <head> (SIN <base href> para preservar el dominio propio www.coronadeflores.cl)
    if (strpos($html, '<head>') !== false) {
        $html = str_replace('<head>', "<head>\n    " . $asset_config, $html);
    }

    // Enviar encabezados HTTP limpios y el HTML completo
    status_header(200);
    header('Content-Type: text/html; charset=UTF-8');
    echo $html;
    exit;
}

/**
 * 3. Procesa el pedido enviado desde el Frontend y lo conecta con Flow
 */
function cdf_rest_create_order(WP_REST_Request $request) {
    if (!class_exists('WooCommerce')) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'WooCommerce no está activo en el servidor.'
        ], 500);
    }

    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_body_params();
    }

    $customer = $params['customer'] ?? [];
    $cart_items = $params['cartItems'] ?? [];
    $payment_method = $params['paymentMethod'] ?? 'flow';

    if (empty($cart_items)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'El carrito está vacío.'
        ], 400);
    }

    // Crear orden en WooCommerce
    $order = wc_create_order();

    // Agregar productos a la orden
    foreach ($cart_items as $item) {
        $sku = $item['sku'] ?? '';
        $product_id = null;

        if (!empty($sku)) {
            $product_id = wc_get_product_id_by_sku($sku);
        }

        if (!$product_id && !empty($item['id'])) {
            $raw_id = preg_replace('/[^0-9]/', '', $item['id']);
            if (!empty($raw_id) && wc_get_product(intval($raw_id))) {
                $product_id = intval($raw_id);
            }
        }

        $quantity = max(1, intval($item['quantity'] ?? 1));
        $item_price = floatval($item['price'] ?? 0);

        if ($product_id) {
            $order->add_product(wc_get_product($product_id), $quantity, [
                'subtotal' => $item_price * $quantity,
                'total' => $item_price * $quantity
            ]);
        } else {
            // Producto personalizado si no existe id directo
            $item_id = $order->add_item(new WC_Order_Item_Product());
            $order_item = $order->get_item($item_id);
            if ($order_item) {
                $order_item->set_name($item['title'] ?? 'Arreglo Floral');
                $order_item->set_quantity($quantity);
                $order_item->set_subtotal($item_price * $quantity);
                $order_item->set_total($item_price * $quantity);
                $order_item->save();
            }
        }
    }

    // Agregar costo de despacho fijo ($4.000)
    $shipping_item = new WC_Order_Item_Shipping();
    $shipping_item->set_method_title('Envío a Velatorio / Domicilio');
    $shipping_item->set_method_id('flat_rate');
    $shipping_item->set_total(4000);
    $order->add_item($shipping_item);

    // Guardar datos de Condolencia solicitados por el cliente
    $recipient = sanitize_text_field($customer['recipient'] ?? '');
    $delivery_address = sanitize_text_field($customer['deliveryAddress'] ?? '');
    $card_message = sanitize_textarea_field($customer['cardMessage'] ?? '');
    $buyer_name = sanitize_text_field($customer['name'] ?? '');
    $buyer_phone = sanitize_text_field($customer['phone'] ?? '');
    $buyer_email = sanitize_email($customer['email'] ?? 'contacto@coronadeflores.cl');

    // Metadatos de la condolencia
    $order->update_meta_data('_cdf_recipient', $recipient);
    $order->update_meta_data('_cdf_delivery_address', $delivery_address);
    $order->update_meta_data('_cdf_card_message', $card_message);

    // Dirección de facturación y envío en WooCommerce
    $address = [
        'first_name' => $buyer_name,
        'email'      => $buyer_email,
        'phone'      => $buyer_phone,
        'address_1'  => $delivery_address,
        'city'       => 'Santiago',
        'country'    => 'CL'
    ];
    $order->set_address($address, 'billing');
    $order->set_address($address, 'shipping');

    // Nota de la orden para el administrador de WordPress
    $note = sprintf(
        "🌸 DATOS DE LA CONDOLENCIA:\n- ¿A quién entrega?: %s\n- Dirección / Velatorio: %s\n- Texto Tarjeta/Cinta: %s\n- Solicitante: %s (%s)",
        $recipient,
        $delivery_address,
        $card_message,
        $buyer_name,
        $buyer_phone
    );
    $order->add_order_note($note, false);

    $order->calculate_totals();
    $order->save();

    $order_id = $order->get_id();

    // Si el método es Flow, ejecutar la pasarela oficial instalada
    if ($payment_method === 'flow' || $payment_method === 'flowpayment') {
        $available_gateways = WC()->payment_gateways->get_available_payment_gateways();
        $flow_gateway = $available_gateways['flowpayment'] ?? null;

        if ($flow_gateway && method_exists($flow_gateway, 'process_payment')) {
            $flow_result = $flow_gateway->process_payment($order_id);
            if (!empty($flow_result['redirect'])) {
                return new WP_REST_Response([
                    'success' => true,
                    'orderId' => $order_id,
                    'redirectUrl' => $flow_result['redirect'],
                    'paymentMethod' => 'Flow (Webpay Plus)',
                    'totalAmount' => $order->get_total(),
                    'flowToken' => null
                ], 200);
            }
        }
    }

    return new WP_REST_Response([
        'success' => true,
        'orderId' => $order_id,
        'redirectUrl' => null,
        'paymentMethod' => $payment_method,
        'totalAmount' => $order->get_total(),
        'message' => 'Pedido registrado correctamente en WooCommerce.'
    ], 200);
}

/**
 * 4. Obtiene catálogo en tiempo real desde WooCommerce
 */
function cdf_rest_get_catalog() {
    $products = wc_get_products(['limit' => 100, 'status' => 'publish']);
    $data = [];
    foreach ($products as $p) {
        $data[] = [
            'id' => $p->get_id(),
            'title' => $p->get_name(),
            'sku' => $p->get_sku(),
            'price' => intval($p->get_price()),
            'image' => wp_get_attachment_url($p->get_image_id())
        ];
    }
    return new WP_REST_Response($data, 200);
}
