import type { AnimationController, AutoAnimateOptions, AutoAnimationPlugin } from '@formkit/auto-animate'
import autoAnimate from '@formkit/auto-animate'
import type { MaybeComputedElementRef } from '@vueuse/core'

type options = Partial<AutoAnimateOptions> | AutoAnimationPlugin

type useAutoAnimateOptions = options & {
  el?: MaybeComputedElementRef
}
export function useAnimate<T extends HTMLElement>(config: useAutoAnimateOptions): [Ref<T>, (enabled: boolean) => void] {
  const { el, ...options } = config
  const element = shallowRef(el) as Ref<T>
  let controller: AnimationController | undefined
  function setEnabled(enabled: boolean) {
    if (controller)
      enabled ? controller.enable() : controller.disable()
  }
  watch(element, () => {
    const _element = unrefElement(element)
    if (_element instanceof HTMLElement) {
      controller = autoAnimate(_element, {
        duration: 300,
        easing: 'ease-in-out',
        disrespectUserMotionPreference: true,
        ...options,
      })
    }
  })

  return [element, setEnabled]
}
