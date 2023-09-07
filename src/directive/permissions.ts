import type { Directive } from 'vue'

export const permissions: Directive = {
  mounted(el, { instance, value }) {
    console.log('permissions', instance)
    el.remove()
  },
}
