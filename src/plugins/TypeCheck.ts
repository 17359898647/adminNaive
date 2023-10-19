import type { PluginOption } from 'vite'
import checker from 'vite-plugin-checker'

export function TypeCheck(): PluginOption {
  return checker({
    typescript: true,
    vueTsc: true,
    eslint: {
      lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}',
    },
  })
}
