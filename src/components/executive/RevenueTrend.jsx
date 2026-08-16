import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function RevenueTrend({ data }) {
  if (!data) return null

  return (
    <div className="card">
      <h2>Revenue & Gross Profit Trend</h2>
      <p className="card-desc">36-month view — MRR, Gross Profit and EBITDA</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#7ea6d4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#7ea6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6fae8c" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6fae8c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="month" tick={{ fill: '#a9b6c5', fontSize: 10 }} interval={5} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name]}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{v}</span>} />
          <Area type="monotone" dataKey="revenue"      name="Revenue"      stroke="#7ea6d4" strokeWidth={2} fill="url(#revGrad)" />
          <Area type="monotone" dataKey="gross_profit" name="Gross Profit"  stroke="#6fae8c" strokeWidth={2} fill="url(#gpGrad)" />
          <Line type="monotone" dataKey="ebitda"       name="EBITDA"        stroke="#c2a98b" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
