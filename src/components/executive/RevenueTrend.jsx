import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS, leyenda } from '../../tema/graficos'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function RevenueTrend({ data }) {
  if (!data) return null

  return (
    <div className="card">
      <h2>Revenue & Gross Profit Trend</h2>
      <p className="card-desc">36-month view — MRR, Gross Profit and EBITDA</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={SERIE[0]} stopOpacity={0.25} />
              <stop offset="95%" stopColor={SERIE[0]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={SERIE[2]} stopOpacity={0.2} />
              <stop offset="95%" stopColor={SERIE[2]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="month" tick={eje(10)} interval={5} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={eje(11)} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name]}
            {...CAJA_PROPS}
          />
          <Legend formatter={leyenda(12)} />
          <Area type="monotone" dataKey="revenue"      name="Revenue"      stroke={SERIE[0]} strokeWidth={2} fill="url(#revGrad)" />
          <Area type="monotone" dataKey="gross_profit" name="Gross Profit"  stroke={SERIE[2]} strokeWidth={2} fill="url(#gpGrad)" />
          <Line type="monotone" dataKey="ebitda"       name="EBITDA"        stroke={SERIE[3]} strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
