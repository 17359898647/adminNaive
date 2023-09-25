<script lang="ts" setup>
import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'
import { assign, ceil, divide, max, throttle } from 'lodash-es'
import { NButton } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { ButtonProps } from './type'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ButtonProps>(), {
  ripple:true,
})
const emits = defineEmits<{
  click: [e: MouseEvent]
}>()
const attrs = useAttrs()
const buttonRef = shallowRef<InstanceType<typeof NButton>>()
let immobilizationStyle: {
  left: number
  top: number
  width: number
  height: number
  borderTopLeftRadius: string
  borderTopRightRadius: string
  borderBottomLeftRadius: string
  borderBottomRightRadius: string
}
function getImmobilizationStyle(el: HTMLElement) {
  if (!immobilizationStyle) {
    const { left, top, width, height } = el.getBoundingClientRect()
    const {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    } = getComputedStyle(el)
    immobilizationStyle = {
      left,
      top,
      width,
      height,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    }
  }
  return immobilizationStyle
}
function _createRipple<T extends MaybeElement>(el: MaybeComputedElementRef<T>, event: MouseEvent) {
  const _el = unrefElement(el)
  if (!_el)
    return
  const { clientX, clientY } = event
  const {
    left,
    top,
    width,
    height,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = getImmobilizationStyle(_el as HTMLElement)
  const radius = ceil(divide(max([width, height])!, 100))
  const x = clientX - left
  const y = clientY - top
  const parendDiv = document.createElement('div')
  parendDiv.classList.add('ripple')
  const childrenDiv = document.createElement('div')
  const childrenStyle = {
    position: 'absolute',
    width: `${radius}px`,
    height: `${radius}px`,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .4)',
    left: `${x}px`,
    top: `${y}px`,
    transformOrigin: 'center',
    transform: 'translate(-50%, -50%) scale(10)',
    pointerEvents: 'none',
  } as CSSProperties
  const parentStyle = {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    overflow: 'hidden',
    pointerEvents: 'none',
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } as CSSProperties
  assign(childrenDiv.style, childrenStyle)
  assign(parendDiv.style, parentStyle)
  parendDiv.appendChild(childrenDiv)
  _el.insertBefore(parendDiv, _el.firstChild)
  // // 动画
  const animate = childrenDiv.animate([
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
    _el.removeChild(parendDiv)
  }
}

// 防抖
const createRipple = throttle(_createRipple, 80, {
  leading: true,
  trailing: false,
})

function buttonClick(event: MouseEvent) {
  emits('click', event)
  props.ripple && createRipple(unrefElement(buttonRef), event)
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
