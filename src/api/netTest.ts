import type { MaybeRef } from '@vueuse/core'
import { request } from '@/api/index'

interface RootObject {
  userId: number
  id: number
  title: string
  completed: boolean
}

export function netTest(params: MaybeRef<string>) {
  return request<RootObject, {
    demoData: any
  }, {
    test: any
  }>({
    url: () => `https://jsonplaceholder.typicode.com/todos${toValue(params)}`,
    headers: {
      responseType: 'json',
    },
    method: 'post',
    resetOnExecute: true,
  })
}
