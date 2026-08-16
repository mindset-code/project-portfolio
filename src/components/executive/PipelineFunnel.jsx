import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STAGE_COLORS = {
  Prospecting:  '#7ea6d4',
  Qualified:    '#6fae8c',
  Proposal:     '#d0a458',
  Negotiation:  '#c2a98b',
  'Closed Won': '#9aa9c8',
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
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <YAxis type="category" dataKey="stage" tick={{ fill: '#a9b6c5', fontSize: 12 }} width={90} />
          <Tooltip
            formatter={(v, name, props) => [
              `${fmt(v)}  ·  ${props.payload.deals} deals`,
              'Value',
            ]}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="value" radius={[0,4,4,0]}>
            {snapshot.map(({ stage }) => <Cell key={stage} fill={STAGE_COLORS[stage] || '#a9b6c5'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
