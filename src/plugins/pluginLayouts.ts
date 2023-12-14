// @ts-nocheck
import type { PluginOption } from 'vite'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

export function pluginLayouts(): PluginOption {
  return ClientSideLayout({
    defaultLayout: 'index',
    importMode: 'async',
    layoutDir: 'src/layout',
  })
}
