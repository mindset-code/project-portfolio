import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS, leyenda } from '../../tema/graficos'

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
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="month" tick={eje(10)} angle={-30} textAnchor="end" height={38} />
          <YAxis yAxisId="left"  tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={eje(11)} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v.toFixed(1)}x`} tick={eje(11)} />
          <Tooltip
            formatter={(v, name) => [name === 'LTV:CAC' ? `${v.toFixed(1)}x` : fmt(v), name]}
            {...CAJA_PROPS}
          />
          <Legend formatter={leyenda(12)} />
          <Bar    yAxisId="left"  dataKey="ltv" name="LTV"     fill={SERIE[0]} radius={[3,3,0,0]} />
          <Bar    yAxisId="left"  dataKey="cac" name="CAC"     fill={SERIE[1]} radius={[3,3,0,0]} />
          <Line   yAxisId="right" dataKey="ltv_cac_ratio" name="LTV:CAC" stroke={SERIE[2]} strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
