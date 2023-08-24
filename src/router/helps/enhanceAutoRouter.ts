import type { RouteMeta } from 'vue-router'

export const enhanceAutoRouter: Record<string, RouteMeta> = {
  '/OutsideChain': {
    isTitle: '外链',
    lineIcon: 'twemoji:couple-with-heart-man-man-light-skin-tone-dark-skin-tone',
    isOrder: 999,
  },
}
