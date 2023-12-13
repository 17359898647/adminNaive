<script setup lang="ts" >
import ThemeView from '@/layout/ThemeView/ThemeView.vue'
import { layoutProvide, useLayoutStore } from '@/store/modules/useLayoutStore'

const layoutStore = useLayoutStore()
const { setAttrs } = layoutStore
const { ...allValue } = storeToRefs(layoutStore)
provide(layoutProvide, {
  ...allValue,
  setAttrs,
})
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template >
  <NLayout
    class="h-full w-full overflow-hidden"
    :hasSider="isLargeScreen"
  >
    <SiderView v-if="isLargeScreen"/>
    <NLayoutContent
      :embedded="true"
      :nativeScrollbar="false"
    >
      <HeaderView/>
      <ContentView/>
      <FooterView/>
      <BackTop/>
    </NLayoutContent>
    <ThemeView/>
  </NLayout>
</template>

<style scoped >

</style>
