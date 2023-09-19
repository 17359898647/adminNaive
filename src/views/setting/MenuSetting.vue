<script lang="ts" setup>
import { NCard } from 'naive-ui'
import MenuTree from '@/views/setting/_/MenuTree.vue'

definePage({
  meta: {
    isTitle: '菜单管理',
    lineIcon: 'material-symbols:roundabout-right',
  },
})
const menuStore = useMenuStore()
const { menuOptions } = storeToRefs(menuStore)
</script>

<template>
  <NCard title="菜单管理">
    <MenuTree v-model:menuOptions="menuOptions" />
  </NCard>
</template>

<style scoped>
</style>
