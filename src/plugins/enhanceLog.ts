/* prettier-ignore */
// @ts-nocheck
import type { PluginOption } from 'vite'
import TurboConsole from 'vite-plugin-turbo-console'

export function enhanceLog(): PluginOption {
  return TurboConsole({
    disableLaunchEditor: false,
    prefix: '🦕',
  })
}
