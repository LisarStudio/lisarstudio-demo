# Cambios solicitados el 21 y 22 de septiembre de 2026

Fuente: exportación de conversación entregada por Peter. Se documentan únicamente los requisitos comerciales necesarios; no se publica el chat ni datos bancarios.

## Aplicado

- 21/09, 20:14–20:15: WhatsApp +56 9 4650 9718, eliminar opciones de cintas y tarifa de envío de $4.000.
- Peter confirmó el 22/09 que la tarifa se aplica **una sola vez por pedido completo**.
- Carrito, compra directa y resumen de checkout incluyen el mismo envío. Los descuentos existentes se calculan sobre productos, sin descontar el envío.
- Eliminados campo, almacenamiento y visualización de textos de cintas; retiradas menciones contradictorias de envío gratis/incluido.
- Los carritos guardados se reconstruyen con precios y nombres vigentes, preservando cantidades y variantes válidas.
- La lista de 29 productos colombianos del 21/09 a las 16:36 coincide con los 29 ya importados; sin faltantes. Permanecen los 71 productos totales.

| Mensaje del 22/09 | Producto anterior | Nombre vigente | Precio CLP |
|---|---|---|---:|
| 08:01 | Corona 13 | Corona 13 | $42.990 |
| 08:04 | Corona 6 | Corona 6 | $42.990 |
| 08:09 | Arreglos 3 | Arreglos 3 | $34.990 |
| 08:14 | Canastilla | Cruz del descanso | $59.990 |
| 08:17 | Ofrendas Florales 1 | Ofrendas Florales 1 | $114.990 |
| 08:26 | Arreglo con Ramos 1 | Ramo inolvidable | $34.990 |
| 08:55 | Ofrendas Florales 2 | Hermoso escrito | $64.990 (sin cambio; el mensaje no indica precio nuevo) |
| 09:00 | Ofrendas Florales 3 | Corona emotiva | $48.990 |
| 09:05 | Ofrendas Florales 4 | Arreglo blanco delicado | $28.990 |

- Galería y fotos principales actualizadas para los nueve productos del 22/09 con las imágenes reales enviadas por el cliente.
- Logo oficial actualizado en cabecera, pie de página y metadatos (`client_images/corona-de-flores-logo-2026.jpg`).

## Material de chat integrado
- Logo enviado el 21/09 a las 20:05 aplicado en cabecera, favicon y pie de página.
- Fotografías de los nueve grupos del 22/09 (08:01–09:04) extraídas y vinculadas al catálogo en `public/client_images/revisions_20260922/`.
- Teléfono verificado (+56 9 4650 9718), tarifa plana de envío de $4.000 y eliminación de selección de cintas.

## Integración pendiente
La versión de GitHub Pages continúa siendo una demostración. Flow usa una simulación sin backend configurado y la nueva interfaz no crea pedidos reales de WooCommerce. Mi cuenta enlaza a la tienda original. Este cambio corrige catálogo y cálculo de envío; no acredita integración de pagos, administración ni publicación en el dominio del cliente.

## Validación
- Compilación correcta; lint sin errores.
- Pruebas automatizadas: nueve productos, tarifa fija para varias cantidades/variantes, descuentos y migración de carrito guardado.
- Navegador: fichas sin cintas, WhatsApp correcto, 71 productos, carrito y checkout con igual total, compra directa, persistencia de nuevos precios y ausencia de errores JavaScript.
- Sin desborde de página en 390, 430, 768, 1366 y 1440 px.
- Capturas móvil/escritorio en esta carpeta. No se realizaron pagos ni se enviaron mensajes.

