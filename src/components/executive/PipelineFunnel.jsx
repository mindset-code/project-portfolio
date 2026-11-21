import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MARCA, RAMPA, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA } from '../../tema/graficos'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STAGE_COLORS = {
  Prospecting:  RAMPA[1],
  Qualified:    RAMPA[2],
  Proposal:     RAMPA[3],
  Negotiation:  RAMPA[4],
  'Closed Won': RAMPA[5],
}

export default function PipelineFunnel({ data }) {
  if (!data) return null

  // Last month pipeline snapshot
  const lastMonth = [...new Set(data.map(d => d.month))].sort().at(-1)
  const snapshot  = data.filter(d => d.month === lastMonth)
    .sort((a, b) => b.value - a.value)

  const totalVal   = snapshot.reduce((s, d) => s + d.value, 0)
  const totalDeals = snapshot.reduce((s, d) => s + d.deals, 0)

  return (
    <div className="card">
      <h2>Pipeline Snapshot</h2>
      <p className="card-desc">Latest month — {lastMonth} · {fmt(totalVal)} total · {totalDeals} deals</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={snapshot} layout="vertical" margin={{ top: 8, right: 80, bottom: 8, left: 16 }}>
          <CartesianGrid {...REJILLA} horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={eje(11)} />
          <YAxis type="category" dataKey="stage" tick={eje(12)} width={90} />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v, name, props) => [
              `${fmt(v)}  ·  ${props.payload.deals} deals`,
              'Value',
            ]}
            {...CAJA_PROPS}
          />
          <Bar dataKey="value" radius={[0,4,4,0]}>
            {snapshot.map(({ stage }) => <Cell key={stage} fill={STAGE_COLORS[stage] || MARCA.linea} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
