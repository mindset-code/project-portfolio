import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import PortfolioFooter from '../components/PortfolioFooter'
import Icon from '../components/icons'
import BusinessCta from '../components/BusinessCta'

const L = (v, lang) => (v && typeof v === 'object' ? (v[lang] ?? v.es) : v)

/* ── Translations ──────────────────────────────────────────────────────────── */
const T = {
  es: {
    badge:   'La mitad técnica de Mindset & Code',
    role:    'Datos y BI · IA y automatización · Desarrollo a medida · España y Chile',
    tagline: 'Este es el taller. Cada proyecto de aquí abajo está publicado con su código y sus datos, y respalda un servicio que se contrata en mindset-code.com. Si algo de esto te sirve, se monta con los datos de tu empresa.',
    cta1: 'Ver servicios →', cta2: 'Encargos con precio cerrado', cta3: 'GitHub',
    stats: [
      { num: '16',   lbl: 'Proyectos publicados' },
      { num: '14',   lbl: 'Repos públicos' },
      { num: '7',    lbl: 'Demos en vivo' },
      { num: '24 h', lbl: 'Respuesta laborable' },
      { num: '2',    lbl: 'España y Chile' },
    ],
    careerTitle: 'De dónde sale el criterio',
    careerDesc:  'Diez años dirigiendo operaciones comerciales y una segunda carrera técnica construyendo el software que las sostiene. Las dos mitades de un negocio, en la misma mesa.',
    careerCards: [
      {
        icon: 'trending-up',
        color: '#6fae8c',
        title: 'Liderazgo comercial (10+ años)',
        body: 'Sales Operations, Revenue Operations y estrategia comercial en B2B de alta complejidad.',
        bullets: [
          'Procter & Gamble / BGR — equipo 100+ personas a nivel regional',
          '+18% expansión de cuota · +28% precisión en forecasting',
          'El Mercurio — rediseño del funnel RevOps, +2% revenue e-commerce',
        ],
      },
      {
        icon: 'wrench',
        color: '#7ea6d4',
        title: 'Ingeniería de datos y producto',
        body: 'El software que hoy se contrata como servicio: construido, desplegado y publicado.',
        bullets: [
          'Portafolio público con 16 proyectos desplegados',
          'Data Engineering · Revenue Management algorítmico',
          'Machine Learning · Ciberseguridad · Desarrollo web',
        ],
      },
      {
        icon: 'bot',
        color: '#9aa9c8',
        title: 'Stack IA como rutina diaria',
        body: 'Herramientas que uso todos los días para diseñar, construir y operar soluciones.',
        stack: ['Claude Code', 'Antigravity', 'Claude Cowork', 'OpenClaw', 'n8n', 'Linear', 'Power BI (DAX, RLS)', 'SQL', 'Python (Pandas, Scikit-learn, XGBoost)', 'React', 'Firebase', 'ETL', 'REST APIs', 'Agentic AI', 'LLM fine-tuning'],
      },
    ],
    projectsTitle: 'Lo que ya está construido',
    projectsDesc:  'Dieciséis proyectos end-to-end con el código publicado: datos y BI, machine learning, revenue management, web, ciberseguridad y automatización con IA. Siete con demo en vivo, y cada uno enlaza el servicio con el que se contrata.',
    viewBtn:     'Ver →',
    casesLink:   'Ver las ocho fichas técnicas completas →',
    skillsTitle: 'Stack técnico',
    aboutTitle:  'Quién está detrás',
    aboutP1: 'Mindset & Code. Diez años en operaciones comerciales y de ingresos (Procter & Gamble, El Mercurio) y una segunda carrera técnica en datos, IA y desarrollo. En la mitad fiscal del negocio: colaborador social de la AEAT y operativa ante el SII de Chile, presentando y contestando en nombre del cliente.',
    aboutP2: 'Este portafolio es la mitad técnica de Mindset & Code: el ciclo completo del dato, de los pipelines ETL a los cuadros de mando y los modelos predictivos. Un ejemplo de automatización de punta a punta es',
    aboutP2b: ', una operación con agentes de IA, n8n y Paperclip trabajando 24/7.',
    availTitle: 'Cómo se contrata',
    availItems: [
      '✓  Encargos con alcance, precio y plazo cerrados por escrito',
      '✓  Primera llamada de 60 minutos, sin coste y sin comercial de por medio',
      '✓  Respuesta en menos de 24 h laborables, siempre por escrito',
      '✓  España y Chile, con el mismo interlocutor',
    ],
    eduTitle:  'Formación',
    certTitle: 'Licencias y Certificaciones',
    currentProjectTitle: 'Proyecto en desarrollo',
    consultoriaTechDesc: 'Consultoría Tech: consultoría IA operada de forma autónoma con agentes Claude especializados que gestionan ventas, desarrollo, marketing y operaciones. Orquestación con n8n y Paperclip como sistema nervioso central.',
    consultoriaTechBadge: 'AI Automation · En marcha',
    consultoriaTechStats: [
      { num: '5',    lbl: 'Agentes IA' },
      { num: '4',    lbl: 'Workflows n8n' },
      { num: '24/7', lbl: 'Operación autónoma' },
    ],
    skillCats: [
      'Lenguajes & Datos',
      'Business Intelligence',
      'Data Engineering',
      'Revenue & Growth Analytics',
      'Web & Cloud',
      'IA & Automatización',
      'AI Engineering',
      'Ciberseguridad',
      'DevOps & PM',
    ],
    projectDescs: [
      'Web inmersiva 3D para restaurante de hamburguesas: modelos GLB reales interactivos, animaciones GSAP ScrollTrigger y hero cinematográfico. React + Three.js (R3F).',
      'Pipeline ETL que integra 9.800 transacciones de ventas con datos climáticos de ciudades US. Feature engineering y visualización en producción.',
      '24 KPIs ejecutivos en 36 meses: ARR, CAC, LTV, NRR, pipeline de ventas y funnel de marketing para liderazgo financiero.',
      'Tres dashboards HTML profesionales (Finance, Marketing, Retail Analytics) listos para embeber en Power BI (HTML Viewer) y Tableau (Web Page).',
      'Modelo de Regresión Logística con 81.4% accuracy y AUC 0.881. Identifica los drivers clave de abandono de clientes.',
      'Motor algorítmico de Revenue Management: optimiza ADR y RevPAR usando estacionalidad, eventos locales y presión de ocupación.',
      'Empresa de consultoría IA autónoma: 5 agentes Claude especializados, 4 workflows n8n y orquestación con Paperclip.',
      'Vista interactiva (read-only) de los workflows n8n y los agentes Claude que operan Consultoría Tech 24/7. Nodos explorables paso a paso.',
      'Sitio corporativo bilingüe de Consultoría Tech desplegado en Firebase: landing + tres líneas de servicio (AI Strategy, Digital Build, Smart Automation) con captación de leads. React + Vite.',
      '5 queries analíticas SQL sobre 10.000 registros: regiones más rentables, vendedores top, estacionalidades y productos con bajo margen. Listo para Power BI/Tableau.',
      'Web app vanilla JS con KPIs en tiempo real (ADR, RevPAR, Occupancy) + simulador de pricing interactivo con 5 parámetros. Canvas API, sin frameworks.',
      'Stack defensivo de ciberseguridad aplicada (ISC2 CC): SIEM simulado que detecta fuerza bruta sobre 5.000 logs + escáner de vulnerabilidades estilo Nmap con reporte Markdown.',
      'Escáner de vulnerabilidades estilo Nmap construido en Python: detección de puertos abiertos, fingerprinting de servicios y reporte Markdown automático. ISC2 CC aplicada.',
      'Este mismo portafolio: SPA React 19 + Vite desplegada en Firebase Hosting con 15 proyectos interactivos, soporte ES/EN y navegación dinámica.',
      'SaaS en desarrollo: plataforma para construir y desplegar agentes IA especializados sin código. Stack React + Firebase + n8n + Claude API.',
      'Motor Python que automatiza la cotización de licitaciones públicas chilenas (Mercado Público): parsea la licitación, casa ítems con el catálogo y exporta un Excel/PDF con precios. Web React + Firebase. En desarrollo.',
    ],
  },
  en: {
    badge:   'The technical half of Mindset & Code',
    role:    'Data & BI · AI & automation · Custom development · Spain and Chile',
    tagline: 'This is the workshop. Every project below is published with its code and its data, and backs a service you can hire at mindset-code.com. If any of it is useful to you, it gets built on your own data.',
    cta1: 'See services →', cta2: 'Fixed-price engagements', cta3: 'GitHub',
    stats: [
      { num: '16',   lbl: 'Published projects' },
      { num: '14',   lbl: 'Public repos' },
      { num: '7',    lbl: 'Live demos' },
      { num: '24 h', lbl: 'Business-day reply' },
      { num: '2',    lbl: 'Spain and Chile' },
    ],
    careerTitle: 'Where the judgement comes from',
    careerDesc:  'Ten years running commercial operations and a second, technical career building the software that supports them. Both halves of a business, at the same table.',
    careerCards: [
      {
        icon: 'trending-up',
        color: '#6fae8c',
        title: 'Commercial leadership (10+ years)',
        body: 'Sales Operations, Revenue Operations and commercial strategy in high-complexity B2B environments.',
        bullets: [
          'Procter & Gamble / BGR — regional team of 100+ people',
          '+18% quota expansion · +28% forecasting accuracy',
          'El Mercurio — RevOps funnel redesign, +2% e-commerce revenue',
        ],
      },
      {
        icon: 'wrench',
        color: '#7ea6d4',
        title: 'Data engineering and product',
        body: 'The software now sold as a service: built, deployed and published.',
        bullets: [
          'Public portfolio with 16 deployed projects',
          'Data Engineering · Algorithmic Revenue Management',
          'Machine Learning · Cybersecurity · Web development',
        ],
      },
      {
        icon: 'bot',
        color: '#9aa9c8',
        title: 'AI stack as daily routine',
        body: 'Tools I use every day to design, build and operate solutions.',
        stack: ['Claude Code', 'Antigravity', 'Claude Cowork', 'OpenClaw', 'n8n', 'Linear', 'Power BI (DAX, RLS)', 'SQL', 'Python (Pandas, Scikit-learn, XGBoost)', 'React', 'Firebase', 'ETL', 'REST APIs', 'Agentic AI', 'LLM fine-tuning'],
      },
    ],
    projectsTitle: 'What is already built',
    projectsDesc:  'Sixteen end-to-end projects with published code: data and BI, machine learning, revenue management, web, cybersecurity and AI automation. Seven with a live demo, and each one links to the service that delivers it.',
    viewBtn:     'View →',
    casesLink:   'See the eight full case studies →',
    skillsTitle: 'Tech Stack',
    aboutTitle:  'Who is behind this',
    aboutP1: 'Mindset & Code. Ten years in commercial and revenue operations (Procter & Gamble, El Mercurio) and a second technical career in data, AI and development. On the tax side: registered social collaborator with the Spanish tax agency and authorised to operate before the Chilean SII on the client\u2019s behalf.',
    aboutP2: 'This portfolio is the technical half of Mindset & Code: the full data lifecycle, from ETL pipelines to executive dashboards and predictive models. One example of end-to-end automation is',
    aboutP2b: ', an operation run by AI agents, n8n and Paperclip 24/7.',
    availTitle: 'How to hire',
    availItems: [
      '✓  Engagements with scope, price and deadline agreed in writing',
      '✓  First 60-minute call, free and with no salesperson involved',
      '✓  Reply in under 24 business hours, always in writing',
      '✓  Spain and Chile, with the same person throughout',
    ],
    eduTitle:  'Education',
    certTitle: 'Licenses & Certifications',
    currentProjectTitle: 'Current project',
    consultoriaTechDesc: 'Consultoría Tech: autonomous AI consultancy with specialized Claude agents managing sales, development, marketing and operations. Orchestrated with n8n and Paperclip as the central nervous system.',
    consultoriaTechBadge: 'AI Automation · In progress',
    consultoriaTechStats: [
      { num: '5',    lbl: 'AI Agents' },
      { num: '4',    lbl: 'n8n Workflows' },
      { num: '24/7', lbl: 'Autonomous op.' },
    ],
    skillCats: [
      'Languages & Data',
      'Business Intelligence',
      'Data Engineering',
      'Revenue & Growth Analytics',
      'Web & Cloud',
      'AI & Automation',
      'AI Engineering',
      'Cybersecurity',
      'DevOps & PM',
    ],
    projectDescs: [
      'Immersive 3D website for a burger restaurant: real interactive GLB models, GSAP ScrollTrigger animations and a cinematic hero. Built with React + Three.js (R3F).',
      'ETL pipeline integrating 9,800 sales transactions with daily temperature data from US cities. Feature engineering and production-ready visualization.',
      '24 executive KPIs over 36 months: ARR, CAC, LTV, NRR, sales pipeline and marketing funnel for financial leadership.',
      'Three professional HTML dashboards (Finance, Marketing, Retail Analytics) ready to embed in Power BI (HTML Viewer) and Tableau (Web Page).',
      'Logistic Regression model with 81.4% accuracy and AUC 0.881. Identifies key drivers of customer churn.',
      'Algorithmic Revenue Management engine: optimizes ADR and RevPAR using seasonality, local events and occupancy pressure.',
      'Autonomous AI consulting company: 5 specialized Claude agents, 4 n8n workflows and Paperclip orchestration.',
      'Interactive (read-only) view of the n8n workflows and Claude agents that operate Consultoría Tech 24/7. Step-by-step explorable nodes.',
      'Bilingual corporate website for Consultoría Tech deployed on Firebase: landing + three service lines (AI Strategy, Digital Build, Smart Automation) with lead capture. React + Vite.',
      '5 analytical SQL queries on 10,000 records: most profitable regions, top sellers, seasonality and low-margin products. Power BI/Tableau-ready.',
      'Vanilla JS web app with real-time KPIs (ADR, RevPAR, Occupancy) + interactive pricing simulator with 5 parameters. Canvas API, no frameworks.',
      'Defensive cybersecurity stack applied (ISC2 CC): simulated SIEM detecting brute-force attacks over 5,000 logs + Nmap-style vulnerability scanner with Markdown report.',
      'Nmap-style vulnerability scanner built in Python: open port detection, service fingerprinting and automatic Markdown report generation. ISC2 CC applied.',
      'This very portfolio: React 19 + Vite SPA deployed on Firebase Hosting with 15 interactive projects, ES/EN support and dynamic navigation.',
      'SaaS in development: platform to build and deploy specialized AI agents without code. Stack: React + Firebase + n8n + Claude API.',
      'Python engine that automates Chilean public-tender quoting (Mercado Público): parses the tender, matches line items to a catalog and exports a priced Excel/PDF. React + Firebase web. In development.',
    ],
  },
}

/* ── Skills ────────────────────────────────────────────────────────────────── */
const SKILL_ITEMS  = [
  ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'HTML / CSS / JS'],
  ['Power BI', 'Tableau', 'Advanced Excel', 'Executive Dashboards', 'KPIs & OKRs'],
  ['Pipelines ETL', 'Data Modeling', 'JSON APIs', 'Node.js', 'Git / GitHub'],
  ['ARR / MRR', 'CAC & LTV', 'NRR & Churn', 'RevPAR / ADR', 'Pipeline & Funnel'],
  ['React', 'Vite', 'Firebase', 'Three.js / R3F', 'GSAP', 'WebGL'],
  ['Claude API', 'n8n', 'Paperclip', 'Agentic AI', 'LLM Orchestration'],
  ['LangChain', 'RAG', 'Vector DBs', 'Prompt Engineering', 'MLOps', 'Claude Code'],
  ['ISC2 CC', 'SIEM', 'OWASP Top 10', 'Google Cybersecurity', 'Nmap'],
  ['Linear', 'Git / GitHub', 'Firebase Hosting', 'Google Cloud', 'CI/CD'],
]
const SKILL_COLORS = ['#7ea6d4','#6fae8c','#7ea6d4','#d0a458','#6fae8c','#c2a98b','#e879f9','#cc6f6a','#9aa9c8']

/* ── Projects ──────────────────────────────────────────────────────────────── */
const PROJECTS = [
  { to:'https://burger-house-3d.web.app', external:true, icon:'burger', color:'#b98436', title:'Burger House — Web 3D', category:'Creative Web · 3D', techs:['Three.js','R3F','GSAP','React'] },
  { to:'/etl',         external:false, icon:'cog', color:'#7ea6d4', title:'Sales & Weather ETL',           category:'Data Engineering',   techs:['Python','Pandas','React','Firebase'] },
  { to:'/executive',   external:false, icon:'chart-bar', color:'#6fae8c', title:'Executive Dashboard 360°',      category:'BI & RevOps',         techs:['Python','Pandas','React','Recharts'] },
  { to:'/dashboards',  external:false, icon:'trending-up', color:'#4f9273', title:'Dashboards Power BI & Tableau', category:'BI Embed',           techs:['HTML','React','Power BI','Tableau'] },
  { to:'/churn',       external:false, icon:'flask', color:'#9aa9c8', title:'Predictive Churn Analysis',     category:'Data Science',        techs:['Scikit-learn','Python','Pandas','React'] },
  { to:'/hotel',       external:false, icon:'building', color:'#c98a5c', title:'Hotel Pricing Engine',          category:'Revenue Management', techs:['Python','NumPy','React','Recharts'] },
  { to:'/consultoria-tech',    external:false, icon:'bot', color:'#c2a98b', title:'Consultoría Tech',              category:'AI Automation',      techs:['Claude','n8n','Paperclip','Firebase'] },
  { to:'/automations', external:false, icon:'zap', color:'#8b5cf6', title:{es:'Automatizaciones & Agentes IA',en:'Automations & AI Agents'}, category:'n8n · Paperclip',    techs:['n8n','Paperclip','Claude','React'] },
  { to:'https://consultoria-tech.web.app',                                 external:true, icon:'globe', color:'#06b6d4', title:'Consultoría Tech Corporate', category:'Corporate Web',      techs:['React','Vite','Firebase'] },
  { to:'https://github.com/mindset-code/project-sales-optimization-sql',   external:true, icon:'database', color:'#38bdf8', title:'Sales Optimization SQL',   category:'SQL & BI',           techs:['SQL','GROUP BY','Power BI','Tableau'] },
  { to:'https://github.com/mindset-code/project-revenue-management-web',   external:true, icon:'lightbulb', color:'#d0a458', title:'Revenue Management Web',   category:'Web Development',     techs:['HTML','CSS','Vanilla JS','Canvas API'] },
  { to:'https://github.com/mindset-code/project-security-log-analysis',    external:true, icon:'shield', color:'#cc6f6a', title:'Security Log Analysis + Scanner', category:{es:'Ciberseguridad',en:'Cybersecurity'},      techs:['Python','SIEM','ISC2 CC','Nmap'] },
  { to:'https://github.com/mindset-code/project-vulnerability-scanner',    external:true, icon:'search', color:'#c07a45', title:'Vulnerability Scanner',            category:{es:'Ciberseguridad',en:'Cybersecurity'},      techs:['Python','Nmap','ISC2 CC','Markdown'] },
  { to:'https://github.com/mindset-code/project-portfolio',                external:true, icon:'folder', color:'#a9b6c5', title:{es:'Portafolio Profesional GUG',en:'Professional Portfolio (GUG)'},       category:'Web · React · Firebase', techs:['React','Vite','Firebase','Linear'] },
  { to:'https://github.com/mindset-code/agentforge',                       external:true, icon:'building-2', color:'#6366f1', title:'AgentForge',                        category:'SaaS · AI Agents',       techs:['React','Firebase','n8n','Claude'] },
  { to:'https://github.com/mindset-code/Proyecto-Licitaciones-Publicas-automatizadas', external:true, icon:'clipboard', color:'#14b8a6', title:'LicitaBot',                         category:'GovTech · SaaS',         techs:['Python','React','Firebase','n8n'] },
]

/* ── Education ─────────────────────────────────────────────────────────────── */
const EDU = [
  { org:'Indiana Tech', title:'MBA', sub:{ es:'Master in Business Administration', en:'Master in Business Administration' } },
  { org:'Indiana Tech', title:'Graduate Certificate in Business Analytics', sub:{ es:'Análisis de datos orientado a decisiones de negocio', en:'Data-driven business decision making' } },
]

/* ── Certifications ────────────────────────────────────────────────────────── */
const CERTS = [
  { org:'ISC2',                  color:'#9aa9c8', name:'Certified in Cybersecurity (CC)',              date:'Sep 2024',  id:'f83ec23e' },
  { org:'IBM',                   color:'#7ea6d4', name:'Generative AI Engineering',                    date:'2025',      id:'IBM-GAIE'  },
  { org:'IBM',                   color:'#7ea6d4', name:'Full Stack Software Developer',                date:'Aug 2024',  id:'c845625d' },
  { org:'IBM',                   color:'#7ea6d4', name:'DevOps and Software Engineering',              date:null,        id:'7Z2FU9C6' },
  { org:'Google',                color:'#6fae8c', name:'Google Cybersecurity',                         date:'Aug 2024',  id:'M0JCAKMI' },
  { org:'Google',                color:'#6fae8c', name:'Google IT Support',                            date:'Sep 2024',  id:'XYFRQ9AI' },
  { org:'ESSEC Business School', color:'#d0a458', name:'Hotel Management: Revenue & Demand Management',date:'Aug 2025',  id:'TDEGVC60' },
  { org:'Univ. of Illinois',     color:'#c2a98b', name:'Digital Marketing',                            date:'Sep 2020',  id:'CQ2UHRF2' },
]

/* ── Org Logo SVGs ─────────────────────────────────────────────────────────── */
function OrgLogo({ org }) {
  const ff = "system-ui,-apple-system,'Segoe UI',sans-serif"
  if (org === 'Google') return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
  if (org === 'IBM') return (
    <svg viewBox="0 0 50 21" width="46" height="20" aria-label="IBM">
      {/* IBM classic 8-stripe logo — I, B, M in #3b6290 */}
      {/* Stripe Y positions: 0, 2.7, 5.4, 8.1, 10.8, 13.5, 16.2, 18.9 */}
      {/* --- I (x:0, w:7) --- */}
      {[0,2.7,5.4,8.1,10.8,13.5,16.2,18.9].map((y,i)=><rect key={`i${i}`} x="0"  y={y} width="7"  height="1.5" fill="#3b6290"/>)}
      {/* --- B full rows 0,1,3,4,6,7 (x:9, w:16); short rows 2,5 (w:12) --- */}
      {[0,2.7,8.1,10.8,16.2,18.9].map((y,i)=><rect key={`bf${i}`} x="9"  y={y} width="16" height="1.5" fill="#3b6290"/>)}
      {[5.4,13.5].map((y,i)=>                 <rect key={`bs${i}`} x="9"  y={y} width="12" height="1.5" fill="#3b6290"/>)}
      {/* --- M left leg (x:27, w:6) all rows --- */}
      {[0,2.7,5.4,8.1,10.8,13.5,16.2,18.9].map((y,i)=><rect key={`ml${i}`} x="27" y={y} width="6"  height="1.5" fill="#3b6290"/>)}
      {/* --- M top connector (x:33, w:11) rows 0,1 only --- */}
      {[0,2.7].map((y,i)=>                             <rect key={`mc${i}`} x="33" y={y} width="11" height="1.5" fill="#3b6290"/>)}
      {/* --- M right leg (x:44, w:6) all rows --- */}
      {[0,2.7,5.4,8.1,10.8,13.5,16.2,18.9].map((y,i)=><rect key={`mr${i}`} x="44" y={y} width="6"  height="1.5" fill="#3b6290"/>)}
    </svg>
  )
  if (org === 'ISC2') return (
    <svg viewBox="0 0 32 36" width="26" height="30" aria-label="ISC2">
      <path d="M16 1L3 7v12c0 7.5 5.5 14.5 13 16 7.5-1.5 13-8.5 13-16V7L16 1z" fill="#3b6290"/>
      <text x="16" y="22.5" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="800" fontFamily={ff}>ISC²</text>
    </svg>
  )
  if (org === 'ESSEC Business School') return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-label="ESSEC Business School">
      <rect width="32" height="32" rx="6" fill="#002855"/>
      <text x="16" y="15" textAnchor="middle" fill="#C9A84C" fontSize="9" fontWeight="800" fontFamily={ff}>ESSEC</text>
      <text x="16" y="26" textAnchor="middle" fill="white" fontSize="6" fontFamily={ff}>Business School</text>
    </svg>
  )
  if (org === 'Univ. of Illinois') return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-label="University of Illinois">
      <rect width="32" height="32" rx="6" fill="#13294B"/>
      <text x="16" y="22" textAnchor="middle" fill="#E84A27" fontSize="22" fontWeight="900" fontFamily={ff}>I</text>
    </svg>
  )
  if (org === 'Indiana Tech') return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-label="Indiana Institute of Technology">
      {/* LinkedIn logo: dark crimson bg, INDIANA white thin, TECH orange bold */}
      <rect width="32" height="32" rx="5" fill="#111111"/>
      <text x="16" y="14" textAnchor="middle" fontFamily={ff} fontSize="6.5" fontWeight="300" fill="#ffffff" letterSpacing="0.6">INDIANA</text>
      <text x="16" y="24" textAnchor="middle" fontFamily={ff} fontSize="9"   fontWeight="800" fill="#F07820">TECH</text>
    </svg>
  )
  return <span style={{ fontSize: '1.1rem' }}>{org[0]}</span>
}

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <div className="home-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-avatar"><img src="/operador.jpg" alt="Mindset & Code" width="116" height="116" /></div>
        <div className="home-hero-body">
          <div className="home-hero-top">
            <span className="home-hero-badge">{t.badge}</span>
          </div>
          <h1 className="home-name">Mindset & Code</h1>
          <p className="home-hero-role">{t.role}</p>
          <p className="home-hero-tagline">{t.tagline}</p>
          <div className="home-ctas">
            <a href="https://mindset-code.com/es" target="_blank" rel="noreferrer" className="home-cta-primary">{t.cta1}</a>
            <a href="https://mindset-code.com/es/express" target="_blank" rel="noreferrer" className="home-cta-secondary">{t.cta2}</a>
            <a href="https://github.com/mindset-code" target="_blank" rel="noreferrer" className="home-cta-secondary">{t.cta3}</a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="home-stats-row">
        {t.stats.map(({ num, lbl }) => (
          <div key={lbl} className="home-stat-box">
            <span className="home-stat-num">{num}</span>
            <span className="home-stat-lbl">{lbl}</span>
          </div>
        ))}
      </section>

      {/* ── Career ───────────────────────────────────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section-title home-section-title-center">{t.careerTitle}</h2>
        <p className="home-section-desc">{t.careerDesc}</p>
        <div className="home-career-grid">
          {t.careerCards.map(card => (
            <div key={card.title} className="home-career-card" style={{ '--card-color': card.color }}>
              <div className="home-career-head">
                <span className="home-career-icon"><Icon name={card.icon} /></span>
                <h3 className="home-career-title">{card.title}</h3>
              </div>
              <p className="home-career-body">{card.body}</p>
              {card.bullets && (
                <ul className="home-career-list">
                  {card.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              )}
              {card.stack && (
                <div className="home-career-chips">
                  {card.stack.map(s => <span key={s} className="home-career-chip">{s}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section-title home-section-title-center">{t.projectsTitle}</h2>
        <p className="home-section-desc">{t.projectsDesc}</p>
        <div className="home-projects-grid">
          {PROJECTS.map(({ to, external, icon, color, title, category, techs }, i) => {
            const cardBody = (
              <>
                <div className="home-project-top">
                  <span className="home-project-icon"><Icon name={icon} /></span>
                  <span className="home-project-badge" style={{ color, background: color+'18', border:`1px solid ${color}40` }}>{L(category, lang)}</span>
                </div>
                <h3 className="home-project-title">{L(title, lang)}</h3>
                <p className="home-project-desc">{t.projectDescs[i]}</p>
                <div className="home-project-footer">
                  <div className="home-project-techs">{techs.map(tech => <span key={tech} className="home-project-tech">{tech}</span>)}</div>
                  <span className="home-project-link">{external ? 'GitHub ↗' : t.viewBtn}</span>
                </div>
              </>
            )
            return external
              ? <a key={to} href={to} target="_blank" rel="noreferrer" className="home-project-card" style={{ '--card-color': color }}>{cardBody}</a>
              : <Link key={to} to={to} className="home-project-card" style={{ '--card-color': color }}>{cardBody}</Link>
          })}
        </div>
        <p className="home-section-desc" style={{ marginTop: '1.75rem' }}>
          <Link to="/portfolio" className="home-inline-link">{t.casesLink}</Link>
        </p>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section-title">{t.skillsTitle}</h2>
        <div className="home-skills-grid">
          {SKILL_ITEMS.map((items, i) => (
            <div key={i} className="home-skill-group">
              <h3 className="home-skill-cat" style={{ color: SKILL_COLORS[i] }}>{t.skillCats[i]}</h3>
              <div className="home-skill-pills">
                {items.map(s => <span key={s} className="home-skill-pill" style={{ borderColor: SKILL_COLORS[i]+'30' }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About + Education + Certs ────────────────────────────────────── */}
      <section className="home-section home-about-grid">

        {/* About + Availability */}
        <div className="home-about-col">
          <h2 className="home-section-title">{t.aboutTitle}</h2>
          <p className="home-about-p">{t.aboutP1}</p>
          <p className="home-about-p">
            {t.aboutP2}{' '}
            <Link to="/consultoria-tech" className="home-inline-link">Consultoría Tech</Link>
            {t.aboutP2b}
          </p>
          <div className="home-avail-box">
            <p className="home-avail-title">{t.availTitle}</p>
            {t.availItems.map(item => <p key={item} className="home-avail-item">{item}</p>)}
          </div>

          {/* Consultoría Tech project card */}
          <div className="home-ctech-card">
            <div className="home-ctech-header">
              <span className="home-ctech-icon"><Icon name="bot" /></span>
              <div>
                <Link to="/consultoria-tech" className="home-ctech-link">Consultoría Tech</Link>
                <span className="home-ctech-badge">{t.consultoriaTechBadge}</span>
              </div>
            </div>
            <p className="home-ctech-desc">{t.consultoriaTechDesc}</p>
            <div className="home-ctech-stats">
              {t.consultoriaTechStats.map(({ num, lbl }) => (
                <div key={lbl} className="home-ctech-stat">
                  <span className="home-ctech-stat-num">{num}</span>
                  <span className="home-ctech-stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>
            <div className="home-ctech-techs">
              {['Claude', 'n8n', 'Paperclip', 'Firebase', 'React'].map(tech => (
                <span key={tech} className="home-ctech-tech">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Education + Certifications */}
        <div className="home-about-col">
          <h2 className="home-section-title">{t.eduTitle}</h2>
          {EDU.map(({ org, title, sub }) => (
            <div key={title} className="home-edu-item">
              <span className="home-edu-icon"><OrgLogo org={org} /></span>
              <div>
                <p className="home-edu-title">{title}</p>
                <p className="home-edu-sub">{sub[lang]}</p>
              </div>
            </div>
          ))}

          <h2 className="home-section-title" style={{ marginTop: '1.75rem' }}>{t.certTitle}</h2>
          <div className="home-certs-grid">
            {CERTS.map(({ org, color, name, date, id }) => (
              <div key={id} className="home-cert-card">
                <div className="home-cert-header">
                  <span className="home-cert-icon"><OrgLogo org={org} /></span>
                  <span className="home-cert-org" style={{ color }}>{org}</span>
                </div>
                <p className="home-cert-name">{name}</p>
                {date && <p className="home-cert-date">{date}</p>}
              </div>
            ))}
          </div>
        </div>

      </section>

      <BusinessCta
        service={null}
        title={{
          es: '¿Quieres esta mitad funcionando en tu empresa?',
          en: 'Want this half running in your company?',
        }}
        body={{
          es: 'Todo lo de arriba está publicado y se puede leer entero. Lo que se contrata es el equivalente con tus datos, con alcance, precio y plazo cerrados por escrito.',
          en: 'Everything above is published and can be read in full. What you hire is the equivalent built on your data, with scope, price and deadline agreed in writing.',
        }}
      />

      <PortfolioFooter />
    </div>
  )
}
