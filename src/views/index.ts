import type { RouteComponent } from 'vue-router'

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  home: () => import('./home/index.vue'),
}
