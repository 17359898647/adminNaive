import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router/auto'
import { isUndefined } from 'lodash-es'

export async function initLoginRouteGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: {
    (to?: RouteLocationRaw): void
  },
) {
  const { meta, name } = to
  const { needLogin } = meta
  /* 无需登录 */
  if (!isUndefined(needLogin)) {
    console.log('无需登录')
    next()
    return false
  }
  const token = localStorage.getItem('token')
  const reg = /^\/login/g
  if (!token) {
    if (reg.test(to.path)) {
      next()
      return false
    }
    else {
      createMsg('未登录或令牌到期', { type: 'error' })
      const redirect: keyof RouteNamedMap = name || 'Root'
      next({
        name: '/login-[redirect]',
        params: {
          redirect,
        },
        replace: true,
      })
    }
  }
  else {
    /* 放行 */
    return true
  }
}
