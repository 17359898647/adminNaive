import { getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import type { PluginOption } from 'vite'

export function autoRouter(): PluginOption {
  return VueRouter({
    dts: 'src/types/auto-router.d.ts',
    exclude: ['**/_*', '**/_*/**/*'],
    getRouteName(file) {
      return getPascalCaseRouteName(file)
    },
    importMode: 'async',
    routesFolder: 'src/views',
  })
}
