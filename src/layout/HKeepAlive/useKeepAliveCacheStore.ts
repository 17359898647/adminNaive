import { concat, isArray, map } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import { allUnKeepAliveRouters } from '@/router/helps/allRouters'
import type { ITag } from '@/store/modules/useTagStore'

function createReg(tag: ITag | (RouteRecordRaw & {
  fullPath?: string
})) {
  const { fullPath, name } = tag
  return new RegExp(`${String(name || fullPath)}`)
}
export const useKeepAliveCacheStore = defineStore('useKeepAliveCacheStore', () => {
  const unCache = map(unref(allUnKeepAliveRouters), item => createReg(item))
  const exclude = ref<RegExp[]>(unCache)
  const delCache = async (tag: ITag | ITag[]) => {
    if (isArray(tag)) {
      exclude.value = concat(exclude.value, map(tag, item => createReg(item)))
      await nextTick()
      exclude.value = unCache
    }
    else {
      exclude.value = concat(exclude.value, [createReg(tag)])
      await nextTick()
      exclude.value = unCache
    }
  }
  return {
    exclude,
    delCache,
  }
})
