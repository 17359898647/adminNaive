import type { RouteRecordRaw } from 'vue-router'

export const AboutRouter: RouteRecordRaw[] = [
  {
    path: '/about',
    meta: {
      isTitle: '关于',
      lineIcon: 'ic:baseline-roundabout-right',
      isOrder: 900,
    },
    children: [
      {
        path: '/about/author',
        meta: {
          isTitle: '作者',
          isOrder: 900,
        },
        children: [],
      },
    ],
  },
]
