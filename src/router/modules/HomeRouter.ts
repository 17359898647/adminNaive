export const HomeRouter: routerObject[] = [
  {
    path: '/home',
    meta: {
      isTitle: '首页',
      lineIcon: 'material-symbols:home',
    },
    component: '/home/index',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'InteriorNotFound',
    meta: {
      isTitle: '404',
      isHidden: true,
    },
    component: '/not-found/404',
  },
]
