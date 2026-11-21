import {
  RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { MARCA, SERIE, CAJA_PROPS, leyenda } from '../tema/graficos'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function WeekendVsWeekday({ data }) {
  if (!data) return null

  // `name` es lo que la leyenda del gráfico radial escribe junto a cada color;
  // sin él la leyenda salía como dos cuadrados sin texto.
  const enriched = data.map((d, i) => ({
    ...d,
    name: d.day_type,
    fill: SERIE[i % 2],
  }))

  return (
    <div className="card">
      <h2>Weekend vs Weekday</h2>
      <p className="card-desc">Average order value and volume by day type</p>

      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          cx="50%"
          cy="72%"
          innerRadius="30%"
          outerRadius="90%"
          data={enriched}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar dataKey="avg_sales" background={{ fill: MARCA.blanco }} cornerRadius={4} />
          <Tooltip
            formatter={(v) => [fmt(v), 'Avg Order Value']}
            {...CAJA_PROPS}
          />
          <Legend
            formatter={leyenda(12)}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        {enriched.map((d) => (
          <div key={d.day_type} style={{ flex: 1, background: MARCA.blanco, borderRadius: 8, padding: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: MARCA.tenue, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, background: d.fill }} />
              {d.day_type}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: MARCA.azul }}>{fmt(d.avg_sales)}</div>
            <div style={{ fontSize: '0.75rem', color: MARCA.tenue }}>{d.num_orders} orders</div>
          </div>
        ))}
      </div>
    </div>
  )
}
