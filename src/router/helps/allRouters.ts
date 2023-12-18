import type { MaybeRef } from '@vueuse/core'
import { assign, cloneDeep, forEach, isFunction, isUndefined, sortBy } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router/auto'
import type { asyncComponentType } from '@/router/helps/setComponentName'
import { setComponentName } from '@/router/helps/setComponentName'
import { setMetaAndName } from '@/views/enhanceAutoRouter'

function sortRouter(routerList: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const deepSort = (_list: RouteRecordRaw[]) => {
    forEach(_list, async (item) => {
      const { children, name, component } = item
      if (children && children.length >= 1)
        item.children = deepSort(children)
      if (isFunction(component)) {
        assign(item, {
          component: () => setComponentName(component as asyncComponentType, String(name)),
        })
      }
    })
    return sortBy(_list, item => item.meta?.isOrder ?? 0)
  }
  return deepSort(cloneDeep(toValue(routerList)))
}

function findAffix(routerList: MaybeRef<RouteRecordRaw[]>): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(toValue(routerList), (item) => {
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
  forEach(toValue(routerList), (item) => {
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
  forEach(cloneDeep(toValue(routerList)), (item) => {
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
  forEach(cloneDeep(toValue(routerList)), (item) => {
    if (item.children) {
      item.children = deepCreateMeta(item.children)
      setMetaAndName(item)
    }
    result.push(item)
  })
  return result
}
function deepCreateIframe(routerList: MaybeRef<RouteRecordRaw[]>) {
  const result: RouteRecordRaw[] = []
  const deepFilter = (routes: RouteRecordRaw[]) => {
    forEach(routes, (item) => {
      if (item.meta?.isIframe)
        result.push(item)

      if (item.children)
        deepFilter(item.children)
    })
  }
  deepFilter(toValue(routerList))
  return result
}

const allRouters = shallowRef<RouteRecordRaw[]>([])
const allAffixRouters = shallowRef<RouteRecordRaw[]>([])
const allUnKeepAliveRouters = shallowRef<RouteRecordRaw[]>([])
const allIframeRouters = shallowRef<RouteRecordRaw[]>([])
export function routerHelper() {
  const createRouterHelper = (list: MaybeRef<RouteRecordRaw[]>) => {
    const metaRouter = deepCreateMeta(toValue(list))
    allRouters.value = sortRouter(metaRouter)
    allAffixRouters.value = findAffix(allRouters)
    allUnKeepAliveRouters.value = findUnKeepAlive(allRouters)
    allIframeRouters.value = deepCreateIframe(allRouters)
    return setRouterRedirect(allRouters)
  }

  return {
    allAffixRouters,
    allIframeRouters,
    allRouters,
    allUnKeepAliveRouters,
    createRouterHelper,
  }
}
