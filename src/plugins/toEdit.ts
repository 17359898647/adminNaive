import type { PluginOption } from 'vite'
import inspector from 'vite-plugin-vue-inspector'

export function toEdit(): PluginOption {
  return inspector({
    toggleButtonVisibility: 'never',
  })
}
