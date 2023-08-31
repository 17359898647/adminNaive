<script setup lang="ts">
import { layoutProvide } from '@/store/modules/useLayoutStore'

const { setAttrs, isDark } = inject(layoutProvide)!
const isHover = ref(false)
const _isDark = computed(() => isHover.value ? !isDark.value : isDark.value)
const isFullScreen = computed(() => {
  return _isDark.value
    ? {
        icon: 'line-md:moon-rising-twotone-alt-loop',
        title: '暗色模式',
      }
    : {
        icon: 'line-md:moon-to-sunny-outline-loop-transition',
        title: '亮色模式',
      }
})
function toggleTheme(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error
  const transition = document.startViewTransition(() => {
    setAttrs('isDark', !isDark.value)
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: !isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: !isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <NPopover
    v-model:show="isHover"
    trigger="hover"
  >
    <template #trigger>
      <SvgIcon
        :key="isFullScreen.icon"
        :lineIcon="isFullScreen.icon"
        :size="24"
        @click="toggleTheme"
      />
    </template>
    <span>{{ isFullScreen.title }}</span>
  </NPopover>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
</style>
