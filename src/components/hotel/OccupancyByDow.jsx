import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const COLORS = {
  Monday:    '#4a5b6e',
  Tuesday:   '#4a5b6e',
  Wednesday: '#4a5b6e',
  Thursday:  '#7ea6d4',
  Friday:    '#6fae8c',
  Saturday:  '#d0a458',
  Sunday:    '#c2a98b',
}

const SHORT = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' }

export default function OccupancyByDow({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Occupancy by Day of Week</h2>
      <p className="card-desc">Average occupancy rate — weekend premium clearly visible</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3d50" vertical={false} />
          <XAxis
            dataKey="day_of_week"
            tickFormatter={(v) => SHORT[v] ?? v}
            tick={{ fill: '#a9b6c5', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#a9b6c5', fontSize: 11 }}
            domain={[0.4, 1]}
          />
          <Tooltip
            formatter={(v) => [`${(v * 100).toFixed(1)}%`, 'Avg Occupancy']}
            contentStyle={{ background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }}
            labelStyle={{ color: '#c4d1e3' }}
          />
          <Bar dataKey="avg_occupancy" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.day_of_week} fill={COLORS[entry.day_of_week] ?? '#7ea6d4'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
