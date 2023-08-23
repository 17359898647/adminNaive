import type { TreeNode } from 'unplugin-vue-router'
import { getFileBasedRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import type { PluginOption } from 'vite'

export function autoRouter(): PluginOption {
  return VueRouter({
    routesFolder: 'src/views',
    importMode: 'async',
    exclude: ['**/_*', '**/_*/**/*'],
    dts: 'src/types/auto-router.d.ts',
    getRouteName: (file) => {
      const { path } = file
      if (!path.startsWith('/')) {
        return getFileBasedRouteName({
          ...file,
          path: `/${path}`,
        } as TreeNode)
      }
      return getFileBasedRouteName(file)
    },
  })
}
