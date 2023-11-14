<script setup lang="ts" >
import BreadCrumbs from '@/layout/BreadCrumbs/BreadCrumbs.vue'
import TagsView from '@/layout/TagView/TagsView.vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { isFixedHeader } = inject(layoutProvide)!
</script>

<template >
  <NLayoutHeader
    class="z100 flex flex-col"
    :position="isFixedHeader ? 'absolute' : 'static'"
  >
    <BreadCrumbs/>
    <TagsView/>
  </NLayoutHeader>
</template>

<style scoped >

</style>
