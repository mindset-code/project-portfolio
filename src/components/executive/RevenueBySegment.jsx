import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const COLORS = { SMB: '#7ea6d4', 'Mid-Market': '#6fae8c', Enterprise: '#c2a98b' }
const SEGMENTS = ['SMB', 'Mid-Market', 'Enterprise']

export default function RevenueBySegment({ data }) {
  if (!data) return null

  // pivot: month → { SMB, Mid-Market, Enterprise }
  const byMonth = {}
  data.forEach(({ month, segment, revenue }) => {
    if (!byMonth[month]) byMonth[month] = { month }
    byMonth[month][segment] = revenue
  })
  const rows = Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month))
  const display = rows.filter((_, i) => i % 3 === 0 || i === rows.length - 1)

  return (
    <div className="card">
      <h2>Revenue by Segment</h2>
      <p className="card-desc">SMB · Mid-Market · Enterprise — stacked monthly</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={display} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="month" tick={{ fill: '#a9b6c5', fontSize: 10 }} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name]}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{v}</span>} />
          {SEGMENTS.map(seg => (
            <Bar key={seg} dataKey={seg} stackId="a" fill={COLORS[seg]} radius={seg === 'Enterprise' ? [4,4,0,0] : [0,0,0,0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
