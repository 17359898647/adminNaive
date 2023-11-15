import type { PluginOption } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export function viteDevtools(): PluginOption {
  return VueDevTools()
}
