<script setup lang="ts">
import { layoutProvide, useLayoutStore } from '@/store/modules/useLayoutStore'

const layoutStore = useLayoutStore()
const { setAttrs } = layoutStore
const { fullScreenRef, ...allValue } = storeToRefs(layoutStore)
provide(layoutProvide, {
  ...allValue,
  setAttrs,
})
</script>

<template>
  <div
    ref="fullScreenRef"
    class="h-full w-full"
  >
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
  </div>
</template>

<style scoped>

</style>
