/** Quien firma este portafolio.
 *
 *  El mismo codigo produce DOS sitios que sirven a publicos distintos y que no
 *  pueden decir lo mismo:
 *
 *  - El del despacho, sin nombre. Aqui aterriza el trafico que viene de
 *    mindset-code.com —cada ficha de /codigo enlaza su demo— y en ese contexto
 *    quien firma es la marca, no una persona.
 *
 *  - El personal, con nombre. Es el enlace que se manda en una candidatura, y
 *    un reclutador tiene que saber de quien es el trabajo que esta mirando.
 *
 *  ESTE REPOSITORIO ES PUBLICO Y VIVE EN LA ORGANIZACION, asi que aqui no hay
 *  ni un dato personal: los valores por defecto son los de la marca. La
 *  variante personal se inyecta al compilar, desde `.env.personal`, que esta
 *  en .gitignore y solo existe en la maquina desde la que se despliega.
 *
 *      npm run build            -> el del despacho (sin nombre)
 *      npm run build:personal   -> el personal (lee .env.personal)
 *
 *  Sin ese fichero sale el del despacho. Es deliberado: si alguien clona el
 *  repositorio y compila, obtiene la version publicable, nunca la firmada.
 */

const env = import.meta.env

/** Hay variante personal solo si la compilacion aporta un titular. */
export const DE_MARCA = !env.VITE_TITULAR

const MARCA = 'Mindset & Code'

export const IDENTIDAD = {
  /** Titular de la portada. */
  titular: env.VITE_TITULAR || MARCA,

  /** Cabecera, presente en TODAS las paginas incluidos los paneles. */
  cabecera: env.VITE_CABECERA || env.VITE_TITULAR || MARCA,

  subtitulo: DE_MARCA
    ? 'Datos, IA y desarrollo · el taller'
    : `${MARCA} · datos, IA y desarrollo`,

  /** Lo que se anade a la linea del pie, detras de la marca. */
  firmaPie: env.VITE_TITULAR ? ` · ${env.VITE_TITULAR}` : '',

  /** Retrato de la portada. El nombre del fichero tampoco firma. */
  retrato: env.VITE_RETRATO || '/retrato.jpg',

  /** Los enlaces del pie. En la version de marca no salen del dominio de la
   *  empresa; en la personal apuntan a los perfiles de la persona. */
  urlLinkedIn: env.VITE_LINKEDIN || 'https://mindset-code.com/es',
  rotuloLinkedIn: env.VITE_LINKEDIN
    ? env.VITE_LINKEDIN.replace(/^https?:\/\/(www\.)?/, '')
    : 'mindset-code.com',

  urlGitHub: env.VITE_GITHUB || 'https://github.com/mindset-code',
  rotuloGitHub: env.VITE_GITHUB
    ? env.VITE_GITHUB.replace(/^https?:\/\/(www\.)?/, '')
    : 'GitHub',
}
