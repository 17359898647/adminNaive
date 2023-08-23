<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isFixedFooter, isFooterHeight } = inject(layoutProvide)!
const footerStyle = computed(() => {
  return {
    height: `${isFooterHeight.value}px`,
  } as CSSProperties
})
</script>

<template>
  <NLayoutFooter
    class="z100 flex-center"
    :position="isFixedFooter ? 'absolute' : 'static'"
    :style="footerStyle"
  >
    footer
  </NLayoutFooter>
</template>

<style scoped>

</style>
