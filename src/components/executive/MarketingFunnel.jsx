import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA, leyenda } from '../../tema/graficos'


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
            <CartesianGrid {...REJILLA} />
            <XAxis dataKey="month" tick={eje(9)} angle={-30} textAnchor="end" height={38} />
            <YAxis tick={eje(10)} />
            <Tooltip cursor={CURSOR_BARRA}
              formatter={(v, name) => [v, name]}
              {...CAJA_PROPS}
            />
            <Legend formatter={leyenda(11)} />
            <Bar dataKey="mqls"          name="MQLs"     fill={SERIE[0]} radius={[3,3,0,0]} />
            <Bar dataKey="sqls"          name="SQLs"     fill={SERIE[1]} radius={[3,3,0,0]} />
            <Bar dataKey="new_customers" name="Won"      fill={SERIE[2]} radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={display} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid {...REJILLA} />
            <XAxis dataKey="month" tick={eje(9)} angle={-30} textAnchor="end" height={38} />
            <YAxis yAxisId="left"  tickFormatter={(v) => `${v.toFixed(1)}x`} tick={eje(10)} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}`} tick={eje(10)} />
            <Tooltip
              formatter={(v, name) => [name === 'ROAS' ? `${v.toFixed(1)}x` : `$${v.toFixed(0)}`, name]}
              {...CAJA_PROPS}
            />
            <Legend formatter={leyenda(11)} />
            <Line yAxisId="left"  dataKey="roas" name="ROAS" stroke={SERIE[0]} strokeWidth={2} dot={false} />
            <Line yAxisId="right" dataKey="cpl"  name="CPL"  stroke={SERIE[2]} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
