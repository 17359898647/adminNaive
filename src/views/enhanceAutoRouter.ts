import { forEach, has, isPlainObject, isUndefined } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router/auto'

const enhanceAutoRouterModule = import.meta.glob(
  './**/index.ts',
  {
    eager: true,
  },
) as Record<'default', IEnhanceAutoRouter>
function getRouterName(path: string) {
  const pathWithoutIndex = path.replace(/\/index\.ts$/, '').replace(/\./g, '')
  const pathWithoutIndexArr = pathWithoutIndex.split('/')
  return pathWithoutIndexArr.length <= 2 ? pathWithoutIndex : pathWithoutIndexArr.slice(-1)[0]
}
function getEnhanceAutoRouterModule() {
  const result: IEnhanceAutoRouter = {}
  forEach(enhanceAutoRouterModule, (item, path) => {
    const routerName = getRouterName(path)
    if (isPlainObject(item.default))
      result[routerName] = item.default || {}
  })
  return result
}

const enhanceAutoRouter: IEnhanceAutoRouter = {
  ...getEnhanceAutoRouterModule(),
}
export function setMetaAndName(route: RouteRecordRaw) {
  const { path, name } = route
  if (has(enhanceAutoRouter, path) && isUndefined(name)) {
    route.meta = enhanceAutoRouter[path]
    route.name = path
  }
}
