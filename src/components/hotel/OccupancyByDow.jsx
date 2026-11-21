import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { SERIE, MARCA, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA } from '../../tema/graficos'

// Dos grupos, no siete colores: entre semana en azul medio y el fin de semana
// hotelero (viernes a domingo) en el azul de la marca, que es lo que el
// subtitulo pide ver. Los dos pasan 3:1 contra la banda de la tarjeta.
const COLORS = {
  Monday:    MARCA.azul3,
  Tuesday:   MARCA.azul3,
  Wednesday: MARCA.azul3,
  Thursday:  MARCA.azul3,
  Friday:    MARCA.azul,
  Saturday:  MARCA.azul,
  Sunday:    MARCA.azul,
}

const SHORT = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' }

export default function OccupancyByDow({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Occupancy by Day of Week</h2>
      <p className="card-desc">Average occupancy rate — weekend premium clearly visible</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 0 }} barCategoryGap="30%">
          <CartesianGrid {...REJILLA} vertical={false} />
          <XAxis
            dataKey="day_of_week"
            tickFormatter={(v) => SHORT[v] ?? v}
            tick={eje(11)}
          />
          <YAxis
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={eje(11)}
            domain={[0.4, 1]}
          />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v) => [`${(v * 100).toFixed(1)}%`, 'Avg Occupancy']}
            {...CAJA_PROPS}
          />
          <Bar dataKey="avg_occupancy" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.day_of_week} fill={COLORS[entry.day_of_week] ?? SERIE[0]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
