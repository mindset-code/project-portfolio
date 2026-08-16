import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function CacLtvTrend({ data }) {
  if (!data) return null
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>CAC vs LTV</h2>
      <p className="card-desc">Customer acquisition cost vs lifetime value — LTV:CAC ratio</p>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={display} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="month" tick={{ fill: '#a9b6c5', fontSize: 10 }} angle={-30} textAnchor="end" height={38} />
          <YAxis yAxisId="left"  tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v.toFixed(1)}x`} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [name === 'LTV:CAC' ? `${v.toFixed(1)}x` : fmt(v), name]}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{v}</span>} />
          <Bar    yAxisId="left"  dataKey="ltv" name="LTV"     fill="#6fae8c" opacity={0.7} radius={[3,3,0,0]} />
          <Bar    yAxisId="left"  dataKey="cac" name="CAC"     fill="#c2a98b" opacity={0.7} radius={[3,3,0,0]} />
          <Line   yAxisId="right" dataKey="ltv_cac_ratio" name="LTV:CAC" stroke="#d0a458" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
