import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts'
import { MARCA, SERIE, SEM, REJILLA, eje, CAJA_PROPS, leyenda } from '../../tema/graficos'

export default function PriceForecast({ data }) {
  if (!data) return null

  const shortDate = (s) => s.slice(5) // MM-DD

  return (
    <div className="card">
      <h2>60-Day Price Forecast — Standard Room</h2>
      <p className="card-desc">Suggested ADR and expected occupancy · Gold bars = event days</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={SERIE[0]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={SERIE[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...REJILLA} />
          <XAxis
            dataKey="date"
            tickFormatter={shortDate}
            tick={eje(9)}
            interval={6}
            angle={-30}
            textAnchor="end"
            height={38}
          />
          <YAxis yAxisId="left"  tickFormatter={(v) => `$${v}`}            tick={eje(11)} />
          <YAxis yAxisId="right" orientation="right"
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={eje(11)}
            domain={[0.2, 1]}
          />
          <Tooltip
            formatter={(v, name) =>
              name === 'Occupancy %' ? [`${(v * 100).toFixed(1)}%`, name] : [`$${v.toFixed(2)}`, name]
            }
            {...CAJA_PROPS}
            labelFormatter={shortDate}
          />
          <Legend formatter={leyenda(12)} />
          {/* fill del Bar: es lo que pinta la muestra de la leyenda; cada barra lo
              sustituye con su Cell (oro si hay evento). */}
          <Bar yAxisId="left" dataKey="suggested_adr" name="Suggested ADR" fill={MARCA.celeste} radius={[3, 3, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.has_event ? SEM.aviso : MARCA.celeste}
              />
            ))}
          </Bar>
          <Line yAxisId="right" type="monotone" dataKey="expected_occupancy"
            name="Occupancy %" stroke={SERIE[0]} strokeWidth={2} dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.72rem', color: MARCA.tenue, marginTop: '0.5rem' }}>
        Gold bars indicate event days (holidays/conferences). Lead-time premium applied for bookings within 30 days.
      </p>
    </div>
  )
}
