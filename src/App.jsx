import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider }   from './contexts/LangContext'
import Navbar             from './components/Navbar'
import HomePage           from './pages/HomePage'
import './App.css'

// Heavy routes (Recharts, dashboards) are code-split so they don't bloat the
// initial bundle — each loads only when its route is visited.
const EtlDashboard         = lazy(() => import('./pages/EtlDashboard'))
const ExecutiveDashboard   = lazy(() => import('./pages/ExecutiveDashboard'))
const ChurnDashboard       = lazy(() => import('./pages/ChurnDashboard'))
const HotelDashboard       = lazy(() => import('./pages/HotelDashboard'))
const IaDigoxPage          = lazy(() => import('./pages/IaDigoxPage'))
const AutomationsPage      = lazy(() => import('./pages/AutomationsPage'))
const DashboardsPage       = lazy(() => import('./pages/DashboardsPage'))
const PortfolioIndexPage   = lazy(() => import('./pages/PortfolioIndexPage'))
const PortfolioProjectPage = lazy(() => import('./pages/PortfolioProjectPage'))

const ETL_FILES = [
  'sales_by_category', 'monthly_revenue', 'sales_by_temp',
  'sales_by_region', 'sales_weekend_vs_weekday', 'temp_vs_sales_scatter',
]

function EtlLoader() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all(
      ETL_FILES.map(f =>
        fetch(`/data/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading pipeline data...</div>
  if (error)   return <div className="error">Error loading data: {error}</div>
  return <EtlDashboard data={data} />
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
      <Navbar />
      <Suspense fallback={<div className="loading">Cargando…</div>}>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/etl"       element={<EtlLoader />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/churn"     element={<ChurnDashboard />} />
        <Route path="/hotel"     element={<HotelDashboard />} />
        <Route path="/consultoria-tech"     element={<IaDigoxPage />} />
        <Route path="/automations"  element={<AutomationsPage />} />
        <Route path="/dashboards"   element={<DashboardsPage />} />
        <Route path="/portfolio"    element={<PortfolioIndexPage />} />
        <Route path="/portfolio/:projectId" element={<PortfolioProjectPage />} />
      </Routes>
      </Suspense>
      </LangProvider>
    </BrowserRouter>
  )
}
