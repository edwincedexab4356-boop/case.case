import { Product } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Maletas de cabina
  {
    id: 'prod-cabina-01',
    name: 'Aviator Hardshell Carry-On Pro',
    slug: 'aviator-hardshell-carry-on-pro',
    category: 'cabina',
    categoryName: 'Maletas de cabina',
    price: 245,
    originalPrice: 285,
    shortDescription: 'Maleta rígida ultraligera en policarbonato Makrolon® con bolsillo frontal para laptop.',
    description: 'Diseñada para cumplir con las normas de cabina de aerolíneas internacionales (IATA). Fabricada con policarbonato alemán Makrolon® de 3 capas, ofrece máxima resistencia al impacto con un peso imperceptible. Incorpora acceso frontal de un toque para dispositivos electrónicos de hasta 16 pulgadas, cerradura doble TSA integrada y ruedas dobles silenciosas Hinomoto 360° con suspensión.',
    images: [
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
    ],
    colors: [
      { name: 'Negro Carbón Mate', hex: '#1C1C1E' },
      { name: 'Azul Abisal', hex: '#1E2B37' },
      { name: 'Verde Pino', hex: '#26382B' },
      { name: 'Plata Titanio', hex: '#B8BAC0' }
    ],
    sizes: ['55 x 35 x 23 cm (Cabina Estándar)', '55 x 40 x 20 cm (Cabina Compacta)'],
    dimensions: '55 x 35 x 23 cm',
    weight: '3.1 kg',
    volume: '38 Litros',
    material: 'Policarbonato Makrolon® alemán de alta pureza y marco de aluminio anodizado',
    features: [
      'Bolsillo exterior de acceso rápido acolchado para notebook de 16"',
      'Cerradura de combinación homologada TSA doble',
      '4 ruedas dobles ultrasilenciosas Hinomoto® Lisof 360°',
      'Asa telescópica ergonómica de 4 posiciones en aleación aeroespacial',
      'Interior con compresión inteligente y bolsa impermeable extraíble'
    ],
    inStock: true,
    stock: 14,
    lowStockThreshold: 4,
    featured: true,
    isDeal: true,
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Más Vendido'
  },
  {
    id: 'prod-cabina-02',
    name: 'Veloce Alum-Frame Cabin Lite',
    slug: 'veloce-alum-frame-cabin-lite',
    category: 'cabina',
    categoryName: 'Maletas de cabina',
    price: 210,
    originalPrice: 240,
    shortDescription: 'Estructura con marco de aluminio sin cremalleras exteriores para máxima seguridad.',
    description: 'La elegancia del cierre con broches herméticos de aluminio. Olvídate de cremalleras vulnerables a cortes: dos pestillos TSA independientes sellan herméticamente el contenido contra agua y polvo. Acabado texturizado anti-rayaduras.',
    images: [
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Plata Titanio', hex: '#C0C2C8' },
      { name: 'Gris Grafito', hex: '#373A40' },
      { name: 'Negro Mate', hex: '#141416' }
    ],
    sizes: ['54 x 36 x 22 cm'],
    dimensions: '54 x 36 x 22 cm',
    weight: '3.4 kg',
    volume: '36 Litros',
    material: 'Aleación de aluminio Serie 6000 y policarbonato mate',
    features: [
      'Cierre hermético de doble pestillo TSA sin cremallera',
      'Sellado perimetral de silicona hidrorrepelente',
      'Esquinas reforzadas con remaches de acero inoxidable',
      'Ruedas duales con cojinetes de bolas de acero templado'
    ],
    inStock: true,
    stock: 8,
    lowStockThreshold: 3,
    featured: false,
    rating: 4.8,
    reviewsCount: 46
  },

  // 2. Maletas medianas
  {
    id: 'prod-mediana-01',
    name: 'Horizon Check-In M 68cm',
    slug: 'horizon-check-in-m-68cm',
    category: 'medianas',
    categoryName: 'Maletas medianas',
    price: 295,
    originalPrice: 330,
    shortDescription: 'El volumen ideal para viajes de 7 a 14 días con fuelle expandible de 5 cm.',
    description: 'Una maleta de bodega mediana pensada para viajeros exigentes. Su cuerpo curvo absorbe la tensión en bodegas de avión mientras que su cremallera YKK® Racquet Coil previene perforaciones. Su fuelle de expansión añade 12 litros adicionales de capacidad cuando compras recuerdos durante tu estancia.',
    images: [
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
    ],
    colors: [
      { name: 'Verde Bosque Profundo', hex: '#1C3127' },
      { name: 'Negro Carbón', hex: '#18191B' },
      { name: 'Azul Marino', hex: '#1B263B' },
      { name: 'Arena Cálido', hex: '#D7CEBE' }
    ],
    sizes: ['68 x 46 x 28 cm (Expandible a 33 cm)'],
    dimensions: '68 x 46 x 28 (+5) cm',
    weight: '4.2 kg',
    volume: '74 Litros (86 L expandida)',
    material: 'Carcasa 100% Policarbonato virgen reciclable y forro interno de RPET ecológico',
    features: [
      'Expansión perimetral oculta de 5 cm',
      'Cremallera de seguridad antirrobo doble capa YKK®',
      'Báscula analógica de peso integrada en el asa lateral',
      'Organizador interno desmontable con ganchos para perchas'
    ],
    inStock: true,
    stock: 12,
    lowStockThreshold: 4,
    featured: true,
    rating: 4.9,
    reviewsCount: 62,
    badge: 'Destacado'
  },
  {
    id: 'prod-mediana-02',
    name: 'Terra Voyage Medium Expandable',
    slug: 'terra-voyage-medium-expandable',
    category: 'medianas',
    categoryName: 'Maletas medianas',
    price: 270,
    shortDescription: 'Diseño texturizado prismático de alta resistencia a arañazos de tránsito.',
    description: 'Tratamiento superficial microprismático que disimula el desgaste habitual de las cintas de equipaje. Distribución interior con doble panel divisor con bolsillos de malla transpirable.',
    images: [
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Gris Asfalto', hex: '#333533' },
      { name: 'Azul Cobalto Oscuro', hex: '#0B2545' },
      { name: 'Vino Burdeos', hex: '#4A1525' }
    ],
    sizes: ['66 x 44 x 27 cm'],
    dimensions: '66 x 44 x 27 cm',
    weight: '3.9 kg',
    volume: '68 Litros',
    material: 'Polipropileno de alta densidad elástico',
    features: [
      'Gran flexibilidad que evita roturas por aplastamiento',
      'Ruedas dobles multidireccionales engomadas',
      'Cerradura TSA empotrada en el marco lateral',
      'Tiradores reforzados ergonómicos'
    ],
    inStock: true,
    stock: 9,
    lowStockThreshold: 3,
    rating: 4.7,
    reviewsCount: 31
  },

  // 3. Maletas grandes
  {
    id: 'prod-grande-01',
    name: 'Transatlantic Trunk L 77cm',
    slug: 'transatlantic-trunk-l-77cm',
    category: 'grandes',
    categoryName: 'Maletas grandes',
    price: 360,
    originalPrice: 410,
    shortDescription: 'Formato Trunk profundo para guardar objetos voluminosos, botas y abrigos pesados.',
    description: 'Inspirada en los baúles clásicos transatlánticos pero con la tecnología de movilidad moderna. Su silueta más angosta y profunda (proporción 60/40) facilita empacar cascos, calzado deportivo o prendas voluminosas de invierno sin deformar la estructura.',
    images: [
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Negro Carbón', hex: '#161719' },
      { name: 'Verde Militar Oscuro', hex: '#2B3A2C' },
      { name: 'Plata Mate', hex: '#A3A6AD' }
    ],
    sizes: ['77 x 41 x 37 cm (Formato Baúl)'],
    dimensions: '77 x 41 x 37 cm',
    weight: '4.8 kg',
    volume: '102 Litros',
    material: 'Policarbonato reforzado con fibra de vidrio y herrajes de zinc fundido',
    features: [
      'Formato ergonómico que ocupa menos espacio en maleteros y trenes',
      'Divisores internos modulares ajustables con velcro de alta fijación',
      'Asas superior, lateral y frontal para fácil elevación',
      'Ruedas todoterreno sobredimensionadas de 60 mm'
    ],
    inStock: true,
    stock: 7,
    lowStockThreshold: 2,
    featured: true,
    isDeal: true,
    rating: 4.95,
    reviewsCount: 53,
    badge: 'Edición Trunk'
  },
  {
    id: 'prod-grande-02',
    name: 'Expedition Maxi 81cm Ultra-Lite',
    slug: 'expedition-maxi-81cm-ultra-lite',
    category: 'grandes',
    categoryName: 'Maletas grandes',
    price: 330,
    shortDescription: '115 litros de capacidad con tan solo 4.3 kg de peso en vacío.',
    description: 'La solución definitiva para viajes de más de 3 semanas o traslados prolongados. Maximiza tu límite de franquicia de 23 kg de equipaje gracias a su ligereza estructural sin comprometer la resistencia.',
    images: [
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
    ],
    colors: [
      { name: 'Azul Profundo', hex: '#14213D' },
      { name: 'Gris Grafito', hex: '#2B2D42' }
    ],
    sizes: ['81 x 54 x 31 cm'],
    dimensions: '81 x 54 x 31 cm',
    weight: '4.3 kg',
    volume: '115 Litros',
    material: 'Curv® composite ultrarresistente y ligero',
    features: [
      'Resistencia extrema a bajas temperaturas en bodegas (-40°C)',
      'Placa identificadora metálica para grabado de iniciales',
      'Sistema de cierre TSA de tres puntos',
      'Forro con tratamiento antibacteriano Aegis®'
    ],
    inStock: true,
    stock: 5,
    lowStockThreshold: 2,
    rating: 4.8,
    reviewsCount: 29
  },

  // 4. Juegos de maletas
  {
    id: 'prod-juegos-01',
    name: 'Set Signature Grand Tour 3 Piezas',
    slug: 'set-signature-grand-tour-3-piezas',
    category: 'juegos',
    categoryName: 'Juegos de maletas',
    price: 680,
    originalPrice: 840,
    shortDescription: 'El conjunto completo: Cabina 55cm + Mediana 68cm + Grande 77cm encajables.',
    description: 'La solución integral para toda la familia o cualquier tipo de viaje. Diseñadas con tecnología "Russian Doll" (muñeca rusa), las tres maletas se guardan una dentro de otra para ocupar el espacio de una sola en tu armario. Acabados a juego con textura satinada de alta durabilidad.',
    images: [
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Negro Carbón Satinado', hex: '#1C1D1F' },
      { name: 'Verde Oliva Profundo', hex: '#283618' },
      { name: 'Plata Metálico', hex: '#BDC3C7' }
    ],
    sizes: ['Set 3 piezas (Cabina 55cm + Mediana 68cm + Grande 77cm)'],
    dimensions: 'Anidadas: 77 x 52 x 32 cm',
    weight: '11.6 kg (Conjunto completo)',
    volume: '228 Litros totales combinados',
    material: 'Policarbonato alemán virgen con marcos protectores',
    features: [
      'Almacenamiento anidado: Cabina entra en Mediana, y Mediana en Grande',
      'Ahorro del 20% respecto a la compra individual',
      'Todas incluyen cerradura TSA independiente y ruedas Hinomoto®',
      'Incluye 3 etiquetas de viaje en cuero genuino grabables'
    ],
    inStock: true,
    stock: 6,
    lowStockThreshold: 2,
    featured: true,
    isDeal: true,
    rating: 5.0,
    reviewsCount: 38,
    badge: 'Ahorro 20%'
  },

  // 5. Mochilas
  {
    id: 'prod-mochilas-01',
    name: 'Apex Tech Transit Backpack 28L',
    slug: 'apex-tech-transit-backpack-28l',
    category: 'mochilas',
    categoryName: 'Mochilas',
    price: 165,
    originalPrice: 195,
    shortDescription: 'Mochila técnica para viajeros nómadas digitales con apertura plana 180° Clamshell.',
    description: 'Diseñada meticulosamente para pasar controles de seguridad en aeropuertos sin fricción. Su compartimento tecnológico posterior se abre completamente plano como una maleta. Cuenta con tejido Cordura® balístico de 1680D impermeable, funda para pasador de maleta en la espalda y bolsillo oculto anti-RFID.',
    images: [
      '/src/assets/images/product_urban_backpack_1792168452359.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_urban_backpack_1792168452359.jpg'
    ],
    colors: [
      { name: 'Azul Marino Técnico', hex: '#192A45' },
      { name: 'Negro Mate Táctico', hex: '#1A1A1A' },
      { name: 'Gris Carbón', hex: '#2F3542' }
    ],
    sizes: ['47 x 32 x 19 cm (28 Litros)'],
    dimensions: '47 x 32 x 19 cm',
    weight: '1.25 kg',
    volume: '28 Litros',
    material: 'Nylon Balístico 1680D con revestimiento DWR repelente al agua',
    features: [
      'Apertura TSA 180° para laptop de 16" y tablet de 12.9"',
      'Correa trasera para deslizar sobre el tirador de la maleta',
      'Bolsillo lateral magnético expansible para botella térmica o paraguas',
      'Panel dorsal ergonómico con canal de flujo de aire y soporte lumbar'
    ],
    inStock: true,
    stock: 22,
    lowStockThreshold: 5,
    featured: true,
    rating: 4.9,
    reviewsCount: 112,
    badge: 'Top Tech'
  },
  {
    id: 'prod-mochilas-02',
    name: 'Minimalist Commuter Daypack 20L',
    slug: 'minimalist-commuter-daypack-20l',
    category: 'mochilas',
    categoryName: 'Mochilas',
    price: 135,
    shortDescription: 'Silueta limpia y perfil delgado para desplazamientos ágiles en ciudad o excursiones cortas.',
    description: 'Una mochila urbana sobria sin tiras sobrantes ni detalles ruidosos. Cremalleras impermeables YKK AquaGuard® y compartimento suspendido que evita que la laptop toque el suelo al apoyarla.',
    images: [
      '/src/assets/images/product_urban_backpack_1792168452359.jpg',
      '/src/assets/images/product_weekend_travel_duffel_1792168452227.jpg',
      '/src/assets/images/product_urban_backpack_1792168452359.jpg'
    ],
    colors: [
      { name: 'Negro Mate', hex: '#111215' },
      { name: 'Gris Pizarra', hex: '#4B5563' },
      { name: 'Arena Desierto', hex: '#C2B8A3' }
    ],
    sizes: ['44 x 29 x 15 cm'],
    dimensions: '44 x 29 x 15 cm',
    weight: '0.85 kg',
    volume: '20 Litros',
    material: 'Lona técnica reciclada con laminación mate impermeable',
    features: [
      'Compartimento para portátil de 15" forrado en microfibra suave',
      'Bolsillo antirrobo invisible para pasaporte en la zona lumbar',
      'Hebillas magnéticas alemanas Fidlock® de accionamiento rápido'
    ],
    inStock: true,
    stock: 18,
    lowStockThreshold: 4,
    rating: 4.8,
    reviewsCount: 57
  },

  // 6. Bolsos de viaje
  {
    id: 'prod-bolsos-01',
    name: 'Heritage Weekender Canvas & Leather 45L',
    slug: 'heritage-weekender-canvas-leather-45l',
    category: 'bolsos',
    categoryName: 'Bolsos de viaje',
    price: 215,
    originalPrice: 260,
    shortDescription: 'Bolso duffel de fin de semana en lona encerada hidrófuga con detalles en cuero curtido vegetal.',
    description: 'El clásico bolso de viaje atemporal para escapadas de viernes a domingo o para llevar en cabina. Cuenta con compartimento inferior con cremallera independiente para calzado, manteniendo tu ropa impecable. Herrajes de latón macizo y correa al hombro de algodón grueso con almohadilla ergonómica.',
    images: [
      '/src/assets/images/product_weekend_travel_duffel_1792168452227.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_weekend_travel_duffel_1792168452227.jpg'
    ],
    colors: [
      { name: 'Verde Bosque & Cuero Miel', hex: '#2D4436' },
      { name: 'Tabaco Encerado', hex: '#583E26' },
      { name: 'Negro Carbón Encerado', hex: '#212121' }
    ],
    sizes: ['52 x 30 x 28 cm'],
    dimensions: '52 x 30 x 28 cm',
    weight: '1.45 kg',
    volume: '45 Litros',
    material: 'Lona encerada de 18 oz de alta densidad y cuero de curtición vegetal',
    features: [
      'Compartimento lateral ventilado aislado para 2 pares de zapatos',
      'Herrajes de latón macizo resistente a la corrosión marina',
      'Correa al hombro desmontable de 5 cm con almohadilla de cuero acolchada',
      'Fondo reforzado con 5 tachas metálicas de apoyo'
    ],
    inStock: true,
    stock: 11,
    lowStockThreshold: 3,
    featured: true,
    isDeal: true,
    rating: 4.95,
    reviewsCount: 79,
    badge: 'Favorito Artesanal'
  },

  // 7. Maletines y bolsos de mano
  {
    id: 'prod-maletines-01',
    name: 'Executive Flight Pilot Briefcase 16"',
    slug: 'executive-flight-pilot-briefcase-16',
    category: 'maletines',
    categoryName: 'Maletines y bolsos de mano',
    price: 180,
    shortDescription: 'Maletín ejecutivo con estructura semirrígida y organizador para documentos y tablets.',
    description: 'Diseñado pensando en la dinámica de aeropuertos y reuniones directivas. Fabricado con cuero de grano fino y nylon de alta tenacidad. Se monta de manera firme sobre el trolley de cualquier maleta sin tambalearse.',
    images: [
      '/src/assets/images/product_weekend_travel_duffel_1792168452227.jpg',
      '/src/assets/images/product_urban_backpack_1792168452359.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Negro Obsidiana', hex: '#111111' },
      { name: 'Marrón Espresso', hex: '#3E2723' }
    ],
    sizes: ['41 x 30 x 11 cm'],
    dimensions: '41 x 30 x 11 cm',
    weight: '1.1 kg',
    volume: '14 Litros',
    material: 'Cuero genuino flor y nylon balístico 1000D',
    features: [
      'Alojamiento acolchado para notebook de 16" y tablet de 11"',
      'Fuelle con fuelle para documentos A4 sin doblar',
      'Pasador posterior ancho para trolley',
      'Bloqueador RFID para tarjetas de crédito y pasaporte'
    ],
    inStock: true,
    stock: 8,
    lowStockThreshold: 3,
    rating: 4.8,
    reviewsCount: 24
  },

  // 8. Neceseres y organizadores
  {
    id: 'prod-org-01',
    name: 'Set de 6 Cubos de Compresión PackMaster',
    slug: 'set-6-cubos-compresion-packmaster',
    category: 'organizadores',
    categoryName: 'Neceseres y organizadores',
    price: 65,
    originalPrice: 85,
    shortDescription: 'Ahorra hasta un 40% de volumen en tu maleta con cierre de compresión de doble vía.',
    description: 'El secreto de los viajeros profesionales. Organiza camisas, pantalones, ropa interior, cables y calzado en compartimentos separados. Su cremallera de compresión perimetral expulsa el aire atrapado reduciendo el volumen a la mitad.',
    images: [
      '/src/assets/images/product_urban_backpack_1792168452359.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Gris Grafito', hex: '#374151' },
      { name: 'Azul Marino', hex: '#1E3A8A' },
      { name: 'Verde Oliva', hex: '#3F6212' }
    ],
    sizes: ['Set de 6 tamaños (XL, L, M, S, Calzado, Cables)'],
    dimensions: 'Varios tamaños encajables',
    weight: '0.45 kg (set total)',
    volume: 'Hasta 40% ahorro de espacio',
    material: 'Nylon Ripstop 210D ultraligero y malla transpirable',
    features: [
      'Cremallera de compresión secundaria para expulsión de aire',
      'Malla frontal transparente para identificar prendas al instante',
      'Asas individuales para extraer cada cubo con un dedo',
      'Incluye bolsa especial impermeable para zapatos o ropa húmeda'
    ],
    inStock: true,
    stock: 35,
    lowStockThreshold: 10,
    featured: true,
    isDeal: true,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Esencial de Viaje'
  },
  {
    id: 'prod-org-02',
    name: 'Neceser Colgante Impermeable Aerotour',
    slug: 'neceser-colgante-impermeable-aerotour',
    category: 'organizadores',
    categoryName: 'Neceseres y organizadores',
    price: 45,
    shortDescription: 'Gancho giratorio de 360° para colgar en cualquier toallero de hotel con bolsillos transparentes.',
    description: 'Apertura desplegable en 4 niveles que mantiene todos tus artículos de aseo e higiene personal visibles y al alcance sin ocupar espacio en mesadas de baño de hotel.',
    images: [
      '/src/assets/images/product_weekend_travel_duffel_1792168452227.jpg',
      '/src/assets/images/product_urban_backpack_1792168452359.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg'
    ],
    colors: [
      { name: 'Negro Mate', hex: '#1F2937' },
      { name: 'Verde Eucalipto', hex: '#374F44' }
    ],
    sizes: ['27 x 20 x 10 cm (Desplegado: 27 x 80 cm)'],
    dimensions: '27 x 20 x 10 cm',
    weight: '0.32 kg',
    volume: '6 Litros',
    material: 'Poliéster impermeable laminado y TPU termosellado a prueba de fugas',
    features: [
      'Bolsillos en TPU estanco que evitan filtraciones si un champú se abre',
      'Gancho metálico resistente de 360° para toalleros o mamparas',
      'Bolsillo elástico especial para cepillos de dientes y afeitadoras'
    ],
    inStock: true,
    stock: 28,
    lowStockThreshold: 6,
    rating: 4.8,
    reviewsCount: 65
  },

  // 9. Candados y accesorios
  {
    id: 'prod-acc-01',
    name: 'Candado TSA 007 con Cable de Acero Trenzado',
    slug: 'candado-tsa-007-cable-acero',
    category: 'accesorios',
    categoryName: 'Candados y accesorios',
    price: 24,
    shortDescription: 'Certificación Travel Sentry oficial para inspecciones aeroportuarias sin roturas.',
    description: 'El candado esencial para proteger bolsos, mochilas y cremalleras de maletas. Su cable flexible de acero trenzado de 3 mm pasa fácilmente por ojales estrechos donde los arcos rígidos no entran. Indicador de inspección que te avisa si el equipaje fue abierto por agentes aduaneros.',
    images: [
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
    ],
    colors: [
      { name: 'Negro Táctico', hex: '#1A1A1A' },
      { name: 'Plata Níquel', hex: '#C0C0C0' }
    ],
    sizes: ['Cable de 10 cm flexible'],
    dimensions: '8 x 3 x 1.5 cm',
    weight: '0.08 kg',
    material: 'Aleación de zinc de alto impacto y cable de acero aeronáutico',
    features: [
      'Homologación oficial TSA Travel Sentry®',
      'Código reprogramable de 3 dígitos con más de 1.000 combinaciones',
      'Indicador visual rojo que salta si las autoridades lo abrieron',
      'Cable flexible engomado que no raya el acabado de las maletas'
    ],
    inStock: true,
    stock: 50,
    lowStockThreshold: 10,
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: 'prod-acc-02',
    name: 'Balanza Digital de Equipaje Ultra Precisa',
    slug: 'balanza-digital-equipaje-ultra-precisa',
    category: 'accesorios',
    categoryName: 'Candados y accesorios',
    price: 28,
    originalPrice: 35,
    shortDescription: 'Evita cargos sorpresa por exceso de peso con precisión de 10 gramos.',
    description: 'Balanza portátil compacta con pantalla retroiluminada de fácil lectura. Soporta hasta 50 kg con función de tara y bloqueo automático del peso medido en pantalla.',
    images: [
      '/src/assets/images/product_urban_backpack_1792168452359.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
    ],
    colors: [
      { name: 'Plata Acero', hex: '#D1D5DB' },
      { name: 'Negro Mate', hex: '#1F2937' }
    ],
    sizes: ['Formato bolsillo (15 cm)'],
    dimensions: '15 x 3 x 5 cm',
    weight: '0.09 kg',
    material: 'Acero inoxidable y ABS de alta resistencia',
    features: [
      'Capacidad máxima: 50 kg / 110 lbs con precisión de 10 g',
      'Apagado automático para ahorro de batería',
      'Correa reforzada de nylon con gancho de aleación',
      'Incluye pila de litio de larga duración'
    ],
    inStock: true,
    stock: 42,
    lowStockThreshold: 8,
    isDeal: true,
    rating: 4.85,
    reviewsCount: 94
  },
  {
    id: 'prod-acc-03',
    name: 'Funda Protectora Elástica de Spandex Hidrorrepelente',
    slug: 'funda-protectora-elastica-spandex',
    category: 'accesorios',
    categoryName: 'Candados y accesorios',
    price: 32,
    shortDescription: 'Protege tu maleta contra rayones, polvo y apertura accidental durante el vuelo.',
    description: 'Funda confeccionada en tejido elástico de alto gramaje que se ajusta como un guante a la silueta de tu maleta. Con aberturas para el asa telescópica y asas laterales, además de cierre inferior con cremallera y hebilla de seguridad.',
    images: [
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_weekend_travel_duffel_1792168452227.jpg'
    ],
    colors: [
      { name: 'Negro Geométrico', hex: '#111827' },
      { name: 'Azul Noche', hex: '#1E3A8A' }
    ],
    sizes: ['S (Cabina 55cm)', 'M (Mediana 68cm)', 'L (Grande 77cm)'],
    dimensions: 'Adaptable con elasticidad del 30%',
    weight: '0.28 kg',
    material: 'Poliéster y Spandex 320 g/m² de alta densidad',
    features: [
      'Lavable en lavadora sin perder elasticidad ni color',
      'Doble sujeción inferior: cremallera resistente + correa elástica con clip',
      'Facilita identificar tu equipaje inmediatamente en la cinta de retiro'
    ],
    inStock: true,
    stock: 25,
    lowStockThreshold: 5,
    rating: 4.75,
    reviewsCount: 41
  },

  // 10. Ofertas
  {
    id: 'prod-ofertas-01',
    name: 'Voyager All-Terrain Carry-On Lite [OFERTA]',
    slug: 'voyager-all-terrain-carry-on-lite-oferta',
    category: 'ofertas',
    categoryName: 'Ofertas',
    price: 189,
    originalPrice: 249,
    shortDescription: 'Descuento especial por liquidación de temporada: maleta rígida cabina en policarbonato con candado TSA.',
    description: 'Aprovecha un 24% de descuento en la edición Voyager Lite. Mantiene todas las especificaciones de alta gama: ruedas dobles silenciosas, carcasa de policarbonato puro, cerradura TSA y separadores internos con malla.',
    images: [
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
      '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
      '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
    ],
    colors: [
      { name: 'Plata Titanio', hex: '#C5C6C7' },
      { name: 'Negro Mate', hex: '#1A1A1A' }
    ],
    sizes: ['55 x 38 x 21 cm'],
    dimensions: '55 x 38 x 21 cm',
    weight: '2.9 kg',
    volume: '37 Litros',
    material: 'Policarbonato Makrolon® virgen',
    features: [
      'Precio especial con 24% de descuento promocional',
      'Ruedas 360° con giro multidireccional suave',
      'Cerradura integrada TSA de 3 dígitos',
      'Garantía oficial completa de 5 años incluida'
    ],
    inStock: true,
    stock: 6,
    lowStockThreshold: 2,
    featured: true,
    isDeal: true,
    rating: 4.9,
    reviewsCount: 73,
    badge: '-24% Descuento'
  }
];
