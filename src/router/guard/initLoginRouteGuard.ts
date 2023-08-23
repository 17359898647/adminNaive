// 处理token相关
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function initLoginRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const token = localStorage.getItem('token') || '123'
  if (!token) {
    const { name } = to
    if (name === 'login') {
      next()
    }
    else {
      createMsg('未登录或令牌到期', { type: 'error' })
      console.log('权限路由已经加载，未登录，重定向到login', to.fullPath)
      const redirect = to.fullPath
      next({ name: 'login', replace: true, query: { redirect } })
    }
  }
  next()
}
