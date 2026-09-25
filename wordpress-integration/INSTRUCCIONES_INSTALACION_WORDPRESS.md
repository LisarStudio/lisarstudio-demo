# Guía de Integración: Frontend React con WordPress, WooCommerce & Flow (coronadeflores.cl)

Esta guía explica la arquitectura técnica y los pasos para acoplar el frontend desarrollado en React directamente con el backend de **WordPress**, **WooCommerce** y la pasarela **Flow (Webpay Plus)** ya configurada en `coronadeflores.cl`.

---

## 1. Diagnóstico del Sitio WordPress Original (Rescatado de `public_html.zip`)

Tras analizar el respaldo completo de `public_html.zip`:

1. **Configuración de Base de Datos (`wp-config.php`)**:
   - Base de datos: `u767748904_SVCfz`
   - Prefijo de tablas: `wp_`
2. **Pasarela Flow Instalada**:
   - Plugin oficial: `flowpaymentfl` (**Flow WooCommerce Checkout** v3.0.8).
   - Rutas de confirmación de Flow:
     - URL Confirmación: `https://coronadeflores.cl/?wc-api=confirm_flowpayment`
     - URL Retorno: `https://coronadeflores.cl/?wc-api=return_flowpayment`
   - Las API Keys (Secret Key y API Key) de producción están guardadas de forma segura en la base de datos de WordPress (`wp_options` -> `woocommerce_flowpayment_settings`).
3. **Módulos de Cuentas y Administración**:
   - Acceso a Mi Cuenta para clientes: `https://coronadeflores.cl/mi-cuenta/`
   - Panel de Administración para el dueño/administrador: `https://coronadeflores.cl/wp-admin/`
   - Historial de Pedidos: `https://coronadeflores.cl/wp-admin/edit.php?post_type=shop_order`

---

## 2. Arquitectura de Integración

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND REACT                         │
│   (Diseño moderno, catálogo rápido, fotos cuadradas)         │
│   - Catálogo de Coronas, Arreglos y Condolencias            │
│   - Formulario simplificado (Difunto, Velatorio, Cinta)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                      POST /wp-json/coronadeflores/v1/create-order
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   WORDPRESS BACKEND                         │
│   (coronadeflores.cl con WooCommerce & Flow)                │
│   1. Plugin "coronadeflores-bridge.php"                     │
│   2. Crea el Pedido oficial en WooCommerce con metadatos    │
│   3. Invoca la pasarela Flow ya configurada en el servidor  │
│   4. Obtiene el token oficial y retorna la URL de pago      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    PASARELA FLOW CL                         │
│   - Pago seguro con Webpay Plus / Débito / Crédito          │
│   - Callback automático a coronadeflores.cl                 │
│   - El pedido queda como PAGADO en el Panel de WordPress    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Pasos de Instalación en el Servidor (Hostinger / cPanel)

### Paso 1: Instalar el Plugin Bridge en WordPress
1. En el Administrador de Archivos de tu hosting (o por FTP), entra a:
   `wp-content/plugins/`
2. Crea una carpeta llamada `coronadeflores-bridge`.
3. Sube el archivo `wordpress-integration/coronadeflores-bridge.php` dentro de esa carpeta:
   `wp-content/plugins/coronadeflores-bridge/coronadeflores-bridge.php`
4. Entra a tu panel de WordPress (`https://coronadeflores.cl/wp-admin/`), ve a **Plugins > Plugins Instalados** y haz clic en **Activar** en *Corona de Flores - Frontend & Flow REST Bridge*.

### Paso 2: Desplegar el Frontend en `coronadeflores.cl`
Tienes dos alternativas según cómo prefieras servir el frontend:

#### Opción A: Frontend como Home principal del sitio (Recomendado)
1. Ejecuta `npm run build` en el proyecto para generar la carpeta `dist`.
2. Sube el contenido de la carpeta `dist/` a la raíz de tu hosting (`public_html/`) o dentro de una plantilla de página en tu tema de WordPress.
3. Todas las rutas de `/mi-cuenta/`, `/wp-admin/`, y las llamadas a la API de Flow funcionarán en el mismo dominio sin problemas de CORS ni cookies.

#### Opción B: Frontend conectado por API (Headless / Subdominio)
1. Si mantienes el frontend en GitHub Pages o un subdominio (ej: `app.coronadeflores.cl`), en el archivo `.env` del frontend define:
   ```env
   VITE_FLOW_BACKEND_URL=https://coronadeflores.cl
   ```
2. Al realizar una compra en el frontend, el sistema enviará los datos automáticamente a `https://coronadeflores.cl/wp-json/coronadeflores/v1/create-order`, creará el pedido en WooCommerce y redirigirá al cliente a la pasarela Flow oficial.

---

## 4. Beneficios de esta Integración

1. **Cero Daño a la Configuración Actual**: No se modifican las tablas de la base de datos ni los plugins existentes (`flowpaymentfl`).
2. **Sincronización Total de Ventas**: Cada compra realizada en el nuevo frontend genera una orden real en WooCommerce con los 3 campos de condolencia guardados como metadatos y notas del pedido.
3. **Flujo de Pago Flow Oficial**: El cliente paga a través de Flow Webpay Plus con la cuenta y credenciales reales de la empresa.
4. **Acceso Dual a "Mi Cuenta"**:
   - Los clientes pueden ver sus pedidos anteriores y direcciones en `/mi-cuenta/`.
   - El administrador tiene acceso directo al panel `/wp-admin/` para despachar pedidos y editar precios/productos.
