import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA } from '../tema/graficos'

const COLORS = SERIE

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function SalesByCategory({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Revenue by Category</h2>
      <p className="card-desc">Total sales revenue per product category</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="category" tick={eje(12)} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={eje(11)} />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v, name) => [fmt(v), name === 'total_sales' ? 'Total Revenue' : name]}
            {...CAJA_PROPS}
          />
          <Bar dataKey="total_sales" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
