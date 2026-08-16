import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts'


export default function MarketingFunnel({ data }) {
  if (!data) return null
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>Marketing Funnel</h2>
      <p className="card-desc">MQLs → SQLs → Won — conversion rates & ROAS</p>
      <div className="chart-grid-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={display} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
            <XAxis dataKey="month" tick={{ fill: '#a9b6c5', fontSize: 9 }} angle={-30} textAnchor="end" height={38} />
            <YAxis tick={{ fill: '#a9b6c5', fontSize: 10 }} />
            <Tooltip
              formatter={(v, name) => [v, name]}
              contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
              labelStyle={{ color: '#c4d1e3' }}
            />
            <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 11 }}>{v}</span>} />
            <Bar dataKey="mqls"          name="MQLs"     fill="#7ea6d4" radius={[3,3,0,0]} />
            <Bar dataKey="sqls"          name="SQLs"     fill="#6fae8c" radius={[3,3,0,0]} />
            <Bar dataKey="new_customers" name="Won"      fill="#c2a98b" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={display} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
            <XAxis dataKey="month" tick={{ fill: '#a9b6c5', fontSize: 9 }} angle={-30} textAnchor="end" height={38} />
            <YAxis yAxisId="left"  tickFormatter={(v) => `${v.toFixed(1)}x`} tick={{ fill: '#a9b6c5', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}`} tick={{ fill: '#a9b6c5', fontSize: 10 }} />
            <Tooltip
              formatter={(v, name) => [name === 'ROAS' ? `${v.toFixed(1)}x` : `$${v.toFixed(0)}`, name]}
              contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
              labelStyle={{ color: '#c4d1e3' }}
            />
            <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 11 }}>{v}</span>} />
            <Line yAxisId="left"  dataKey="roas" name="ROAS" stroke="#d0a458" strokeWidth={2} dot={false} />
            <Line yAxisId="right" dataKey="cpl"  name="CPL"  stroke="#9aa9c8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
