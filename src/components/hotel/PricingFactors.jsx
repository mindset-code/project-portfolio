import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'
import { SERIE, REJILLA, eje, CAJA_PROPS, CURSOR_BARRA, ROTULO_VALOR } from '../../tema/graficos'

const COLORS = [SERIE[0]]

export default function PricingFactors({ data }) {
  if (!data) return null

  return (
    <div className="card">
      <h2>Pricing Factor Contributions</h2>
      <p className="card-desc">Average value of each factor applied to the base price</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 60, bottom: 4, left: 130 }}
          barCategoryGap="28%"
        >
          <CartesianGrid {...REJILLA} horizontal={false} />
          <XAxis type="number" tick={eje(11)} domain={[0, 'auto']} />
          <YAxis
            type="category"
            dataKey="factor"
            width={125}
            tick={eje(11)}
          />
          <Tooltip cursor={CURSOR_BARRA}
            formatter={(v, name, props) => {
              const isBase = props.payload.factor === 'Base Price'
              return [isBase ? `$${v}` : `×${v.toFixed(3)}`, props.payload.description]
            }}
            {...CAJA_PROPS}
          />
          <Bar dataKey="avg_value" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={entry.factor} fill={COLORS[i % COLORS.length]} />
            ))}
            <LabelList
              dataKey="avg_value"
              position="right"
              formatter={(v) => (v >= 10 ? `$${v}` : `×${v.toFixed(2)}`)}
              style={ROTULO_VALOR}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
