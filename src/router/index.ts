import { isString } from 'lodash-es'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routerHelper } from './helps/allRouters'
import { htmlTitle } from '@/composables/useTitle'
import { initLoginRouteGuard } from '@/router/guard/initLoginRouteGuard'
import { initRolesRouterGuard } from '@/router/guard/initRolesRouterGuard'

function setupRouterGuard(router: Router) {
  router.beforeResolve(async (to, from, next) => {
    loadingStart()
    const loginResult = await initLoginRouteGuard(to as RouteLocationNormalized, from as RouteLocationNormalized, next)
    if (!loginResult)
      return
    await initRolesRouterGuard(to as RouteLocationNormalized, from as RouteLocationNormalized, next)
  })
  // 跳转完成后
  router.afterEach((to) => {
    const { isTitle, changeTitle } = to.meta || {}
    changeTitle !== false && (htmlTitle.value = isTitle)
    loadingFinish()
  })

  router.onError((error) => {
    console.log('跳转错误', error)
  })
}
export const router = createRouter({
  extendRoutes: (routers) => {
    const { createRouterHelper } = routerHelper()
    const resultRouter = createRouterHelper(routers)
    const excludeReg = /^\/(base|login|ExteriorNotFoundView)/
    console.log(setupLayouts(resultRouter.filter((item) => {
      const { path, name } = item
      return !excludeReg.test(path) && !excludeReg.test(isString(name) ? name : '')
    })))
    return [
      ...setupLayouts(resultRouter.filter((item) => {
        const { path, name } = item
        return !excludeReg.test(path) && !excludeReg.test(isString(name) ? name : '')
      })),
      ...resultRouter.filter((item) => {
        const { path, name } = item
        return excludeReg.test(path) || excludeReg.test(isString(name) ? name : '')
      }),
    ]
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (...[,,savedPosition]) => {
    return savedPosition || { top: 0 }
  },
})
export async function installRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
  console.log('router装载完成')
}
