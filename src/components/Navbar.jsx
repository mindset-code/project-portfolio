import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

const PROJECTS = [
  { to: '/etl',         label: 'Sales & Weather ETL',           badge: 'Data Engineering',   icon: '⚙️', color: '#60a5fa' },
  { to: '/executive',   label: 'Executive Dashboard 360°',      badge: 'BI & RevOps',        icon: '📊', color: '#34d399' },
  { to: '/churn',       label: 'Churn Analysis',                badge: 'Data Science',       icon: '🔬', color: '#a78bfa' },
  { to: '/hotel',       label: 'Hotel Pricing Engine',          badge: 'Revenue Management', icon: '🏨', color: '#fb923c' },
  { to: '/ia-digox',    label: 'Consultoría Tech',              badge: 'AI Automation',      icon: '🤖', color: '#f472b6' },
  { to: '/automations', label: 'Automatizaciones',              badge: 'n8n · Paperclip',    icon: '⚡', color: '#a78bfa' },
  { to: '/dashboards',  label: 'Dashboards Power BI / Tableau', badge: 'BI Embed',           icon: '📈', color: '#10b981' },
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
          {PROJECTS.map(({ to, label, badge, icon, color }) => (
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
        </div>
      )}
    </nav>
  )
}
