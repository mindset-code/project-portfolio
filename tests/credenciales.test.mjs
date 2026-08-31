// El portafolio publica titulaciones. Una credencial que el emisor no
// respalda es una afirmacion falsa, y aqui llego a publicarse incluso el
// identificador de la credencial. Estas pruebas leen el codigo fuente y
// fallan antes de que vuelva a colarse.

import { strict as assert } from 'node:assert'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const RAIZ = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const EXTENSIONES = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.md'])

function ficheros(dir) {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre)
    if (statSync(ruta).isDirectory()) return ficheros(ruta)
    return EXTENSIONES.has(extname(nombre)) ? [ruta] : []
  })
}

// Credenciales sin respaldo documental: no se publican.
const PROHIBIDAS = [
  /ISC.?2/i,
  /Certified in Cybersecurity/i,
  /Palo Alto Networks Cybersecurity/i,
  /IBM Data (Analyst|Science)/i,
  /Google Data Analytics/i,
]

const FUENTES = [...ficheros(join(RAIZ, 'src')), join(RAIZ, 'README.md')]

test('el recorrido encuentra fuentes que revisar', () => {
  assert.ok(
    FUENTES.length > 5,
    'solo ' + FUENTES.length + ' ficheros: el test estaria pasando en vacio',
  )
})

test('no se publica ninguna credencial sin respaldo', () => {
  const encontrados = []
  for (const ruta of FUENTES) {
    const texto = readFileSync(ruta, 'utf8')
    for (const patron of PROHIBIDAS) {
      if (patron.test(texto)) encontrados.push(ruta.replace(RAIZ, '.') + ': ' + patron)
    }
  }
  assert.deepEqual(encontrados, [], 'Credencial sin respaldo:\n  ' + encontrados.join('\n  '))
})
