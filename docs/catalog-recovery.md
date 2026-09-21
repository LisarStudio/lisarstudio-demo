# Client catalog recovery

Recovered on 2026-09-21 from the client-provided public_html.zip and the public WooCommerce catalog at https://coronadeflores.cl/wp-json/wc/store/v1/products?per_page=100.

- 41 published sale products from the public catalog; original titles, descriptions, CLP prices, reviews and categories retained.
- 55 color variants from the public Store API (type=variation); all currently have the same price as their parent.
- One additional archived product, Arreglo con Ramos 1 (WooCommerce ID 573), recovered from product_catalog_8dde5019c17cad3c0b30cd7ee4ee18ec.csv dated 2021-04-20. Its historical price is CLP 19,900; the current public catalog has no equivalent record.
- 42 catalog cards in total: 20 coronas, 9 arreglos, 5 ofrendas, 4 cubre urnas and 4 ramos.
- 63 original images extracted from the ZIP, stored locally under public/client_images/recovered; filenames use content hashes. No third-party image hotlinks.
- Explicit zero-price 'producto de prueba' (ID 1457, no photos) excluded. The older local development CSV and unrelated store exports were not used to create duplicates.
- The five previous demonstration products were replaced. No Colombian products were added.

CSS and layout unchanged. The existing price slider now derives its bounds from the data so the CLP 179,990 product appears by default. Existing variant selector labels use the recovered Color attribute.

Only product data and selected product images are included. No WordPress database, credentials, customers, orders, or server files are deployed.
