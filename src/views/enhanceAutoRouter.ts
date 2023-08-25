import { has, isUndefined } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import type { RouteMeta } from 'vue-router/auto'

const enhanceAutoRouter: Record<string, RouteMeta> = {
  '/OutsideChain': {
    isTitle: '外链',
    lineIcon: 'twemoji:couple-with-heart-man-man-light-skin-tone-dark-skin-tone',
    isOrder: 999,
  },
  '/one': {
    isTitle: '嵌套路由',
    isOrder: 1,
    lineIcon: 'fluent:glance-default-12-filled',
  },
  two: {
    isTitle: '二级路由',
    isOrder: 1,
    lineIcon: 'fluent:glance-default-12-filled',
  },
  three: {
    isTitle: '三级路由',
    isOrder: 10,
    lineIcon: 'fluent:glance-default-12-filled',
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
