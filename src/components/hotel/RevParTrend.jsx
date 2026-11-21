import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS, leyenda } from '../../tema/graficos'

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
              <stop offset="5%"  stopColor={SERIE[0]} stopOpacity={0.25} />
              <stop offset="95%" stopColor={SERIE[0]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revparGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={SERIE[2]} stopOpacity={0.2} />
              <stop offset="95%" stopColor={SERIE[2]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="month" tick={eje(10)} interval={3} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={fmtD} tick={eje(11)} />
          <Tooltip
            formatter={(v, name) => [`$${v.toFixed(2)}`, name]}
            {...CAJA_PROPS}
          />
          <Legend formatter={leyenda(12)} />
          <Area type="monotone" dataKey="avg_adr"    name="ADR"    stroke={SERIE[0]} strokeWidth={2} fill="url(#adrGrad)" />
          <Area type="monotone" dataKey="avg_revpar" name="RevPAR" stroke={SERIE[2]} strokeWidth={2} fill="url(#revparGrad)" />
          <Line type="monotone" dataKey="avg_occupancy" name="Occupancy %" yAxisId="right"
            stroke={SERIE[3]} strokeWidth={1.5} dot={false}
            hide
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
