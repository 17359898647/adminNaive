import type { MaybeRef } from '@vueuse/core'
import { cloneDeep, forEach, isUndefined, sortBy } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router/auto'
import type { asyncComponentType } from '@/router/helps/setComponentName'
import { setComponentName } from '@/router/helps/setComponentName'
import { setMetaAndName } from '@/views/enhanceAutoRouter'

function sortRouter(routerList: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const deepSort = (_list: RouteRecordRaw[]) => {
    forEach(_list, async (item) => {
      if (item.children && item.children.length >= 1)
        item.children = deepSort(item.children)
      if (!isUndefined(item.component))
        await setComponentName(item.component as asyncComponentType, String(item.name || ''))
    })
    return sortBy(_list, item => item.meta?.isOrder ?? 0)
  }
  return deepSort(cloneDeep(unref(routerList)))
}

function findAffix(routerList: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(unref(routerList), (item) => {
    const { children, meta } = item
    if (meta?.isAffix) {
      result.push({
        ...item,
        children: undefined,
      } as RouteRecordRaw)
    }
    if (children)
      result.push(...findAffix(children))
  })
  return result
}

function findUnKeepAlive(routerList: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(unref(routerList), (item) => {
    const { children, meta } = item
    if (meta?.isKeepAlive === false)
      result.push(item)
    if (children)
      result.push(...findUnKeepAlive(children))
  })
  return result
}

function setRedirect(item: RouteRecordRaw) {
  if (isUndefined(item.redirect)) {
    item.redirect = {
      name: item.children![0].name,
    }
  }
}

function setRouterRedirect(routerList: MaybeRef<RouteRecordRaw[]>) {
  const result: RouteRecordRaw[] = []
  forEach(cloneDeep(unref(routerList)), (item) => {
    if (!isUndefined(item.children) && item.children.length >= 1) {
      item.children = setRouterRedirect(item.children)
      setRedirect(item)
    }
    result.push(item)
  })
  return result
}

function deepCreateMeta(routerList: MaybeRef<RouteRecordRaw[]>) {
  const result: RouteRecordRaw[] = []
  forEach(cloneDeep(unref(routerList)), (item) => {
    if (item.children) {
      item.children = deepCreateMeta(item.children)
      setMetaAndName(item)
    }
    result.push(item)
  })
  return result
}

const allRouters = shallowRef<RouteRecordRaw[]>([])
const allAffixRouters = shallowRef<RouteRecordRaw[]>([])
const allUnKeepAliveRouters = shallowRef<RouteRecordRaw[]>([])
export function routerHelper() {
  const createRouterHelper = (list: MaybeRef<RouteRecordRaw[]>) => {
    const metaRouter = deepCreateMeta(unref(list))
    allRouters.value = sortRouter(metaRouter)
    allAffixRouters.value = findAffix(allRouters)
    allUnKeepAliveRouters.value = findUnKeepAlive(allRouters)
    const resultRouter = setRouterRedirect(allRouters)
    return {
      resultRouter,
    }
  }

  return {
    allRouters,
    allAffixRouters,
    allUnKeepAliveRouters,
    createRouterHelper,
  }
}
