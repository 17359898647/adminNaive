import { map } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import { useSleep } from '@/composables/useSleep'
import { allUnKeepAliveRoutes } from '@/router/helps/allRoutes'
import type { ITag } from '@/store/modules/useTagStore'

function createReg(tag: ITag | (RouteRecordRaw & {
  fullPath?: string
})) {
  const { fullPath, path } = tag
  return new RegExp(`${fullPath || path}`)
}
export const useKeepAliveCacheStore = defineStore('useKeepAliveCacheStore', () => {
  const exclude = ref<RegExp[]>(map(allUnKeepAliveRoutes, (item) => {
    return createReg(item)
  }))
  const delCache = async (tag: ITag) => {
    exclude.value.push(createReg(tag))
    // 动画时间
    await useSleep(300)
    exclude.value = exclude.value.filter((item) => {
      return !item.test(tag.fullPath)
    })
  }
  return {
    exclude,
    delCache,
  }
})
