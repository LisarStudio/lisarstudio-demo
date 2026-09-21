# Portada de Corona de Flores

Referencia visual: https://flores-bogota.net/ (revisada el 21 de septiembre de 2026).

La portada adapta la estructura de la referencia: introducción rosada, banner fotográfico con buscador, categorías circulares, bloques editoriales, producto destacado con cuadrícula, banner secundario, colecciones y preguntas frecuentes. Conserva el encabezado, el catálogo y el acceso a Mi cuenta del proyecto.

Contenido: 42 productos recuperados; categorías calculadas desde sus datos originales. Los banners son ilustraciones promocionales generadas, no fotografías de nuevos productos vendibles. Las fichas usan las fotografías originales. No se añaden ofertas, reseñas ni servicios no verificados.

## Imágenes

Modo: generación con referencias mediante image_gen integrado. Entradas: e59bf5a0a0ec0464.jpg, efd0ee13a402f004.jpg y 722b2dcb197e18f8.jpg de public/client_images/recovered. Salida PNG 1536×1024, convertida a WebP para publicación.

- public/client_images/home/floral-hero.webp
- public/client_images/home/floral-editorial.webp

### Prompt del banner principal

Create an original premium floral shop website hero photograph, wide landscape 1536x1024. Use the provided real client flower arrangements as visual references: ivory white roses, white lilies, baby's breath and elegant rich green foliage. Editorial commercial photography, dignified and comforting condolence flowers, beautiful natural botanicals filling left and right edges with an atmospheric dark forest green and softly warm neutral background. Leave generous dark negative space in the CENTER and upper center for large white website text overlay. Soft side lighting, detailed realistic petals, sophisticated photographic composition, no funeral props, no people, no logos, NO TEXT, no watermark. Preserve the distinctive natural flowers from the references, do not copy their walls or packaging. This is a promotional background, not a new product listing. Make it beautiful, rich, elegant, with flowers clearly visible around the edges.

### Prompt del banner editorial

Generate an elegant original wide landscape 1536x1024 promotional editorial photograph for a Chilean condolence flower shop. Base the flowers on the provided real product references: natural ivory white roses, white lilies, baby's breath, deep green leaves. On the RIGHT HALF, arrange an elegant upright bouquet of ivory roses and foliage in a small hammered copper square vase on a warm cream stone console, retaining the visual character of the client's referenced white rose arrangement. Soft warm daylight from a window, natural realistic petals and graceful stems, peaceful tasteful atmosphere, beige plaster wall. LEFT HALF must be mostly empty light warm ivory wall with very subtle shadows, ample space for dark headline and button overlay. Photorealistic high quality commercial editorial styling. Wide composition. NO text, NO letters, NO watermark, NO logos, NO people. Do not invent a catalogue SKU, this is an atmospheric campaign banner.

## Verificación

Compilación Vite, lint sin errores (advertencias preexistentes), navegador Chrome en 1440, 390 y 320 px: imágenes cargadas, sin desbordamientos, dos columnas móviles, 20 coronas al seleccionar su categoría, 42 productos en catálogo completo, búsqueda de ramos con cuatro resultados, ficha de producto y ruta Mi cuenta accesibles, sin excepciones de JavaScript.
