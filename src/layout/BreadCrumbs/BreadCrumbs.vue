<script setup lang="ts" >
import { isUndefined } from 'lodash-es'
import { NBreadcrumb } from 'naive-ui'
import type { CSSProperties } from 'vue'
import Collaps from '@/layout/BreadCrumbs/Collaps.vue'
import Dark from '@/layout/BreadCrumbs/Dark.vue'
import FullScreen from '@/layout/BreadCrumbs/fullScreen.vue'
import { createBreadcrumb, createDropdownOptions, deepFindBreadcrumb } from '@/layout/BreadCrumbs/helps'
import { routerHelper } from '@/router/helps/allRouters'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { allRouters } = routerHelper()
const { isHeaderHeight, isContentPadding, isSupported, isDark } = inject(layoutProvide)!
const route = useRoute()
const allBreadcrumb = ref(createBreadcrumb(toValue(allRouters)))
const breadcrumb = computed(() => {
  return deepFindBreadcrumb(route.name, allBreadcrumb.value)
})
const breadcrumbRef = shallowRef<InstanceType<typeof NBreadcrumb>>()
// const childRef = computed(() => unrefElement(breadcrumbRef)?.firstElementChild as HTMLElement)
// useAutoAnimate({
//   el: childRef,
// })
</script>

<template >
  <div
    class="flex flex-nowrap items-center gap-2 overflow-hidden"
    :class="!isDark ? 'border-b border-[var(--n-border-color)]' : ''"
    :style="{
      height: `${isHeaderHeight}px`,
      padding: `0 ${isContentPadding}px`,
    } as CSSProperties"
  >
    <Collaps/>
    <FullScreen v-if="isSupported"/>
    <Dark/>
    <Refresh/>
    <NBreadcrumb ref="breadcrumbRef" >
      <TransitionGroup name="breadcrumb" >
        <NBreadcrumbItem
          v-for="{ name, meta, children } in breadcrumb"
          :key="name"
        >
          <NDropdown
            :options="(isUndefined(children) ? undefined : createDropdownOptions(children)) as any"
            @select="name => {
              $router.push({
                name,
              })
            }"
          >
            <div class="flex gap-2" >
              <SvgIcon
                :lineIcon="meta?.lineIcon"
                :localIcon="meta?.localIcon"
              />
              <span >{{ meta?.isTitle }}</span>
            </div>
          </NDropdown>
        </NBreadcrumbItem>
      </TransitionGroup>
    </NBreadcrumb>
  </div>
</template>

<style scoped >
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
