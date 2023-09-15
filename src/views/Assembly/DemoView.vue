<script setup lang="ts">
import { NCard } from 'naive-ui'

definePage({
  meta: {
    isTitle: '测试组件',
    isOrder: Number.POSITIVE_INFINITY,
  },
})
const [show, setShow] = useToggle(false)
const cardRef = shallowRef<HTMLElement>()
useAnimate({
  el: cardRef,
})
</script>

<template>
  <NCard title="测试组件">
    <RippleButton @click="() => setShow()">
      测试pnpm
    </RippleButton>
    <NCard
      ref="cardRef"
      title="标题"
    >
      <div
        v-if="show"
        class="h-20vh red"
      />
    </NCard>
  </NCard>
</template>
