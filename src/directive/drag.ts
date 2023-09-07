import type { Directive } from 'vue'

export const drag: Directive = {
  mounted(el: HTMLElement) {
    el.onmousedown = (e) => {
      const mouseXStart = e.clientX
      const mouseYStart = e.clientY
      const rectLeft = el.offsetLeft
      const rectTop = el.offsetTop
      el.onmousemove = (e) => {
        const mouseXEnd = e.clientX
        const mouseYEnd = e.clientY
        const moveX = mouseXEnd - mouseXStart + rectLeft
        const moveY = mouseYEnd - mouseYStart + rectTop
        el.style.top = `${moveY}px`
        el.style.left = `${moveX}px`
      }
      el.onmouseup = () => {
        el.onmousemove = null
        el.onmouseup = null
      }
    }
  },
  unmounted(el) {
    el.onmousedown = null
    el.onmousemove = null
    el.onmouseup = null
  },
}
