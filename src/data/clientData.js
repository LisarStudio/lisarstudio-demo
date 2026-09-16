export const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanBase + cleanPath;
};

export const clientData = {
  brand: {
    name: "Corona de Flores",
    tagline: "Floristería Especializada en Coronas Fúnebres & Arreglos de Condolencias",
    domain: "coronadeflores.cl",
    logo: getAssetUrl("client_images/2021/04/Corona-de-Flores-logo-nuevo-.jpg"),
    heroLogo: getAssetUrl("client_images/2021/04/Corona-de-Flores.png"),
    whatsapp: "+56987654321",
    whatsappFormatted: "+56 9 8765 4321",
    email: "contacto@coronadeflores.cl",
    address: "Santiago, Chile • Envíos a Domicilio y Velatorios 24/7",
    currency: "CLP",
    currencySymbol: "$",
    description: "Servicio de arreglos florales, coronas fúnebres, ofrendas, ramilletes y cubre urnas con despacho urgente a velatorios e iglesias."
  },
  categories: [
    { id: "all", name: "Todos los Arreglos", slug: "todos" },
    { id: "coronas-funebres", name: "Coronas Fúnebres", slug: "coronas-funebres", description: "Coronas de honor y homenaje elaboradas con flores frescas seleccionadas." },
    { id: "arreglos-condolencias", name: "Arreglos & Ramilletes", slug: "arreglos-condolencias", description: "Expresiones de afecto y acompañamiento para momentos solemnes." },
    { id: "cubre-urnas", name: "Cubre Urnas & Cruces", slug: "cubre-urnas", description: "Cintas personalizadas, cruces florales y arreglos especiales para altar." },
    { id: "canastos-florales", name: "Canastos & Palmas", slug: "canastos-florales", description: "Palmas de condolencia y canastos florales elegantes de alta presencia." }
  ],
  products: [
    {
      id: "corona-imperial-blanca",
      title: "Corona Fúnebre Imperial Blanca",
      slug: "corona-imperial-blanca",
      category: "Coronas Fúnebres",
      categorySlug: "coronas-funebres",
      price: 85990,
      regularPrice: 98000,
      badge: "Más Solicitada",
      rating: 5.0,
      reviewsCount: 42,
      sku: "CF-IMP-01",
      stockStatus: "instock",
      shortDescription: "Majestuosa corona floral confeccionada con rosas blancas, lirios, crisantemos y finos follajes verdes. Incluye cinta impresa de condolencias.",
      description: `La Corona Fúnebre Imperial Blanca es nuestro tributo más distinguido. Elaborada artesanalmente por nuestros floristas con rosas ecuatorianas seleccionadas, lirios perfumados y finos follajes. Entregada directamente en velatorio o parroquia con cinta de felicitación o condolencias personalizada.`,
      features: [
        "Despacho prioritario 24/7 a velatorios e iglesias",
        "Rosas blancas ecuatorianas de exportación y Lirios frescos",
        "Incluye cinta de condolencias impresa con texto personalizado",
        "Base circular reforzada y atril de madera noble",
        "Tarjeta de dedicatoria membretada de la floristería"
      ],
      variants: [
        { name: "Tamaño Estándar (90 cm de diámetro)", priceModifier: 0 },
        { name: "Tamaño Premium Gigante (120 cm de diámetro)", priceModifier: 25000 }
      ],
      image: getAssetUrl("client_images/2021/04/Corona-de-Flores.png"),
      gallery: [
        getAssetUrl("client_images/2021/04/Corona-de-Flores.png"),
        getAssetUrl("client_images/2021/05/album-1.jpg")
      ]
    },
    {
      id: "arreglo-condolencias-lirios-rosas",
      title: "Arreglo Elegancia de Condolencias",
      slug: "arreglo-condolencias-lirios-rosas",
      category: "Arreglos & Ramilletes",
      categorySlug: "arreglos-condolencias",
      price: 54990,
      regularPrice: 65000,
      badge: "Acompañamiento Solemnes",
      rating: 4.9,
      reviewsCount: 28,
      sku: "CF-ARR-02",
      stockStatus: "instock",
      shortDescription: "Diseño floral sobrio y distinguido compuesto por lirios blancos, gerberas y rosas en base de cerámica o madera.",
      description: `Arreglo floral diseñado para entregar afecto y cercanía en momentos difíciles. Sus lirios blancos transmiten paz y esperanza, acompañados de rosas de tono suave y follajes naturales en una presentación sobria y delicada.`,
      features: [
        "Flores frescas hidropónicas de alta durabilidad",
        "Base elegante de presentación solemnes",
        "Incluye tarjeta con dedicatoria personalizada",
        "Despacho express confirmado con fotografía de entrega"
      ],
      variants: [
        { name: "Presentación Clásica", priceModifier: 0 },
        { name: "Presentación Deluxe (Más Volumen de Rosas)", priceModifier: 15000 }
      ],
      image: getAssetUrl("client_images/2021/05/album-1.jpg"),
      gallery: [
        getAssetUrl("client_images/2021/05/album-1.jpg"),
        getAssetUrl("client_images/2020/09/banner-03.jpg")
      ]
    },
    {
      id: "cubre-urna-rosas-soberano",
      title: "Cubre Urna Soberano de Rosas & Orquídeas",
      slug: "cubre-urna-rosas-soberano",
      category: "Cubre Urnas & Cruces",
      categorySlug: "cubre-urnas",
      price: 119990,
      regularPrice: 140000,
      badge: "Homenaje Especial",
      rating: 5.0,
      reviewsCount: 19,
      sku: "CF-URNA-03",
      stockStatus: "instock",
      shortDescription: "Manta floral completa confeccionada especialmente para cubrir la urna. Rosas seleccionadas, lirios y orquídeas.",
      description: `Un tributo floral de excepcional calidez y respeto. Diseñado en forma de manto fluido para cubrir delicadamente la urna. Confeccionado con más de 60 flores frescas entre rosas de exportación, orquídeas y follaje exótico.`,
      features: [
        "Manto de cobertura completa para urna",
        "Más de 60 tallos florales de primera selección",
        "Diseño equilibrado y sujeción segura",
        "Instalación directa en capilla o parroquia por florista especializado"
      ],
      variants: [
        { name: "Cubre Urna Medio Manto", priceModifier: 0 },
        { name: "Cubre Urna Manto Completo Imperial", priceModifier: 35000 }
      ],
      image: getAssetUrl("client_images/2020/09/banner-03.jpg"),
      gallery: [
        getAssetUrl("client_images/2020/09/banner-03.jpg"),
        getAssetUrl("client_images/2020/09/banner-04.jpg")
      ]
    },
    {
      id: "palma-funebre-honor",
      title: "Palma Fúnebre de Honor & Paz",
      slug: "palma-funebre-honor",
      category: "Canastos & Palmas",
      categorySlug: "canastos-florales",
      price: 64990,
      regularPrice: 75000,
      badge: "Presencia Distinguida",
      rating: 4.8,
      reviewsCount: 31,
      sku: "CF-PALM-04",
      stockStatus: "instock",
      shortDescription: "Arreglo vertical erguido estilo palma, compuesto por anturios, lilium, gladiolos y follajes sobrios.",
      description: `La Palma Fúnebre ofrece una presencia majestuosa y sobria en velatorios y templos. Su estructura vertical simboliza elevación y memoria eterna, destacando por sus lilium blancos y follajes nobles.`,
      features: [
        "Estructura vertical sobria de gran visibilidad",
        "Gladiolos, Lilium blancos y follaje noble",
        "Atril soporte de alta resistencia",
        "Cinta con texto de condolencias personalizada"
      ],
      variants: [
        { name: "Palma Simple (1 Metro)", priceModifier: 0 },
        { name: "Palma Doble (1.5 Metros)", priceModifier: 20000 }
      ],
      image: getAssetUrl("client_images/2020/09/banner-04.jpg"),
      gallery: [
        getAssetUrl("client_images/2020/09/banner-04.jpg"),
        getAssetUrl("client_images/2021/05/other-small.jpg")
      ]
    },
    {
      id: "ramillete-rosas-memoria",
      title: "Ramillete Memoria Eterna de Rosas Blancas",
      slug: "ramillete-rosas-memoria",
      category: "Arreglos & Ramilletes",
      categorySlug: "arreglos-condolencias",
      price: 39990,
      regularPrice: 48000,
      badge: "Afecto Personal",
      rating: 4.9,
      reviewsCount: 54,
      sku: "CF-RAM-05",
      stockStatus: "instock",
      shortDescription: "Atado tradicional de 24 rosas blancas naturales envueltas en papel ecológico fine art con cinta satinada.",
      description: `Ramillete sobrio de 24 rosas blancas naturales de tallo largo, preparado con la máxima delicadeza y envuelto en fino papel artesanal. Perfecto para acompañamiento familiar o entrega personal.`,
      features: [
        "24 Rosas Blancas naturales de tallo largo",
        "Envoltorio artesanal ecológico con lazo satinado",
        "Conservante floral hidratante incluido",
        "Tarjeta con dedicatoria personal incluida"
      ],
      variants: [
        { name: "Ramillete 24 Rosas", priceModifier: 0 },
        { name: "Ramillete 36 Rosas Premium", priceModifier: 15000 }
      ],
      image: getAssetUrl("client_images/2021/05/other-small.jpg"),
      gallery: [
        getAssetUrl("client_images/2021/05/other-small.jpg")
      ]
    }
  ],
  portfolio: [
    {
      title: "Coronas Fúnebres Especiales",
      category: "Despacho Urgente Velatorios",
      image: getAssetUrl("client_images/2021/04/Corona-de-Flores.png")
    },
    {
      title: "Cubre Urnas & Arreglos Altar",
      category: "Confección Floral Artesanal",
      image: getAssetUrl("client_images/2020/09/banner-03.jpg")
    },
    {
      title: "Palmas & Canastos Fúnebres",
      category: "Honor & Memoria",
      image: getAssetUrl("client_images/2020/09/banner-04.jpg")
    }
  ],
  team: [
    {
      name: "Atención al Cliente 24/7",
      role: "Coordinación de Entregas Urgentes",
      image: getAssetUrl("client_images/2021/04/Corona-de-Flores-logo-nuevo-.jpg"),
      bio: "Equipo dedicado a la recepción de pedidos de emergencia y coordinación inmediata con velatorios e iglesias."
    },
    {
      name: "Maestros Floristas",
      role: "Confección Floral Artesanal",
      image: getAssetUrl("client_images/2021/04/Corona-de-Flores.png"),
      bio: "Floristas con más de 15 años de experiencia en arreglos solemnes, coronas de honor y mantos de condolencias."
    }
  ],
  flowConfig: {
    sandboxUrl: "https://sandbox.flow.cl/api",
    liveUrl: "https://www.flow.cl/api",
    currency: "CLP",
    defaultReturnPath: "/flow-response"
  }
};
