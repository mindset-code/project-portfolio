// Catálogo comercial de Mindset & Code.
// Cada proyecto del portafolio apunta a uno de estos servicios: el portafolio es la
// prueba técnica, y esto es lo que el visitante puede contratar a continuación.

export const SITE = 'https://mindset-code.com/es'
export const EXPRESS_URL = `${SITE}/express`
export const CONTACT_URL = `${SITE}#contact`
export const SERVICES_URL = `${SITE}#services`

export const services = {
  'datos-bi': {
    label: { es: 'Análisis de datos y BI', en: 'Data analytics & BI' },
    url: `${SITE}/services/analisis-datos-bi`,
  },
  'ia-automatizacion': {
    label: { es: 'IA y automatización', en: 'AI & automation' },
    url: `${SITE}/services/ia-automatizacion`,
  },
  desarrollo: {
    label: { es: 'Desarrollo a medida', en: 'Custom development' },
    url: `${SITE}/services/desarrollo-full-stack`,
  },
  web: {
    label: { es: 'Diseño web y e-commerce', en: 'Web design & e-commerce' },
    url: `${SITE}/services/diseno-web`,
  },
  seguridad: {
    label: { es: 'Seguridad', en: 'Security' },
    url: `${SITE}/services/seguridad`,
  },
  cloud: {
    label: { es: 'Arquitectura cloud', en: 'Cloud architecture' },
    url: `${SITE}/services/arquitectura-cloud`,
  },
}

export const encargos = {
  'panel-tesoreria': {
    label: { es: 'Panel de tesorería', en: 'Cash-flow dashboard' },
    url: `${SITE}/encargo/panel-tesoreria`,
  },
  'captura-facturas': {
    label: { es: 'Captura automática de facturas', en: 'Automatic invoice capture' },
    url: `${SITE}/encargo/captura-facturas`,
  },
  'auditoria-ia': {
    label: { es: 'Auditoría de IA', en: 'AI audit' },
    url: `${SITE}/encargo/auditoria-ia`,
  },
  'factura-cloud': {
    label: { es: 'Facturación en la nube', en: 'Cloud invoicing' },
    url: `${SITE}/encargo/factura-cloud`,
  },
  'radar-plazos': {
    label: { es: 'Radar de plazos y notificaciones', en: 'Deadline & notification radar' },
    url: `${SITE}/encargo/radar-plazos`,
  },
}

export const pick = (v, lang) => (v && typeof v === 'object' ? (v[lang] ?? v.es) : v)
