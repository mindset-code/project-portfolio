import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const COLORS = { Inbound: '#7ea6d4', Outbound: '#c2a98b', Partners: '#6fae8c', Direct: '#d0a458' }

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
            {rows.map(({ channel }) => <Cell key={channel} fill={COLORS[channel] || '#a9b6c5'} />)}
          </Pie>
          <Tooltip
            formatter={(v) => [fmt(v), 'Revenue']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
