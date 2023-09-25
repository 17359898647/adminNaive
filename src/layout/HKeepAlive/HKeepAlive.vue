<script lang="ts" setup>
import { inject } from 'vue'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'

const { isRefreshPage, isHeaderHeight, isTagViewHeight, isContentPadding, isFooterHeight } = inject(layoutProvide)!
const cacheStore = useKeepAliveCacheStore()
const { exclude } = storeToRefs(cacheStore)
const topAttribute = computed(() => {
  return `${isHeaderHeight.value + isTagViewHeight.value}px`
})
const bottomAttribute = computed(() => {
  return `${isFooterHeight.value + isContentPadding.value}px`
})
const paddingAttribute = computed(() => {
  return `${isContentPadding.value}px`
})
</script>

<template>
  <RouterView
    v-slot="{
      Component, route: {
        fullPath,
        name,
        meta: {
          isIframe,
        },
      },
    }"
  >
    <Transition
      :appear="true"
      enterActiveClass="animated-fade-in-left animated animated-duration-300 ease-in-out !absolute absolute_orientation"
      leaveActiveClass="animated-fade-out-right animated animated-duration-300 ease-in-out !absolute absolute_orientation"
    >
      <KeepAlive :exclude="exclude">
        <Component
          :is="Component"
          v-if="isRefreshPage"
          v-show="isIframe !== true"
          :key="fullPath"
          class="flex-1 overflow-hidden"
        />
      </KeepAlive>
    </Transition>
    <!-- eslint-disable-next-line vue/valid-v-for -->
    <IframKeep
      :isIframe="isIframe"
      :routeName="name"
    />
  </RouterView>
</template>

<style scoped>
.absolute_orientation{
  top:v-bind(topAttribute);
  bottom:v-bind(bottomAttribute);
  left:v-bind(paddingAttribute);
  right:v-bind(paddingAttribute);
}
</style>
