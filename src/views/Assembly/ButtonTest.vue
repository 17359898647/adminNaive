<script lang="ts" setup>
import DefaultButton from './_ButtonDefault.vue'
import ButtonGroup from './_ButtonGroup.vue'

definePage({
  meta: {
    isTitle: '按钮测试',
    isOrder: Number.POSITIVE_INFINITY,
    lineIcon: 'teenyicons:button-outline',
  },
})
</script>

<template>
  <NCard>
    <NSpace :vertical="true">
      <DefaultButton />
      <ButtonGroup />
    </NSpace>
  </NCard>
</template>
