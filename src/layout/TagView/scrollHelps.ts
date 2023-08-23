import type { NScrollbar } from 'naive-ui'

export function scrollHelps() {
  const contentRef = ref<HTMLElement>()
  const scrollRef = ref<InstanceType<typeof NScrollbar>>()
  const containerRef = ref<HTMLElement>()
  const { left: TransitionRefLeft } = useElementBounding(contentRef)
  const { width: parentWidth } = useElementSize(containerRef)
  const centerWidth = computed(() => parentWidth.value / 2)
  const scrollTo = async (index: number) => {
    if (!contentRef.value?.children.length)
      return
    const childrenEl = contentRef.value?.children[index] as HTMLElement
    if (!childrenEl)
      return
    const { left } = useElementBounding(childrenEl)
    // 获取到的left是相对于父元素的距离
    await useSleep(300)
    // 移动到中间
    const relaLeft = left.value - TransitionRefLeft.value - centerWidth.value

    scrollRef.value?.scrollBy({
      left: relaLeft,
      behavior: 'smooth',
    })
  }
  return {
    contentRef,
    containerRef,
    scrollRef,
    scrollTo,
  }
}
