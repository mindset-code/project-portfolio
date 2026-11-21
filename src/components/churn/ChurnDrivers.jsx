import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { MARCA, SERIE, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA, ROTULO_VALOR } from '../../tema/graficos'
import { techoDelDato } from './escala'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

export function ChurnByTickets({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Support Tickets Impact</h2>
      <p className="card-desc">Churn rate by number of support tickets — flat up to four, then it more than triples</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="segment" tick={eje(12)}
            label={{ value: 'Tickets', position: 'insideBottom', offset: -2, fill: MARCA.tenue, fontSize: 11 }} height={36} />
          <YAxis tickFormatter={fmtPct} domain={[0, techoDelDato]} tick={eje(11)} />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v) => [fmtPct(v), 'Churn Rate']}
            {...CAJA_PROPS}
          />
          <Bar dataKey="churn_rate" fill={SERIE[0]} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={ROTULO_VALOR} />
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
      <p className="card-desc">Churn stays near 12% at every price point until $120 a month, where it jumps to 21.2%</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="segment" tick={eje(11)} angle={-20} textAnchor="end" height={40} />
          <YAxis tickFormatter={fmtPct} domain={[0, techoDelDato]} tick={eje(11)} />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v) => [fmtPct(v), 'Churn Rate']}
            {...CAJA_PROPS}
          />
          <Bar dataKey="churn_rate" fill={SERIE[2]} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={ROTULO_VALOR} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
