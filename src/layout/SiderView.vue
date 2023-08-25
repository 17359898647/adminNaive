<script setup lang="ts">
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isCollapsed, setAttrs, isHeaderHeight, isCollapsedWidth, isSiderWidth } = inject(layoutProvide)!
const time = useDateFormat(
  useNow(),
  computed(() => (isCollapsed.value ? 'HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss')),
)
const _setAttrs = (e: boolean) => setAttrs('isCollapsed', e)
</script>

<template>
  <NLayoutSider
    class="relative"
    :collapsed="isCollapsed"
    :collapsedWidth="isCollapsedWidth"
    collapseMode="width"
    :contentStyle="{
      paddingTop: `${isHeaderHeight - 6}px`,
    }"
    :nativeScrollbar="false"
    showTrigger="bar"
    :width="isSiderWidth"
    @update-collapsed="_setAttrs"
  >
    <div
      class="absolute top-0 z10 w-full flex-center whitespace-nowrap bg-[var(--n-color)]"
      :style="{
        height: `${isHeaderHeight}px`,
      }"
    >
      {{ time }}
    </div>
    <MenuView />
  </NLayoutSider>
</template>

<style scoped>

</style>
