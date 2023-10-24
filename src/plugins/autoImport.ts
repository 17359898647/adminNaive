import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import type { PluginOption } from 'vite'

export function autoImport(): PluginOption {
  return AutoImport({
    dirs: ['./src/httpApi', './src/composables', './src/utils', './src/store/modules', './src/naiveHooks', './src/https'],
    dts: './src/types/auto-import.d.ts',
    eslintrc: {
      enabled: true,
      filepath: 'src/types/.eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
    imports: ['pinia', '@vueuse/core', 'vue', 'vitest', VueRouterAutoImports],
    include: [/\.vue\??/, /\.tsx?$/],
    resolvers: [NaiveUiResolver()],
    vueTemplate: true,
  })
}
