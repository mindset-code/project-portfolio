import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { MARCA, TEMPERATURA, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA } from '../tema/graficos'

const TEMP_COLORS = {
  'Cold (<10°C)':  TEMPERATURA[0],
  'Mild (10-20°C)': TEMPERATURA[1],
  'Warm (20-30°C)': TEMPERATURA[2],
  'Hot (>30°C)':   TEMPERATURA[3],
}

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function SalesByTemp({ data }) {
  if (!data) return null

  const ORDER = ['Cold (<10°C)', 'Mild (10-20°C)', 'Warm (20-30°C)', 'Hot (>30°C)']
  const sorted = [...data].sort(
    (a, b) => ORDER.indexOf(a.temp_category) - ORDER.indexOf(b.temp_category)
  )

  return (
    <div className="card">
      <h2>Sales by Temperature</h2>
      <p className="card-desc">Revenue by temperature band — the gaps follow how many orders fall in each band, not the weather</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="temp_category" tick={eje(11)} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={eje(11)} />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v, name) => [fmt(v), name === 'total_sales' ? 'Total Revenue' : 'Avg Order']}
            {...CAJA_PROPS}
          />
          <Bar dataKey="total_sales" radius={[4, 4, 0, 0]}>
            {sorted.map((entry) => (
              <Cell key={entry.temp_category} fill={TEMP_COLORS[entry.temp_category] || MARCA.linea} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
