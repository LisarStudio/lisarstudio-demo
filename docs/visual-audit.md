# Auditoría y corrección visual responsive

Referencia: https://flores-bogota.net/arreglos-florales/variedades/funebres/
Fecha: 21 de septiembre de 2026.

Se inspeccionó el proyecto existente y se capturaron ambos catálogos antes de editar. Se midieron rectángulos y estilos computados en 390×844, 430×932, 768×1024, 1366×768 y 1440×900. Después se repitieron las capturas y se revisaron visualmente.

## Medidas reproducidas

| Pantalla | Columnas | Ancho de imagen: referencia / proyecto | Separación horizontal | Botón: referencia / proyecto |
|---|---:|---:|---:|---:|
| 390×844 | 2 | 165 / 165 px | 20 px | 97,72×35,5 / 97,72×35,5 px |
| 430×932 | 2 | 185 / 185 px | 20 px | 97,72×35,5 / 97,72×35,5 px |
| 768×1024 | 3 | 224,33 / 224,33 px | 20 px | 103,39×37 / 103,39×37 px |
| 1366×768 | 4 | 205 / 205 px | 20 px | 99,42×35,94 / 99,42×35,95 px |
| 1440×900 | 4 | 243,44 / 243,44 px | 20 px | 99,42×35,94 / 99,42×35,95 px |

En teléfonos: título de producto 13,669 px / interlineado 18,453 px; estrellas 13,2 px; precio 16,715 px, peso 600; botón verde #6ea820 con padding 8×12 px. Margen imagen-título 14,858 px. En escritorio: título 14,72 px, precio 18 px, margen imagen-título 16 px.

La referencia declara Poppins pero no carga una fuente Poppins en su documento: las fuentes disponibles son las de iconos. Se reprodujo su tipografía realmente visible, Arial, en el encabezado y catálogo. La portada conserva su tipografía propia.

## Breakpoints

- Hasta 480 px: encabezado compacto; dos columnas.
- 481–767 px: dos columnas. A 575 px cambia la escala de tipografía como en la referencia.
- 768–991 px: tres columnas; encabezado móvil, sidebar debajo del catálogo.
- 992–1219 px: tres columnas y sidebar al 25%; contenedor de 960 px.
- 1220–1439 px: cuatro columnas y sidebar al 25%; contenedor de 1200 px.
- Desde 1440 px: cuatro columnas; contenedor exterior de hasta 1460 px, padding lateral de 20 px.

Los puntos 991/992 y 1219/1220 proceden del CSS de la referencia, no de breakpoints genéricos. La vista de lista de escritorio nunca fuerza una sola columna en teléfonos.

## Correcciones

- Hamburger a la izquierda, marca del cliente en el centro del grupo móvil, búsqueda y carrito con contador y flecha a la derecha.
- Búsqueda móvil desplegable funcional e independiente del menú.
- Franja superior y navegación con las proporciones de referencia, utilizando únicamente datos existentes del cliente.
- Imágenes cuadradas a ancho completo. Se amplían las fotografías que tenían franjas laterales. Los originales permanecen intactos; las fotografías verticales y los arreglos anchos conservan el encuadre completo. La ficha detallada sigue mostrando sus fotos originales.
- Nombres en una línea con elipsis, nombre completo en tooltip y ficha; estrellas grises sin inventar valoraciones; precios CLP originales.
- Dropdown compacto, gutters y espacios verticales medidos; sin sombras ni bordes de tarjetas.
- Ayuda en la franja superior del catálogo para que no tape productos ni el filtro de precio.
- Sustitución de estilos inline y overrides duplicados por CSS por componente. Eliminada la regla de 900 px que interfería con tablet.

Se mantiene el fondo blanco pedido, aunque la referencia tiene fondo gris claro. Se conserva “Destacados” y la lógica de orden existente, sin inventar orden aleatorio. La distinta longitud de los textos reales, especialmente a 430 px, puede desplazar el inicio de la grilla. No se copian textos comerciales, promociones ni productos ajenos.

## Integridad y pruebas

No se modificaron los datos del catálogo, archivos de imágenes, servicios de pago, backend, URLs ni dependencias. Se conservan los 42 productos, sus precios, variantes y fotos.

Build Vite correcto. Lint sin errores; cinco advertencias previas en archivos fuera del alcance.

Chrome: sin overflow en 320, 390, 430, 480, 576, 767, 768, 991, 992, 1024, 1219, 1220, 1366 y 1440 px. Grilla y gap verificados. Cargan las 42 imágenes sin fallback. Probados orden por precio, filtro hasta $30.000, menú y búsqueda móvil, retorno de lista a grilla móvil, Mi cuenta, inicio, ficha, siete variantes de color y añadido al carrito con actualización del contador. Sin excepciones de JavaScript.

## Archivos

- src/catalog.css: catálogo y breakpoints medidos.
- src/components/Header.jsx y Header.css: encabezado y búsqueda.
- src/components/ProductCard.jsx y ProductGrid.jsx: fichas y controles de presentación.
- src/components/LeftSidebar.jsx: filtros y estilos sin inline.
- src/components/WhatsAppWidget.jsx y WhatsAppWidget.css: ayuda sin superposición.
- src/App.jsx: estructura de catálogo y vista compartida.
- src/components/AccountSection.css: retirada de override de navegación obsoleto.
- src/index.css: retirada de overflow oculto y ajuste del scrollbar a la referencia.

Capturas finales y comparativas en [visual-audit/](visual-audit/). En las comparativas: referencia a la izquierda, proyecto a la derecha.
