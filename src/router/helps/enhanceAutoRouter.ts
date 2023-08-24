import type { RouteMeta } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto/routes'

export const enhanceAutoRouter: Record<string | keyof RouteNamedMap, RouteMeta> = {
  '/OutsideChain': {
    isTitle: '外链',
    lineIcon: 'twemoji:couple-with-heart-man-man-light-skin-tone-dark-skin-tone',
    isOrder: 999,
  },
  '/one': {
    isTitle: '多级路由',
    isOrder: 1,
  },
  two: {
    isTitle: '二级路由',
    isOrder: 1,
  },
  three: {
    isTitle: '三级路由',
    isOrder: 10,
  },
}
