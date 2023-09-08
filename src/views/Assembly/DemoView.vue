<script setup lang="ts">
import { NCard } from 'naive-ui'
import ShowOrEdit from './_ShowOrEdit.vue'

definePage({
  meta: {
    isTitle: '测试组件',
    isOrder: Number.POSITIVE_INFINITY,
  },
})
const valueList = ref([
  {
    value: '1',
  },
  {
    value: '1',
  },
])
</script>

<template>
  <NCard title="测试组件">
    <ShowOrEdit
      v-for="(item, index) in valueList"
      :key="index"
      v-model="item.value"
      @finish="console.log"
    />
  </NCard>
</template>
