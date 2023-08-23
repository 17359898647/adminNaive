<script setup lang="ts">
import { remove } from 'lodash-es'
import { NScrollbar } from 'naive-ui'
import type { CSSProperties } from 'vue'
import { useSort } from '@/composables/useSort'
import { scrollHelps } from '@/layout/TagView/scrollHelps'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { scrollRef, scrollTo, contentRef, containerRef } = scrollHelps()
const { isTagViewHeight, isContentPadding } = inject(layoutProvide)!
const tagList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
function closeTag(index: number) {
  tagList.value = remove(tagList.value, (item, i) => i !== index)
}
const { isDrag } = useSort(contentRef, tagList, {
  animation: 300,
})
tryOnMounted(async () => {
  await scrollTo(10)
})
</script>

<template>
  <div
    ref="containerRef"
    class="bg-#fafafc text-center dark:bg-#101014"
    :style="{
      height: `${isTagViewHeight}px`,
      padding: `0 ${isContentPadding}px`,
    } as CSSProperties"
  >
    <NScrollbar
      ref="scrollRef"
      :size="0"
      trigger="none"
      xScrollable
    >
      <div
        ref="contentRef"
        class="relative flex items-center gap-2"
        :style="{
          height: `${isTagViewHeight}px`,
        } as CSSProperties"
      >
        <TransitionGroup
          :appear="true"
          :name="isDrag ? undefined : 'tags'"
        >
          <div
            v-for="(item, index) in tagList"
            :key="item"
            class="z-10 select-none"
          >
            <NTag
              :bordered="false"
              closable
              @close="() => {
                closeTag(index)
              }"
            >
              <template #icon>
                <SvgIcon />
              </template>
              {{ item }}
            </NTag>
          </div>
        </TransitionGroup>
      </div>
    </NScrollbar>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-scrollbar-rail__scrollbar){
  display: none !important;
}

.tags-move,
.tags-enter-active,
.tags-leave-active {
  transition: all .3s var(--n-bezier);
}

.tags-enter-from,
.tags-leave-to {
  opacity: 0;
  transform: scale(0.1) translateX(-100%);
}
.tags-leave-active {
  position: absolute ;
}
</style>
