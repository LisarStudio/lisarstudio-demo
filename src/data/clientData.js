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
    logo: getAssetUrl("client_images/2021/04/Corona-de-Flores-logo-nuevo-.jpg"),
    heroLogo: getAssetUrl("client_images/products/corona_rosas_lirios.jpg"),
    whatsapp: "+56987654321",
    whatsappFormatted: "+56 9 8765 4321",
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
    { id: "funebres", name: "Fúnebres", slug: "funebres", count: catalogProducts.length },
    { id: "coronas-funebres", name: "Coronas Fúnebres", slug: "coronas-funebres", count: countCategories("coronas") },
    { id: "arreglos-condolencias", name: "Arreglos & Pedestales", slug: "arreglos-condolencias", count: countCategories("arreglos", "ofrendas-florales") },
    { id: "cubre-urnas", name: "Cubre Urnas & Cajas", slug: "cubre-urnas", count: countCategories("cubre-urnas") },
    { id: "ramilletes", name: "Ramilletes & Bouquet", slug: "ramilletes", count: countCategories("ramos") }
  ],
  sidebarCategories: [
    { name: "Día de la Madre", count: 12 },
    { name: "Día de la Mujer", count: 8 },
    { name: "Ocasiones", hasSub: true },
    { name: "Productos Adicionales", hasSub: true },
    { name: "San Valentín", count: 15 },
    { name: "Tipo de Flor", hasSub: true },
    {
      name: "Variedades",
      hasSub: true,
      isOpen: true,
      subItems: [
        { name: "Bouquet", slug: "bouquet" },
        { name: "Cajas", slug: "cajas" },
        { name: "Fruteros", slug: "fruteros" },
        { name: "Fúnebres", slug: "funebres", active: true },
        { name: "Jarrones", slug: "jarrones" },
        { name: "Solitarios", slug: "solitarios" }
      ]
    }
  ],
  products: catalogProducts.map(product => ({
    ...product,
    image: getAssetUrl(product.image),
    gallery: product.gallery.map(getAssetUrl)
  }))
};

export const catalogMaxPrice = Math.ceil(Math.max(...clientData.products.map(p => p.price)) / 5000) * 5000;
export const catalogMinPrice = Math.floor(Math.min(...clientData.products.map(p => p.price)) / 5000) * 5000;
