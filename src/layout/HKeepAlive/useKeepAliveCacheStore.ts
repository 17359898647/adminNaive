import { isArray, map } from 'lodash-es'
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
  const unCache = map(allUnKeepAliveRoutes, item => createReg(item))
  const exclude = ref<RegExp[]>(unCache)
  const delCache = async (tag: ITag | ITag[]) => {
    if (isArray(tag)) {
      exclude.value.push(...map(tag, item => createReg(item)))
      exclude.value = unCache
    }
    else {
      exclude.value.push(createReg(tag))
      await useSleep(300)
      exclude.value = unCache
    }
  }
  return {
    exclude,
    delCache,
  }
})
