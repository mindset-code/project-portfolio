import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

// Helper bilingüe: si el valor es objeto {es,en} devuelve el del idioma, si no, el string tal cual
const L = (v, lang) => (v && typeof v === 'object' ? (v[lang] ?? v.es) : v)

const CATEGORIES = [
  {
    label: 'Data & BI',
    icon: '📊',
    color: '#60a5fa',
    items: [
      { to: '/etl',        label: 'Sales & Weather ETL',           badge: 'Data Engineering', icon: '⚙️', color: '#60a5fa', ext: false },
      { to: '/executive',  label: 'Executive Dashboard 360°',      badge: 'BI & RevOps',      icon: '📊', color: '#34d399', ext: false },
      { to: '/dashboards', label: 'Dashboards Power BI / Tableau', badge: 'BI Embed',         icon: '📈', color: '#10b981', ext: false },
    ],
  },
  {
    label: 'Data Science & Revenue',
    icon: '🔬',
    color: '#a78bfa',
    items: [
      { to: '/churn', label: 'Churn Analysis',       badge: 'Data Science',       icon: '🔬', color: '#a78bfa', ext: false },
      { to: '/hotel', label: 'Hotel Pricing Engine', badge: 'Revenue Management', icon: '🏨', color: '#fb923c', ext: false },
    ],
  },
  {
    label: { es: 'AI & Automatización', en: 'AI & Automation' },
    icon: '🤖',
    color: '#f472b6',
    items: [
      { to: '/consultoria-tech',    label: 'Consultoría Tech',            badge: 'AI Automation',  icon: '🤖', color: '#f472b6', ext: false },
      { to: '/automations', label: { es: 'Automatizaciones', en: 'Automations' },            badge: 'n8n · Paperclip', icon: '⚡', color: '#8b5cf6', ext: false },
      { to: 'https://consultoria-tech.web.app',             label: 'Consultoría Tech Corporate', badge: 'Corporate Web',  icon: '🌐', color: '#06b6d4', ext: true },
      { to: 'https://github.com/mindset-code/agentforge',   label: 'AgentForge',                 badge: 'SaaS · AI',      icon: '🏗️', color: '#6366f1', ext: true },
      { to: 'https://github.com/mindset-code/Proyecto-Licitaciones-Publicas-automatizadas', label: 'LicitaBot', badge: 'GovTech · SaaS', icon: '📋', color: '#14b8a6', ext: true },
    ],
  },
  {
    label: 'Web & SQL',
    icon: '💻',
    color: '#fbbf24',
    items: [
      { to: 'https://burger-house-3d.web.app',                          label: 'Burger House — Web 3D',    badge: 'Creative Web · 3D', icon: '🍔', color: '#f59e0b', ext: true },
      { to: 'https://github.com/mindset-code/project-sales-optimization-sql',  label: 'Sales Optimization SQL',   badge: 'SQL & BI',        icon: '🗄️', color: '#38bdf8', ext: true },
      { to: 'https://github.com/mindset-code/project-revenue-management-web',  label: 'Revenue Management Web',   badge: 'Web Development', icon: '💡', color: '#fbbf24', ext: true },
      { to: 'https://github.com/mindset-code/project-portfolio',               label: { es: 'Portafolio Profesional', en: 'Professional Portfolio' },   badge: 'React · Firebase', icon: '🗂️', color: '#94a3b8', ext: true },
    ],
  },
  {
    label: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    icon: '🛡️',
    color: '#ef4444',
    items: [
      { to: 'https://github.com/mindset-code/project-security-log-analysis',  label: 'Security Log Analysis', badge: { es: 'Ciberseguridad', en: 'Cybersecurity' }, icon: '🛡️', color: '#ef4444', ext: true },
      { to: 'https://github.com/mindset-code/project-vulnerability-scanner',  label: 'Vulnerability Scanner', badge: { es: 'Ciberseguridad', en: 'Cybersecurity' }, icon: '🔍', color: '#f97316', ext: true },
    ],
  },
]

function ExtIcon({ color }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(new Set([0]))
  const ref = useRef(null)
  const { lang, toggleLang } = useLang()

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function toggleCat(i) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

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
          {lang === 'es' ? 'Inicio' : 'Home'}
        </NavLink>

        <button
          className={`nav-trigger${open ? ' nav-trigger--open' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <span className="nav-trigger-label">{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
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
          {CATEGORIES.map((cat, i) => {
            const isOpen = expanded.has(i)
            return (
              <div key={i} className="nav-cat">
                <button
                  className={`nav-cat-header${isOpen ? ' nav-cat-header--open' : ''}`}
                  style={{ '--cat-color': cat.color }}
                  onClick={() => toggleCat(i)}
                >
                  <span className="nav-cat-icon">{cat.icon}</span>
                  <span className="nav-cat-label">{L(cat.label, lang)}</span>
                  <span className="nav-cat-count">{cat.items.length}</span>
                  <svg className="nav-cat-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {isOpen && (
                  <div className="nav-cat-items">
                    {cat.items.map(({ to, label, badge, icon, color, ext }) =>
                      ext ? (
                        <a
                          key={to}
                          href={to}
                          target="_blank"
                          rel="noreferrer"
                          className="nav-subitem"
                          style={{ '--item-color': color }}
                          onClick={() => setOpen(false)}
                        >
                          <span className="nav-subitem-icon">{icon}</span>
                          <div className="nav-subitem-text">
                            <span className="nav-subitem-label">{L(label, lang)}</span>
                            <span className="nav-subitem-badge" style={{ color }}>{L(badge, lang)}</span>
                          </div>
                          <ExtIcon color={color} />
                        </a>
                      ) : (
                        <NavLink
                          key={to}
                          to={to}
                          className={({ isActive }) => `nav-subitem${isActive ? ' nav-subitem--active' : ''}`}
                          style={({ isActive }) => isActive ? { '--item-color': color } : { '--item-color': color }}
                          onClick={() => setOpen(false)}
                        >
                          <span className="nav-subitem-icon">{icon}</span>
                          <div className="nav-subitem-text">
                            <span className="nav-subitem-label">{L(label, lang)}</span>
                            <span className="nav-subitem-badge" style={{ color }}>{L(badge, lang)}</span>
                          </div>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="nav-subitem-check">
                            <path d="M2 5.5l2.5 2.5 4.5-5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </nav>
  )
}
