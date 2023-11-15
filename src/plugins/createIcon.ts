import path from 'node:path'
import process from 'node:process'
import type { PluginOption } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export function createIcon(): PluginOption {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    inject: 'body-last',
    symbolId: '[name]',
  })
}
