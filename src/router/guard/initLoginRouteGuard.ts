import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router/auto'
import { isUndefined } from 'lodash-es'

export async function initLoginRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: {
    (to?: RouteLocationRaw): void
    (to: RouteLocationRaw): void
  },
) {
  if (!isUndefined(to.meta.needLogin))
    return next()

  const token = localStorage.getItem('token')
  if (!token) {
    const { name } = to
    if (name === 'LoginRedirect') {
      return next()
    }
    else {
      createMsg('未登录或令牌到期', { type: 'error' })
      const redirect = to.name || '/'
      return next({
        name: 'LoginRedirect',
        params: { redirect },
        replace: true,
      })
    }
  }
  else {
    return next()
  }
}
