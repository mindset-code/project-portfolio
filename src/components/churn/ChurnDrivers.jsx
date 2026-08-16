import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

export function ChurnByTickets({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Support Tickets Impact</h2>
      <p className="card-desc">Churn rate by number of support tickets — strongest single predictor</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="segment" tick={{ fill: '#a9b6c5', fontSize: 12 }}
            label={{ value: 'Tickets', position: 'insideBottom', offset: -2, fill: '#4a5b6e', fontSize: 11 }} height={36} />
          <YAxis tickFormatter={fmtPct} domain={[0, 0.9]} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v) => [fmtPct(v), 'Churn Rate']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="churn_rate" fill="#c2a98b" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={{ fill: '#a9b6c5', fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChurnByCharges({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Monthly Charges vs Churn</h2>
      <p className="card-desc">Higher monthly spend correlates with increased churn risk</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="segment" tick={{ fill: '#a9b6c5', fontSize: 11 }} angle={-20} textAnchor="end" height={40} />
          <YAxis tickFormatter={fmtPct} domain={[0, 0.7]} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v) => [fmtPct(v), 'Churn Rate']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="churn_rate" fill="#d0a458" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={{ fill: '#a9b6c5', fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
