import { useState, useEffect } from 'react'
import HeroSection     from '../components/HeroSection'
import PortfolioFooter from '../components/PortfolioFooter'
import BusinessCta     from '../components/BusinessCta'
import { useLang }     from '../contexts/LangContext'

/*  Escaner de vulnerabilidades.
 *
 *  Aqui no hay graficos y es a proposito: lo que se entrega en una auditoria
 *  es una ficha —que se comprobo, que salio y en que orden se arregla—, no
 *  una serie temporal. Cuatro barras de severidad no dirian nada que no diga
 *  el propio recuento.
 *
 *  escaneo.json lo escribe scanner.py. El escaneo es SIMULADO: no sale ni un
 *  paquete a la red. Eso se dice en pantalla, no solo en el codigo, porque
 *  ensennar un informe de puertos abiertos de un tercero sin decir que es
 *  ficticio seria otra cosa muy distinta.
 */

const REPO = 'https://github.com/mindset-code/project-vulnerability-scanner'
const TENUE = '#a9b6c5'

const SEVERIDAD = {
  Critical: { color: '#c9756b', es: 'Crítica', en: 'Critical' },
  High:     { color: '#d08b5c', es: 'Alta',    en: 'High' },
  Medium:   { color: '#d0a458', es: 'Media',   en: 'Medium' },
  Low:      { color: '#7ea6d4', es: 'Baja',    en: 'Low' },
}
const ORDEN = ['Critical', 'High', 'Medium', 'Low']

const T = {
  es: {
    badge: 'Ciberseguridad',
    title: 'Escáner de vulnerabilidades',
    description:
      'Qué puertas tiene abiertas un servidor, qué riesgo concreto trae cada una y en qué orden conviene cerrarlas. Es el paso de reconocimiento y triaje con el que empieza cualquier gestión de vulnerabilidades: descubrir lo que se expone, mapearlo a riesgos conocidos y entregar un plan que operaciones pueda ejecutar.',
    stats: ['Puertos comprobados', 'Abiertos', 'Hallazgos', 'Severidad máxima'],
    cargando: 'Ejecutando el escaneo…',
    error: 'No se ha podido cargar el escaneo',
    aviso: 'Simulación con fines educativos: no se envía ni un paquete a la red y la dirección del objetivo es privada y ficticia. Sirve para demostrar la metodología, no para escanear a nadie.',
    puertos: 'Qué se ha comprobado',
    puertosDesc: 'Los ocho puertos del catálogo, con su veredicto. Un puerto cerrado también es un resultado',
    abierto: 'Abierto',
    cerrado: 'Cerrado',
    hallazgos: 'Qué se ha encontrado',
    hallazgosDesc: 'Ordenado por severidad: así es como se prioriza el trabajo',
    puerto: 'Puerto',
    comoSeArregla: 'Cómo se arregla',
    sinHallazgos: 'El escaneo no ha encontrado ninguna de las vulnerabilidades que este catálogo reconoce.',
    objetivo: 'Objetivo',
    fecha: 'Fecha del escaneo',
    footerCtx: 'Escaneo simulado, sin tráfico de red real ni objetivos de terceros · Python (biblioteca estándar) ·',
  },
  en: {
    badge: 'Cybersecurity',
    title: 'Vulnerability scanner',
    description:
      'Which doors a server leaves open, the specific risk each one carries, and the order in which to close them. This is the reconnaissance-and-triage step every vulnerability-management process starts with: discover what is exposed, map it to known risks and hand ops a plan they can act on.',
    stats: ['Ports checked', 'Open', 'Findings', 'Top severity'],
    cargando: 'Running the scan…',
    error: 'Could not load the scan',
    aviso: 'Educational simulation: not a single packet is sent to the network and the target address is private and fictitious. It demonstrates the methodology; it does not scan anyone.',
    puertos: 'What was checked',
    puertosDesc: 'All eight catalogue ports with their verdict. A closed port is a result too',
    abierto: 'Open',
    cerrado: 'Closed',
    hallazgos: 'What was found',
    hallazgosDesc: 'Sorted by severity: that is how the work gets prioritised',
    puerto: 'Port',
    comoSeArregla: 'How to fix it',
    sinHallazgos: 'The scan found none of the vulnerabilities this catalogue recognises.',
    objetivo: 'Target',
    fecha: 'Scan date',
    footerCtx: 'Simulated scan, no real network traffic and no third-party targets · Python (standard library) ·',
  },
}

export default function ScannerPage() {
  const [d, setD] = useState(null)
  const [error, setError] = useState(null)
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    fetch('/data/scanner/escaneo.json')
      .then(r => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then(setD)
      .catch(e => setError(e.message))
  }, [])

  if (error) return <div className="error">{t.error}: {error}</div>
  if (!d) return <div className="loading">{t.cargando}</div>

  const abiertos = d.ports.filter(p => p.open).length
  const peor = ORDEN.find(s => d.counts[s] > 0)

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href={REPO} target="_blank" rel="noreferrer">project-vulnerability-scanner</a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor={SEVERIDAD.Critical.color}
        title={t.title}
        description={t.description}
        stats={[
          { value: String(d.checked), label: t.stats[0] },
          { value: String(abiertos), label: t.stats[1] },
          { value: String(d.vulnerabilities.length), label: t.stats[2] },
          { value: peor ? SEVERIDAD[peor][lang] : '—', label: t.stats[3] },
        ]}
        techs={['Python', 'Port scanning', 'Triaje de riesgos', 'Nmap (simulado)']}
        githubUrl={REPO}
      />

      <main>
        {/* El aviso va arriba y en el cuerpo de la pagina, no en un pie: quien
            vea una tabla de puertos abiertos tiene que saber en la misma
            pantalla que el host no existe. */}
        <div
          className="card"
          style={{ borderColor: SEVERIDAD.Medium.color + '66', marginBottom: '1rem' }}
        >
          <p className="card-desc" style={{ margin: 0, color: SEVERIDAD.Medium.color }}>
            {t.aviso}
          </p>
          <p className="card-desc" style={{ margin: '0.5rem 0 0' }}>
            {t.objetivo}:{' '}
            <code
              style={{
                background: '#101722',
                border: '1px solid #2c3d50',
                borderRadius: 5,
                padding: '0.08rem 0.4rem',
                color: TENUE,
              }}
            >
              {d.target_ip}
            </code>{' '}
            · {t.fecha}: {d.scanned_at}
          </p>
        </div>

        <div className="grid grid-1">
          <div className="card">
            <h2>{t.puertos}</h2>
            <p className="card-desc">{t.puertosDesc}</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                gap: '0.6rem',
                marginTop: '0.8rem',
              }}
            >
              {d.ports.map(p => (
                <div
                  key={p.port}
                  style={{
                    border: `1px solid ${p.open ? SEVERIDAD.Critical.color + '66' : '#2c3d50'}`,
                    background: p.open ? SEVERIDAD.Critical.color + '14' : 'transparent',
                    borderRadius: 8,
                    padding: '0.6rem 0.7rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'baseline' }}>
                    <strong style={{ color: p.open ? SEVERIDAD.Critical.color : TENUE }}>
                      {t.puerto} {p.port}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: p.open ? SEVERIDAD.Critical.color : TENUE, whiteSpace: 'nowrap' }}>
                      {p.open ? t.abierto : t.cerrado}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: TENUE, marginTop: '0.25rem' }}>
                    {p.service}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-1">
          <div className="card">
            <h2>{t.hallazgos}</h2>
            <p className="card-desc">{t.hallazgosDesc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.8rem 0' }}>
              {ORDEN.filter(s => d.counts[s] > 0).map(s => (
                <span
                  key={s}
                  style={{
                    border: `1px solid ${SEVERIDAD[s].color}`,
                    color: SEVERIDAD[s].color,
                    borderRadius: 999,
                    padding: '0.15rem 0.65rem',
                    fontSize: '0.78rem',
                  }}
                >
                  {SEVERIDAD[s][lang]}: {d.counts[s]}
                </span>
              ))}
            </div>

            {d.vulnerabilities.length === 0 && <p className="card-desc">{t.sinHallazgos}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {d.vulnerabilities.map(v => (
                <div
                  key={`${v.port}-${v.service}`}
                  style={{
                    borderLeft: `3px solid ${SEVERIDAD[v.severity].color}`,
                    background: '#101722',
                    borderRadius: '0 8px 8px 0',
                    padding: '0.7rem 0.9rem',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'baseline' }}>
                    <strong style={{ color: SEVERIDAD[v.severity].color }}>
                      {SEVERIDAD[v.severity][lang]}
                    </strong>
                    <span style={{ color: TENUE, fontSize: '0.85rem' }}>
                      {v.service} · {t.puerto} {v.port}
                    </span>
                  </div>
                  <p style={{ margin: '0.4rem 0 0', fontSize: '0.86rem' }}>
                    {lang === 'es' ? v.description_es : v.description}
                  </p>
                  <p style={{ margin: '0.4rem 0 0', fontSize: '0.86rem', color: TENUE }}>
                    <strong style={{ color: TENUE }}>{t.comoSeArregla}:</strong>{' '}
                    {lang === 'es' ? v.fix_es : v.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BusinessCta service="ia-automatizacion" encargo="auditoria-ia" />
      <PortfolioFooter context={context} />
    </div>
  )
}
