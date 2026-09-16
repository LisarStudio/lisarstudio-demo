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
  categories: [
    { id: "funebres", name: "Fúnebres", slug: "funebres", count: 8 },
    { id: "coronas-funebres", name: "Coronas Fúnebres", slug: "coronas-funebres", count: 4 },
    { id: "arreglos-condolencias", name: "Arreglos & Pedestales", slug: "arreglos-condolencias", count: 4 },
    { id: "cubre-urnas", name: "Cubre Urnas & Cajas", slug: "cubre-urnas", count: 3 },
    { id: "ramilletes", name: "Ramilletes & Bouquet", slug: "ramilletes", count: 3 }
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
  products: [
    {
      id: "corona-funebre-rosas-lirios",
      title: "Corona Fúnebre Con Rosas y Lirios",
      slug: "corona-funebre-rosas-lirios",
      category: "Fúnebres",
      categorySlug: "funebres",
      price: 85990,
      regularPrice: 98000,
      badge: "Más Vendida",
      rating: 5.0,
      reviewsCount: 48,
      sku: "CF-IMP-01",
      stockStatus: "instock",
      shortDescription: "Honra la memoria con esta imponente corona de rosas ecuatorianas blancas y lirios seleccionados sobre soporte de madera noble.",
      description: "Corona fúnebre sobria confeccionada artesanalmente con flores naturales frescas. Incluye cinta de condolencias impresa con texto personalizado y envío express 24/7 a velatorio o iglesia.",
      features: [
        "Despacho prioritario 24/7 en Región Metropolitana",
        "Rosas blancas ecuatorianas y Lirios de exportación",
        "Cinta de condolencias impresa personalizada sin costo",
        "Atril de madera reforzado incluido"
      ],
      variants: [
        { name: "Tamaño Estándar (90 cm de diámetro)", priceModifier: 0 },
        { name: "Tamaño Premium Gigante (120 cm de diámetro)", priceModifier: 25000 }
      ],
      image: getAssetUrl("client_images/products/corona_rosas_lirios.jpg"),
      gallery: [
        getAssetUrl("client_images/products/corona_rosas_lirios.jpg")
      ]
    },
    {
      id: "arreglo-funebre-descanso-eterno",
      title: "Arreglo Fúnebre Descanso Eterno",
      slug: "arreglo-funebre-descanso-eterno",
      category: "Fúnebres",
      categorySlug: "funebres",
      price: 54990,
      regularPrice: 65000,
      badge: "Destacado",
      rating: 5.0,
      reviewsCount: 32,
      sku: "AF-PED-02",
      stockStatus: "instock",
      shortDescription: "Elegante pedestal floral compuesto por lirios blancos, orquídeas y gladiolos en fina base de iglesia.",
      description: "Diseño sobrio de gran presencia vertical. Acompaña con profunda solemnidad los momentos de despedida con flores hidropónicas frescas de alta durabilidad.",
      features: [
        "Presentación en pedestal metálico de alta estabilidad",
        "Flores frescas hidropónicas seleccionadas",
        "Incluye tarjeta membretada de condolencias"
      ],
      variants: [
        { name: "Presentación Estándar", priceModifier: 0 },
        { name: "Presentación Deluxe (+ Rosas Adicionales)", priceModifier: 15000 }
      ],
      image: getAssetUrl("client_images/products/arreglo_pedestal.jpg"),
      gallery: [
        getAssetUrl("client_images/products/arreglo_pedestal.jpg")
      ]
    },
    {
      id: "corona-funebre-adela",
      title: "Corona Fúnebre Adela para Tanatorio",
      slug: "corona-funebre-adela",
      category: "Fúnebres",
      categorySlug: "funebres",
      price: 94990,
      regularPrice: 110000,
      badge: "Homenaje Especial",
      rating: 5.0,
      reviewsCount: 29,
      sku: "CF-ADE-03",
      stockStatus: "instock",
      shortDescription: "Corona tradicional fúnebre combinada con rosas rojas, crisantemos blancos y acentos dorados.",
      description: "Homenaje floral vistoso y sobrio que expresa afecto profundo. Diseñado especialmente para funerarias, iglesias y capillas velatorias.",
      features: [
        "Rosas rojas de exportación y follajes naturales",
        "Cinta de homenaje impresa con dorado",
        "Despacho prioritario el mismo día"
      ],
      variants: [
        { name: "Diámetro 1 Metro", priceModifier: 0 },
        { name: "Diámetro 1.30 Metros", priceModifier: 30000 }
      ],
      image: getAssetUrl("client_images/products/corona_red_white.jpg"),
      gallery: [
        getAssetUrl("client_images/products/corona_red_white.jpg")
      ]
    },
    {
      id: "cubre-urna-soberano",
      title: "Corona Fúnebre Legado de Honor",
      slug: "cubre-urna-soberano",
      category: "Fúnebres",
      categorySlug: "funebres",
      price: 119990,
      regularPrice: 135000,
      badge: "Cubre Urna Superior",
      rating: 5.0,
      reviewsCount: 19,
      sku: "CU-SOB-04",
      stockStatus: "instock",
      shortDescription: "Manto floral cubre urna confeccionado con rosas blancas, lirios y follajes finos para velatorio.",
      description: "El arreglo fúnebre superior para cubrir la urna durante la velación. Flores seleccionadas una a una con máxima delicadeza.",
      features: [
        "Manto floral completo de cobertura de urna",
        "Más de 70 tallos florales de primera selección",
        "Entrega directa en velatorio garantizada"
      ],
      variants: [
        { name: "Manto Cobertura Completa", priceModifier: 0 }
      ],
      image: getAssetUrl("client_images/products/cubre_urna.jpg"),
      gallery: [
        getAssetUrl("client_images/products/cubre_urna.jpg")
      ]
    },
    {
      id: "ramillete-condolencias-blanco",
      title: "Ramillete de Condolencias Blanco Puro",
      slug: "ramillete-condolencias-blanco",
      category: "Fúnebres",
      categorySlug: "funebres",
      price: 39990,
      regularPrice: 48000,
      badge: "Expresión Dulce",
      rating: 5.0,
      reviewsCount: 37,
      sku: "RM-BLA-05",
      stockStatus: "instock",
      shortDescription: "Bouquet sobrio de rosas blancas envuelto en fino papel de seda con tarjeta de condolencia.",
      description: "Hermosa expresión de acompañamiento de tamaño personal para entregar directamente a la familia o enviar al funeral.",
      features: [
        "Envoltura fina de presentación sobria",
        "Rosas blancas frescas y follajes finos",
        "Tarjeta membretada con dedicatoria"
      ],
      variants: [
        { name: "Ramillete 12 Rosas", priceModifier: 0 },
        { name: "Ramillete 24 Rosas", priceModifier: 18000 }
      ],
      image: getAssetUrl("client_images/products/ramillete_blanco.jpg"),
      gallery: [
        getAssetUrl("client_images/products/ramillete_blanco.jpg")
      ]
    }
  ]
};
