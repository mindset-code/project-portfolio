import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { projectById, pick } from '../data/projects'
import { useLang } from '../contexts/LangContext'
import Icon from '../components/icons'
import BusinessCta from '../components/BusinessCta'
import { IDENTIDAD } from '../identidad'

const T = {
  es: {
    notFoundTitle: 'Proyecto no encontrado',
    notFoundBody: (id) => `Lo sentimos, no pudimos encontrar el proyecto "${id}".`,
    demo: 'Ver demo en vivo',
    problem: 'Problema',
    solution: 'Solución',
    findings: 'Hallazgos clave',
    stack: 'Stack técnico',
    github: '→ Ver en GitHub',
    export: 'Exportar PDF',
  },
  en: {
    notFoundTitle: 'Project not found',
    notFoundBody: (id) => `Sorry, we couldn’t find the project “${id}”.`,
    demo: 'View live demo',
    problem: 'Problem',
    solution: 'Solution',
    findings: 'Key findings',
    stack: 'Tech stack',
    github: '→ View on GitHub',
    export: 'Export PDF',
  },
}

export default function PortfolioProjectPage() {
  const { projectId } = useParams()
  const { lang } = useLang()
  const t = T[lang]
  const project = projectById(projectId)
  // Ruta de la captura que no ha cargado: se muestra la ficha de reserva en
  // vez del icono de imagen rota. Guardar la ruta (y no un booleano) hace que
  // al pasar a otro proyecto se vuelva a intentar sin reiniciar nada.
  const [capturaRota, setCapturaRota] = useState(null)

  if (!project) {
    return (
      <div className="portfolio-error">
        <h1>{t.notFoundTitle}</h1>
        <p>{t.notFoundBody(projectId)}</p>
      </div>
    )
  }

  const findings = pick(project.keyFindings, lang)

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="portfolio-hero-top">
          <span className="portfolio-status-badge">Portfolio</span>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="portfolio-demo-link">
              {t.demo}
            </a>
          )}
        </div>

        <div className="portfolio-hero-main">
          <h1 className="portfolio-title">{project.title}</h1>
          <p className="portfolio-category">{project.category}</p>
          <p className="portfolio-description">{pick(project.description, lang)}</p>

          <div className="portfolio-metrics-grid">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="portfolio-metric-card">
                <div className="portfolio-metric-value">{pick(metric.value, lang)}</div>
                <div className="portfolio-metric-label">{pick(metric.label, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="portfolio-2col">
          <div className="portfolio-left">
            <section className="portfolio-section">
              <h2>{t.problem}</h2>
              <p>{pick(project.problem, lang)}</p>
            </section>

            <section className="portfolio-section">
              <h2>{t.solution}</h2>
              <p>{pick(project.solution, lang)}</p>
            </section>

            <section className="portfolio-section">
              <h2>{t.findings}</h2>
              <ul className="portfolio-findings-list">
                {findings.map((finding, idx) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-section">
              <h2>{t.stack}</h2>
              <div className="portfolio-tech-pills">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="portfolio-tech-pill"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <div className="portfolio-cta-bar">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="portfolio-cta github">
                {t.github}
              </a>
              <button className="portfolio-cta export" onClick={() => window.print()}>
                <Icon name="download" /> {t.export}
              </button>
            </div>
          </div>

          <div className="portfolio-right">
            {project.screenshotPath && capturaRota !== project.screenshotPath ? (
              <div className="portfolio-screenshot">
                <img
                  src={project.screenshotPath}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  onError={() => setCapturaRota(project.screenshotPath)}
                />
              </div>
            ) : (
              <div className="portfolio-screenshot-placeholder" style={{ '--accent': project.accentColor }}>
                <div className="portfolio-placeholder-icon"><Icon name={project.icon} /></div>
                <p>{project.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BusinessCta
        service={project.service}
        encargo={project.encargo}
        body={project.business}
      />

      <footer className="portfolio-footer">
        <p>
          {IDENTIDAD.titular} · webs, IA y datos para pymes y autónomos ·{' '}
          <a href="https://mindset-code.com/es" target="_blank" rel="noreferrer">mindset-code.com</a>
        </p>
      </footer>
    </div>
  )
}
