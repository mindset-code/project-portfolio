import { useState } from 'react'
import HeroSection     from '../components/HeroSection'
import PortfolioFooter from '../components/PortfolioFooter'
import BusinessCta     from '../components/BusinessCta'
import { useLang }     from '../contexts/LangContext'

/*  AgentForge, la unica demo de las cinco que no puede ser el producto vivo.
 *
 *  El MVP corre sobre Firebase y n8n y cada respuesta cuesta una llamada a un
 *  modelo de pago: dejar eso abierto en una pagina publica es una factura
 *  abierta. Lo que se demuestra aqui es el flujo —configurar un agente y ver
 *  como esa configuracion cambia lo que el cliente recibe— con respuestas de
 *  guion, y se dice en pantalla que lo son.
 *
 *  Los campos del formulario son los de src/types.ts del repositorio
 *  (systemPrompt, tools, brandColor, shortTermWindow), no unos inventados
 *  para la ocasion: quien abra el codigo despues tiene que reconocerlo.
 *
 *  La memoria es lo que distingue al producto, asi que es lo que se ensenna:
 *  los hechos se acumulan turno a turno y la consolidacion nocturna los
 *  fusiona. Ahi la simulacion es fiel al mecanismo, no al modelo.
 */

const REPO = 'https://github.com/mindset-code/agentforge'
const TENUE = '#a9b6c5'
const BORDE = '#2c3d50'
const FONDO = '#101722'

const HERRAMIENTAS = [
  { id: 'buscar_web',      es: 'Buscar en la web',        en: 'Web search' },
  { id: 'consultar_crm',   es: 'Consultar el CRM',        en: 'Query the CRM' },
  { id: 'agendar_cita',    es: 'Agendar una cita',        en: 'Book a meeting' },
  { id: 'enviar_correo',   es: 'Enviar correo',           en: 'Send email' },
  { id: 'leer_documentos', es: 'Leer documentos',         en: 'Read documents' },
]

const TONOS = [
  { id: 'cercano', es: 'Cercano', en: 'Warm' },
  { id: 'neutro',  es: 'Neutro',  en: 'Neutral' },
  { id: 'formal',  es: 'Formal',  en: 'Formal' },
]

/*  El guion. Cada turno trae el hecho que el motor extraeria de el; algunos
 *  se solapan a proposito, porque si no la consolidacion no tendria nada que
 *  consolidar y no se veria para que sirve. */
const GUION = {
  es: [
    {
      pregunta: '¿Cuánto tardáis en entregar un pedido a Barcelona?',
      base: 'A Barcelona capital, 24 horas si el pedido entra antes de las 17:00; al área metropolitana, 48.',
      herramienta: 'consultar_crm',
      conHerramienta: 'He mirado tu ficha en el CRM: tus tres últimos envíos a Barcelona salieron en 24 horas.',
      hechos: ['El cliente pregunta por envíos a Barcelona'],
    },
    {
      pregunta: 'Somos una tienda con dos almacenes, uno en Sant Boi.',
      base: 'Anotado. Con almacén en Sant Boi puedes servir el área metropolitana el mismo día.',
      herramienta: 'leer_documentos',
      conHerramienta: 'Anotado. En vuestro contrato consta el almacén de Sant Boi como punto de recogida.',
      hechos: ['El cliente tiene dos almacenes', 'Uno de los almacenes está en Sant Boi'],
    },
    {
      pregunta: '¿Podéis pasarme la tarifa por escrito?',
      base: 'Te preparo la tarifa vigente y te la resumo aquí mismo.',
      herramienta: 'enviar_correo',
      conHerramienta: 'Te la envío por correo ahora mismo y te dejo el resumen aquí.',
      hechos: ['El cliente pide la tarifa por escrito'],
    },
    {
      pregunta: 'Nuestro almacén principal también está en Sant Boi, por cierto.',
      base: 'Perfecto, lo tengo presente para calcular los plazos.',
      herramienta: 'consultar_crm',
      conHerramienta: 'Perfecto, ya lo tenía en tu ficha; lo uso para calcular los plazos.',
      hechos: ['El almacén principal del cliente está en Sant Boi'],
    },
  ],
  en: [
    {
      pregunta: 'How long does delivery to Barcelona take?',
      base: 'Barcelona city, 24 hours if the order comes in before 5pm; metro area, 48.',
      herramienta: 'consultar_crm',
      conHerramienta: 'I checked your CRM record: your last three shipments to Barcelona went out in 24 hours.',
      hechos: ['The client asks about deliveries to Barcelona'],
    },
    {
      pregunta: 'We are a shop with two warehouses, one in Sant Boi.',
      base: 'Noted. With a warehouse in Sant Boi you can serve the metro area same-day.',
      herramienta: 'leer_documentos',
      conHerramienta: 'Noted. Your contract lists the Sant Boi warehouse as a pickup point.',
      hechos: ['The client has two warehouses', 'One warehouse is in Sant Boi'],
    },
    {
      pregunta: 'Could you send me the rates in writing?',
      base: 'I will put together the current rates and summarise them here.',
      herramienta: 'enviar_correo',
      conHerramienta: 'Sending them by email right now, with the summary here too.',
      hechos: ['The client asked for rates in writing'],
    },
    {
      pregunta: 'Our main warehouse is in Sant Boi as well, by the way.',
      base: 'Good, I will keep that in mind for the delivery estimates.',
      herramienta: 'consultar_crm',
      conHerramienta: 'Good, it was already on your record; I use it for the delivery estimates.',
      hechos: ['The client main warehouse is in Sant Boi'],
    },
  ],
}

const T = {
  es: {
    badge: 'Agentes de IA',
    title: 'AgentForge',
    description:
      'La infraestructura para montar un agente de IA por cliente sin construirlo cada vez desde cero: se configura una vez —instrucciones, herramientas, memoria y marca— y el cliente recibe una dirección de chat suya. Lo que lo distingue es que el agente recuerda: acumula hechos sobre el cliente y los consolida cada noche.',
    stats: ['Campos de configuración', 'Herramientas', 'Flujos de n8n', 'Colecciones'],
    aviso: 'Demostración del flujo, no del producto en marcha. Las respuestas están escritas de antemano: aquí no hay ningún modelo de lenguaje detrás ni se envía nada a ninguna API. Lo que sí es real es cómo la configuración cambia la respuesta y cómo se acumula y consolida la memoria, que es el mecanismo del producto.',
    config: 'Configura el agente',
    configDesc: 'Los mismos campos que guarda el MVP en Firestore',
    nombre: 'Nombre del agente',
    tono: 'Tono',
    color: 'Color de marca',
    ventana: 'Ventana de memoria corta',
    ventanaAyuda: 'mensajes que se le pasan al modelo en cada turno',
    herramientas: 'Herramientas disponibles',
    prompt: 'Instrucciones del sistema',
    chat: 'Lo que recibe el cliente',
    chatDesc: 'Elige una pregunta y mira cómo responde con la configuración de la izquierda',
    escribe: 'Elige una de las preguntas para continuar la conversación',
    reiniciar: 'Empezar de nuevo',
    memoria: 'Memoria a largo plazo',
    memoriaDesc: 'Hechos que el motor extrae de la conversación y guarda para las siguientes',
    memoriaVacia: 'Todavía no hay hechos: empieza la conversación y aparecerán aquí.',
    consolidar: 'Consolidar (lo que hace el proceso nocturno)',
    consolidado: 'Consolidada: los hechos repetidos se han fundido en uno',
    yaConsolidada: 'No hay nada que fundir: ningún hecho se repite',
    tu: 'Tú',
    usando: 'usando',
    footerCtx: 'Respuestas de guion, sin modelo de lenguaje ni llamadas a ninguna API · El MVP real corre sobre React, Firebase y n8n ·',
  },
  en: {
    badge: 'AI agents',
    title: 'AgentForge',
    description:
      'The infrastructure to ship one AI agent per client without building it from scratch every time: configure it once — instructions, tools, memory and branding — and the client gets their own chat address. What sets it apart is that the agent remembers: it accumulates facts about the client and consolidates them nightly.',
    stats: ['Config fields', 'Tools', 'n8n workflows', 'Collections'],
    aviso: 'A demonstration of the flow, not of the running product. The replies are written in advance: there is no language model behind this page and nothing is sent to any API. What is real is how the configuration changes the reply and how memory accumulates and consolidates, which is the mechanism of the product.',
    config: 'Configure the agent',
    configDesc: 'The same fields the MVP stores in Firestore',
    nombre: 'Agent name',
    tono: 'Tone',
    color: 'Brand colour',
    ventana: 'Short-term memory window',
    ventanaAyuda: 'messages passed to the model on each turn',
    herramientas: 'Available tools',
    prompt: 'System prompt',
    chat: 'What the client gets',
    chatDesc: 'Pick a question and watch it answer with the configuration on the left',
    escribe: 'Pick one of the questions to carry on the conversation',
    reiniciar: 'Start over',
    memoria: 'Long-term memory',
    memoriaDesc: 'Facts the engine pulls out of the conversation and keeps for the next ones',
    memoriaVacia: 'No facts yet: start the conversation and they will show up here.',
    consolidar: 'Consolidate (what the nightly job does)',
    consolidado: 'Consolidated: repeated facts have been merged',
    yaConsolidada: 'Nothing to merge: no fact repeats',
    tu: 'You',
    usando: 'using',
    footerCtx: 'Scripted replies, no language model and no API calls · The real MVP runs on React, Firebase and n8n ·',
  },
}

const PROMPT_BASE = {
  es: 'Eres el asistente de {nombre}. Respondes en español, con tono {tono}, y no inventas datos que no estén en la ficha del cliente ni en las herramientas.',
  en: 'You are the assistant for {nombre}. Answer in English, in a {tono} tone, and never invent data that is not in the client record or the tools.',
}

/** Funde los hechos que hablan de lo mismo, que es lo que hace el proceso nocturno. */
function consolidar(hechos) {
  const clave = h => h.toLowerCase().replace(/[^a-záéíóúñ ]/gi, '').split(' ')
    .filter(p => p.length > 4).sort().join('|')
  const vistos = new Map()
  for (const h of hechos) {
    const k = clave(h)
    // Se queda el mas largo de los que hablan de lo mismo: es el que mas dice.
    if (!vistos.has(k) || vistos.get(k).length < h.length) vistos.set(k, h)
  }
  // Y los que comparten la mayor parte de sus palabras tambien se funden.
  const salida = []
  for (const h of vistos.values()) {
    const palabras = new Set(clave(h).split('|'))
    const gemelo = salida.findIndex(s => {
      const otras = new Set(clave(s).split('|'))
      const comunes = [...palabras].filter(p => otras.has(p)).length
      return comunes >= Math.min(palabras.size, otras.size) * 0.6 && comunes > 0
    })
    if (gemelo === -1) salida.push(h)
    else if (salida[gemelo].length < h.length) salida[gemelo] = h
  }
  return salida
}

export default function AgentForgePage() {
  const { lang } = useLang()
  const t = T[lang]
  const guion = GUION[lang]

  const [nombre, setNombre] = useState(lang === 'es' ? 'Asistente de Logística Prat' : 'Prat Logistics Assistant')
  const [tono, setTono] = useState('cercano')
  const [color, setColor] = useState('#6fae8c')
  const [ventana, setVentana] = useState(10)
  const [tools, setTools] = useState(['consultar_crm', 'agendar_cita'])
  const [turno, setTurno] = useState(0)
  const [mensajes, setMensajes] = useState([])
  const [hechos, setHechos] = useState([])
  const [nota, setNota] = useState('')

  const etiquetaTono = TONOS.find(x => x.id === tono)[lang].toLowerCase()
  const prompt = PROMPT_BASE[lang].replace('{nombre}', nombre || '—').replace('{tono}', etiquetaTono)

  function alternar(id) {
    setTools(t2 => (t2.includes(id) ? t2.filter(x => x !== id) : [...t2, id]))
  }

  function preguntar() {
    const paso = guion[turno]
    if (!paso) return
    const usa = tools.includes(paso.herramienta)
    // El tono no es decorativo: cambia como empieza la respuesta.
    const saludo = tono === 'formal' ? (lang === 'es' ? 'Buenos días. ' : 'Good morning. ')
      : tono === 'cercano' ? (lang === 'es' ? '¡Claro! ' : 'Of course! ') : ''
    setMensajes(m => [
      ...m,
      { de: 'tu', texto: paso.pregunta },
      {
        de: 'agente',
        texto: saludo + (usa ? paso.conHerramienta : paso.base),
        herramienta: usa ? paso.herramienta : null,
      },
    ])
    setHechos(h => [...h, ...paso.hechos])
    setTurno(n => n + 1)
    setNota('')
  }

  function reiniciar() {
    setTurno(0); setMensajes([]); setHechos([]); setNota('')
  }

  function alConsolidar() {
    const antes = hechos.length
    const despues = consolidar(hechos)
    setHechos(despues)
    setNota(despues.length < antes ? t.consolidado : t.yaConsolidada)
  }

  const campo = { background: FONDO, border: `1px solid ${BORDE}`, borderRadius: 7, color: '#e6ecf3', padding: '0.45rem 0.6rem', width: '100%', fontSize: '0.86rem' }
  // Solo en esta pagina: el resto de demos son titulo + grafico y ahi el
// centrado esta bien.
const IZQUIERDA = { textAlign: 'left' }
const etiqueta = { display: 'block', fontSize: '0.76rem', color: TENUE, marginBottom: '0.25rem', marginTop: '0.8rem' }

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href={REPO} target="_blank" rel="noreferrer">agentforge</a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor="#8b7fc7"
        title={t.title}
        description={t.description}
        stats={[
          { value: '6', label: t.stats[0] },
          { value: String(HERRAMIENTAS.length), label: t.stats[1] },
          { value: '2', label: t.stats[2] },
          { value: '4', label: t.stats[3] },
        ]}
        techs={['React', 'Firebase', 'Firestore', 'n8n', 'Claude']}
        githubUrl={REPO}
      />

      <main>
        <div className="card" style={{ borderColor: '#d0a45866', marginBottom: '1rem' }}>
          <p className="card-desc" style={{ margin: 0, color: '#d0a458' }}>{t.aviso}</p>
        </div>

        <div className="grid grid-2">
          <div className="card" style={IZQUIERDA}>
            <h2 style={{ textAlign: 'center' }}>{t.config}</h2>
            <p className="card-desc" style={{ textAlign: 'center' }}>{t.configDesc}</p>

            <label style={etiqueta} htmlFor="af-nombre">{t.nombre}</label>
            <input id="af-nombre" style={campo} value={nombre} onChange={e => setNombre(e.target.value)} />

            <label style={etiqueta} htmlFor="af-tono">{t.tono}</label>
            <select id="af-tono" style={campo} value={tono} onChange={e => setTono(e.target.value)}>
              {TONOS.map(x => <option key={x.id} value={x.id}>{x[lang]}</option>)}
            </select>

            <label style={etiqueta} htmlFor="af-color">{t.color}</label>
            <input
              id="af-color" type="color" value={color} onChange={e => setColor(e.target.value)}
              style={{ ...campo, height: 38, padding: '0.15rem', cursor: 'pointer' }}
            />

            <label style={etiqueta} htmlFor="af-ventana">
              {t.ventana}: <strong style={{ color }}>{ventana}</strong> {t.ventanaAyuda}
            </label>
            <input
              id="af-ventana" type="range" min="2" max="30" step="1" value={ventana}
              onChange={e => setVentana(Number(e.target.value))} style={{ width: '100%', accentColor: color }}
            />

            <span style={etiqueta}>{t.herramientas}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {HERRAMIENTAS.map(h => {
                const on = tools.includes(h.id)
                return (
                  <button
                    key={h.id} type="button" onClick={() => alternar(h.id)} aria-pressed={on}
                    style={{
                      border: `1px solid ${on ? color : BORDE}`,
                      color: on ? color : TENUE,
                      background: on ? color + '1f' : 'transparent',
                      borderRadius: 999, padding: '0.2rem 0.7rem', fontSize: '0.78rem', cursor: 'pointer',
                    }}
                  >
                    {h[lang]}
                  </button>
                )
              })}
            </div>

            <label style={etiqueta} htmlFor="af-prompt">{t.prompt}</label>
            <textarea id="af-prompt" readOnly value={prompt} rows={3} style={{ ...campo, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>

          <div className="card" style={IZQUIERDA}>
            <h2 style={{ textAlign: 'center' }}>{t.chat}</h2>
            <p className="card-desc" style={{ textAlign: 'center' }}>{t.chatDesc}</p>

            <div
              style={{
                border: `1px solid ${BORDE}`, borderRadius: 10, marginTop: '0.8rem',
                overflow: 'hidden', background: FONDO,
              }}
            >
              <div style={{ background: color, color: '#0d1520', padding: '0.5rem 0.8rem', fontWeight: 600, fontSize: '0.9rem' }}>
                {nombre || '—'}
              </div>
              <div style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', minHeight: 210 }}>
                {mensajes.length === 0 && <p className="card-desc" style={{ margin: 0 }}>{t.escribe}</p>}
                {mensajes.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.de === 'tu' ? 'flex-end' : 'flex-start', maxWidth: '86%' }}>
                    <div
                      style={{
                        background: m.de === 'tu' ? '#1b2635' : color + '1f',
                        border: `1px solid ${m.de === 'tu' ? BORDE : color + '55'}`,
                        borderRadius: 10, padding: '0.45rem 0.7rem', fontSize: '0.85rem',
                      }}
                    >
                      {m.texto}
                    </div>
                    {m.herramienta && (
                      <div style={{ fontSize: '0.7rem', color: TENUE, marginTop: '0.2rem' }}>
                        {t.usando}: {HERRAMIENTAS.find(h => h.id === m.herramienta)[lang]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.7rem' }}>
              {turno < guion.length && (
                <button
                  type="button" onClick={preguntar}
                  style={{
                    border: `1px solid ${color}`, background: color + '1f', color,
                    borderRadius: 8, padding: '0.35rem 0.8rem', fontSize: '0.82rem',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  «{guion[turno].pregunta}»
                </button>
              )}
              {mensajes.length > 0 && (
                <button
                  type="button" onClick={reiniciar}
                  style={{
                    border: `1px solid ${BORDE}`, background: 'transparent', color: TENUE,
                    borderRadius: 8, padding: '0.35rem 0.8rem', fontSize: '0.82rem', cursor: 'pointer',
                  }}
                >
                  {t.reiniciar}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-1">
          <div className="card" style={IZQUIERDA}>
            <h2 style={{ textAlign: 'center' }}>{t.memoria}</h2>
            <p className="card-desc" style={{ textAlign: 'center' }}>{t.memoriaDesc}</p>

            {hechos.length === 0 ? (
              <p className="card-desc" style={{ marginTop: '0.7rem' }}>{t.memoriaVacia}</p>
            ) : (
              <ul style={{ margin: '0.8rem 0 0', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {hechos.map((h, i) => (
                  <li key={h + i} style={{ fontSize: '0.86rem' }}>{h}</li>
                ))}
              </ul>
            )}

            {hechos.length > 1 && (
              <div style={{ marginTop: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                <button
                  type="button" onClick={alConsolidar}
                  style={{
                    border: `1px solid ${color}`, background: color + '1f', color,
                    borderRadius: 8, padding: '0.35rem 0.9rem', fontSize: '0.82rem', cursor: 'pointer',
                  }}
                >
                  {t.consolidar}
                </button>
                {nota && <span style={{ fontSize: '0.82rem', color: TENUE }}>{nota}</span>}
              </div>
            )}
          </div>
        </div>
      </main>

      <BusinessCta service="ia-automatizacion" />
      <PortfolioFooter context={context} />
    </div>
  )
}
