<script lang="ts" setup>
import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'
import { assign, ceil, divide, max, throttle } from 'lodash-es'
import { NButton } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { ButtonProps } from './type'

defineOptions({
  inheritAttrs: false,
})

defineProps<ButtonProps>()
const emits = defineEmits<{
  click: [e: MouseEvent]
}>()
const attrs = useAttrs()
const buttonRef = shallowRef<InstanceType<typeof NButton>>()
function _createRipple<T extends MaybeElement>(el: MaybeComputedElementRef<T>, event: MouseEvent) {
  const _el = unrefElement(el)
  if (!_el)
    return
  const { clientX, clientY } = event
  const { left, top, width, height } = _el.getBoundingClientRect()
  const radius = ceil(divide(max([width, height])!, 100))
  // 获取点击位置相对于el的位置
  const x = clientX - left
  const y = clientY - top
  const div = document.createElement('div')
  const style = {
    position: 'absolute',
    width: `${radius}px`,
    height: `${radius}px`,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .5)',
    left: `${x}px`,
    top: `${y}px`,
    transformOrigin: 'center',
    transform: 'translate(-50%, -50%) scale(10)',
    pointerEvents: 'none',
  } as CSSProperties
  assign(div.style, style)
  _el.insertBefore(div, _el.firstChild)
  // 动画
  const animate = div.animate([
    {
      transform: 'scale(10)',
      borderRadius: '50%',
      opacity: 1,
    },
    {
      transform: 'scale(300)',
      borderRadius: '50%',
      opacity: 0,
    },
  ], {
    duration: 1000,
  })
  animate.onfinish = () => {
    _el.removeChild(div)
  }
}

// 防抖
const createRipple = throttle(_createRipple, 80, {
  leading: true,
  trailing: false,
})

function buttonClick(event: MouseEvent) {
  emits('click', event)
  createRipple(unrefElement(buttonRef), event)
}
const propsComputed = computed(() => {
  const { ..._attrs } = attrs
  return {
    ..._attrs,
  }
})
</script>

<template>
  <NButton
    ref="buttonRef"
    v-bind="propsComputed"
    class="overflow-hidden"
    @click="buttonClick"
  >
    <template #default>
      <slot />
    </template>
    <template #icon>
      <slot name="icon" />
    </template>
  </NButton>
</template>

<style scoped>
:deep(.n-button__content) {
  z-index: 10;
}
</style>