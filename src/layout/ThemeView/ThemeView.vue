<script setup lang="ts">
// const drawerShow = ref(false)
import type { CSSProperties } from 'vue'

const [drawerShow, setDrawerShow] = useToggle(false)
const drawerWidth = ref(300)
// 动画时间
const animationTime = ref(300)
const transitionTime = computed(() => {
  return {
    transition: `all ${animationTime.value}ms ${drawerShow.value ? 'var(--cubic-bezier-ease-out)' : 'var(--cubic-bezier-ease-in-out)'}`,
  } as CSSProperties
})
const buttonStyle = computed(() => {
  return {
    // transform: `translateX(${drawerShow.value ? -drawerWidth.value : 0}px)`,
    transform: `translateX(${drawerShow.value ? -drawerWidth.value : 0}px) translateY(-50%)`,
    ...transitionTime.value,
  } as CSSProperties
})

// 图标旋转动画
const iconRotate = computed(() => {
  return {
    transform: `rotate(${drawerShow.value ? 180 : 0}deg)`,
    transition: `all ${800}ms cubic-bezier(.62,-0.14,.62,2)`,
  } as CSSProperties
})
</script>

<template>
  <NEl>
    <div
      class="absolute right-0 top-1/2 z-2100 h-40px w-40px flex-center red rounded"
      :style="buttonStyle"
      @click="setDrawerShow(!drawerShow)"
    >
      <SvgIcon
        lineIcon="material-symbols:settings"
        size="30"
        :style="iconRotate"
      />
    </div>
    <div>
      <NDrawer
        v-model:show="drawerShow"
        :width="drawerWidth"
      />
    </div>
  </NEl>
</template>
