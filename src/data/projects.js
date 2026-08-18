// Campos localizables en { es, en }. Helper pick() en los componentes consumidores.
export const projects = [
  {
    id: 'burger-house-3d',
    service: 'web',
    business: {
      es: 'Una tienda o una carta que se recorre en 3D vende lo que una galería de fotos no puede. Lo mismo se monta para tu producto, tu local o tu catálogo.',
      en: 'A shop or a menu you can explore in 3D sells what a photo gallery cannot. The same can be built for your product, venue or catalogue.',
    },
    title: 'Burger House — 3D Web',
    category: 'Creative Web · 3D · Frontend',
    description: {
      es: 'Sitio web inmersivo para restaurante de hamburguesas con modelos 3D reales (GLB) interactivos, animaciones GSAP ScrollTrigger y hero cinematográfico.',
      en: 'Immersive website for a burger restaurant featuring real interactive 3D models (GLB), GSAP ScrollTrigger animations and a cinematic hero.',
    },
    problem: {
      es: 'Las webs de restaurante genéricas no transmiten la calidad del producto ni captan la atención del visitante.',
      en: 'Generic restaurant websites fail to convey product quality or capture the visitor’s attention.',
    },
    solution: {
      es: 'Experiencia 3D de nivel agencia: cada hamburguesa es un modelo 3D real que el usuario explora, con animaciones de scroll y un tema visual cálido propio.',
      en: 'Agency-grade 3D experience: each burger is a real 3D model the user can explore, with scroll-driven animations and a distinctive warm visual theme.',
    },
    metrics: [
      { label: { es: 'Modelos 3D', en: '3D models' }, value: '3 GLB' },
      { label: { es: 'Secciones', en: 'Sections' }, value: '4' },
      { label: { es: 'FPS objetivo', en: 'Target FPS' }, value: '60' },
      { label: { es: 'Estado', en: 'Status' }, value: 'Live' },
    ],
    keyFindings: {
      es: [
        'Modelos GLB clonados por instancia (useGLTF comparte la caché)',
        'Tamaño normalizado con THREE.Box3 para consistencia visual',
        'Animaciones GSAP ScrollTrigger + tilt 3D en las tarjetas',
      ],
      en: [
        'GLB models cloned per instance (useGLTF shares a cached instance)',
        'Size normalized with THREE.Box3 for visual consistency',
        'GSAP ScrollTrigger animations + 3D tilt on the cards',
      ],
    },
    stack: ['React 19', 'Three.js', 'React Three Fiber', 'drei', 'GSAP', 'Tailwind v4', 'Firebase Hosting'],
    demoUrl: 'https://burger-house-3d.web.app',
    githubUrl: 'https://github.com/mindset-code/burger-house-3d',
    screenshotPath: null,
    icon: 'burger',
    accentColor: '#b98436',
  },
  {
    id: 'executive-dashboard',
    service: 'datos-bi',
    encargo: 'panel-tesoreria',
    business: {
      es: 'El mismo cuadro de mando, pero con tus ventas, tus costes y tu tesorería: una pantalla que se actualiza sola y te dice si el mes va bien antes de que acabe.',
      en: 'The same dashboard, but with your sales, costs and cash: one screen that updates itself and tells you how the month is going before it ends.',
    },
    title: 'Executive Dashboard 360°',
    category: 'Business Intelligence · Revenue Operations',
    description: {
      es: 'Dashboard ejecutivo en vivo con 24 KPIs estratégicos. Cubre Finance, RevOps y Marketing en una sola vista con 5 tablas analíticas × 36 meses.',
      en: 'Live executive dashboard with 24 strategic KPIs. Covers Finance, RevOps and Marketing in a single view across 5 analytical tables × 36 months.',
    },
    problem: {
      es: 'Los líderes toman decisiones sin visibilidad unificada de sus métricas de Finance, Sales y Marketing.',
      en: 'Leaders make decisions without unified visibility into their Finance, Sales and Marketing metrics.',
    },
    solution: {
      es: 'Dashboard 360° con los 24 KPIs más críticos para dirección, generando una fuente única de verdad.',
      en: 'A 360° dashboard with the 24 most critical leadership KPIs, creating a single source of truth.',
    },
    metrics: [
      { label: { es: 'KPIs', en: 'KPIs' }, value: '24' },
      { label: { es: 'Meses de datos', en: 'Months of data' }, value: '36' },
      { label: { es: 'Tablas analíticas', en: 'Analytical tables' }, value: '5' },
      { label: { es: 'Estado', en: 'Status' }, value: 'Live' },
    ],
    keyFindings: {
      es: [
        'Revenue, MRR/ARR, Churn, CAC, LTV en una vista',
        'Win Rate, Pipeline Coverage, ROAS integrados',
        'Listo para Power BI / Tableau (star schema)',
      ],
      en: [
        'Revenue, MRR/ARR, Churn, CAC and LTV in a single view',
        'Win Rate, Pipeline Coverage and ROAS integrated',
        'Ready for Power BI / Tableau (star schema)',
      ],
    },
    stack: ['Python 3.12', 'Pandas 2.2', 'React 19', 'Recharts', 'Firebase Hosting'],
    demoUrl: 'https://proyectos-mindset-code.web.app/executive',
    githubUrl: 'https://github.com/mindset-code/project-executive-dashboard-data',
    screenshotPath: '/screenshots/01_executive.png',
    icon: 'chart-bar',
    accentColor: '#6fae8c',
  },
  {
    id: 'churn-analysis',
    service: 'datos-bi',
    business: {
      es: 'Saber qué clientes están a punto de irse, y por qué, antes de que se vayan. Se entrena con tu histórico de facturación y bajas.',
      en: 'Knowing which customers are about to leave, and why, before they do. Trained on your own billing and churn history.',
    },
    title: 'Predictive Churn Analysis',
    category: 'Data Science · Machine Learning · Revenue Operations',
    description: {
      es: 'Regresión logística sobre 2.000 clientes sintéticos: AUC-ROC 0,703 y 61,5 % de las fugas detectadas, a cambio de marcar también a muchos que se quedan.',
      en: 'Logistic regression over 2,000 synthetic customers: 0.703 AUC-ROC and 61.5% of churners caught, at the cost of flagging many who stay.',
    },
    problem: {
      es: 'Las empresas pierden clientes sin señales de alerta tempranas que permitan intervención preventiva.',
      en: 'Companies lose customers without early warning signals that would enable proactive intervention.',
    },
    solution: {
      es: 'Regresión logística con pesos balanceados: prefiere equivocarse marcando de más antes que dejar escapar a quien se va, y sus coeficientes se leen como causas de negocio.',
      en: 'Logistic regression with balanced class weights: it would rather over-flag than miss someone who leaves, and its coefficients read directly as business drivers.',
    },
    metrics: [
      { label: { es: 'Accuracy', en: 'Accuracy' }, value: '64.0%' },
      { label: { es: 'AUC-ROC', en: 'AUC-ROC' }, value: '0.703' },
      { label: { es: 'Precision', en: 'Precision' }, value: '20.5%' },
      { label: { es: 'Recall', en: 'Recall' }, value: '61.5%' },
    ],
    keyFindings: {
      es: [
        'El contrato manda: mensual se va al 20,9 %, dos años al 4,8 %',
        'Las incidencias no cuentan hasta la quinta: de un 11 % salta al 37,5 %',
        'Quien más paga es quien más se va: 21,2 % por encima de 120 $ al mes',
      ],
      en: [
        'The contract rules it: monthly churns at 20.9%, two-year at 4.8%',
        'Tickets do not count until the fifth: 11% jumps to 37.5%',
        'The ones who pay most leave most: 21.2% above $120 a month',
      ],
    },
    stack: ['Python 3.12', 'Scikit-learn', 'Pandas', 'Matplotlib', 'React 19', 'Firebase'],
    demoUrl: 'https://proyectos-mindset-code.web.app/churn',
    githubUrl: 'https://github.com/mindset-code/project-churn-analysis',
    screenshotPath: '/screenshots/02_churn.png',
    icon: 'flask',
    accentColor: '#9aa9c8',
  },
  {
    id: 'hotel-pricing',
    service: 'datos-bi',
    business: {
      es: 'Poner precio con criterio en vez de por costumbre: estacionalidad, ocupación y eventos aplicados a tu tarifa. Vale para hoteles, alquileres y servicios con demanda variable.',
      en: 'Pricing with a method instead of out of habit: seasonality, occupancy and events applied to your rates. Works for hotels, rentals and any service with variable demand.',
    },
    title: 'Hotel Dynamic Pricing Engine',
    category: 'Revenue Management · Data Engineering',
    description: {
      es: 'Motor de pricing dinámico con 6 factores reales. Modela ADR, RevPAR y ocupación para 3 tipos de habitación con forecast a 60 días.',
      en: 'Dynamic pricing engine driven by 6 real-world factors. Models ADR, RevPAR and occupancy for 3 room types with a 60-day forecast.',
    },
    problem: {
      es: 'Los hoteles fijan precios estáticos perdiendo revenue en alta demanda y ocupación en temporada baja.',
      en: 'Hotels set static rates, leaving revenue on the table during peak demand and occupancy during low season.',
    },
    solution: {
      es: 'Algoritmo con 6 factores (estacionalidad, eventos, ocupación, lead-time) que optimiza precio por tipo de habitación.',
      en: 'A 6-factor algorithm (seasonality, events, occupancy, lead time) that optimizes the rate per room type.',
    },
    metrics: [
      { label: { es: 'Factores de precio', en: 'Pricing factors' }, value: '6' },
      { label: { es: 'Forecast', en: 'Forecast' }, value: { es: '60 días', en: '60 days' } },
      { label: { es: 'Tipos habitación', en: 'Room types' }, value: '3' },
      { label: { es: 'Historial', en: 'History' }, value: { es: '2 años', en: '2 years' } },
    ],
    keyFindings: {
      es: [
        'Standard $120, Deluxe $185, Suite $320 base price',
        'Eventos locales generan premium de hasta 1.55×',
        'Precio clippeado entre 70% y 220% del base price',
      ],
      en: [
        'Base prices: Standard $120, Deluxe $185, Suite $320',
        'Local events drive a premium of up to 1.55×',
        'Rate clamped between 70% and 220% of base price',
      ],
    },
    stack: ['Python 3.12', 'Pandas', 'NumPy', 'React 19', 'Recharts', 'Firebase'],
    demoUrl: 'https://proyectos-mindset-code.web.app/hotel',
    githubUrl: 'https://github.com/mindset-code/project-hotel-pricing-engine',
    screenshotPath: '/screenshots/03_hotel.png',
    icon: 'building',
    accentColor: '#c98a5c',
  },
  {
    id: 'sales-weather-etl',
    service: 'ia-automatizacion',
    encargo: 'captura-facturas',
    business: {
      es: 'Tus datos viven en sitios distintos y nadie los cruza. Esto los recoge, los limpia y los deja en una sola tabla cada día, sin que nadie abra un Excel.',
      en: 'Your data lives in separate places and nobody joins it. This collects it, cleans it and lands it in a single table every day, with no spreadsheets involved.',
    },
    title: 'Sales & Weather ETL Pipeline',
    category: 'Data Engineering · Analytics',
    description: {
      es: 'Pipeline ETL production-ready que integra 9.800 transacciones Superstore con 2.9M registros de temperatura en un solo dataset analítico.',
      en: 'Production-ready ETL pipeline that integrates 9,800 Superstore transactions with 2.9M temperature records into a single analytical dataset.',
    },
    problem: {
      es: 'Datos de ventas y clima dispersos en fuentes heterogéneas sin integración que permita análisis cruzado.',
      en: 'Sales and weather data scattered across disparate sources, with no integration to enable cross-analysis.',
    },
    solution: {
      es: 'Pipeline Extract → Transform → Load con feature engineering y 6 visualizaciones de correlación ventas-clima.',
      en: 'An Extract → Transform → Load pipeline with feature engineering and 6 sales-vs-weather correlation visualizations.',
    },
    metrics: [
      { label: { es: 'Registros procesados', en: 'Records processed' }, value: '2.9M' },
      { label: { es: 'Fuentes integradas', en: 'Sources integrated' }, value: '2' },
      { label: { es: 'KPIs en dashboard', en: 'Dashboard KPIs' }, value: '5' },
      { label: { es: 'Gráficos', en: 'Charts' }, value: '6' },
    ],
    keyFindings: {
      es: [
        'Join de ventas y clima en ciudad + fecha',
        'Temperature buckets, sales tiers, weekend flags',
        'Dashboard React desplegado en Firebase',
      ],
      en: [
        'Sales and weather joined on city + date',
        'Temperature buckets, sales tiers and weekend flags',
        'React dashboard deployed on Firebase',
      ],
    },
    stack: ['Python 3.12', 'Pandas 2.2', 'NumPy', 'React 19', 'Recharts', 'Firebase'],
    demoUrl: 'https://proyectos-mindset-code.web.app/etl',
    githubUrl: 'https://github.com/mindset-code/project-sales-weather-etl',
    screenshotPath: '/screenshots/04_etl.png',
    icon: 'cog',
    accentColor: '#7ea6d4',
  },
  {
    id: 'revenue-management',
    service: 'desarrollo',
    business: {
      es: 'Un simulador para decidir con números: cambias un parámetro y ves el efecto en ingresos antes de tocar nada en el negocio.',
      en: 'A simulator to decide with numbers: change one parameter and see the revenue impact before touching anything in the business.',
    },
    title: 'Revenue Management Dashboard',
    category: 'Web Development · Revenue Operations',
    description: {
      es: 'Web app interactiva con simulador de pricing en tiempo real. Ajusta 5 parámetros y ve el impacto inmediato en ADR, RevPAR y Revenue.',
      en: 'Interactive web app with a real-time pricing simulator. Adjust 5 parameters and see the immediate impact on ADR, RevPAR and Revenue.',
    },
    problem: {
      es: 'Revenue managers necesitan modelar escenarios de precio-ocupación sin herramientas propietarias costosas.',
      en: 'Revenue managers need to model price-vs-occupancy scenarios without expensive proprietary tools.',
    },
    solution: {
      es: 'Simulador web con Canvas API, 5 sliders de parámetros y una semana tipo de 7 días, sin librerías externas.',
      en: 'A web simulator built with the Canvas API: 5 parameter sliders and a fixed 7-day week shape, with no external libraries.',
    },
    metrics: [
      { label: { es: 'Parámetros', en: 'Parameters' }, value: '5' },
      { label: { es: 'KPIs en vivo', en: 'Live KPIs' }, value: '4' },
      { label: { es: 'Semana tipo', en: 'Week shape' }, value: { es: '7 días', en: '7 days' } },
      { label: { es: 'Dependencias externas', en: 'External dependencies' }, value: '0' },
    ],
    keyFindings: {
      es: [
        'ADR, Occupancy, RevPAR, Total Revenue en tiempo real',
        'Fórmula: Effective Price = Base × (1-Discount) × Demand',
        'Canvas API puro sin Chart.js ni Recharts',
      ],
      en: [
        'ADR, Occupancy, RevPAR and Total Revenue in real time',
        'Formula: Effective Price = Base × (1 − Discount) × Demand',
        'Pure Canvas API, no Chart.js or Recharts',
      ],
    },
    stack: ['HTML5', 'CSS3 (Flexbox + Grid)', 'JavaScript ES6+', 'Canvas API'],
    demoUrl: null,
    githubUrl: 'https://github.com/mindset-code/project-revenue-management-web',
    screenshotPath: '/screenshots/05_revenue_web.png',
    icon: 'trending-up',
    accentColor: '#c2a98b',
  },
  {
    id: 'sql-optimization',
    service: 'datos-bi',
    business: {
      es: 'Qué productos, zonas y clientes dejan margen de verdad. Las mismas consultas sobre tu ERP o tu facturación, servidas en Power BI.',
      en: 'Which products, regions and customers actually leave margin. The same queries over your ERP or invoicing, served in Power BI.',
    },
    title: 'Sales Optimization SQL',
    category: 'Business Intelligence · SQL Analytics',
    description: {
      es: '5 queries SQL avanzadas sobre 10.000 registros de ventas. Análisis de rentabilidad por región, vendedor, estacionalidad y márgenes.',
      en: '5 advanced SQL queries over 10,000 sales records. Profitability analysis by region, sales rep, seasonality and margin.',
    },
    problem: {
      es: 'Equipos de ventas sin visibilidad analítica de qué regiones, vendedores y productos son más rentables.',
      en: 'Sales teams lacking analytical visibility into which regions, reps and products are the most profitable.',
    },
    solution: {
      es: '5 queries SQL listas para conectar a Power BI o Tableau, con star schema y hallazgos de negocio documentados.',
      en: '5 SQL queries ready to connect to Power BI or Tableau, with a star schema and documented business findings.',
    },
    metrics: [
      { label: { es: 'Registros', en: 'Records' }, value: '10,000' },
      { label: { es: 'Queries SQL', en: 'SQL queries' }, value: '5' },
      { label: { es: 'BI-ready', en: 'BI-ready' }, value: '✓' },
      { label: { es: 'DBs soportadas', en: 'Databases supported' }, value: '3' },
    ],
    keyFindings: {
      es: [
        'Regiones más rentables con margen de beneficio',
        'Vendedores de alto rendimiento identificados',
        'Patrones de estacionalidad en ventas anuales',
      ],
      en: [
        'Most profitable regions ranked by profit margin',
        'Top-performing sales reps identified',
        'Seasonality patterns across annual sales',
      ],
    },
    stack: ['SQL (SQLite · PostgreSQL · MySQL)', 'Python 3.12', 'Pandas', 'Power BI', 'Tableau'],
    demoUrl: null,
    githubUrl: 'https://github.com/mindset-code/project-sales-optimization-sql',
    screenshotPath: '/screenshots/06_sql.png',
    icon: 'clipboard',
    accentColor: '#4f9273',
  },
  {
    id: 'siem-security',
    service: 'seguridad',
    encargo: 'auditoria-ia',
    business: {
      es: 'Revisar qué tienes expuesto y quién lo está intentando, con un informe de mitigación priorizado que se entiende sin ser técnico.',
      en: 'Reviewing what you have exposed and who is trying it, with a prioritised mitigation report you can read without being technical.',
    },
    title: 'Security Log Analysis · SIEM',
    category: 'Cybersecurity · ISC2 CC · Threat Detection',
    description: {
      es: 'Simulación de SIEM que analiza 5.000 líneas de logs para detectar brute-force, escaneo de puertos y anomalías. ISC2 CC aplicado.',
      en: 'SIEM simulation that analyzes 5,000 log lines to detect brute-force attacks, port scans and anomalies. ISC2 CC applied.',
    },
    problem: {
      es: 'Equipos de seguridad sin herramientas para correlacionar eventos y detectar patrones de ataque en logs.',
      en: 'Security teams without tooling to correlate events and detect attack patterns across logs.',
    },
    solution: {
      es: 'SIEM en Python con regex y correlación de eventos que genera reporte estructurado de incidentes con IPs para blocklist.',
      en: 'A Python SIEM using regex and event correlation that produces a structured incident report with IPs to block.',
    },
    metrics: [
      { label: { es: 'Logs analizados', en: 'Logs analyzed' }, value: '5,000' },
      { label: { es: 'Top IPs sospechosas', en: 'Top suspicious IPs' }, value: '5' },
      { label: { es: 'Tipos de evento', en: 'Event types' }, value: '6' },
      { label: { es: 'Certificación', en: 'Certification' }, value: 'ISC2 CC' },
    ],
    keyFindings: {
      es: [
        'Brute-force detectado por patrón de IPs',
        'LOGIN_SUCCESS, ACCESS_DENIED, PORT_SCAN correlacionados',
        'Reporte de incidentes listo para blocklist inmediata',
      ],
      en: [
        'Brute-force detected via IP patterns',
        'LOGIN_SUCCESS, ACCESS_DENIED and PORT_SCAN correlated',
        'Incident report ready for immediate blocklisting',
      ],
    },
    stack: ['Python 3.12', 're (regex)', 'collections', 'Markdown report'],
    demoUrl: null,
    githubUrl: 'https://github.com/mindset-code/project-security-log-analysis',
    screenshotPath: '/screenshots/07_siem.png',
    icon: 'shield',
    accentColor: '#d18a86',
  },
]

export const projectById = (id) => projects.find(p => p.id === id)

// Devuelve el valor en el idioma dado; acepta strings simples o { es, en }.
export const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.es) : v)
