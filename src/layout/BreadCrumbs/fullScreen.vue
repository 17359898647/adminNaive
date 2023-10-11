<script setup lang="ts">
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { setAttrs, isFullscreen } = inject(layoutProvide)!

const isFullScreen = computed(() => {
  return isFullscreen.value
    ? {
        icon: 'icon-material-symbols:fullscreen-exit',
        title: '关闭全屏',
      }
    : {
        icon: 'icon-material-symbols:fullscreen',
        title: '开启全屏',
      }
})
</script>

<template>
  <NPopover trigger="hover">
    <template #trigger>
      <SvgIcon
        :key="isFullScreen.icon"
        :lineIcon="isFullScreen.icon"
        :size="24"
        @click="setAttrs('isFullscreen', !isFullscreen)"
      />
    </template>
    <span>{{ isFullScreen.title }}</span>
  </NPopover>
</template>

<style scoped>

</style>
