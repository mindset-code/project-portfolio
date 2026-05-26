import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

const INTERNAL = [
  { to: '/etl',         label: 'Sales & Weather ETL',           badge: 'Data Engineering',   icon: '⚙️', color: '#60a5fa' },
  { to: '/executive',   label: 'Executive Dashboard 360°',      badge: 'BI & RevOps',        icon: '📊', color: '#34d399' },
  { to: '/churn',       label: 'Churn Analysis',                badge: 'Data Science',       icon: '🔬', color: '#a78bfa' },
  { to: '/hotel',       label: 'Hotel Pricing Engine',          badge: 'Revenue Management', icon: '🏨', color: '#fb923c' },
  { to: '/ia-digox',    label: 'Consultoría Tech',              badge: 'AI Automation',      icon: '🤖', color: '#f472b6' },
  { to: '/automations', label: 'Automatizaciones',              badge: 'n8n · Paperclip',    icon: '⚡', color: '#a78bfa' },
  { to: '/dashboards',  label: 'Dashboards Power BI / Tableau', badge: 'BI Embed',           icon: '📈', color: '#10b981' },
]

const EXTERNAL = [
  { to: 'https://consultoria-tech.web.app',                                 label: 'Consultoría Tech Corporate', badge: 'Corporate Web',      icon: '🌐', color: '#06b6d4' },
  { to: 'https://github.com/mindset-code/project-sales-optimization-sql',  label: 'Sales Optimization SQL',     badge: 'SQL & BI',           icon: '🗄️', color: '#38bdf8' },
  { to: 'https://github.com/mindset-code/project-revenue-management-web',  label: 'Revenue Management Web',     badge: 'Web Development',    icon: '💡', color: '#fbbf24' },
  { to: 'https://github.com/mindset-code/project-security-log-analysis',   label: 'Security Log Analysis',      badge: 'Ciberseguridad',     icon: '🛡️', color: '#ef4444' },
  { to: 'https://github.com/mindset-code/project-vulnerability-scanner',   label: 'Vulnerability Scanner',      badge: 'Ciberseguridad',     icon: '🔍', color: '#f97316' },
  { to: 'https://github.com/mindset-code/project-portfolio',               label: 'Portafolio Profesional',     badge: 'React · Firebase',   icon: '🗂️', color: '#94a3b8' },
  { to: 'https://github.com/mindset-code/agentforge',                      label: 'AgentForge',                 badge: 'SaaS · AI Agents',   icon: '🏗️', color: '#6366f1' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { lang, toggleLang } = useLang()

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="navbar" ref={ref}>
      <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
        <span className="navbar-name">Mindset & Code</span>
        <span className="navbar-role">Data &amp; BI Analyst</span>
      </NavLink>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-home-link${isActive ? ' nav-home-link--active' : ''}`}
          onClick={() => setOpen(false)}
        >
          Inicio
        </NavLink>

        <button
          className={`nav-trigger${open ? ' nav-trigger--open' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <span className="nav-trigger-label">Proyectos</span>
          <svg className="nav-trigger-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button className="lang-toggle nav-lang-toggle" onClick={toggleLang}>
          {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
        </button>
      </div>

      {open && (
        <div className="nav-dropdown">
          <div className="nav-dropdown-section-label">Dashboard interactivo</div>
          {INTERNAL.map(({ to, label, badge, icon, color }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-dropdown-item${isActive ? ' nav-dropdown-item--active' : ''}`
              }
              style={({ isActive }) => isActive ? { '--item-color': color } : {}}
              onClick={() => setOpen(false)}
            >
              <span className="nav-item-icon">{icon}</span>
              <div className="nav-item-text">
                <span className="nav-item-label">{label}</span>
                <span className="nav-item-badge" style={{ color }}>{badge}</span>
              </div>
              <svg className="nav-item-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3.5 3.5 5.5-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </NavLink>
          ))}

          <div className="nav-dropdown-divider" />
          <div className="nav-dropdown-section-label">GitHub / Web</div>
          {EXTERNAL.map(({ to, label, badge, icon, color }) => (
            <a
              key={to}
              href={to}
              target="_blank"
              rel="noreferrer"
              className="nav-dropdown-item nav-dropdown-item--external"
              style={{ '--item-color': color }}
              onClick={() => setOpen(false)}
            >
              <span className="nav-item-icon">{icon}</span>
              <div className="nav-item-text">
                <span className="nav-item-label">{label}</span>
                <span className="nav-item-badge" style={{ color }}>{badge}</span>
              </div>
              <svg className="nav-item-ext" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 9L9 2M9 2H4M9 2V7" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
