import { cloneDeep, forEach, isUndefined, sortBy } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router/auto'
import { routes } from 'vue-router/auto/routes'
import type { asyncComponentType } from './setComponentName'
import { setComponentName } from './setComponentName'

function sortRouter(list: RouteRecordRaw[]): RouteRecordRaw[] {
  const listClone = cloneDeep(list)
  const sort = (_list: RouteRecordRaw[]) => {
    forEach(_list, (item) => {
      const { path } = item
      if (item.children && item.children.length > 1)
        item.children = sort(item.children)
      if (!isUndefined(item.component))
        setComponentName(item.component as asyncComponentType, path)
    })
    return sortBy(_list, item => item.meta?.isOrder ?? 0)
  }
  return sort(listClone)
}

function findAffix(list: RouteRecordRaw[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(list, (item) => {
    const { children, meta } = item
    if (meta?.isAffix)
      result.push(item)
    if (children)
      result.push(...findAffix(children))
  })
  return result
}

function findUnKeepAlive(list: RouteRecordRaw[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(list, (item) => {
    const { children, meta } = item
    if (meta?.isKeepAlive === false)
      result.push(item)
    if (children)
      result.push(...findUnKeepAlive(children))
  })
  return result
}

export const allRoutes = sortRouter(routes)
export const allAffixRoutes = findAffix(allRoutes)
export const allUnKeepAliveRoutes = findUnKeepAlive(allRoutes)
