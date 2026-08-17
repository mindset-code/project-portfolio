import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'

/**
 * Publica la variante firmada del portafolio.
 *
 * El identificador del sitio personal NO puede estar en este repositorio: es
 * publico y pertenece a la organizacion, y quien lo lea no debe poder llegar
 * desde aqui al portafolio que lleva el nombre. Asi que sale de `.env.personal`
 * —que esta en `.gitignore`— y la configuracion de Firebase se genera al vuelo
 * en un fichero temporal, tambien ignorado, que se borra al terminar.
 */
const CONFIG = 'firebase.personal.json'

const entorno = Object.fromEntries(
  readFileSync('.env.personal', 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trimStart().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const sitio = entorno.SITIO_PERSONAL
if (!sitio) {
  console.error('Falta SITIO_PERSONAL en .env.personal (el id del sitio de Firebase).')
  process.exit(1)
}

writeFileSync(
  CONFIG,
  JSON.stringify(
    {
      hosting: {
        site: sitio,
        public: 'dist-personal',
        ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
        rewrites: [{ source: '**', destination: '/index.html' }],
      },
    },
    null,
    2,
  ),
)

/**
 * La fotografia no esta en `public/`. Si estuviera, la compilacion de marca
 * —que copia `public/` entera— la publicaria tambien, y esa es la variante
 * que no debe llevar cara. Vive en `personal/`, ignorada por git, y solo
 * llega a la salida de esta variante.
 */
const FOTO = 'personal/retrato.jpg'
if (existsSync(FOTO)) {
  copyFileSync(FOTO, 'dist-personal/retrato.jpg')
} else {
  console.warn(`Aviso: no existe ${FOTO}; la portada saldra con el logotipo.`)
}

try {
  execFileSync('firebase', ['deploy', '--only', 'hosting', '--config', CONFIG], {
    stdio: 'inherit',
  })
} finally {
  unlinkSync(CONFIG)
}
