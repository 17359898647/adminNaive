import type { Directive } from 'vue'

export const lazyLoad: Directive = {
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.setAttribute('src', binding.value)
          observer.unobserve(el)
        }
      })
    }, options)
    observer.observe(el)
  },
}
