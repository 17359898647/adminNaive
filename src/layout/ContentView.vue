<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isHeaderHeight, isFooterHeight, isFixedHeader, isFixedFooter, isContentPadding, isTagViewHeight } = inject(layoutProvide)!
const mainStyle = computed(() => {
  return {
    minHeight: `calc(100vh - ${
        (isFixedHeader.value ? 0 : (isHeaderHeight.value + isTagViewHeight.value))
        + (isFixedFooter.value ? 0 : isFooterHeight.value)
    }px)`,
    paddingBottom: `${
      isFixedFooter.value
        ? isFooterHeight.value + isContentPadding.value
        : isContentPadding.value
    }px`,
    paddingTop: `${
      isFixedHeader.value
        ? isHeaderHeight.value + isTagViewHeight.value + isContentPadding.value
        : isContentPadding.value
    }px`,
    paddingLeft: `${isContentPadding.value}px`,
    paddingRight: `${isContentPadding.value}px`,
  } as CSSProperties
})
</script>

<template>
  <main
    class="flex flex-1 flex-col bg-#fafafc dark:bg-#101014"
    :style="mainStyle"
  >
    <RouterView v-slot="{ Component, route }">
      <Transition
        appear
        enterActiveClass="animated-fade-in-left animated animated-duration-300 ease-in-out"
        leaveActiveClass="animated-fade-out-right animated animated-duration-300 ease-in-out"
        mode="out-in"
      >
        <KeepAlive>
          <component
            :is="Component"
            :key="route.fullPath"
            class="flex-1"
          />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>

</style>
