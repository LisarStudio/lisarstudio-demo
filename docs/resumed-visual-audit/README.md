# Corrección retomada — 21 septiembre 2026

Trabajo sobre el proyecto existente, manteniendo los 71 productos, sus precios CLP, imágenes, variantes y rutas.

## Referencias y criterio
- Referencia web: https://flores-bogota.net/ y su catálogo fúnebre.
- La imagen 2 adjunta tiene imágenes contiguas en móvil; la referencia web consultada tiene separaciones de 20 px. En teléfono se priorizó explícitamente la imagen adjunta. Escritorio conserva las medidas de la auditoría previa.
- No se afirma identidad de fotografías o branding: se conservan los del cliente. Las estrellas reflejan las valoraciones existentes, sin inventar reseñas. El selector conserva Destacados y ofrece Aleatorio funcional.
- WhatsApp móvil utiliza una franja reservada para no superponerse a los productos, diferencia intencional respecto de la captura.

## Cambios
- Encabezado móvil fijo de 94 px, buscador, carrito y menú operativos. Ordenamiento fijo debajo.
- Catálogo móvil: dos columnas, 22 px de margen exterior, sin separación horizontal, fotos cuadradas, títulos de una línea, precio de 18 px, botones verdes de 39 px de alto.
- Portada: tipografía Arial, colores y proporciones del buscador ajustados, tarjetas con estrellas, productos sin ocultar en tablet, destacado sin marco ni espacios artificiales.
- Categorías únicas y pobladas: Coronas (26), Arreglos (15), Ofrendas florales (10), Cubre urnas (15), Ramos (5). Total: 71.
- Menú de categorías desplegable; categorías laterales y enlaces del pie conectados a filtros reales. Eliminados los enlaces vacíos y categorías sin productos.
- Título y navegación de tienda responden a la categoría; cambio de categoría limpia búsqueda y límite de precio.
- Se ignoran respuestas de búsquedas anteriores para evitar resultados desactualizados.

## Breakpoints
- Hasta 767 px: 2 columnas; escala compacta a 480 y 575 px.
- 768–991 px: 3 columnas, navegación móvil.
- 992–1219 px: 3 columnas, sidebar.
- 1220–1439 px: 4 columnas, contenedor de 1200 px.
- Desde 1440 px: 4 columnas, contenedor ampliado.

## Validación
- Capturas de home y catálogo: 390×844, 430×932, 768×1024, 1366×768, 1440×900.
- Revisión visual de las capturas y láminas catalog-overview.jpg / home-overview.jpg.
- Sin desborde horizontal en home y tienda a 320, 390, 430, 768, 992, 1024, 1366 y 1440 px.
- Probadas todas las categorías y sus cantidades, orden ascendente/descendente y aleatorio, menú móvil, búsqueda, ficha de producto, añadido al carrito y persistencia al recargar, enlaces desde home y footer.
- Las 71 imágenes cargan sin imagen de respaldo.
- Cero excepciones de la aplicación en las pruebas y capturas finales.
- Build Vite correcto; lint sin errores, cinco advertencias previas ajenas al cambio.
- No se realizaron pagos ni envíos de mensajes.

