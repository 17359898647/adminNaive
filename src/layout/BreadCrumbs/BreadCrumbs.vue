<script setup lang="ts">
import { isUndefined } from 'lodash-es'
import type { CSSProperties } from 'vue'
import { createBreadcrumb, createDropdownOptions, deepFindBreadcrumb } from '@/layout/BreadCrumbs/helps'
import { allRouters } from '@/router/helps/allRouters'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { setAttrs, isCollapsed, isHeaderHeight, isContentPadding } = inject(layoutProvide)!
const isCollapsedIcon = computed(() => {
  return isCollapsed.value
    ? {
        icon: 'line-md:menu-fold-right',
        title: '展开菜单',
      }
    : {
        icon: 'line-md:menu-unfold-left',
        title: '收起菜单',
      }
})
const route = useRoute()
const allBreadcrumb = ref(createBreadcrumb(unref(allRouters)))
const breadcrumb = computed(() => {
  return deepFindBreadcrumb(route.name, allBreadcrumb.value)
})
watchDeep(
  breadcrumb,
  (e) => {
    console.log(e, route.name, allBreadcrumb)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div
    class="flex flex-nowrap items-center gap-2 overflow-hidden"
    :style="{
      height: `${isHeaderHeight}px`,
      padding: `0 ${isContentPadding}px`,
    } as CSSProperties"
  >
    <NPopover trigger="hover">
      <template #trigger>
        <SvgIcon
          :key="isCollapsedIcon.icon"
          :lineIcon="isCollapsedIcon.icon"
          :size="24"
          @click="setAttrs('isCollapsed', !isCollapsed)"
        />
      </template>
      <span>{{ isCollapsedIcon.title }}</span>
    </NPopover>
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
