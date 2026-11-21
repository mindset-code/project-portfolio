import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { MARCA, SERIE, CAJA_PROPS, leyenda } from '../../tema/graficos'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const COLORS = { Inbound: SERIE[0], Outbound: SERIE[1], Partners: SERIE[2], Direct: SERIE[3] }

export default function RevenueByChannel({ data }) {
  if (!data) return null

  // Last 3 months aggregate
  const months = [...new Set(data.map(d => d.month))].sort().slice(-3)
  const totals  = {}
  data.filter(d => months.includes(d.month)).forEach(({ channel, revenue }) => {
    totals[channel] = (totals[channel] || 0) + revenue
  })
  const rows = Object.entries(totals).map(([channel, revenue]) => ({ channel, revenue }))

  return (
    <div className="card">
      <h2>Revenue by Channel</h2>
      <p className="card-desc">Last 3 months — Inbound · Outbound · Partners · Direct</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={rows} dataKey="revenue" nameKey="channel" cx="50%" cy="50%"
            outerRadius={95} innerRadius={48} paddingAngle={3}>
            {rows.map(({ channel }) => <Cell key={channel} fill={COLORS[channel] || MARCA.linea} />)}
          </Pie>
          <Tooltip
            formatter={(v) => [fmt(v), 'Revenue']}
            {...CAJA_PROPS}
          />
          <Legend formatter={leyenda(12)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
