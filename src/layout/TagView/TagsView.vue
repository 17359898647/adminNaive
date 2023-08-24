<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import type { CSSProperties } from 'vue'
import { inject } from 'vue'
import { useSort } from '@/composables/useSort'
import { scrollHelps } from '@/layout/TagView/scrollHelps'
import type { ActionTypes, ITag } from '@/store/modules/useTagStore'
import { useTagStore } from '@/store/modules/useTagStore'

const { isTagViewHeight, isContentPadding } = inject(layoutProvide)!
const { scrollRef, scrollTo, contentRef, containerRef } = scrollHelps()
const tagStore = useTagStore()
const { tagList, tagDropdownOptions } = storeToRefs(tagStore)
const { delTagList: closeTag, tagDropdownClick } = tagStore
const { isDrag } = useSort(contentRef, tagList, {
  animation: 300,
})
tryOnMounted(async () => {
  await scrollTo(4)
})
function getKey<T extends ITag, K extends keyof ITag>(tag: T, key: K) {
  return tag[key]
}
const { x, y, setShowDropRef, showDropRef, changePosition } = useDropdown()
const selectTag = ref<ITag>()
function contextmenu(e: MouseEvent, tag: ITag) {
  e.preventDefault()
  changePosition(e)
  selectTag.value = tag
}
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
            v-for="tag in tagList"
            :key="tag.fullPath"
            class="z-10 select-none"
            @click="() => {
              $router.push(tag.fullPath)
            }"
            @contextmenu="(e) => {
              contextmenu(e, tag)
            }"
          >
            <NTag
              :bordered="false"
              :closable="tag.isAffix !== true"
              :type="$route.fullPath === tag.fullPath ? 'success' : 'default'"
              @close="() => closeTag(tag)"
            >
              <template #icon>
                <SvgIcon
                  :lineIcon="tag.lineIcon"
                  :localIcon="tag.localIcon"
                />
              </template>
              <span class="cursor-pointer">{{ getKey(tag, 'isTitle') }}</span>
            </NTag>
          </div>
        </TransitionGroup>
      </div>
    </NScrollbar>
    <NDropdown
      :options="tagDropdownOptions"
      :show="showDropRef"
      trigger="manual"
      :x="x"
      :y="y"
      @clickoutside="() => {
        setShowDropRef(false)
      }"
      @select="(type:ActionTypes) => {
        tagDropdownClick(type, selectTag!)
        setShowDropRef(false)
      }"
    />
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
