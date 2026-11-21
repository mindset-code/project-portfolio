import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { MARCA, SERIE, CAJA_PROPS, leyenda } from '../../tema/graficos'

const COLORS = SERIE
const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function RevenueByRoomType({ data }) {
  if (!data) return null

  return (
    <div className="card">
      <h2>Revenue by Room Type</h2>
      <p className="card-desc">Last 12 months — revenue contribution per room category</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total_revenue"
            nameKey="room_type"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, i) => (
              <Cell key={entry.room_type} fill={COLORS[i % COLORS.length]} />
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
        {data.map((r, i) => (
          <div key={r.room_type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: MARCA.texto, fontWeight: 600 }}><i aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i] }} />{r.room_type}</span>
            <span style={{ color: MARCA.texto2 }}>
              {fmt(r.total_revenue)} · ADR {fmt(r.avg_adr)} · {(r.avg_occupancy * 100).toFixed(1)}% occ
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
