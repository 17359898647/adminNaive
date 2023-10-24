/* prettier-ignore */
// @ts-nocheck
import type { PluginOption } from 'vite'
import viteCompression from 'vite-plugin-compression'

export function createGzip(): PluginOption {
  return viteCompression({
    algorithm: 'gzip',
    deleteOriginFile: false,
    ext: '.gz',
    threshold: 1024,
  })
}
