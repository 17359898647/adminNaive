import type { Directive } from 'vue'

export const focus: Directive = {
  mounted(el) {
    console.log(el)
    if (el.tagName === 'INPUT') {
      el.focus()
    }
    else {
      const input = el.querySelector('input') as HTMLInputElement
      input && input.focus()
    }
  },
}
