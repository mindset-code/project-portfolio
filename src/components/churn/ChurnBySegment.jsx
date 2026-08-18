import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'

import { techoDelDato } from './escala'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

const SUB_COLORS   = { Basic: '#7ea6d4', Standard: '#d0a458', Premium: '#6fae8c' }
const CONT_COLORS  = { Monthly: '#d18a86', Annual: '#d0a458', '2-Year': '#6fae8c' }

function SegmentBar({ data, colorMap, title, desc }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="card-desc">{desc}</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="segment" tick={{ fill: '#a9b6c5', fontSize: 12 }} />
          <YAxis tickFormatter={fmtPct} domain={[0, techoDelDato]} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v) => [fmtPct(v), 'Churn Rate']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="churn_rate" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={{ fill: '#a9b6c5', fontSize: 11 }} />
            {data.map(({ segment }) => (
              <Cell key={segment} fill={colorMap[segment] || '#a9b6c5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChurnBySubscription({ data }) {
  return (
    <SegmentBar
      data={data}
      colorMap={SUB_COLORS}
      title="Churn by Plan Type"
      desc="Premium churns most at 16.3% — Basic and Standard sit together around 12%"
    />
  )
}

export function ChurnByContract({ data }) {
  const display = data?.map(d => ({ ...d, segment: d.label || d.segment }))
  return (
    <SegmentBar
      data={display}
      colorMap={CONT_COLORS}
      title="Churn by Contract Length"
      desc="Month-to-month churns at 20.9% — 2.8× the annual rate and 4.4× the two-year"
    />
  )
}
