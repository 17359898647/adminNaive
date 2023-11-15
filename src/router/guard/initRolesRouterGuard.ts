import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router/auto'
import { includes, some } from 'lodash-es'

type Roles = userRouteMeta['roles']
function hasRequiredRoles(userRoles: Roles, requiredRoles: Roles): boolean {
  return some(requiredRoles, role => includes(userRoles, role))
}
export async function initRolesRouterGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: {
    (to?: RouteLocationRaw): void
    (to: boolean): void
  },
) {
  // 用户拥有的权限
  const userRoles: Roles = ['visitor', 'admin']
  const { meta } = to
  // 所需权限
  const { roles } = meta
  if (roles) {
    if (hasRequiredRoles(userRoles, roles)) {
      next()
    }
    else {
      const { meta } = to
      const { isTitle } = meta || {}
      // 不具备roles权限
      createMsg(`无权限访问${isTitle}`, {
        type: 'error',
      })
      loadingError()
      next(false)
    }
  }
  else {
    next()
  }
}
