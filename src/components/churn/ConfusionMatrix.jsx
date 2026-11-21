import { MARCA, SEM, tinte } from '../../tema/graficos'

// Acierto en verde, error en rojo, la clase negativa en el azul de la marca:
// el color dice si la casilla es buena o mala, y la etiqueta lo repite.
export default function ConfusionMatrix({ data }) {
  if (!data) return null
  const { tn, fp, fn, tp } = data
  const total    = tn + fp + fn + tp
  const accuracy = ((tn + tp) / total * 100).toFixed(1)

  const cells = [
    { label: 'True Negative',  value: tn, sub: 'Correctly predicted No Churn', color: MARCA.blanco,          text: MARCA.azul },
    { label: 'False Positive', value: fp, sub: 'Predicted Churn — actually not', color: tinte(SEM.mal, 10),  text: SEM.mal },
    { label: 'False Negative', value: fn, sub: 'Missed churners',               color: tinte(SEM.mal, 10),  text: SEM.mal },
    { label: 'True Positive',  value: tp, sub: 'Correctly predicted Churn',     color: tinte(SEM.bien, 12), text: SEM.bien },
  ]

  return (
    <div className="card">
      <h2>Confusion Matrix</h2>
      <p className="card-desc">Model predictions vs actual outcomes on test set — {total} samples · {accuracy}% accuracy</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
        {cells.map(({ label, value, sub, color, text }) => (
          <div key={label} style={{
            background: color,
            borderRadius: 10, padding: '1.25rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', color: text }}>{value}</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: text, marginTop: 4 }}>{label}</div>
            <div style={{ fontSize: '0.8125rem', color: MARCA.texto2, marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8125rem', color: MARCA.tenue }}>← Predicted</div>
        </div>
      </div>
    </div>
  )
}
