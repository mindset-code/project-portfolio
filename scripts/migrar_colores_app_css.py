"""Migra src/App.css del tema oscuro antiguo a los tokens --g-* de la identidad G.

Uso:  python scripts/migrar_colores_app_css.py [--comprobar]

No es una busqueda y reemplazo de colores a ciegas: el mismo hex hacia un papel
distinto segun la propiedad. #1a2533 era la superficie de las tarjetas cuando
iba en `background`, pero una raya divisoria cuando iba en `border-bottom`; en
el tema claro lo primero pasa a la banda azul y lo segundo desaparece, porque
la identidad separa superficies por un paso de tono y no con contornos de 1 px.

Lo que hace, regla a regla (bloques sin llaves anidadas, con su selector):
  - background*: mapa FONDO. Los degradados se sustituyen por un tono liso.
  - color / fill / -webkit-text-fill-color: mapa TINTA (contraste >= 4,5:1).
  - border* con grosor (1px solid ...): a 0. Se conserva solo el subrayado
    funcional de las pestanas (.auto-tab).
  - border-*-color sueltos: mapa TINTA (inofensivo sin grosor).
  - box-shadow: fuera, salvo el desplegable de la barra, que flota sobre el
    contenido y recibe una sombra suave de la marca.
  - text-transform: uppercase y letter-spacing positivo: fuera (nada de
    rotulos en mayusculas con interletraje ancho).
  - font-weight 700/800/900: a 600, la seminegrita de Geist.
  - font-family: a las variables de theme-brand.css.
  - transform: translateY(-Npx) en :hover: fuera (las tarjetas no saltan).

Es idempotente: sobre un App.css ya migrado no encuentra nada que cambiar.
Con --comprobar no escribe y sale con 1 si queda algun hex del tema antiguo.
"""
import re
import sys
from collections import Counter
from pathlib import Path

RUTA = Path(__file__).resolve().parent.parent / 'src' / 'App.css'

FONDO = {
    '#101722': 'var(--g-blanco)',   # fondo de pagina e interiores de tarjeta
    '#0c1119': 'var(--g-banda)',    # bandas de cabecera
    '#1a2533': 'var(--g-banda)',    # superficie de tarjeta
    '#16202e': 'var(--g-banda)',
    '#060f1e': 'var(--g-banda)',
    '#0f1f3d': 'var(--g-banda)',
    '#2c3d50': 'var(--g-banda)',
    '#243047': 'var(--g-suave)',    # estados :hover de tarjeta
    '#273549': 'var(--g-suave)',
    '#0f1f38': 'var(--g-suave)',
    '#1e3a5f': 'var(--g-suave)',
    '#1c1f2e': 'var(--g-suave)',
    '#4a5b6e': 'var(--g-suave)',
    '#1d4ed8': 'var(--g-azul)',     # botones
    '#3b6290': 'var(--g-azul)',
    '#4f7fae': 'var(--g-azul-2)',
    '#0f3d22': 'var(--g-bien-suave)',
    '#1a2744': 'var(--g-blanco)',   # cajas del diagrama de arquitectura
    '#2a1f0a': 'var(--g-blanco)',
    '#1a1a3a': 'var(--g-blanco)',
    '#1e1e1e': 'var(--g-blanco)',
    '#1a2a1a': 'var(--g-blanco)',
    '#7ea6d4': 'var(--g-azul-2)',
    '#fff': 'var(--g-blanco)',
}

TINTA = {
    '#f5f1ea': 'var(--g-hondo)',    # titulares
    '#faf7f1': 'var(--g-hondo)',
    '#dde5ef': 'var(--g-texto)',    # texto corrido
    '#c4d1e3': 'var(--g-texto)',
    '#a9b6c5': 'var(--g-texto-2)',
    '#7b8a9c': 'var(--g-tenue)',
    '#4a5b6e': 'var(--g-tenue)',
    '#2c3d50': 'var(--g-tenue)',
    '#496686': 'var(--g-tenue)',
    '#7ea6d4': 'var(--g-azul-2)',   # enlaces y acentos
    '#9aa9c8': 'var(--g-azul-2)',
    '#3b6290': 'var(--g-azul)',
    '#c2a98b': 'var(--g-azul)',
    '#1d4ed8': 'var(--g-azul)',
    '#6fae8c': 'var(--g-bien)',     # semanticos
    '#4f9273': 'var(--g-bien)',
    '#a7f3d0': 'var(--g-bien)',
    '#d0a458': 'var(--g-aviso)',
    '#d18a86': 'var(--g-mal)',
    '#fff': 'var(--g-blanco)',
    '#d9d2c4': 'var(--g-linea)',
    '#f472b8': 'var(--g-azul-2)',
}

# Colores que solo aparecen en @media print, que ya es claro: se dejan.
IMPRESION = {'#000', '#333', '#666', '#ccc', '#f5f5f5', '#f9fafb'}

HEX = re.compile(r'#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b')
BLOQUE = re.compile(r'([^{}]+)\{([^{}]*)\}')
DECL = re.compile(r'(?P<pre>\s*)(?P<prop>-?[a-zA-Z-]+)\s*:\s*(?P<val>[^;]+?)\s*;')

cambios = Counter()


def mapa(valor, tabla, papel):
    def sub(m):
        h = m.group(0).lower()
        alfa = None
        if len(h) == 9:
            h, alfa = h[:7], int(h[7:], 16)
        if h in IMPRESION:
            return m.group(0)
        # un hex con transparencia es un tinte del color: se parte de su tinta
        orden = (TINTA, tabla, FONDO) if alfa is not None else (tabla, TINTA, FONDO)
        nuevo = next((t[h] for t in orden if h in t), None)
        if not nuevo:
            return m.group(0)
        cambios[f'{papel} {m.group(0).lower()} -> {nuevo}'] += 1
        if alfa is not None:
            return f'color-mix(in srgb, {nuevo} {round(alfa / 255 * 100)}%, transparent)'
        return nuevo
    return HEX.sub(sub, valor)


def transforma(selector, cuerpo):
    sel = ' '.join(re.sub(r'/\*.*?\*/', '', selector, flags=re.S).split())

    def decl(m):
        pre, prop, val = m.group('pre'), m.group('prop').lower(), m.group('val')
        original = m.group(0)

        if prop in ('background', 'background-color'):
            if 'gradient' in val:
                if 'dash-hero-title' in sel:
                    cambios['degradado de texto fuera'] += 1
                    return ''
                cambios[f'degradado -> tono liso ({sel})'] += 1
                liso = {'home-avatar': 'var(--g-azul)'}.get(
                    next((k for k in ('home-avatar',) if k in sel), ''), 'var(--g-banda)')
                return f'{pre}{prop}: {liso};'
            if 'scrollbar' in sel:
                return f'{pre}{prop}: {mapa(val, {"#2c3d50": "var(--g-linea)"}, "fondo")};'
            if 'rgba(16, 185, 129' in val:
                cambios['nota verde -> --g-bien-suave'] += 1
                return f'{pre}{prop}: var(--g-bien-suave);'
            return f'{pre}{prop}: {mapa(val, FONDO, "fondo")};'

        if prop in ('-webkit-background-clip', 'background-clip', '-webkit-text-fill-color') and 'dash-hero-title' in sel:
            return ''

        if prop in ('color', 'fill', '-webkit-text-fill-color', 'stroke'):
            return f'{pre}{prop}: {mapa(val, TINTA, "tinta")};'

        if prop in ('border', 'border-top', 'border-right', 'border-bottom', 'border-left'):
            if re.match(r'^\d*\.?\d+px\s+solid', val.strip()):
                if sel == '.auto-tab' and prop == 'border-bottom':
                    return original
                cambios[f'{prop} con grosor -> 0'] += 1
                return f'{pre}{prop}: 0;'
            return original

        if prop in ('border-color', 'border-left-color', 'border-bottom-color', 'border-top-color', 'outline-color'):
            return f'{pre}{prop}: {mapa(val, TINTA, "borde")};'

        if prop == 'box-shadow':
            if sel == '.nav-dropdown':
                cambios['sombra del desplegable'] += 1
                return f'{pre}box-shadow: 0 1px 2px rgba(44, 74, 110, 0.12), 0 12px 32px rgba(44, 74, 110, 0.14);'
            cambios['box-shadow fuera'] += 1
            return ''

        if prop == 'scrollbar-color':
            return f'{pre}{prop}: {mapa(val, {"#2c3d50": "var(--g-linea)"}, "barra")};'

        if prop == 'text-transform' and val.strip() == 'uppercase':
            cambios['uppercase fuera'] += 1
            return ''

        if prop == 'letter-spacing':
            v = val.strip()
            if not v.startswith('-') and v not in ('0', 'normal'):
                cambios['letter-spacing positivo fuera'] += 1
                return ''
            return original

        if prop == 'font-weight' and val.strip() in ('700', '800', '900'):
            cambios[f'font-weight {val.strip()} -> 600'] += 1
            return f'{pre}font-weight: 600;'

        if prop == 'font-family' and not val.strip().startswith('var('):
            if 'monospace' in val:
                return f'{pre}font-family: var(--mono);'
            cambios['font-family -> var(--sans)'] += 1
            return f'{pre}font-family: var(--sans);'

        if prop == 'transform' and ':hover' in sel and re.match(r'translateY\(-\d', val.strip()):
            cambios['salto en :hover fuera'] += 1
            return ''

        return original

    nuevo = DECL.sub(decl, cuerpo)
    # declaraciones eliminadas dejan lineas vacias: se recogen
    nuevo = re.sub(r'\n[ \t]*\n(?=[ \t]*[-a-zA-Z}])', '\n', nuevo)
    return selector + '{' + nuevo + '}'


def main():
    comprobar = '--comprobar' in sys.argv
    texto = RUTA.read_text(encoding='utf-8')
    salida = BLOQUE.sub(lambda m: transforma(m.group(1), m.group(2)), texto)
    restos = Counter(h.lower() for h in HEX.findall(salida) if h.lower() not in IMPRESION)
    print(f'{sum(cambios.values())} cambios en {len(cambios)} clases de cambio')
    for k, v in sorted(cambios.items(), key=lambda kv: -kv[1]):
        print(f'  {v:4}  {k}')
    print('hex que quedan fuera de los mapas:', dict(restos) or 'ninguno')
    if comprobar:
        sys.exit(1 if restos else 0)
    if salida != texto:
        # el arbol de trabajo va en CRLF (core.autocrlf=true); git guarda LF
        RUTA.write_text(salida, encoding='utf-8', newline='\r\n')
        print('escrito', RUTA)


if __name__ == '__main__':
    main()
