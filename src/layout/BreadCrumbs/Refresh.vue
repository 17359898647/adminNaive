<script setup lang="ts">
const { tagDropdownClick: Refresh } = useTagStore()
const isFullScreen = computed(() => {
  return {
    icon: 'ic:twotone-refresh',
    title: '刷新',
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
        @click="Refresh('refresh', createTag($route))"
      />
    </template>
    <span>{{ isFullScreen.title }}</span>
  </NPopover>
</template>

<style scoped>

</style>
