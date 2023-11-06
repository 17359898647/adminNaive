<script setup lang="ts">
import { layoutProvide } from '@/store/modules/useLayoutStore'

const {
  isCollapsed,
  setAttrs,
  isHeaderHeight,
  isCollapsedWidth,
  isSiderWidth,
  isShowTrigger,
  isDark,
  isInverted,
} = inject(layoutProvide)!
const time = useDateFormat(
  useNow(),
  computed(() => (isCollapsed.value ? 'HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss')),
)
const _setAttrs = (e: boolean) => setAttrs('isCollapsed', e)
</script>

<template>
  <NLayoutSider
    :bordered="!isDark"
    class="relative"
    :collapsed="isCollapsed"
    :collapsedWidth="isCollapsedWidth"
    collapseMode="width"
    :contentStyle="{
      paddingTop: `${isHeaderHeight - 6}px`,
    }"
    :inverted="isInverted && !isDark"
    :nativeScrollbar="false"
    :showTrigger="isShowTrigger"
    :width="isSiderWidth"
    @updateCollapsed="_setAttrs"
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
