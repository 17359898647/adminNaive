import process from 'node:process'
import type { PluginOption } from 'vite'
import checker from 'vite-plugin-checker'

export function TypeCheck(): PluginOption {
  return !process.env.VITEST
    ? checker({
      typescript: true,
      vueTsc: true,
    })
    : false
}
