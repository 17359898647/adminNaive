/* prettier-ignore */
// @ts-nocheck
import type { PluginOption } from 'vite'
import viteCompression from 'vite-plugin-compression'

export function createGzip(): PluginOption {
  return viteCompression({
    threshold: 1024,
    algorithm: 'gzip',
    ext: '.gz',
    deleteOriginFile: false,
  })
}
