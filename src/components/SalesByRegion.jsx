import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { SERIE, CAJA_PROPS, leyenda } from '../tema/graficos'

const COLORS = SERIE

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function SalesByRegion({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Revenue by Region</h2>
      <p className="card-desc">Share of total sales across US regions</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total_sales"
            nameKey="region"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={45}
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => [fmt(v), 'Revenue']}
            {...CAJA_PROPS}
          />
          <Legend
            formatter={leyenda(12)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
