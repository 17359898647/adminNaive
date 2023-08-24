import type { ConfigEnv, PluginOption } from 'vite'
import { autoComponents } from './autoComponents'
import { autoImport } from './autoImport'
import { autoRouter } from './autoRouter'
import { createGzip } from './createGzip'
import { createIcon } from './createIcon'
import { enhanceLog } from './enhanceLog'
import { pluginLayouts } from './pluginLayouts'
import { toEdit } from './toEdit'
import { viteDevtools } from './viteDevtools'

export function installPlugin(_env?: ConfigEnv): PluginOption[] {
  return [autoImport(), createIcon(), createGzip(), toEdit(), enhanceLog(), autoRouter(), viteDevtools(), autoComponents(), pluginLayouts()]
}
