<script setup lang="ts">
import { forEach, isFunction, isString, some } from 'lodash-es'
import type { Component } from 'vue'
import { inject } from 'vue'
import type { RouteRecordName } from 'vue-router'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'
import { routerHelper } from '@/router/helps/allRouters'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  routeName?: RouteRecordName | null
  isIframe?: boolean
}>()

const {  isRefreshPage, isHeaderHeight, isTagViewHeight, isContentPadding, isFooterHeight } = inject(layoutProvide)!

const {  allIframeRouters } = routerHelper()
const topAttribute = computed(()=>{
  return `${isHeaderHeight.value + isTagViewHeight.value}px`
})
const bottomAttribute = computed(()=>{
  return `${isFooterHeight.value + isContentPadding.value}px`
})
const paddingAttribute = computed(()=>{
  return `${isContentPadding.value}px`
})
async function getComponent(name?: string | RouteRecordName) {
  const { component } = allIframeRouters.value.find(item => item.name === name)!
  if (isFunction(component)) {
    const result = await (component as () => Promise<{
      default: Component
    }>)()
    return result.default
  }
}
const demoCom = shallowRef<{
  component: any
  name?: string | RouteRecordName
}[]>([])
onMounted(()=>{
  forEach(allIframeRouters.value, async (item) => {
    const { name } = item
    const component = await getComponent(name)
    demoCom.value.push({
      component,
      name,
    })
    triggerRef(demoCom)
  })
})
const cacheStore = useKeepAliveCacheStore()
const { exclude } = storeToRefs(cacheStore)
function isVif(name?: RouteRecordName | null) {
  return props.routeName === name ?
      !some(exclude.value, item => item.test(isString(name) ? name : ''))
      && isRefreshPage.value : true
}
function isVshow(name?: RouteRecordName | null) {
  return props.routeName === name && props.isIframe
}
</script>

<template>
  <!-- eslint-disable-next-line vue/valid-v-for -->
  <Transition
    v-for="{ name, component } in demoCom"
    appear
    enterActiveClass="animated-fade-in-left animated animated-duration-300 ease-in-out absolute absolute_orientation"
    leaveActiveClass="animated-fade-out-right animated animated-duration-300 ease-in-out absolute absolute_orientation"
  >
    <div
      v-if="isVif(name)"
      v-show="isVshow(name)"
      :key="name"
      class="flex flex-1 flex-col"
    >
      <Component
        :is="component"
        :key="name"
        class="flex-1 overflow-hidden"
      />
    </div>
  </Transition>
</template>

<style scoped>
.absolute_orientation{
  top:v-bind(topAttribute);
  bottom:v-bind(bottomAttribute);
  left:v-bind(paddingAttribute);
  right:v-bind(paddingAttribute);
}
</style>
