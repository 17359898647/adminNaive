import { forEach, has, isString } from 'lodash-es'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { htmlTitle } from '@/composables/useTitle'
import { enhanceAutoRouter } from '@/router/helps/enhanceAutoRouter'

function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    loadingStart()
    // const isPermissionReady = await createPermissionRouter(to, from, next)
    // if (!isPermissionReady)
    //   return
    // await initLoginRouteGuard(to, from, next)
    next()
  })
  // 跳转完成后
  router.afterEach((to) => {
    const {
      meta: {
        isTitle,
        changeTitle,
      },
    } = to as unknown as routerObject
    changeTitle !== false && (htmlTitle.value = isTitle)
    loadingFinish()
  })

  router.onError((error) => {
    console.log('跳转错误', error)
    loadingError()
  })
}
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routers) => {
    const createMeta = (_routers: RouteRecordRaw[]) => {
      forEach(_routers, (item) => {
        const { path } = item
        if (has(enhanceAutoRouter, path)) {
          item.meta = {
            ...(item.meta || {}),
            ...enhanceAutoRouter[path],
          }
        }
        if (item.children)
          createMeta(item.children)
      })
    }
    createMeta(routers)
    console.log(routers)
    const excludeReg = /^\/(base|login)|ExteriorNotFoundView/
    return [
      ...setupLayouts(routers.filter((item) => {
        const { path, name } = item
        return !excludeReg.test(path) && !excludeReg.test(isString(name) ? name : '')
      })),
      ...routers.filter((item) => {
        const { path, name } = item
        return excludeReg.test(path) || excludeReg.test(isString(name) ? name : '')
      }),
    ]
  },
})

export async function installRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
  console.log('router装载完成')
}
