<script setup lang="ts" >
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { setAttrs, isCollapsed } = inject(layoutProvide)!
const isCollapsedIcon = computed(() => {
  return isCollapsed.value
    ? {
        icon: 'icon-line-md:menu-fold-right',
        title: '展开菜单',
      }
    : {
        icon: 'icon-line-md:menu-unfold-left',
        title: '收起菜单',
      }
})
</script>

<template >
  <NPopover trigger="hover" >
    <template #trigger >
      <SvgIcon
        :key="isCollapsedIcon.icon"
        :lineIcon="isCollapsedIcon.icon"
        :size="24"
        @click="setAttrs('isCollapsed', !isCollapsed)"
      />
    </template>
    <span >{{ isCollapsedIcon.title }}</span>
  </NPopover>
</template>

<style scoped >

</style>
