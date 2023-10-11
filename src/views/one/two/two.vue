<script setup lang="ts">
definePage({
  meta: {
    isTitle: '二级子路由',
    lineIcon: 'icon-material-symbols:roundabout-right',
    isKeepAlive: false,
  },
})
</script>

<template>
  <NCard title="二级子路由">
    <NH5>非缓存二级子路由</NH5>
    <NInput />
  </NCard>
</template>

<style scoped>

</style>
