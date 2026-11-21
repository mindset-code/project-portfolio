import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'
import { MARCA, SEM, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA, ROTULO_VALOR } from '../../tema/graficos'

import { techoDelDato } from './escala'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

// El plan es identidad, no un juicio: un solo azul y el eje dice cual es cual.
// (Antes Premium iba en verde justo siendo el plan que mas abandona.)
const SUB_COLORS   = { Basic: MARCA.azul2, Standard: MARCA.azul2, Premium: MARCA.azul2 }
// La permanencia si es riesgo: rojo el mes a mes, verde el de dos anos.
const CONT_COLORS  = { Monthly: SEM.mal, Annual: SEM.aviso, '2-Year': SEM.bien }

function SegmentBar({ data, colorMap, title, desc }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="card-desc">{desc}</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid {...REJILLA} />
          <XAxis dataKey="segment" tick={eje(12)} />
          <YAxis tickFormatter={fmtPct} domain={[0, techoDelDato]} tick={eje(11)} />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v) => [fmtPct(v), 'Churn Rate']}
            {...CAJA_PROPS}
          />
          <Bar dataKey="churn_rate" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={ROTULO_VALOR} />
            {data.map(({ segment }) => (
              <Cell key={segment} fill={colorMap[segment] || MARCA.linea} />
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
