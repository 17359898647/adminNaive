import { assign, cloneDeep, forEach, includes, isFunction, isString, isUndefined, map, replace, sortBy } from 'lodash-es'
import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

function removeHeadDot(str: string) {
  return replace(str, /^\./, '')
}
// 去除字符串尾部的/CountTo.tsx
function removeEndIndex(str: string) {
  return replace(str, /\.tsx$/, '')
}
// 去除字符串尾部的.vue
function removeEndIndexVue(str: string) {
  return replace(str, /\.vue$/, '')
}
// 去掉/src/views
function removeHeadViews(str: string) {
  return replace(str, /^\/src\/views/, '')
}

type asyncComponentType = () => Promise<{
  default: Component
  [key: string]: Component
}>

type dynamicViewsType = Record<
  string,
  asyncComponentType
>
type transformRouterType = Record<
  string,
  {
    Component: () => Promise<{
      default: Component
    }>
    originalPath: string
  }
>
export function transformRouter() {
  const result: transformRouterType = {}
  const dynamicViews = import.meta.glob('@/views/**/*.{vue,tsx}') as dynamicViewsType
  forEach(dynamicViews, (Component, key) => {
    if (includes(['.vue', '.tsx'], key))
      return
    const routeKey = removeHeadViews(removeEndIndexVue(removeEndIndex(removeHeadDot(key))))
    result[routeKey] = {
      Component,
      originalPath: key,
    }
  })
  return result
}
const dynamicViews = transformRouter()

export function sortMenu(list: RouteRecordRaw[]): RouteRecordRaw[] {
  const listClone = cloneDeep(list)
  const sort = (_list: RouteRecordRaw[]) => {
    forEach(_list, (item) => {
      if (item.children && item.children.length > 1)
        item.children = sort(item.children)
    })
    return sortBy(_list, item => item.meta?.isOrder ?? 0)
  }
  return sort(listClone)
}
/** 删除多余 children */
export function delChildrenRouter<T extends routerObject | RouteRecordRaw>(router: T[]): Omit<T, 'children'>[] {
  return map(router, (item) => {
    const { children, ...rest } = item
    if (isUndefined(children))
      return rest
    return {
      ...rest,
    }
  })
}
/** 获取文件名称 */
function getFileName(path?: string) {
  const reg = /\/([^/]+)\.\w+$/
  const result = path?.match(reg)
  if (result)
    return result[1]

  return ''
}
/** 获取组件实例 */
function getViewComponent(path: string) {
  if (!dynamicViews[path]) {
    console.error(`路由“${path}”没有对应的组件文件！`)
    return null
  }
  const { Component, originalPath } = dynamicViews[path]
  const fileName = getFileName(originalPath)
  return async () => {
    const component = await setComponentName(Component, path, fileName)
    if (isUndefined(component?.default) && isUndefined(component?.[fileName])) {
      console.error(`路径“${originalPath}”路由${path}没有对应的组件文件！`)
      return <div>{`路径“${originalPath}”路由“${path}”没有对应的组件文件！`}</div>
    }
    if (!isUndefined(component?.default))
      return component?.default
    else return component?.[fileName]
  }
}
/** 设置路由 name */
function setRouteName(item: routerObject) {
  const { path, name } = item
  if (isUndefined(name))
    assign(item, { name: path })
}
/** 设置组件 name */
async function setComponentName(asyncComponent: asyncComponentType, name: string, fileName?: string) {
  if (!isFunction(asyncComponent)) {
    console.error('组件必须是一个函数！')
    return null
  }
  const component = await asyncComponent()
  if (!isUndefined(component.default))
    assign(component.default, { name })

  if (!isUndefined(fileName) && !isUndefined(component[fileName]))
    assign(component[fileName], { name })
  return component
}

export function getAllRouterFiles(routerList: routerObject[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  forEach(routerList, (item) => {
    const { component, path, children } = item
    setRouteName(item)
    if (children && children.length > 0) {
      result.push(...getAllRouterFiles(children))
      assign(item, { redirect: children[0].path })
    }
    if (isFunction(component))
      assign(item, { component: () => setComponentName(component as asyncComponentType, path) })

    if (isString(component))
      assign(item, { component: getViewComponent(component) })

    if (isUndefined(component) && !children)
      console.warn(`路由“${path}”没有对应的组件文件！`)

    result.push(item as unknown as RouteRecordRaw)
  })
  return delChildrenRouter(result) as RouteRecordRaw[]
}
