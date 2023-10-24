<script setup lang="ts">
definePage({
  meta: {
    changeTitle: false,
    isHidden: true,
    isKeepAlive: false,
    isTitle: '404',
  },
  name: 'InteriorNotFound',
})
</script>

<template>
  <NResult
    class="flex-center flex-col"
    description="生活总归带点荒谬"
    status="404"
    title="404 资源不存在"
  >
    <template #footer>
      <NButton @click="() => $router.push('/')">
        找点乐子吧
      </NButton>
    </template>
  </NResult>
</template>
