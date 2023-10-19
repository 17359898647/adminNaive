/* prettier-ignore */
// @ts-nocheck
import process from 'node:process'
import type { PluginOption } from 'vite'
import checker from '@hyoban/vite-plugin-checker'

export function TypeCheck(): PluginOption {
  return !process.env.VITEST
    ? checker({
      typescript: true,
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"',
        useFlatConfig: true,
      },
    })
    : false
}
