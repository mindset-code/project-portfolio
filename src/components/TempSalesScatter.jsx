import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis,
} from 'recharts'
import { MARCA, SERIE, REJILLA, eje, CAJA_PROPS, CURSOR_LINEA } from '../tema/graficos'

const COLORS = { 'Furniture': SERIE[0], 'Office Supplies': SERIE[1], 'Technology': SERIE[2] }

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function TempSalesScatter({ data }) {
  if (!data) return null

  const categories = [...new Set(data.map((d) => d.category))]

  return (
    <div className="card">
      <h2>Temperature vs Sales</h2>
      <p className="card-desc">Temperature (°C) against order value — 500 city-matched points, Pearson r = 0.04: no relationship</p>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <CartesianGrid {...REJILLA} />
          <XAxis
            dataKey="avg_temp_c"
            type="number"
            name="Temp (°C)"
            tick={eje(11)}
            label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -2, fill: MARCA.tenue, fontSize: 11 }}
            height={36}
          />
          <YAxis
            dataKey="sales"
            type="number"
            name="Sales"
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={eje(11)}
          />
          <ZAxis range={[20, 20]} />
          <Tooltip
            cursor={CURSOR_LINEA}
            formatter={(v, name) => [name === 'Sales' ? fmt(v) : `${v}°C`, name]}
            {...CAJA_PROPS}
          />
          {categories.map((cat) => (
            <Scatter
              key={cat}
              name={cat}
              data={data.filter((d) => d.category === cat)}
              fill={COLORS[cat] || MARCA.linea}
             
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[cat] || MARCA.linea }} />
            <span style={{ fontSize: '0.75rem', color: MARCA.texto2 }}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
