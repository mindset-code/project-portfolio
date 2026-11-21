import { useLang } from '../contexts/LangContext'
import { services, encargos, pick, EXPRESS_URL, CONTACT_URL, SERVICES_URL } from '../data/services'
import './BusinessCta.css'

const T = {
  es: {
    kicker: 'Esto, en tu empresa',
    title: '¿Lo quieres funcionando con tus datos?',
    body: 'Lo que estás viendo es una demostración con datos de prueba. La versión de tu negocio se monta con alcance, precio y plazo cerrados por escrito, sin llamada comercial previa.',
    serviceBtn: 'Ver el servicio',
    expressBtn: 'Encargos con precio cerrado',
    callBtn: 'Agendar llamada de 60 min',
    brand: 'Mindset & Code · webs, IA y datos para pymes y autónomos · precio cerrado y por escrito',
  },
  en: {
    kicker: 'This, in your company',
    title: 'Want it running on your own data?',
    body: 'What you are looking at is a demo built on sample data. The version for your business is delivered with scope, price and deadline agreed in writing — no sales call required.',
    serviceBtn: 'See the service',
    expressBtn: 'Fixed-price engagements',
    callBtn: 'Book a 60-min call',
    brand: 'Mindset & Code · websites, AI and data for small businesses and the self-employed · fixed price, in writing',
  },
}

/** Las tres barras de la marca, en claro porque van sobre la tarjeta azul. */
function Mark() {
  return (
    <svg className="bcta-mark" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="5.5" height="20" rx="1.6" fill="#ffffff" />
      <rect x="9.25" y="10" width="5.5" height="12" rx="1.6" fill="#9fc0e6" />
      <rect x="16.5" y="6" width="5.5" height="16" rx="1.6" fill="#dde5ef" />
    </svg>
  )
}

/**
 * Banda de conversión: cierra cada demo con el servicio que la respalda.
 * @param service  clave de `services` (por defecto, datos y BI)
 * @param encargo  clave opcional de `encargos` con precio cerrado
 * @param title    titular alternativo { es, en }
 * @param body     cuerpo alternativo { es, en }
 */
export default function BusinessCta({ service = 'datos-bi', encargo = null, title, body }) {
  const { lang } = useLang()
  const t = T[lang] ?? T.es
  // service === null ⇒ catálogo completo (portada); si no, el servicio que respalda la demo
  const catalogo = service === null
  const svc = catalogo
    ? { label: { es: 'Ver todos los servicios', en: 'See all services' }, url: SERVICES_URL }
    : (services[service] ?? services['datos-bi'])
  const enc = encargo ? encargos[encargo] : null

  return (
    <section className="bcta">
      <div className="bcta-inner">
        <div className="bcta-head">
          <Mark />
          <span className="bcta-kicker">{t.kicker}</span>
        </div>

        <h2 className="bcta-title">{title ? pick(title, lang) : t.title}</h2>
        <p className="bcta-body">{body ? pick(body, lang) : t.body}</p>

        <div className="bcta-actions">
          <a className="bcta-btn bcta-btn--primary" href={svc.url} target="_blank" rel="noreferrer">
            {catalogo ? pick(svc.label, lang) : `${t.serviceBtn}: ${pick(svc.label, lang)}`} ↗
          </a>
          {enc && (
            <a className="bcta-btn bcta-btn--ghost" href={enc.url} target="_blank" rel="noreferrer">
              {pick(enc.label, lang)} ↗
            </a>
          )}
          <a className="bcta-btn bcta-btn--ghost" href={EXPRESS_URL} target="_blank" rel="noreferrer">
            {t.expressBtn} ↗
          </a>
          <a className="bcta-btn bcta-btn--ghost" href={CONTACT_URL} target="_blank" rel="noreferrer">
            {t.callBtn} ↗
          </a>
        </div>

        <p className="bcta-brand">{t.brand}</p>
      </div>
    </section>
  )
}
