<script setup lang="ts" >
import { toRefs } from '@vueuse/core'
import { forEach, isFunction, isString, some } from 'lodash-es'
import type { Component } from 'vue'
import { inject } from 'vue'
import type { RouteRecordName } from 'vue-router'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'
import { routerHelper } from '@/router/helps/allRouters'
import { useTagStore } from '@/store/modules/useTagStore'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  routeName?: RouteRecordName | null
  isIframe?: boolean
}>()
const { routeName } = toRefs(props)
const { isRefreshPage, isHeaderHeight, isTagViewHeight, isContentPadding, isFooterHeight } = inject(layoutProvide)!

const { allIframeRouters } = routerHelper()
const topAttribute = computed(() => {
  return `${isHeaderHeight.value + isTagViewHeight.value}px`
})
const bottomAttribute = computed(() => {
  return `${isFooterHeight.value + isContentPadding.value}px`
})
const paddingAttribute = computed(() => {
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
interface iframeRouterCom {
  component: Component | undefined
  name?: string | RouteRecordName
}
const demoCom = shallowRef<iframeRouterCom[]>([])
onMounted(() => {
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
const tagStore = useTagStore()
const { tagList } = storeToRefs(tagStore)
const { exclude } = storeToRefs(cacheStore)
const delayRouteName = refDebounced(routeName!, 500)
function hasTag(name?: RouteRecordName | null) {
  return some(tagList.value, item => item.name === name)
}
// 定义一个函数 shouldKeepIframe，接受一个可选参数 name，类型为 RouteRecordName 或 null
function shouldKeepIframe(name?: RouteRecordName | null) {
  return delayRouteName.value === name
    // 判断当前当前页面是否为 iframe 页面
    ? (
      // 判断 exclude.value 中是否有满足以下条件的项：
        !some(exclude.value, item => item.test(isString(name) ? name : ''))
        // 判断 isRefreshPage.value 是否为真值
        && isRefreshPage.value
        // 判断 hasTag(name) 是否为真值
        && hasTag(name)
      )
    // 如果不相等，则判断 hasTag(name) 是否为真值
    : hasTag(name)
}
function isVshow(name?: RouteRecordName | null) {
  return props.routeName === name && props.isIframe
}
</script>

<template >
  <!-- eslint-disable-next-line vue/valid-v-for -->
  <Transition
    v-for="{ name, component } in demoCom"
    :appear="true"
    enterActiveClass="animated-fade-in-left animated animated-duration-300 ease-in-out !absolute absolute_orientation"
    leaveActiveClass="animated-fade-out-right animated animated-duration-300 ease-in-out !absolute absolute_orientation"
  >
    <div
      v-if="shouldKeepIframe(name)"
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

<style scoped >
.absolute_orientation{
  top:v-bind(topAttribute);
  bottom:v-bind(bottomAttribute);
  left:v-bind(paddingAttribute);
  right:v-bind(paddingAttribute);
}
</style>
