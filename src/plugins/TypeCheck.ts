import process from 'node:process'
import type { PluginOption } from 'vite'
import checker from '@hyoban/vite-plugin-checker'

export function TypeCheck(): PluginOption {
  return !process.env.VITEST
    ? checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"',
        useFlatConfig: true,
      },
      typescript: true,
      vueTsc: true,
    })
    : false
}
