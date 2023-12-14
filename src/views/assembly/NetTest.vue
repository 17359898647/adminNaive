<script lang="ts" setup >
import { netTest } from '@/api/netTest'

definePage({
  meta: {
    isTitle: '网络测试',
    lineIcon: 'icon-lucide:test-tube-2',
  },
})
const api = ref('')
const { execute, isLoading, data, onSuccess, onError } = netTest(api)
onSuccess((data) => {
  console.log('onSuccess', data)
})
onError((err) => {
  console.log(err)
})
function test() {
  execute()
}
</script>

<template >
  <NCard title="网络测试" >
    <NSpace
      :size="10"
      :vertical="true"
    >
      <RippleButton
        :loading="isLoading"
        @click="test"
      >
        触发
      </RippleButton>
      <NInput v-model:value="api"/>
      <NCard >
        <pre v-html="JSON.stringify(toValue(data), null, 2)" ></pre>
      </NCard>
    </NSpace>
  </NCard>
</template>
