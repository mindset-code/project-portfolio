import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // dist-* son salida de compilacion. public/demos/ son copias literales de
  // otros repositorios —el simulador de ingresos, sin ir mas lejos— que se
  // publican tal cual: no se editan aqui, asi que sus avisos no son deuda
  // propia y solo servian para enterrar los errores que si lo son. Con ellos
  // dentro, el lint daba 460 errores y no habia quien lo leyera.
  globalIgnores(['dist', 'dist-marca', 'dist-personal', 'public/demos']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
