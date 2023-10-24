import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// 处理权限路由
export async function createPermissionRouter(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const routerStore = useRouterStore()
  const token = localStorage.getItem('token') || '123'
  const { name, fullPath } = to
  if (!routerStore.isReady) {
    if (!token) {
      if (name === 'login') {
        next()
        return false
      }
      else {
        const redirect = fullPath
        next({ name: 'login', query: { redirect }, replace: true }) // 重定向到登录页面
        return false
      }
    }
    await routerStore.addRouter()
    if (name === 'ExteriorNotFoundView') {
      const path = to.redirectedFrom?.fullPath || fullPath
      next({ hash: to.hash, path, query: to.query, replace: true })
      return false
    }
  }
  // 外部notfound
  if (name === 'ExteriorNotFoundView') {
    console.log('权限路由已经加载，仍然未找到，重定向到InteriorNotFound')
    // 内部notfound
    next({ name: 'InteriorNotFound' })
    return false
  }
  return true
}
