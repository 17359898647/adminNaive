<script lang="ts" setup>
import { useRequest } from '@/api'

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
const { execute, isLoading } = useRequest<RootObject>({
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
    <NButton
      :loading="isLoading"
      @click="() => execute()"
    >
      触发
    </NButton>
    <NInput v-model:value="api" />
  </NCard>
</template>
