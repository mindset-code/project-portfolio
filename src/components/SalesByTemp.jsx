import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const TEMP_COLORS = {
  'Cold (<10°C)':  '#c4d1e3',
  'Mild (10-20°C)': '#6fae8c',
  'Warm (20-30°C)': '#d0a458',
  'Hot (>30°C)':   '#d18a86',
}

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function SalesByTemp({ data }) {
  if (!data) return null

  const ORDER = ['Cold (<10°C)', 'Mild (10-20°C)', 'Warm (20-30°C)', 'Hot (>30°C)']
  const sorted = [...data].sort(
    (a, b) => ORDER.indexOf(a.temp_category) - ORDER.indexOf(b.temp_category)
  )

  return (
    <div className="card">
      <h2>Sales by Temperature</h2>
      <p className="card-desc">Weather impact on total revenue — city-matched orders only</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" />
          <XAxis dataKey="temp_category" tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#a9b6c5', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name === 'total_sales' ? 'Total Revenue' : 'Avg Order']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="total_sales" radius={[4, 4, 0, 0]}>
            {sorted.map((entry) => (
              <Cell key={entry.temp_category} fill={TEMP_COLORS[entry.temp_category] || '#a9b6c5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
