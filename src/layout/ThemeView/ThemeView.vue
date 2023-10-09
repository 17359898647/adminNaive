<script setup lang="ts">
// const drawerShow = ref(false)
import { debounce } from 'lodash-es'
import type { CSSProperties } from 'vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'

const [drawerShow, setDrawerShow] = useToggle(false)
const { setAttrs, themeColor } = inject(layoutProvide)!
const drawerWidth = ref(500)
// 动画时间
const animationTime = ref(300)
const transitionTime = computed(() => {
  return {
    transition: `all ${animationTime.value}ms ${drawerShow.value ? 'cubic-bezier(0, 0, .2, 1)' : 'cubic-bezier(0, 0, .2, 1)'}`,
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

const setAttrsDeBounce = debounce(setAttrs, 300, {
  leading: true,
  trailing: false,
  maxWait: 300,
})
</script>

<template>
  <Teleport to="body">
    <div
      class="absolute right-0 top-1/2 z-2100 h-36px w-36px flex-center cursor-pointer rounded bg-primary"
      :style="buttonStyle"
      @click="setDrawerShow(!drawerShow)"
    >
      <SvgIcon
        lineIcon="icon-material-symbols:settings"
        size="26"
        :style="iconRotate"
      />
    </div>
    <div>
      <NDrawer
        :nativeScrollbar="false"
        :show="drawerShow"
        :width="drawerWidth"
        @update:show="setDrawerShow"
      >
        <NDivider>
          主题颜色
        </NDivider>
        <NColorPicker
          :modes="['hex']"
          :showAlpha="false"
          :value="themeColor"
          @updateValue="(e:string) => {
            setAttrsDeBounce('themeColor', e)
          }"
        />
      </NDrawer>
    </div>
  </teleport>
</template>
