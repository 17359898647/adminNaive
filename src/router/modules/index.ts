import { map } from 'lodash-es'

export const baseRouter: routerObject[] = [
  {
    path: '/',
    name: 'rootRouter',
    redirect: '/home',
    meta: {
      isTitle: '首页',
    },
    component: () => import('@/layout/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isTitle: '登录',
      changeTitle: false,
    },
    component: '/login/LoginView',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ExteriorNotFoundView',
    meta: {
      isTitle: '404',
      changeTitle: false,
    },
    component: () => import('@/views/not-found/404.vue'),
  },
]

type modulesRouter = Record<string, { default: routerObject[];string: routerObject[] }>

const modules = import.meta.glob('./**/*.ts', { eager: true }) as modulesRouter
function handleModuleRoutes(modules: modulesRouter) {
  const result: routerObject[] = []
  map(modules, (module, key) => {
    const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2') as keyof typeof module
    if (module[moduleName])
      result.push(...module[moduleName])
    else
      result.push(...module.default)
  })
  return result
}
export const moduleRouters = handleModuleRoutes(modules)
