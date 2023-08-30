import { has, isUndefined } from 'lodash-es'
import type { RouteMeta, RouteRecordRaw } from 'vue-router/auto'
import type { RouteNamedMap } from 'vue-router/auto/routes'

export type RoutePathUnion = RouteNamedMap[keyof RouteNamedMap]['path']
export type RouteNameUnion = keyof RouteNamedMap
const enhanceAutoRouter: Record<RoutePathUnion | string, RouteMeta> = {
  '/OutsideChain': {
    isTitle: '外链',
    lineIcon: 'twemoji:couple-with-heart-man-man-light-skin-tone-dark-skin-tone',
    isOrder: Number.POSITIVE_INFINITY,
  },
  '/one': {
    isTitle: '一级父路由',
    lineIcon: 'fluent:glance-default-12-filled',
  },
  two: {
    isTitle: '二级父路由',
    lineIcon: 'fluent:glance-default-12-filled',
    isOrder: Number.NEGATIVE_INFINITY,
  },
  three: {
    isTitle: '三级父路由',
    lineIcon: 'fluent:glance-default-12-filled',
    isOrder: Number.NEGATIVE_INFINITY,
  },
  '/Assembly': {
    isTitle: '组件',
    lineIcon: 'logos:webcomponents',
  },
}
export function setMetaAndName(route: RouteRecordRaw) {
  const { path, name } = route
  if (has(enhanceAutoRouter, path) && isUndefined(name)) {
    route.meta = enhanceAutoRouter[path]
    route.name = path
  }
}
