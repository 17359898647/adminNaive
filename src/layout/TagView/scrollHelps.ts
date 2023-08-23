import { debounce } from 'lodash-es'
import type { NScrollbar } from 'naive-ui'

export function scrollHelps() {
  const contentRef = ref<HTMLElement>()
  const scrollRef = ref<InstanceType<typeof NScrollbar>>()
  const containerRef = ref<HTMLElement>()
  const { left: TransitionRefLeft } = useElementBounding(contentRef)
  const { width: parentWidth } = useElementSize(containerRef)
  const centerWidth = computed(() => parentWidth.value / 2)

  const scrollTo = debounce(
    async (index: number) => {
      const childrenEl = contentRef.value?.children[index] as HTMLElement
      if (!childrenEl)
        return
      const { left } = useElementBounding(childrenEl)
      // 动画时间
      await useSleep(300)

      const resultDistance = left.value - TransitionRefLeft.value - centerWidth.value
      scrollRef.value?.scrollBy({
        left: resultDistance,
        behavior: 'smooth',
      })
    },
    300,
    {
      leading: true,
      maxWait: 1000,
    },
  )

  return {
    contentRef,
    containerRef,
    scrollRef,
    scrollTo,
  }
}
