import { concat, isArray, map } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import { routerHelper } from '@/router/helps/allRouters'
import type { ITag } from '@/store/modules/useTagStore'

function createReg(tag: ITag | (RouteRecordRaw & {
  fullPath?: string
})) {
  const { fullPath, name } = tag
  const reg = `^${String(name || fullPath)}`.replace(/\[([^\]]+)]/g, '\[\\s\\S\]*')
  return new RegExp(reg)
}
export const useKeepAliveCacheStore = defineStore('useKeepAliveCacheStore', () => {
  const { allUnKeepAliveRouters } = routerHelper()
  const unCache = map(unref(allUnKeepAliveRouters), item => createReg(item))
  const exclude = ref<RegExp[]>(unCache)
  const delCache = async (tag: ITag | ITag[]) => {
    console.log('delCache', tag)
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
    delCache,
    exclude,
  }
})
