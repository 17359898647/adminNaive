<script setup lang="ts">
import ThemeView from '@/layout/ThemeView/ThemeView.vue'
import { layoutProvide, useLayoutStore } from '@/store/modules/useLayoutStore'

const layoutStore = useLayoutStore()
const { setAttrs } = layoutStore
const { ...allValue } = storeToRefs(layoutStore)
provide(layoutProvide, {
  ...allValue,
  setAttrs,
})
</script>

<template>
  <NLayout
    class="h-full w-full overflow-hidden"
    :hasSider="true"
  >
    <SiderView />
    <NLayoutContent :nativeScrollbar="false">
      <HeaderView />
      <ContentView />
      <FooterView />
      <BackTop />
    </NLayoutContent>
    <ThemeView />
  </NLayout>
</template>

<style scoped>

</style>
