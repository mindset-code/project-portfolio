#!/usr/bin/env bash
# init.sh — project-portfolio (React + Vite, sitio portafolio)
set -euo pipefail

PASS=0; FAIL=0
green() { echo -e "\033[32m✓ $1\033[0m"; }
red()   { echo -e "\033[31m✗ $1\033[0m"; }
warn()  { echo -e "\033[33m⚠ $1\033[0m"; }
info()  { echo -e "\033[36m→ $1\033[0m"; }
check() { local l="$1"; shift; if "$@" &>/dev/null; then green "$l"; PASS=$((PASS + 1)); else red "$l"; FAIL=$((FAIL + 1)); fi; }

echo ""; info "project-portfolio — verificación pre-sesión"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""; info "Estructura"
check "package.json existe"       test -f "package.json"
check "vite.config.js existe"     test -f "vite.config.js"
check "CLAUDE.md en .gitignore"   grep -q "CLAUDE.md" ".gitignore"
check "node_modules instalados"   test -d "node_modules"

[ ! -d ".claude/progress" ] && mkdir -p ".claude/progress" && warn ".claude/progress creado" || { green ".claude/progress existe"; PASS=$((PASS + 1)); }

echo ""; info "Lint"
check "Lint sin errores" npm run lint

echo ""; info "Build"
check "Build de producción" npm run build

echo ""; info "Git"
UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
[ "$UNCOMMITTED" -gt 0 ] && warn "$UNCOMMITTED archivo(s) sin commit" || { green "Working tree limpio"; PASS=$((PASS + 1)); }

echo ""; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Resultado: $PASS ✓  $FAIL ✗"
[ "$FAIL" -gt 0 ] && { red "PROYECTO EN MAL ESTADO — Resuelve los errores antes de continuar"; exit 1; } || { green "Proyecto verificado — puedes empezar"; exit 0; }
