<script setup lang="ts">
import { isUndefined } from 'lodash-es'
import { createBreadcrumb, createDropdownOptions, deepFindBreadcrumb } from '@/layout/BreadCrumbs/modules'
import { moduleRouters } from '@/router/modules'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { setAttrs, isCollapsed } = inject(layoutProvide)!
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
const allBreadcrumb = ref(createBreadcrumb(moduleRouters))
const breadcrumb = computed(() => {
  return deepFindBreadcrumb(route.path, allBreadcrumb.value)
})
</script>

<template>
  <div class="flex flex-nowrap gap-2 overflow-hidden">
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
        v-for="{ path, meta: { isTitle, lineIcon, localIcon }, children } in breadcrumb"
        :key="path"
      >
        <NDropdown
          :options="(isUndefined(children) ? undefined : createDropdownOptions(children)) as any"
          size="small"
          @select="routerPath => {
            routerPush({ path: routerPath })
          }"
        >
          <div class="flex gap-2">
            <SvgIcon
              :lineIcon="lineIcon"
              :localIcon="localIcon"
            />
            <span>{{ isTitle }}</span>
          </div>
        </NDropdown>
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>

<style scoped>

</style>
