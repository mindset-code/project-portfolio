import { useState, useEffect } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts'
import HeroSection     from '../components/HeroSection'
import PortfolioFooter from '../components/PortfolioFooter'
import BusinessCta     from '../components/BusinessCta'
import { useLang }     from '../contexts/LangContext'

/*  Rentabilidad por SQL.
 *
 *  Los JSON de /data/sql/ NO estan escritos a mano: los genera
 *  export_results.py ejecutando, sobre el mismo CSV que publica el
 *  repositorio, las consultas leidas de sales_analysis.sql. Si alguien
 *  cambia una consulta y regenera, el panel cambia con ella. Por eso los
 *  nombres de campo que se leen aqui son los alias del SQL —Total_Revenue,
 *  Profit_Margin_Percentage— y no unos mas comodos: renombrarlos habria
 *  significado una capa de traduccion mas donde perder el rastro.
 */

const REPO  = 'https://github.com/mindset-code/project-sales-optimization-sql'
const AZUL  = '#7ea6d4'
const VERDE = '#6fae8c'
const ORO   = '#d0a458'
const TENUE = '#a9b6c5'
const REJILLA = '#22303f'

const FICHEROS = [
  'kpis', 'regiones', 'top_vendedores',
  'clientes_por_categoria', 'tendencia_mensual', 'margen_bajo', 'categorias',
]

const dinero = (v, dec = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: dec }).format(v)
const corto = v => (Math.abs(v) >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : `$${Math.round(v / 1e3)}k`)

const CAJA = { background: '#101722', border: '1px solid #2c3d50', borderRadius: 8 }
const leyenda = v => <span style={{ color: TENUE, fontSize: 12 }}>{v}</span>

const T = {
  es: {
    badge: 'Business Intelligence',
    title: 'Rentabilidad por SQL',
    description:
      'Diez mil ventas B2B y cinco preguntas de las que hace un director comercial: qué región deja más margen, quién vende de verdad, cómo se reparte la cartera y dónde se escapa la rentabilidad. Las respuestas salen de ejecutar las consultas del repositorio sobre los datos del repositorio, no de un resumen escrito aparte.',
    stats: ['Ventas analizadas', 'Ingreso', 'Margen', 'Vendedores'],
    cargando: 'Ejecutando las consultas…',
    error: 'No se han podido cargar los resultados',
    regiones: 'Ingreso y beneficio por región',
    regionesDesc: 'Consulta 1 · agregación con margen derivado, ordenada por beneficio',
    vendedores: 'Los cinco que más facturan',
    vendedoresDesc: 'Consulta 2 · ranking por ingreso, de veinte comerciales; el número identifica al comercial',
    mensual: 'Tendencia mensual de ingreso',
    mensualDesc: 'Consulta 4 · agrupación por mes con strftime',
    cartera: 'Cartera por categoría y tipo de cliente',
    carteraDesc: 'Consulta 3 · número de ventas por cruce de categoría y tipo',
    margen: 'Beneficio medio por categoría',
    margenDesc: 'Consulta 5 · el umbral de bajo margen está en 1.000',
    vacio: 'La consulta 5 no devuelve ninguna fila: filtra las categorías con beneficio medio por debajo de 1.000 y ninguna de las tres baja de 1.470. El umbral está calibrado por debajo de todo el catálogo, así que hoy no señala nada.',
    umbral: 'Umbral (1.000)',
    ventas: 'ventas',
    vendedor: 'Comercial',
    ingreso: 'Ingreso',
    beneficio: 'Beneficio',
    margenPct: 'Margen',
    footerCtx: 'Datos sintéticos generados por el propio repositorio: no hay información de ningún cliente · SQL ejecutado sobre SQLite · React + Recharts ·',
  },
  en: {
    badge: 'Business Intelligence',
    title: 'Profitability through SQL',
    description:
      'Ten thousand B2B sales and the five questions a sales director actually asks: which region leaves the most margin, who really sells, how the book is split and where profitability leaks. The answers come from running the repository queries over the repository data, not from a summary written on the side.',
    stats: ['Sales analysed', 'Revenue', 'Margin', 'Reps'],
    cargando: 'Running the queries…',
    error: 'Could not load the results',
    regiones: 'Revenue and profit by region',
    regionesDesc: 'Query 1 · aggregation with derived margin, ordered by profit',
    vendedores: 'Top five by revenue',
    vendedoresDesc: 'Query 2 · revenue ranking across twenty reps; the number identifies the rep',
    mensual: 'Monthly revenue trend',
    mensualDesc: 'Query 4 · grouped by month with strftime',
    cartera: 'Book by category and customer type',
    carteraDesc: 'Query 3 · sales count per category and type',
    margen: 'Average profit by category',
    margenDesc: 'Query 5 · the low-margin threshold sits at 1,000',
    vacio: 'Query 5 returns no rows: it filters categories whose average profit falls below 1,000, and none of the three drops under 1,470. The threshold sits below the entire catalogue, so today it flags nothing.',
    umbral: 'Threshold (1,000)',
    ventas: 'sales',
    vendedor: 'Rep',
    ingreso: 'Revenue',
    beneficio: 'Profit',
    margenPct: 'Margin',
    footerCtx: 'Synthetic data generated by the repository itself: no client information involved · SQL executed on SQLite · React + Recharts ·',
  },
}

/** Las nueve filas de categoria x tipo de cliente, en una fila por categoria. */
function pivotar(filas) {
  const tipos = [...new Set(filas.map(f => f.CustomerType))].sort()
  const cats = [...new Set(filas.map(f => f.ProductCategory))]
  return {
    tipos,
    datos: cats.map(c => {
      const fila = { categoria: c }
      for (const t of tipos) {
        fila[t] = filas.find(f => f.ProductCategory === c && f.CustomerType === t)?.Number_of_Sales ?? 0
      }
      return fila
    }),
  }
}

export default function SqlDashboard() {
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState(null)
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    Promise.all(
      FICHEROS.map(f =>
        fetch(`/data/sql/${f}.json`).then(r => {
          if (!r.ok) throw new Error(`${f}: ${r.status}`)
          return r.json()
        }).then(d => [f, d])
      )
    )
      .then(r => setDatos(Object.fromEntries(r)))
      .catch(e => setError(e.message))
  }, [])

  if (error) return <div className="error">{t.error}: {error}</div>
  if (!datos) return <div className="loading">{t.cargando}</div>

  const k = datos.kpis
  const { tipos, datos: cartera } = pivotar(datos.clientes_por_categoria)
  const cats = datos.categorias.categorias
  const umbral = datos.categorias.umbral

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href={REPO} target="_blank" rel="noreferrer">project-sales-optimization-sql</a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor={AZUL}
        title={t.title}
        description={t.description}
        stats={[
          { value: k.ventas.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US'), label: t.stats[0] },
          { value: corto(k.ingreso), label: t.stats[1] },
          { value: `${k.margen.toFixed(1)}%`, label: t.stats[2] },
          { value: String(k.vendedores), label: t.stats[3] },
        ]}
        techs={['SQL', 'SQLite', 'Python', 'React', 'Recharts', 'Business Intelligence']}
        githubUrl={REPO}
      />

      <main>
        <div className="grid grid-1">
          <div className="card">
            <h2>{t.regiones}</h2>
            <p className="card-desc">{t.regionesDesc}</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={datos.regiones} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
                <CartesianGrid stroke={REJILLA} vertical={false} />
                {/* interval={0}: recharts descarta los rotulos que no le
                    caben, y en movil el que se perdia era «North America»
                    —la primera barra y la region que mas beneficio deja—,
                    con lo que la barra mas alta del grafico se quedaba sin
                    decir de quien era. Abreviada si cabe; descartada, no. */}
                <XAxis
                  dataKey="Region"
                  stroke={TENUE}
                  fontSize={11}
                  interval={0}
                  tickFormatter={v => (v === 'North America' ? 'N. America' : v)}
                />
                <YAxis stroke={TENUE} fontSize={12} tickFormatter={corto} />
                <Tooltip contentStyle={CAJA} formatter={v => dinero(v)} />
                <Legend formatter={leyenda} />
                <Bar dataKey="Total_Revenue" name={t.ingreso}   fill={AZUL}  radius={[3, 3, 0, 0]} />
                <Bar dataKey="Total_Profit"  name={t.beneficio} fill={VERDE} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginTop: '0.6rem', fontSize: '0.8rem' }}>
              {datos.regiones.map(r => (
                <span key={r.Region} style={{ color: TENUE }}>
                  <strong style={{ color: VERDE }}>{r.Region}</strong>{' '}
                  {t.margenPct} {r.Profit_Margin_Percentage.toFixed(2)} %
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-1">
          <div className="card">
            <h2>{t.mensual}</h2>
            <p className="card-desc">{t.mensualDesc}</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={datos.tendencia_mensual} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
                <CartesianGrid stroke={REJILLA} vertical={false} />
                <XAxis dataKey="Sales_Month" stroke={TENUE} fontSize={12} />
                <YAxis stroke={TENUE} fontSize={12} tickFormatter={corto} />
                <Tooltip contentStyle={CAJA} formatter={v => [dinero(v), t.ingreso]} />
                <Line type="monotone" dataKey="Monthly_Revenue" stroke={AZUL} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h2>{t.vendedores}</h2>
            <p className="card-desc">{t.vendedoresDesc}</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={datos.top_vendedores}
                layout="vertical"
                margin={{ top: 8, right: 16, bottom: 4, left: 8 }}
              >
                <CartesianGrid stroke={REJILLA} horizontal={false} />
                <XAxis type="number" stroke={TENUE} fontSize={12} tickFormatter={corto} />
                <YAxis
                  type="category"
                  dataKey="SalesPersonID"
                  stroke={TENUE}
                  fontSize={12}
                  /* «Comercial 13» se partia en dos lineas y el numero
                     quedaba suelto debajo de su propia etiqueta; ensanchar el
                     eje no lo arreglo, porque recharts parte por el espacio
                     en cuanto el texto roza el ancho disponible. Sin espacio
                     no hay por donde partir, y ademas le deja sitio a las
                     barras, que es lo que hay que comparar aqui. Que el
                     numero identifica al comercial lo dice el subtitulo. */
                  width={56}
                  tickFormatter={v => `#${v}`}
                />
                <Tooltip contentStyle={CAJA} formatter={v => [dinero(v), t.ingreso]} />
                <Bar dataKey="Total_Revenue" fill={ORO} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2>{t.cartera}</h2>
            <p className="card-desc">{t.carteraDesc}</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cartera} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
                <CartesianGrid stroke={REJILLA} vertical={false} />
                <XAxis dataKey="categoria" stroke={TENUE} fontSize={12} />
                <YAxis stroke={TENUE} fontSize={12} />
                <Tooltip contentStyle={CAJA} formatter={(v, n) => [`${v} ${t.ventas}`, n]} />
                <Legend formatter={leyenda} />
                {tipos.map((tipo, i) => (
                  <Bar key={tipo} dataKey={tipo} stackId="a" fill={[AZUL, VERDE, ORO][i % 3]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-1">
          <div className="card">
            <h2>{t.margen}</h2>
            <p className="card-desc">{t.margenDesc}</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cats} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
                <CartesianGrid stroke={REJILLA} vertical={false} />
                <XAxis dataKey="ProductCategory" stroke={TENUE} fontSize={12} />
                <YAxis stroke={TENUE} fontSize={12} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={CAJA} formatter={v => [dinero(v, 2), t.beneficio]} />
                <ReferenceLine
                  y={umbral}
                  stroke={ORO}
                  strokeDasharray="4 4"
                  label={{ value: t.umbral, position: 'insideTopRight', fill: ORO, fontSize: 12 }}
                />
                <Bar dataKey="Avg_Profit" radius={[3, 3, 0, 0]}>
                  {cats.map(c => (
                    <Cell key={c.ProductCategory} fill={c.Avg_Profit < umbral ? ORO : VERDE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Un panel en blanco no distingue «no hay ningun producto con
                margen bajo» de «el informe esta roto». Se dice cual de las dos
                es, y con el numero delante. */}
            {datos.margen_bajo.length === 0 && (
              <p className="card-desc" style={{ marginTop: '0.6rem', color: ORO }}>
                {t.vacio}
              </p>
            )}
          </div>
        </div>
      </main>

      <BusinessCta service="datos-bi" encargo="panel-tesoreria" />
      <PortfolioFooter context={context} />
    </div>
  )
}
