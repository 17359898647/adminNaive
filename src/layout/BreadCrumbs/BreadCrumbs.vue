<script setup lang="ts">
import { isUndefined } from 'lodash-es'
import type { CSSProperties } from 'vue'
import Collaps from '@/layout/BreadCrumbs/Collaps.vue'
import Dark from '@/layout/BreadCrumbs/Dark.vue'
import FullScreen from '@/layout/BreadCrumbs/fullScreen.vue'
import { createBreadcrumb, createDropdownOptions, deepFindBreadcrumb } from '@/layout/BreadCrumbs/helps'
import { routerHelper } from '@/router/helps/allRouters'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { allRouters } = routerHelper()
const { isHeaderHeight, isContentPadding } = inject(layoutProvide)!
const route = useRoute()
const allBreadcrumb = ref(createBreadcrumb(toValue(allRouters)))
const breadcrumb = computed(() => {
  return deepFindBreadcrumb(route.name, allBreadcrumb.value)
})
</script>

<template>
  <div
    class="flex flex-nowrap items-center gap-2 overflow-hidden"
    :style="{
      height: `${isHeaderHeight}px`,
      padding: `0 ${isContentPadding}px`,
    } as CSSProperties"
  >
    <Collaps />
    <FullScreen />
    <Dark />
    <NBreadcrumb>
      <NBreadcrumbItem
        v-for="{ name, meta, children } in breadcrumb"
        :key="name"
      >
        <NDropdown
          :options="(isUndefined(children) ? undefined : createDropdownOptions(children)) as any"
          size="small"
          @select="name => {
            $router.push({
              name,
            })
          }"
        >
          <div class="flex gap-2">
            <SvgIcon
              :lineIcon="meta?.lineIcon"
              :localIcon="meta?.localIcon"
            />
            <span>{{ meta?.isTitle }}</span>
          </div>
        </NDropdown>
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>

<style scoped>

</style>
