const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanBase + cleanPath;
};

export const clientData = {
  brand: {
    name: "Lisar Studio",
    tagline: "Agencia Digital & Soluciones E-Commerce",
    domain: "lisarstudio.com",
    logo: getAssetUrl("client_images/uploads/2021/02/cropped-121077729_826729951406261_5130496571142149153_n.png"),
    heroBanner: getAssetUrl("client_images/uploads/2021/05/Bannerlisar.jpeg"),
    whatsapp: "+56912345678",
    whatsappFormatted: "+56 9 1234 5678",
    email: "contacto@lisarstudio.com",
    address: "Santiago, Chile",
    currency: "CLP",
    currencySymbol: "$",
    description: "Diseño web profesional, tiendas online e-commerce con pasarela Flow, desarrollo a medida y mantenimiento web corporativo."
  },
  categories: [
    { id: "all", name: "Todos los Planes", slug: "todos" },
    { id: "paginas-web", name: "Páginas Web", slug: "paginas-web", description: "Sitios web corporativos rápidos, modernos y 100% responsivos." },
    { id: "e-commerce", name: "E-Commerce", slug: "e-commerce", description: "Tiendas online completas integradas con pasarela de pago Flow y Webpay." },
    { id: "branding", name: "Branding & Diseño", slug: "branding", description: "Identidad corporativa, logotipos y recursos visuales." },
    { id: "mantencion", name: "Mantención & Hosting", slug: "mantencion", description: "Servidores ultrarrápidos, copias de seguridad y soporte técnico continuo." }
  ],
  products: [
    {
      id: "plan-basico",
      title: "Plan Básico Web",
      slug: "plan-basico",
      category: "Páginas Web",
      categorySlug: "paginas-web",
      price: 49990,
      regularPrice: 65000,
      badge: "Más Popular Emprendedores",
      rating: 4.9,
      reviewsCount: 18,
      sku: "LISAR-WEB-01",
      stockStatus: "instock",
      shortDescription: "Orientado especialmente para el joven emprendedor. Una página completa con entrega rápida entre 1 a 3 días hábiles.",
      description: `El Plan Básico de Lisar Studio está diseñado para emprendedores que necesitan lanzar su presencia digital de forma profesional y acelerada. Incluye diseño responsivo adaptado a móviles, botones directos a WhatsApp, catálogo inicial de servicios y optimización de velocidad de carga.`,
      features: [
        "Entrega express en 1 a 3 días hábiles",
        "Diseño 100% responsive (Mobile, Tablet y Desktop)",
        "Hasta 5 secciones principales (Inicio, Nosotros, Servicios, Galería, Contacto)",
        "Integración directa a WhatsApp Business",
        "Formulario de contacto con notificación por correo",
        "Optimización de velocidad y SEO básico"
      ],
      variants: [
        { name: "Entrega Estándar (3 días)", priceModifier: 0 },
        { name: "Entrega Prioritaria (24 horas)", priceModifier: 15000 }
      ],
      image: getAssetUrl("client_images/uploads/2021/05/Bannerlisar-600x337.jpeg"),
      gallery: [
        getAssetUrl("client_images/uploads/2021/05/Bannerlisar.jpeg"),
        getAssetUrl("client_images/uploads/2021/04/LogoSmileProClinicaDentalsinborde-600x338.png")
      ]
    },
    {
      id: "plan-pyme",
      title: "Plan Pyme Corporativo",
      slug: "plan-pyme",
      category: "Páginas Web",
      categorySlug: "paginas-web",
      price: 99990,
      regularPrice: 125000,
      badge: "Recomendado Pymes",
      rating: 5.0,
      reviewsCount: 32,
      sku: "LISAR-WEB-02",
      stockStatus: "instock",
      shortDescription: "Orientado para el emprendedor que quiera dar un gran paso en su negocio. Página completa con entrega en 1 a 1.5 semanas.",
      description: `El Plan Pyme te otorga una plataforma digital de alto nivel con catálogo interactivo, cotizador de servicios, múltiples páginas internas, optimización para motores de búsqueda y arquitectura lista para conectar pasarela de pagos.`,
      features: [
        "Entrega entre 1 a 1.5 semanas",
        "Diseño web corporativo a medida",
        "Catálogo de productos/servicios con filtros interactivos",
        "Integración comercial con WhatsApp y Redes Sociales",
        "Certificado de seguridad SSL e integración de mapa Google Maps",
        "Panel listo para administración futura (Admin Ready)"
      ],
      variants: [
        { name: "Planes Estándar Pyme", priceModifier: 0 },
        { name: "Incluye Dominio .CL por 1 año", priceModifier: 10000 }
      ],
      image: getAssetUrl("client_images/uploads/2021/04/LogoSmileProClinicaDentalsinborde-600x338.png"),
      gallery: [
        getAssetUrl("client_images/uploads/2021/04/LogoSmileProClinicaDentalsinborde.png"),
        getAssetUrl("client_images/uploads/2021/05/aniketpagina.png")
      ]
    },
    {
      id: "plan-ecommerce-flow",
      title: "Plan E-Commerce Pro Flow",
      slug: "plan-ecommerce-flow",
      category: "E-Commerce",
      categorySlug: "e-commerce",
      price: 189990,
      regularPrice: 240000,
      badge: "Pasarela Flow Incluida",
      rating: 5.0,
      reviewsCount: 24,
      sku: "LISAR-EC-01",
      stockStatus: "instock",
      shortDescription: "Tienda virtual completa con pasarela de pago Flow integrada (Webpay, Tarjetas de Crédito/Débito, Servipag, Mach).",
      description: `Solución de comercio electrónico llave en mano. Tu cliente podrá seleccionar productos, agregar al carrito con variaciones, seleccionar método de envío y pagar de forma 100% segura mediante Flow.cl en pesos chilenos (CLP).`,
      features: [
        "Integración oficial de Pasarela de Pagos Flow (Webpay, Tarjetas, Servipag, Mach)",
        "Catálogo responsivo e-commerce ilimitado",
        "Carrito de compras interactivo con Drawer de actualización en vivo",
        "Checkout optimizado de alta conversión con retornos y confirmación Flow",
        "Gestión de stock, precios de oferta y variaciones de producto",
        "Arquitectura desacoplada y lista para backend Admin API"
      ],
      variants: [
        { name: "Licencia Flow Estándar", priceModifier: 0 },
        { name: "Configuración Sandbox + Producción Asistida", priceModifier: 20000 }
      ],
      image: getAssetUrl("client_images/uploads/2021/04/Corona-de-Flores-600x600.png"),
      gallery: [
        getAssetUrl("client_images/uploads/2021/04/Corona-de-Flores.png"),
        getAssetUrl("client_images/uploads/2021/05/album-1.jpg")
      ]
    },
    {
      id: "diseno-branding-corporativo",
      title: "Diseño & Branding Corporativo",
      slug: "diseno-branding-corporativo",
      category: "Branding & Diseño",
      categorySlug: "branding",
      price: 79990,
      regularPrice: 99000,
      badge: "Identidad Visual",
      rating: 4.8,
      reviewsCount: 15,
      sku: "LISAR-DES-01",
      stockStatus: "instock",
      shortDescription: "Creación de logotipo vectorial, manual de marca, paleta tipográfica y assets gráficos comerciales.",
      description: `Destaca de tu competencia con una identidad de marca moderna y memorable. Incluye propuestas conceptuales, revisiones sin límite de tiempo y entrega de archivos vectoriales listos para imprenta y web.`,
      features: [
        "3 Propuestas conceptuales iniciales",
        "Entrega en formatos vectoriales (AI, SVG, PNG, PDF)",
        "Paleta de colores corporativos (HEX, RGB, CMYK)",
        "Manual básico de uso de marca y tipografías",
        "Banner e imágenes de perfil adaptadas para Instagram y Facebook"
      ],
      variants: [
        { name: "Pack Marca Esencial", priceModifier: 0 },
        { name: "Pack Marca + Plantillas RRSS", priceModifier: 25000 }
      ],
      image: getAssetUrl("client_images/uploads/2021/05/aniketpagina.png"),
      gallery: [
        getAssetUrl("client_images/uploads/2021/05/aniketpagina.png"),
        getAssetUrl("client_images/uploads/2021/05/album-1.jpg")
      ]
    },
    {
      id: "hosting-mantencion-mensual",
      title: "Plan Hosting & Mantenimiento Mensual",
      slug: "hosting-mantencion-mensual",
      category: "Mantención & Hosting",
      categorySlug: "mantencion",
      price: 19990,
      regularPrice: 25000,
      badge: "Servidor SSL Cero Caídas",
      rating: 4.9,
      reviewsCount: 41,
      sku: "LISAR-HOST-01",
      stockStatus: "instock",
      shortDescription: "Servidor dedicado ultrarrápido, copias de seguridad automáticas diarias y asistencia técnica continua.",
      description: `Mantén tu sitio web 100% seguro, rápido y protegido. Nos encargamos del monitoreo de tiempo de actividad (uptime 99.9%), renovación de SSL, limpieza de caché y ajustes mensuales de contenido.`,
      features: [
        "Hosting SSD de alta velocidad en Chile / EE.UU.",
        "Certificado SSL de seguridad de 256 bits",
        "Copias de respaldo diarias (Backups)",
        "Monitoreo 24/7 de seguridad y malware",
        "Soporte técnico preferente vía WhatsApp"
      ],
      variants: [
        { name: "Pago Mensual ($19.990/mes)", priceModifier: 0 },
        { name: "Plan Anual (2 meses Gratis - $199.900/año)", priceModifier: 179910 }
      ],
      image: getAssetUrl("client_images/uploads/2021/05/album-1.jpg"),
      gallery: [
        getAssetUrl("client_images/uploads/2021/05/album-1.jpg")
      ]
    }
  ],
  portfolio: [
    {
      title: "Corona de Flores",
      category: "E-Commerce & Pagos Flow",
      image: getAssetUrl("client_images/uploads/2021/04/Corona-de-Flores.png")
    },
    {
      title: "SmilePro Clínica Dental",
      category: "Sitio Web Corporativo",
      image: getAssetUrl("client_images/uploads/2021/04/LogoSmileProClinicaDentalsinborde.png")
    },
    {
      title: "Aniket Marca & Web",
      category: "Branding & Tienda Online",
      image: getAssetUrl("client_images/uploads/2021/05/aniketpagina.png")
    }
  ],
  team: [
    {
      name: "Silvio",
      role: "CEO & Fundador",
      image: getAssetUrl("client_images/uploads/2021/02/cropped-IMG_5951-scaled-1.jpg"),
      bio: "Especialista en estrategia digital, desarrollo de negocios e integración de soluciones tecnológicas."
    },
    {
      name: "Pancho",
      role: "Director de Desarrollo",
      image: getAssetUrl("client_images/uploads/2021/05/fotopanchopag.png"),
      bio: "Experto en arquitectura web, desarrollo frontend/backend y optimización e-commerce."
    },
    {
      name: "Peter",
      role: "Líder de Diseño & UX",
      image: getAssetUrl("client_images/uploads/2021/05/fotopeterpagina.png"),
      bio: "Diseñador especializado en experiencia de usuario, interfaz comercial e identidad corporativa."
    }
  ],
  flowConfig: {
    sandboxUrl: "https://sandbox.flow.cl/api",
    liveUrl: "https://www.flow.cl/api",
    currency: "CLP",
    defaultReturnPath: "/flow-response"
  }
};
