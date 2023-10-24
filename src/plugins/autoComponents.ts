import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'

export function autoComponents(): PluginOption {
  return Components({
    dirs: ['src/components', 'src/layout'],
    dts: 'src/types/auto-components.d.ts',
    resolvers: [NaiveUiResolver()],
  })
}
