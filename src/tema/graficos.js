/** Tema de los graficos y de los estilos en linea — identidad G de Mindset & Code.
 *
 *  Es el espejo en JavaScript de los tokens `--g-*` de src/theme-brand.css.
 *  Recharts pinta SVG con atributos (`fill`, `stroke`) y no lee variables CSS
 *  en todos sus puntos, asi que los colores tienen que llegarle como valores.
 *  Los 23 graficos importan de aqui la rejilla, los ejes, la caja flotante y
 *  la leyenda: cambiar el tema es cambiar este fichero, no veintitres.
 *
 *  Tres familias de color, cada una con un trabajo:
 *  - MARCA: superficies y tintas. Nunca codifican datos.
 *  - SERIE / RAMPA: identidad de una serie (SERIE) o magnitud ordenada (RAMPA).
 *    Solo azules de la marca. SERIE se valido con validate_palette.js de la
 *    skill dataviz sobre blanco, comparando TODOS los pares: separacion CVD y
 *    vision normal >= 15. El celeste queda por debajo de 3:1 contra el blanco,
 *    asi que cualquier grafico que lo use lleva leyenda o etiqueta de eje.
 *  - SEM: significado (bien / mal / atencion). Reservados: no se usan como
 *    "la cuarta serie". Todos pasan 4,5:1 sobre blanco y sobre la banda.
 */
import { createElement } from 'react'

export const MARCA = {
  blanco:  '#ffffff',
  banda:   '#e7eef7',
  placa:   '#d8e3f1',
  suave:   '#dde5ef',
  linea:   '#c4d1e3',
  celeste: '#9fc0e6',
  azul3:   '#567ca8',
  azul2:   '#3b6290',
  azul:    '#2c4a6e',
  hondo:   '#233b5c',
  texto:   '#2a3347',
  texto2:  '#3d4f66',
  tenue:   '#5d6573',
}

/** Identidad de serie, en este orden fijo y sin ciclar. Maximo cuatro. */
export const SERIE = ['#2c4a6e', '#9fc0e6', '#567ca8', '#13213a']

/** Magnitud ordenada (de menos a mas). Un solo tono, de claro a oscuro. */
export const RAMPA = ['#c4d1e3', '#9fc0e6', '#7d9fc6', '#567ca8', '#3b6290', '#2c4a6e', '#233b5c']

/** Escala divergente de temperatura (frio -> calor): azules de la marca en el
 *  polo frio, ambar tostado en el calido. No es una paleta de estado. */
export const TEMPERATURA = ['#3b6290', '#9fc0e6', '#d9b27c', '#9a4f1f']

/** Colores con significado. Mismo matiz que antes, en tonos legibles sobre claro. */
export const SEM = {
  bien:    '#2f6b4f',
  mal:     '#a33a34',
  aviso:   '#8a6420',
  alta:    '#9a4f1f',   // severidad "alta": entre el aviso y lo critico
}

/** Rejilla del plano: presente pero recesiva. */
export const REJILLA = { stroke: '#e1e8f1', strokeDasharray: '0' }

/** Linea de referencia (cero, objetivo, 100 %). */
export const REFERENCIA = MARCA.tenue

/** Texto de los ejes. */
export const eje = (fontSize = 11) => ({ fill: MARCA.tenue, fontSize })

/** Rotulo de un eje (label de XAxis/YAxis). */
export const rotuloEje = (value, extra = {}) => ({ value, fill: MARCA.tenue, fontSize: 11, ...extra })

/** Caja flotante: blanca, sin contorno; la separa una sombra solo mientras se ve. */
export const CAJA = {
  background: MARCA.blanco,
  border: 0,
  borderRadius: 8,
  boxShadow: '0 1px 2px rgba(44, 74, 110, 0.14), 0 8px 24px rgba(44, 74, 110, 0.12)',
  fontFamily: 'inherit',
  fontSize: 13,
}
export const CAJA_TITULO = { color: MARCA.hondo, fontWeight: 600, marginBottom: 2 }
/** El valor va en tinta de texto, nunca en el color de la serie: el celeste no se leeria. */
export const CAJA_ITEM = { color: MARCA.texto, padding: '1px 0' }

/** Props comunes del <Tooltip>: `<Tooltip {...CAJA_PROPS} formatter={...} />`. */
export const CAJA_PROPS = { contentStyle: CAJA, labelStyle: CAJA_TITULO, itemStyle: CAJA_ITEM }

/** Cursor de los graficos de barras: un paso de tono, no un bloque gris. */
export const CURSOR_BARRA = { fill: MARCA.banda }
export const CURSOR_LINEA = { stroke: MARCA.linea, strokeWidth: 1 }

/** Leyenda: el texto en tinta secundaria; la marca de color al lado da la identidad. */
export const leyenda = (fontSize = 12) => (valor) =>
  createElement('span', { style: { color: MARCA.texto2, fontSize } }, valor)

/** Rotulo de valor sobre la barra (LabelList). */
export const ROTULO_VALOR = { fill: MARCA.texto2, fontSize: 11 }

/** Transparencia de un color sin concatenar sufijos hexadecimales. */
export const tinte = (color, pct = 10) => `color-mix(in srgb, ${color} ${pct}%, transparent)`
