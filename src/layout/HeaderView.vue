<script setup lang="ts">
import type { CSSProperties } from 'vue'
import BreadCrumbs from '@/layout/BreadCrumbs/BreadCrumbs.vue'
import TagsView from '@/layout/TagsView.vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isFixedHeader, isHeaderHeight, isContentPadding, isCollapsed, setAttrs } = inject(layoutProvide)!
</script>

<template>
  <NLayoutHeader
    class="z100 flex flex-col"
    :position="isFixedHeader ? 'absolute' : 'static'"
  >
    <div
      class="flex items-center"
      :style="{
        height: `${isHeaderHeight}px`,
        padding: `0 ${isContentPadding}px`,
      } as CSSProperties"
    >
      <BreadCrumbs />
    </div>
    <TagsView />
  </NLayoutHeader>
</template>

<style scoped>

</style>
