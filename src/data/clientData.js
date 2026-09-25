import recoveredProducts from './recoveredProducts.json';
import colombianProducts from './colombianProducts.json';

const catalogProducts = [...recoveredProducts, ...colombianProducts];
const countCategories = (...slugs) => catalogProducts.filter(product =>
  product.originalCategorySlugs.some(slug => slugs.includes(slug))
).length;

export const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanBase + cleanPath;
};

export const clientData = {
  brand: {
    name: "Corona de Flores",
    tagline: "Floristería Especializada en Coronas Fúnebres & Arreglos de Condolencias en Santiago",
    domain: "coronadeflores.cl",
    logo: getAssetUrl("client_images/corona-de-flores-logo-2026.jpg"),
    heroLogo: getAssetUrl("client_images/products/corona_rosas_lirios.jpg"),
    whatsapp: "+56946509718",
    whatsappFormatted: "+56 9 4650 9718",
    email: "contacto@coronadeflores.cl",
    address: "Santiago, Chile • Envíos a Domicilio y Velatorios 24/7",
    currency: "CLP",
    currencySymbol: "$"
  },
  flowConfig: {
    sandboxUrl: 'https://sandbox.flow.cl/api',
    liveUrl: 'https://www.flow.cl/api'
  },
  categories: [
    { id: 'funebres', name: 'Catálogo completo', slug: 'funebres', count: catalogProducts.length },
    ...[['coronas', 'Coronas'], ['arreglos', 'Arreglos'], ['ofrendas-florales', 'Ofrendas florales'], ['cubre-urnas', 'Cubre urnas'], ['ramos', 'Ramos']]
      .map(([slug, name]) => ({ id: slug, slug, name, count: countCategories(slug) }))
      .filter(category => category.count > 0)
  ],
  products: catalogProducts.map(product => ({
    ...product,
    image: getAssetUrl(product.image),
    gallery: product.gallery.map(getAssetUrl)
  }))
};

export const catalogMaxPrice = Math.ceil(Math.max(...clientData.products.map(p => p.price)) / 5000) * 5000;
export const catalogMinPrice = Math.floor(Math.min(...clientData.products.map(p => p.price)) / 5000) * 5000;
