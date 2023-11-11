<script lang="ts" setup>
import { request } from '@/api'

interface RootObject {
  userId: number
  id: number
  title: string
  completed: boolean
}
definePage({
  meta: {
    isTitle: '网络测试',
    lineIcon: 'icon-lucide:test-tube-2',
  },
})
const api = ref('1')
const { execute, isLoading, data } = request<RootObject>({
  headers: {
    responseType: 'json',
  },
  onError: (err) => {
    console.log(err)
  },
  onFinish: () => {
    console.log('finish')
  },
  onSuccess: (res) => {
    console.log(res)
  },
  retry: 3,
  url: () => `https://jsonplaceholder.typicode.com/todos/${api.value}`,
})
</script>

<template>
  <NCard title="网络测试">
    <NSpace
      :size="10"
      :vertical="true"
    >
      <RippleButton
        :loading="isLoading"
        @click="() => execute()"
      >
        触发
      </RippleButton>
      <NInput v-model:value="api" />
      <NCard>
        <pre v-html="JSON.stringify(toValue(data), null, 2)" />
      </NCard>
    </NSpace>
  </NCard>
</template>
