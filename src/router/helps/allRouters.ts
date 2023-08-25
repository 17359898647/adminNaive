import type { MaybeRef } from '@vueuse/core'
import { cloneDeep, forEach, isUndefined, sortBy } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router/auto'
import { routes } from 'vue-router/auto/routes'
import type { asyncComponentType } from '@/router/helps/setComponentName'
import { setComponentName } from '@/router/helps/setComponentName'

function sortRouter(list: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const listClone = cloneDeep(list)
  const deepSort = (_list: RouteRecordRaw[]) => {
    forEach(_list, async (item) => {
      if (item.children && item.children.length >= 1)
        item.children = deepSort(item.children)
      if (!isUndefined(item.component))
        await setComponentName(item.component as asyncComponentType, String(item.name || ''))
    })
    return sortBy(_list, item => item.meta?.isOrder ?? 0)
  }
  return deepSort(unref(listClone))
}

function findAffix(list: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(unref(list), (item) => {
    const { children, meta } = item
    if (meta?.isAffix)
      result.push(item)
    if (children)
      result.push(...findAffix(children))
  })
  return result
}

function findUnKeepAlive(list: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(unref(list), (item) => {
    const { children, meta } = item
    if (meta?.isKeepAlive === false)
      result.push(item)
    if (children)
      result.push(...findUnKeepAlive(children))
  })
  return result
}

export const allRouters = shallowRef(sortRouter(routes))
export const allAffixRouters = shallowRef(findAffix(allRouters))
export const allUnKeepAliveRouters = shallowRef(findUnKeepAlive(allRouters))
