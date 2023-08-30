<script setup lang="ts">
import { inject } from 'vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isContentPadding, isFooterHeight } = inject(layoutProvide)!
</script>

<template>
  <NBackTop
    :bottom="isContentPadding + isFooterHeight"
    class="z1000"
  />
</template>

<style scoped>

</style>
