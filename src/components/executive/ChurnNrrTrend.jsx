import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { SERIE, SEM, REJILLA, REFERENCIA, eje, CAJA_PROPS, leyenda } from '../../tema/graficos'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

export default function ChurnNrrTrend({ data }) {
  if (!data) return null
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>Churn &amp; NRR</h2>
      <p className="card-desc">Churn rate vs Net Revenue Retention — target NRR &gt; 100%</p>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={display} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="nrrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={SERIE[0]} stopOpacity={0.2} />
              <stop offset="95%" stopColor={SERIE[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="month" tick={eje(10)} angle={-30} textAnchor="end" height={38} />
          <YAxis yAxisId="nrr"   tickFormatter={fmtPct} domain={[0.85, 1.15]} tick={eje(11)} />
          <YAxis yAxisId="churn" orientation="right" tickFormatter={fmtPct} domain={[0, 0.12]} tick={eje(11)} />
          <ReferenceLine yAxisId="nrr" y={1} stroke={REFERENCIA} strokeDasharray="4 4" />
          <Tooltip
            formatter={(v, name) => [fmtPct(v), name]}
            {...CAJA_PROPS}
          />
          <Legend formatter={leyenda(12)} />
          <Area   yAxisId="nrr"   type="monotone" dataKey="nrr"        name="NRR"        stroke={SERIE[0]} strokeWidth={2} fill="url(#nrrGrad)" />
          <Line   yAxisId="churn" type="monotone" dataKey="churn_rate" name="Churn Rate" stroke={SEM.mal} strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
