/** Quien firma este portafolio.
 *
 *  El mismo codigo produce DOS sitios, que sirven a dos publicos distintos y
 *  que no pueden decir lo mismo:
 *
 *  - proyectos-personales.web.app
 *    El portafolio personal, con nombre. Es el enlace que se manda en una
 *    candidatura, y un reclutador tiene que saber de quien es el trabajo que
 *    esta mirando.
 *
 *  - proyectos.personales.mindset-code.com
 *    El taller del despacho, sin nombre. Aqui aterriza el trafico que viene de
 *    mindset-code.com —cada ficha de /codigo enlaza su demo— y en ese contexto
 *    quien firma es la marca, no una persona.
 *
 *  La version se elige AL COMPILAR:
 *
 *      npm run build              -> el personal (con nombre)
 *      VITE_MARCA=1 npm run build -> el del despacho (sin nombre)
 *
 *  Sin la variable sale el personal, que es el que existia antes: si alguien
 *  compila sin saber de esto, el resultado es el de siempre y no el otro.
 */

export const DE_MARCA = import.meta.env.VITE_MARCA === '1'

export const IDENTIDAD = {
  /** Titular de la portada. */
  titular: DE_MARCA ? 'Mindset & Code' : 'Mindset & Code',

  /** Cabecera, presente en TODAS las paginas incluidos los paneles. */
  cabecera: DE_MARCA ? 'Mindset & Code' : 'Mindset & Code',
  subtitulo: DE_MARCA
    ? 'Datos, IA y desarrollo · el taller'
    : 'Mindset & Code · datos, IA y desarrollo',

  /** Lo que se anade a la linea del pie, detras de la marca. */
  firmaPie: DE_MARCA ? '' : ' · Mindset & Code',

  /** El texto de los enlaces del pie. El destino no cambia: lo que cambia es
   *  si la direccion se lee como una firma. */
  rotuloLinkedIn: DE_MARCA ? 'LinkedIn' : 'linkedin.com/company/mindset-code',
  rotuloGitHub: DE_MARCA ? 'GitHub' : 'github.com/mindset-code',
}
