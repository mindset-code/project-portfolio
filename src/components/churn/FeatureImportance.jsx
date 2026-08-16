import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'

const LABELS = {
  SupportTickets:             'Support Tickets',
  MonthlyCharges:             'Monthly Charges',
  SubscriptionType_Premium:   'Premium Plan',
  SubscriptionType_Standard:  'Standard Plan',
  TotalUsageHours:            'Usage Hours',
  NumProducts:                'Num Products',
  TenureMonths:               'Tenure (months)',
  ContractDuration_Months:    'Contract Length',
  Age:                        'Age',
}

export default function FeatureImportance({ data }) {
  if (!data) return null

  const sorted = [...data].sort((a, b) => a.coefficient - b.coefficient)
  const display = sorted.map(d => ({
    ...d,
    name: LABELS[d.feature] || d.feature,
    color: d.coefficient > 0 ? '#d18a86' : '#6fae8c',
  }))

  return (
    <div className="card">
      <h2>Feature Importance</h2>
      <p className="card-desc">Logistic regression coefficients — positive = increases churn risk, negative = reduces it</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={display} layout="vertical" margin={{ top: 8, right: 40, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#a9b6c5', fontSize: 11 }}
            tickFormatter={v => v.toFixed(1)} domain={['dataMin - 0.1', 'dataMax + 0.1']} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#a9b6c5', fontSize: 12 }} width={130} />
          <ReferenceLine x={0} stroke="#4a5b6e" strokeWidth={1.5} />
          <Tooltip
            formatter={(v) => [`${v > 0 ? '+' : ''}${v.toFixed(4)}`, 'Coefficient']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="coefficient" radius={[0, 4, 4, 0]}>
            {display.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
