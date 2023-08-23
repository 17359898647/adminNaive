<script setup lang="ts">
</script>

<template>
  <NCard title="about">
    <NButton
      @click="() => {
        routerPush({
          path: '/home',
        })
      }"
    >
      跳转
    </NButton>
  </NCard>
</template>

<style scoped>

</style>
