import VueRouter from 'unplugin-vue-router/vite'
import type { PluginOption } from 'vite'

export function autoRouter(): PluginOption {
  return VueRouter({
    routesFolder: 'src/views',
    importMode: 'async',
    exclude: ['**/_*', '**/_*/**/*'],
    dts: 'src/types/auto-router.d.ts',
    // getRouteName: (file) => {
    //   return getFileBasedRouteName(file)
    // },
  })
}
