import { vitePluginRouterKey } from '@gedatou/vite-plugin-vue-routerkey'
import type { PluginOption } from 'vite'

export function createRouterType(): PluginOption {
  return vitePluginRouterKey({
    dir: '/src/views',
    dts: '/src/types/routerTypeKeys.d.ts',
  })
}
