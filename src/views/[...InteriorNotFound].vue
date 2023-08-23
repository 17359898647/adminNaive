<script setup lang="ts">
definePage({
  name: 'InteriorNotFound',
  meta: {
    isTitle: '404',
    changeTitle: false,
    isHidden: true,
  },
})
</script>

<template>
  <n-result
    class="h-full w-full flex-center flex-col"
    description="生活总归带点荒谬"
    status="404"
    title="404 资源不存在"
  >
    <template #footer>
      <n-button>找点乐子吧</n-button>
    </template>
  </n-result>
</template>
