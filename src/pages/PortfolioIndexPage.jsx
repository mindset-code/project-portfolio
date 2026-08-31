import { Link } from 'react-router-dom'
import { projects, pick } from '../data/projects'
import { useLang } from '../contexts/LangContext'
import Icon from '../components/icons'
import BusinessCta from '../components/BusinessCta'

const T = {
  es: {
    title: 'Fichas técnicas',
    desc: 'Ocho proyectos con el problema que resolvían, la solución aplicada, los hallazgos y el servicio con el que se contrata el equivalente para tu empresa.',
    link: 'Ver la ficha →',
  },
  en: {
    title: 'Case studies',
    desc: 'Eight projects with the problem they solved, the solution applied, the findings and the service that delivers the equivalent for your company.',
    link: 'Open the case study →',
  },
}

export default function PortfolioIndexPage() {
  const { lang } = useLang()
  const t = T[lang]

  const getStackColor = (tech) => {
    if (tech.includes('Python') || tech.includes('SQL') || tech.includes('Pandas') || tech.includes('NumPy')) return '#4f7fae'
    if (tech.includes('React') || tech.includes('HTML5') || tech.includes('CSS3') || tech.includes('JavaScript')) return '#c07a45'
    if (tech.includes('Power BI') || tech.includes('Tableau') || tech.includes('Recharts') || tech.includes('Canvas')) return '#4f9273'
    if (tech.includes('Security') || tech.includes('Cybersecurity')) return '#cc6f6a'
    if (tech.includes('Firebase') || tech.includes('Cloud')) return '#d0a458'
    return '#7b8a9c'
  }

  return (
    <div className="portfolio-index-page">
      <div className="portfolio-index-hero">
        <h1 className="portfolio-index-title">{t.title}</h1>
        <p className="portfolio-index-desc">{t.desc}</p>
      </div>

      <div className="portfolio-index-grid">
        {projects.map(project => (
          <Link
            key={project.id}
            to={`/portfolio/${project.id}`}
            className="portfolio-index-card"
            style={{ '--card-accent': project.accentColor }}
          >
            <div className="portfolio-index-card-header">
              <div className="portfolio-index-card-icon"><Icon name={project.icon} /></div>
              <h3 className="portfolio-index-card-title">{project.title}</h3>
            </div>

            <p className="portfolio-index-card-category">{project.category}</p>

            <div className="portfolio-index-card-metrics">
              <div className="portfolio-index-metric">
                <span className="portfolio-index-metric-label">{pick(project.metrics[0].label, lang)}</span>
                <span className="portfolio-index-metric-value">{pick(project.metrics[0].value, lang)}</span>
              </div>
              <div className="portfolio-index-metric">
                <span className="portfolio-index-metric-label">{pick(project.metrics[1].label, lang)}</span>
                <span className="portfolio-index-metric-value">{pick(project.metrics[1].value, lang)}</span>
              </div>
            </div>

            <div className="portfolio-index-card-techs">
              {project.stack.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="portfolio-index-card-tech"
                  style={{ '--tech-color': getStackColor(tech) }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="portfolio-index-card-tech-more">+{project.stack.length - 3}</span>
              )}
            </div>

            <div className="portfolio-index-card-footer">
              <span className="portfolio-index-card-link">{t.link}</span>
            </div>
          </Link>
        ))}
      </div>

      <BusinessCta service={null} />
    </div>
  )
}
