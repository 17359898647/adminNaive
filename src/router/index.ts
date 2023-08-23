import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { htmlTitle } from '@/composables/useTitle'
import { createPermissionRouter } from '@/router/guard/createPermissionRouter'
import { initLoginRouteGuard } from '@/router/guard/initLoginRouteGuard'
import { getAllRouterFiles } from '@/router/helps/getAllRouterFiles'
import { baseRouter } from '@/router/modules'

function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    loadingStart()
    const isPermissionReady = await createPermissionRouter(to, from, next)
    if (!isPermissionReady)
      return
    await initLoginRouteGuard(to, from, next)
  })
  // 跳转完成后
  router.afterEach((to, from) => {
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
  routes: getAllRouterFiles(baseRouter),
})

export async function installRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
  console.log('router装载完成')
}
