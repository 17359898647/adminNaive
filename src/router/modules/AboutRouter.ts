export const AboutRouter: routerObject[] = [
  {
    path: '/about',
    component: '/about/index',
    meta: {
      isTitle: '关于',
      lineIcon: 'ic:baseline-roundabout-right',
      isOrder: 900,
    },
    children: [
      {
        path: '/about/author',
        component: '/about/index',
        meta: {
          isTitle: '作者',
          isOrder: 900,
        },
        children: [
          {
            path: '/about/author1',
            component: '/about/index',
            meta: {
              isTitle: '测试',
              isOrder: 900,
            },
          },
        ],
      },
    ],
  },
]
