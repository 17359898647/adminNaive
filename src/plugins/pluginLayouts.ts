/* prettier-ignore */
// @ts-nocheck
import type { PluginOption } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export function pluginLayouts(): PluginOption {
  return Layouts({
    defaultLayout: 'index',
    layoutsDirs: 'src/layout',
  })
}
