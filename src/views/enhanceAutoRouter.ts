import type { RouteMeta } from 'vue-router'

export const enhanceAutoRouter: Record<string, RouteMeta> = {
  '/OutsideChain': {
    isTitle: '外链',
    lineIcon: 'twemoji:couple-with-heart-man-man-light-skin-tone-dark-skin-tone',
    isOrder: 999,
  },
  '/one': {
    isTitle: '嵌套路由',
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
  '/Assembly': {
    isTitle: '组件',
    lineIcon: 'logos:webcomponents',
  },
}
