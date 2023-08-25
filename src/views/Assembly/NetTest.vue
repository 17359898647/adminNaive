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
    lineIcon: 'material-symbols:home',
  },
})
const api = ref('1')
const { execute, isLoading, data } = request<RootObject>({
  url: () => `https://jsonplaceholder.typicode.com/todos/${api.value}`,
  onSuccess: (res) => {
    console.log(res)
  },
  onError: (err) => {
    console.log(err)
  },
})
</script>

<template>
  <NCard title="网络测试">
    <NSpace
      :size="10"
      vertical
    >
      <NButton
        :loading="isLoading"
        @click="() => execute()"
      >
        触发
      </NButton>
      <NInput v-model:value="api" />
      <NCard>
        <pre v-html="JSON.stringify(toValue(data), null, 2)" />
      </NCard>
    </NSpace>
  </NCard>
</template>
