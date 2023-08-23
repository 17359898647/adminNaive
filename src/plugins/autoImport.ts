import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import type { PluginOption } from 'vite'

export function autoImport(): PluginOption {
  return AutoImport({
    imports: ['vue-router', 'pinia', '@vueuse/core', 'vue', 'vitest'],
    resolvers: [NaiveUiResolver()],
    dts: './src/types/auto-import.d.ts',
    dirs: ['./src/httpApi', './src/composables', './src/utils', './src/store/modules', './src/naiveHooks', './src/https'],
    eslintrc: {
      enabled: true,
      filepath: 'src/types/.eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
    vueTemplate: true,
    include: [/\.vue\??/, /\.tsx?$/],
  })
}
