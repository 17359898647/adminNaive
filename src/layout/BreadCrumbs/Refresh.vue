<script setup lang="ts" >
const { tagDropdownClick: RefreshMethods } = useTagStore()
const isRefresh = computed(() => {
  return {
    icon: 'icon-ic:twotone-refresh',
    title: '刷新',
  }
})
</script>

<template >
  <NPopover trigger="hover" >
    <template #trigger >
      <SvgIcon
        :key="isRefresh.icon"
        :lineIcon="isRefresh.icon"
        :size="24"
        @click="RefreshMethods('refresh', createTag($route))"
      />
    </template>
    <span >{{ isRefresh.title }}</span>
  </NPopover>
</template>

<style scoped >

</style>
