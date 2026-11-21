import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS } from '../tema/graficos'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function MonthlyRevenue({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Monthly Revenue Trend</h2>
      <p className="card-desc">Total sales revenue per month across all years</p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SERIE[0]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={SERIE[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...REJILLA} />
          <XAxis
            dataKey="period"
            tick={eje(10)}
            interval={2}
            angle={-35}
            textAnchor="end"
            height={45}
          />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={eje(11)} />
          <Tooltip
            formatter={(v) => [fmt(v), 'Revenue']}
            {...CAJA_PROPS}
          />
          <Area
            type="monotone"
            dataKey="total_sales"
            stroke={SERIE[0]}
            strokeWidth={2}
            fill="url(#revenueGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
