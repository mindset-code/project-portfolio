import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts'

export default function PriceForecast({ data }) {
  if (!data) return null

  const shortDate = (s) => s.slice(5) // MM-DD

  return (
    <div className="card">
      <h2>60-Day Price Forecast — Standard Room</h2>
      <p className="card-desc">Suggested ADR and expected occupancy · Blue bars = event days</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6fae8c" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6fae8c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis
            dataKey="date"
            tickFormatter={shortDate}
            tick={{ fill: '#a9b6c5', fontSize: 9 }}
            interval={6}
            angle={-30}
            textAnchor="end"
            height={38}
          />
          <YAxis yAxisId="left"  tickFormatter={(v) => `$${v}`}            tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right"
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#a9b6c5', fontSize: 11 }}
            domain={[0.2, 1]}
          />
          <Tooltip
            formatter={(v, name) =>
              name === 'Occupancy %' ? [`${(v * 100).toFixed(1)}%`, name] : [`$${v.toFixed(2)}`, name]
            }
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
            labelFormatter={shortDate}
          />
          <Legend formatter={(v) => <span style={{ color: '#a9b6c5', fontSize: 12 }}>{v}</span>} />
          <Bar yAxisId="left" dataKey="suggested_adr" name="Suggested ADR" radius={[3, 3, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.has_event ? '#b98436' : '#2c3d50'}
              />
            ))}
          </Bar>
          <Line yAxisId="right" type="monotone" dataKey="expected_occupancy"
            name="Occupancy %" stroke="#6fae8c" strokeWidth={2} dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.72rem', color: '#4a5b6e', marginTop: '0.5rem' }}>
        Gold bars indicate event days (holidays/conferences). Lead-time premium applied for bookings within 30 days.
      </p>
    </div>
  )
}
