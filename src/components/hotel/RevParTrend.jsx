import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmtD = (v) => `$${v.toFixed(0)}`

export default function RevParTrend({ data }) {
  if (!data) return null

  return (
    <div className="card">
      <h2>ADR & RevPAR Monthly Trend</h2>
      <p className="card-desc">24-month historical view — Average Daily Rate and Revenue per Available Room</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="adrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#7ea6d4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#7ea6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revparGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6fae8c" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6fae8c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="month" tick={{ fill: '#a9b6c5', fontSize: 10 }} interval={3} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={fmtD} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [`$${v.toFixed(2)}`, name]}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{v}</span>} />
          <Area type="monotone" dataKey="avg_adr"    name="ADR"    stroke="#7ea6d4" strokeWidth={2} fill="url(#adrGrad)" />
          <Area type="monotone" dataKey="avg_revpar" name="RevPAR" stroke="#6fae8c" strokeWidth={2} fill="url(#revparGrad)" />
          <Line type="monotone" dataKey="avg_occupancy" name="Occupancy %" yAxisId="right"
            stroke="#d0a458" strokeWidth={1.5} dot={false}
            hide
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
