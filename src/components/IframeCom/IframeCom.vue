<script setup lang="ts" >
defineProps<{
  src: string
}>()
const [loading, setLoading] = useToggle(true)
</script>

<template >
  <NSpin
    class="flex flex-1 flex-col"
    :show="loading"
  >
    <iframe
      class="flex-1"
      :src="src"
      @load="setLoading(false)"
    ></iframe>
  </NSpin>
</template>

<style scoped >
:deep(.n-spin-content){
  @apply flex flex-col flex-1
}
</style>
