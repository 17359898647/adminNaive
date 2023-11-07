import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router/auto'

// 处理权限路由
export async function createPermissionRouter(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  _next: {
    (to?: RouteLocationRaw): void
    (to: RouteLocationRaw): void
  },
) {
}
