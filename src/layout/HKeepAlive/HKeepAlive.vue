<script lang="ts" setup>
import { inject } from 'vue'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'

const { isRefreshPage } = inject(layoutProvide)!
const cacheStore = useKeepAliveCacheStore()
const { exclude } = storeToRefs(cacheStore)
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      appear
      enterActiveClass="animated-fade-in-left animated animated-duration-300 ease-in-out"
      leaveActiveClass="animated-fade-out-right animated animated-duration-300 ease-in-out"
      mode="out-in"
    >
      <KeepAlive
        :exclude="exclude"
        :max="2"
      >
        <component
          :is="Component"
          v-if="isRefreshPage"
          :key="route.fullPath"
          class="flex-1 overflow-hidden"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
