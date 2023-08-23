import type { PluginOption } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export function pluginLayouts(): PluginOption {
  return Layouts({
    layoutsDirs: 'src/layout',
    defaultLayout: 'index',
  })
}
