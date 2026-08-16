import {
  RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function WeekendVsWeekday({ data }) {
  if (!data) return null

  const enriched = data.map((d, i) => ({
    ...d,
    fill: i === 0 ? '#6fae8c' : '#7ea6d4',
  }))

  return (
    <div className="card">
      <h2>Weekend vs Weekday</h2>
      <p className="card-desc">Average order value and volume by day type</p>

      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="90%"
          data={enriched}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar dataKey="avg_sales" background={{ fill: '#1a2533' }} cornerRadius={4} />
          <Tooltip
            formatter={(v) => [fmt(v), 'Avg Order Value']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Legend
            formatter={(value) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{value}</span>}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        {enriched.map((d) => (
          <div key={d.day_type} style={{ flex: 1, background: '#101722', borderRadius: 8, padding: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#7b8a9c', marginBottom: 4 }}>{d.day_type}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: d.fill }}>{fmt(d.avg_sales)}</div>
            <div style={{ fontSize: '0.75rem', color: '#4a5b6e' }}>{d.num_orders} orders</div>
          </div>
        ))}
      </div>
    </div>
  )
}
