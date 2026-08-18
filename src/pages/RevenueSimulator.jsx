import { useEffect, useRef } from 'react'
import HeroSection     from '../components/HeroSection'
import PortfolioFooter from '../components/PortfolioFooter'
import BusinessCta     from '../components/BusinessCta'
import { useLang }     from '../contexts/LangContext'

/*  El simulador de precios, embebido.
 *
 *  A diferencia de las otras demos, esta no se reconstruyo en React: el
 *  proyecto original ya es una web completa de HTML, CSS y JavaScript sin
 *  dependencias, y rehacerla habria significado mantener dos versiones del
 *  mismo calculo con el riesgo de que dejaran de dar el mismo numero. Va tal
 *  cual en un iframe, igual que los tres paneles de /dashboards.
 *
 *  El iframe ademas aisla su hoja de estilos: el simulador trae la suya
 *  completa, con nombres de clase genericos (.container, .header, .footer)
 *  que pisarian los del portafolio si compartieran documento.
 *
 *  Los ficheros de public/demos/revenue/ son copia de
 *  github.com/mindset-code/project-revenue-management-web. Si se toca el
 *  original, hay que volver a copiarlos.
 */

const REPO = 'https://github.com/mindset-code/project-revenue-management-web'

const T = {
  es: {
    badge: 'Revenue Management',
    title: 'Simulador de ingresos',
    description:
      'Las cinco palancas de una estrategia de precios —habitaciones disponibles, precio base, ocupación objetivo, descuento y presión de demanda— convertidas en deslizadores que recalculan ADR, RevPAR e ingreso diario al instante. Sirve para enseñarle a alguien sin perfil técnico qué gana y qué pierde con cada decisión, sin hojas de cálculo de por medio.',
    stats: [
      { value: '5', label: 'Palancas' },
      { value: '0', label: 'Dependencias' },
      { value: '7 d', label: 'Proyección' },
      { value: '< 1 ms', label: 'Recálculo' },
    ],
    idioma:
      'El simulador está en inglés: se publicó así en su repositorio y se embebe tal cual, sin una segunda copia que mantener.',
    abrir: 'Abrir en ventana completa',
    footerCtx:
      'Sin datos de ningún cliente: el cálculo es paramétrico y se ejecuta entero en tu navegador · HTML5, CSS3 y JavaScript sin librerías · gráfico en Canvas 2D ·',
  },
  en: {
    badge: 'Revenue Management',
    title: 'Pricing Simulator',
    description:
      'The five levers of a pricing strategy — available rooms, base rate, target occupancy, discount and demand pressure — turned into sliders that recompute ADR, RevPAR and daily revenue instantly. Built to show a non-technical audience what each decision gains and costs, without a spreadsheet in between.',
    stats: [
      { value: '5', label: 'Levers' },
      { value: '0', label: 'Dependencies' },
      { value: '7 d', label: 'Projection' },
      { value: '< 1 ms', label: 'Recompute' },
    ],
    idioma: '',
    abrir: 'Open full-screen',
    footerCtx:
      'No client data involved: the calculation is parametric and runs entirely in your browser · HTML5, CSS3 and plain JavaScript, no libraries · Canvas 2D chart ·',
  },
}

export default function RevenueSimulator() {
  const { lang } = useLang()
  const t = T[lang]
  const marco = useRef(null)

  /*  El alto del iframe no se puede fijar a ojo. Medido: el simulador ocupa
   *  1.279 px mientras entra en dos columnas y salta a 2.363 px cuando su
   *  maqueta cae a una sola. Con una altura fija, o se corta el panel de
   *  resultados en movil —que es justo donde se lee el efecto de la palanca
   *  que acabas de mover— o queda un hueco de mil pixeles en escritorio.
   *
   *  Se sirve del mismo origen, asi que se puede leer su alto real en vez de
   *  adivinarlo. Si algun dia dejara de serlo, el try deja la altura del
   *  atributo style y el iframe hace su propio scroll: se ve peor, pero no
   *  se rompe. */
  useEffect(() => {
    const el = marco.current
    if (!el) return
    let observador

    const ajustar = () => {
      try {
        const doc = el.contentDocument
        if (!doc?.documentElement) return
        // Encoger antes de medir. scrollHeight nunca devuelve menos que el
        // alto del propio marco, asi que midiendo sin encoger la altura solo
        // puede crecer: al volver de una ventana estrecha —donde el
        // simulador ocupa el doble— a una ancha, se quedaria un hueco muerto
        // de mil pixeles debajo del panel.
        el.style.height = '0px'
        el.style.height = Math.max(doc.documentElement.scrollHeight, 400) + 'px'
      } catch {
        /* otro origen: se queda la altura de respaldo */
      }
    }

    const alCargar = () => {
      ajustar()
      // El alto cambia al redimensionar la ventana, porque a cierto ancho el
      // simulador pasa de dos columnas a una.
      try {
        observador = new ResizeObserver(ajustar)
        observador.observe(el.contentDocument.body)
      } catch {
        /* sin ResizeObserver util: basta el ajuste de la carga */
      }
    }

    el.addEventListener('load', alCargar)
    // Puede haber cargado ya antes de llegar aqui.
    ajustar()

    return () => {
      el.removeEventListener('load', alCargar)
      observador?.disconnect()
    }
  }, [])

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href={REPO} target="_blank" rel="noreferrer">
        project-revenue-management-web
      </a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor="#7ea6d4"
        title={t.title}
        description={t.description}
        stats={t.stats}
        techs={['HTML5', 'CSS3', 'Vanilla JavaScript', 'Canvas 2D', 'Revenue Management']}
        githubUrl={REPO}
      />

      <main>
        <div className="dash-section-actions" style={{ marginBottom: '0.85rem' }}>
          <a
            href="/demos/revenue/index.html"
            target="_blank"
            rel="noreferrer"
            className="dash-open-btn"
            style={{ background: '#7ea6d4' }}
          >
            {t.abrir} ↗
          </a>
        </div>

        <div className="dash-preview">
          {/* Sin loading="lazy": el efecto de arriba mide el contenido en
              cuanto carga, y diferir la carga hasta que el iframe entra en
              pantalla deja el hueco con la altura de respaldo mientras el
              visitante ya esta mirandolo. */}
          <iframe
            ref={marco}
            src="/demos/revenue/index.html"
            title={t.title}
            className="dash-iframe"
            style={{ height: 1300 }}
          />
        </div>

        {t.idioma && (
          <p className="dash-section-desc" style={{ marginTop: '0.75rem' }}>
            {t.idioma}
          </p>
        )}
      </main>

      <BusinessCta service="datos-bi" />
      <PortfolioFooter context={context} />
    </div>
  )
}
