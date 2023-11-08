import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router/auto'

function hasRequiredRoles(userRoles: string[], requiredRoles: string[]): boolean {
  return userRoles.some(role => requiredRoles.includes(role))
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
  const userRoles: userRouteMeta['roles'] = ['visitor']
  const { meta } = to
  // 所需权限
  const { roles } = meta
  if (roles) {
    if (hasRequiredRoles(userRoles, roles)) {
      next()
    }
    else {
      createMsg('无权限', { type: 'error' })
      throw new Error('无权限')
    }
  }
  else {
    next()
  }
}
