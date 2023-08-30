<script setup lang="ts">
import { layoutProvide, useLayoutStore } from '@/store/modules/useLayoutStore'

const layoutStore = useLayoutStore()
const { setAttrs } = layoutStore
const allValue = storeToRefs(layoutStore)
provide(layoutProvide, {
  ...allValue,
  setAttrs,
})
</script>

<template>
  <NLayout
    class="h-full w-full"
    hasSider
  >
    <SiderView />
    <NLayoutContent :nativeScrollbar="false">
      <HeaderView />
      <ContentView />
      <FooterView />
      <BackTop />
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>

</style>
