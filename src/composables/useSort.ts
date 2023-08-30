import type { MaybeRefOrGetter } from '@vueuse/core'
import type { UseSortableOptions } from '@vueuse/integrations/useSortable'
import { useSortable } from '@vueuse/integrations/useSortable'

export function useSort<T>(el: MaybeRefOrGetter<HTMLElement | null | undefined>, list: MaybeRefOrGetter<T[]>, options?: UseSortableOptions) {
  const {
    onStart,
    onEnd,
    animation = 300,
    ...e
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
    ...e,
  })
  return {
    isDrag,
  }
}
