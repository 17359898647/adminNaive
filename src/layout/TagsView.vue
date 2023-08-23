<script setup lang="ts">
import type { CSSProperties } from 'vue/dist/vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isTagViewHeight } = inject(layoutProvide)!
</script>

<template>
  <div
    class="flex-center bg-#fafafc dark:bg-#101014"
    :style="{
      height: `${isTagViewHeight}px`,
    } as CSSProperties"
  >
    tag
  </div>
</template>

<style scoped>

</style>
