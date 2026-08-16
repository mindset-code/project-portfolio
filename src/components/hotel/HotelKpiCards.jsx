const fmt  = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtD = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
const fmtP = (v) => `${(v * 100).toFixed(1)}%`

function KpiCard({ label, value, sub, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}

export default function HotelKpiCards({ kpis }) {
  if (!kpis) return null
  return (
    <div className="kpi-grid kpi-grid-6">
      <KpiCard label="Avg ADR (30d)"    value={fmtD(kpis.avg_adr)}              sub="Average Daily Rate"       color="#7ea6d4" />
      <KpiCard label="Avg RevPAR (30d)" value={fmtD(kpis.avg_revpar)}           sub="Revenue per avail. room"  color="#6fae8c" />
      <KpiCard label="Avg Occupancy"    value={fmtP(kpis.avg_occupancy)}        sub="Last 30 days"             color="#d0a458" />
      <KpiCard label="Total Revenue"    value={fmt(kpis.total_revenue)}         sub="Last 90 days (all types)" color="#c2a98b" />
      <KpiCard label="Total Rooms"      value={kpis.total_rooms.toLocaleString()} sub="property capacity"      color="#a9b6c5" />
      <KpiCard label="Forecast"         value={`${kpis.forecast_days}d`}        sub="pricing horizon"          color="#9aa9c8" />
    </div>
  )
}
