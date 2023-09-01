import { debounce } from 'lodash-es'
import type { NScrollbar } from 'naive-ui'
import { inject } from 'vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

export function scrollHelps(options?: {
  animationTime: number
}) {
  const { animationTime } = {
    animationTime: 0.3,
    ...options,
  }
  const { isSiderWidth, isCollapsedWidth, isCollapsed, isContentPadding } = inject(layoutProvide)!
  const contentRef = ref<HTMLElement>()
  const scrollRef = ref<InstanceType<typeof NScrollbar>>()
  const containerRef = ref<HTMLElement>()
  // const { left: TransitionRefLeft } = useElementBounding(contentRef)
  const TransitionRefLeft = computed(() => {
    return (isCollapsed.value ? isCollapsedWidth.value : isSiderWidth.value) + isContentPadding.value
  })
  const { width: parentWidth } = useElementSize(containerRef)
  const centerWidth = computed(() => parentWidth.value / 2)
  const scrollTo = debounce(
    async (index: number) => {
      if (index < 0)
        return
      // 动画时间
      await useSleep(animationTime * 1000)
      const childrenEl = contentRef.value?.children[index] as HTMLElement
      if (!childrenEl)
        return
      const { left, width } = childrenEl.getBoundingClientRect()
      const resultDistance = left - TransitionRefLeft.value - centerWidth.value + width / 2
      scrollRef.value?.scrollBy({
        left: resultDistance,
        behavior: 'smooth',
      })
    },
    300,
    {
      leading: true,
      trailing: true,
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
