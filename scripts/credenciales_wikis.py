#!/usr/bin/env python3
"""Recorre las WIKIS de los repositorios publicos y falla si aparece una
credencial que el emisor no respalda.

Por que existe este fichero
---------------------------
Las pruebas de credenciales que ya hay (`tests/test_credenciales.py` en los dos
repos de seguridad, `tests/credenciales.test.mjs` en el portafolio) recorren el
texto DEL REPOSITORIO. Una wiki de GitHub es OTRO repositorio git
(`<repo>.wiki.git`), asi que quedaba fuera de todas ellas. La credencial
reaparecio en la wiki del perfil personal, y ninguna prueba podia verla: era el
octavo sitio en ocho limpiezas.

Como se permite el temario sin abrir un agujero
-----------------------------------------------
Las wikis de los dos proyectos de seguridad citan el dominio *Security
Operations* de la ISC2 CC como el TEMARIO del que sale el razonamiento de
triaje. Eso describe un plan de estudios publico y no afirma tener el titulo, y
se revisó a mano el 2026-08-31.

No se intenta distinguir por el texto de la linea: la mencion y el nombre del
dominio caen en lineas distintas por el ajuste de margenes, asi que un permiso
por linea da falsos positivos. Lo que se fija es el NUMERO de menciones de cada
fichero revisado. Reformular una frase no rompe la comprobacion; anadir una
mencion nueva, si — y eso es exactamente lo que hay que revisar a mano.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import tempfile
from collections import Counter
from pathlib import Path

REPOS = [
    "mindset-code/pyverifactu-huella",
    "mindset-code/calendario-fiscal-es",
    "mindset-code/facturae-es",
    "mindset-code/agentforge",
    "mindset-code/blog-assets",
    "mindset-code/burger-house-3d",
    "mindset-code/cinematic-web-service",
    "mindset-code/project-portfolio",
    "mindset-code/project-churn-analysis",
    "mindset-code/project-executive-dashboard-data",
    "mindset-code/project-hotel-pricing-engine",
    "mindset-code/project-revenue-management-web",
    "mindset-code/project-sales-optimization-sql",
    "mindset-code/project-sales-weather-etl",
    "mindset-code/project-security-log-analysis",
    "mindset-code/project-vulnerability-scanner",
    "Guillermo1987/Guillermo1987",
]

PROHIBIDAS = [
    re.compile(r"ISC.?2", re.IGNORECASE),
    re.compile(r"Certified in Cybersecurity", re.IGNORECASE),
    re.compile(r"Palo Alto Networks Cybersecurity", re.IGNORECASE),
    re.compile(r"IBM Data (Analyst|Science)", re.IGNORECASE),
    re.compile(r"Google Data Analytics", re.IGNORECASE),
]

# Menciones revisadas a mano el 2026-08-31: citan el temario, no la credencial.
# Cualquier desviacion de estas cifras hace fallar la comprobacion.
REVISADAS = {
    ("mindset-code/project-security-log-analysis", "Home.md"): 2,
    ("mindset-code/project-security-log-analysis", "Reglas-de-deteccion.md"): 4,
    ("mindset-code/project-vulnerability-scanner", "Home.md"): 4,
    ("mindset-code/project-vulnerability-scanner", "Reportes-generados.md"): 2,
}


def clonar(slug: str, destino: Path) -> Path | None:
    """Clona la wiki. Devuelve None si el repositorio de wiki no existe."""
    resultado = subprocess.run(
        ["git", "clone", "--depth", "1", "--quiet",
         f"https://github.com/{slug}.wiki.git", str(destino)],
        capture_output=True, text=True,
    )
    return destino if resultado.returncode == 0 else None


def contar(raiz: Path) -> Counter:
    """Menciones prohibidas por fichero."""
    cuenta: Counter = Counter()
    for fichero in sorted(raiz.rglob("*.md")):
        for linea in fichero.read_text(encoding="utf-8").splitlines():
            if any(p.search(linea) for p in PROHIBIDAS):
                cuenta[fichero.name] += 1
    return cuenta


def revisar(slug: str, raiz: Path) -> list[str]:
    fallos = []
    cuenta = contar(raiz)
    ficheros = set(cuenta) | {f for (s, f) in REVISADAS if s == slug}
    for nombre in sorted(ficheros):
        hay = cuenta.get(nombre, 0)
        permitidas = REVISADAS.get((slug, nombre), 0)
        if hay > permitidas:
            fallos.append(
                f"{slug} :: {nombre}: {hay} mencion(es), {permitidas} revisada(s). "
                f"Hay {hay - permitidas} sin revisar."
            )
        elif hay < permitidas:
            fallos.append(
                f"{slug} :: {nombre}: {hay} mencion(es) y se esperaban {permitidas}. "
                f"Si se han retirado a proposito, baja la cifra en REVISADAS."
            )
    return fallos


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dir", type=Path, help="revisar un directorio local en vez de clonar")
    parser.add_argument("--slug", default="local", help="nombre a mostrar cuando se usa --dir")
    args = parser.parse_args()

    if args.dir:
        fallos = revisar(args.slug, args.dir)
        revisadas, sin_wiki = 1, []
    else:
        fallos, sin_wiki = [], []
        revisadas = 0
        with tempfile.TemporaryDirectory() as tmp:
            for slug in REPOS:
                raiz = clonar(slug, Path(tmp) / slug.replace("/", "__"))
                if raiz is None:
                    sin_wiki.append(slug)
                    continue
                revisadas += 1
                fallos.extend(revisar(slug, raiz))

    print(f"Wikis revisadas: {revisadas}")
    if sin_wiki:
        print(f"Sin wiki: {', '.join(sin_wiki)}")

    # Una comprobacion que no encuentra nada que mirar pasa por vacio y no
    # prueba nada. Peor todavia: si una wiki deja de clonarse —repo pasado a
    # privado, renombrado, caida de red— la cobertura se pierde EN SILENCIO y
    # el resultado sigue siendo verde. Por eso se fija cuantas tiene que haber.
    if not args.dir:
        if revisadas < len(REPOS):
            print(
                f"\nFALLO: se esperaban {len(REPOS)} wikis y se revisaron {revisadas}.\n"
                "Una wiki que no se puede clonar no es una wiki limpia: es una wiki\n"
                "que nadie ha mirado. Averigua por que y arregla la lista o el acceso."
            )
            return 2
    elif revisadas == 0:
        print("\nFALLO: no se reviso ninguna wiki; estaria pasando por vacio.")
        return 2

    if fallos:
        print(f"\nFALLO: {len(fallos)} fichero(s) con menciones sin revisar:\n")
        for f in fallos:
            print(f"  {f}")
        print(
            "\nUna credencial que el emisor no respalda es una afirmacion publica falsa.\n"
            "Retirala de la wiki, o revisa la mencion y ajusta REVISADAS si describe\n"
            "un temario publico y no una credencial en posesion de nadie."
        )
        return 1

    print("\nOK: ninguna credencial sin revisar en las wikis.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
