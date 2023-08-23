export const OutsideChain: routerObject[] = [
  {
    path: '/OutsideChain',
    meta: {
      isTitle: '外链',
      lineIcon: 'arcticons:clear-outside',
      isOrder: 1000,
    },
    children: [
      {
        path: 'https://cn.vuejs.org/',
        meta: {
          isTitle: 'Vue',
          lineIcon: 'logos:vue',
        },
      },
      {
        path: 'https://www.naiveui.com/zh-CN/light',
        meta: {
          isTitle: 'Naive UI',
          lineIcon: 'logos:naiveui',
        },
      },
    ],
  },
]
