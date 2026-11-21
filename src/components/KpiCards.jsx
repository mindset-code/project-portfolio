import { MARCA } from '../tema/graficos'
const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const fmtNum = (v) => new Intl.NumberFormat('en-US').format(v)

function KpiCard({ label, value, sub, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}

export default function KpiCards({ category, monthly, weekend }) {
  if (!category || !monthly || !weekend) return null

  const totalRevenue = category.reduce((s, d) => s + d.total_sales, 0)
  const totalOrders = category.reduce((s, d) => s + d.num_orders, 0)
  const avgOrder = totalRevenue / totalOrders
  const topCat = [...category].sort((a, b) => b.total_sales - a.total_sales)[0]
  const peakMonth = [...monthly].sort((a, b) => b.total_sales - a.total_sales)[0]

  return (
    <div className="kpi-grid">
      <KpiCard
        label="Total Revenue"
        value={fmt(totalRevenue)}
        sub="All categories · all years"
        color={MARCA.azul}
      />
      <KpiCard
        label="Total Orders"
        value={fmtNum(totalOrders)}
        sub="Transactions processed"
        color={MARCA.azul}
      />
      <KpiCard
        label="Avg Order Value"
        value={fmt(avgOrder)}
        sub="Revenue per transaction"
        color={MARCA.azul}
      />
      <KpiCard
        label="Top Category"
        value={topCat?.category}
        sub={fmt(topCat?.total_sales) + ' revenue'}
        color={MARCA.azul}
      />
      <KpiCard
        label="Peak Month"
        value={peakMonth?.period}
        sub={fmt(peakMonth?.total_sales) + ' revenue'}
        color={MARCA.azul}
      />
    </div>
  )
}
