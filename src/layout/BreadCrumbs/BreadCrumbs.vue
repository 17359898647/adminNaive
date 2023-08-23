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
          :key="isCollapsedIcon"
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
        <div class="flex gap-1">
          <SvgIcon
            :lineIcon="lineIcon"
            :localIcon="localIcon"
          />
          <NDropdown
            :options="(isUndefined(children) ? undefined : createDropdownOptions(children)) as any"
            size="small"
            @select="routerPath => {
              console.log(routerPath)
              routerPush({ path: routerPath })
            }"
          >
            {{ isTitle }}
          </NDropdown>
        </div>
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>

<style scoped>

</style>
