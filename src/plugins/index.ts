import type { ConfigEnv, PluginOption } from 'vite'
import { autoComponents } from './autoComponents'
import { autoImport } from './autoImport'
import { createGzip } from './createGzip'
import { createIcon } from './createIcon'
import { createRouterType } from './createRouterType'
import { enhanceLog } from './enhanceLog'
import { toEdit } from './toEdit'
import { viteDevtools } from './viteDevtools'

export function installPlugin(_env?: ConfigEnv): PluginOption[] {
  return [autoImport(), createIcon(), createGzip(), toEdit(), enhanceLog(), createRouterType(), viteDevtools(), autoComponents()]
}
