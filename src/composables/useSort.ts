import type { MaybeRefOrGetter } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { UseSortableOptions } from '@vueuse/integrations/useSortable'

type optionsPick = Partial<Pick<UseSortableOptions, 'onStart' | 'onEnd' | 'animation'>>

export function useSort<T>(el: MaybeRefOrGetter<HTMLElement | null | undefined>, list: MaybeRefOrGetter<T[]>, options?: optionsPick) {
  const {
    onStart,
    onEnd,
    animation = 300,
  } = options || {}
  const [isDrag, setDrag] = useToggle(false)
  useSortable(el, list, {
    onStart: (event) => {
      setDrag(true)
      onStart?.(event)
    },
    onEnd: async (event) => {
      // await nextTick()
      onEnd?.(event)
      await nextTick()
      setTimeout(() => {
        setDrag(false)
      }, animation)
    },
    animation,
  })
  return {
    isDrag,
  }
}
