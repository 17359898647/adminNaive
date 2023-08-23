import { assign, isUndefined } from 'lodash-es'
import type { RouteLocationNamedRaw, RouteLocationPathRaw } from 'vue-router'
import { router } from '@/router'

interface routerPushDefault extends Omit<RouteLocationPathRaw & RouteLocationNamedRaw, 'name' | 'path'> {
  name?: string | routerTypeKeys
  path?: string | routerTypeKeys
}
const _config: routerPushDefault = {
  name: 'rootRouter',
}
export async function routerPush(config?: routerPushDefault) {
  const {
    name,
    path,
    ...rest
  } = assign(_config, config)
  if (isUndefined(path))
    return await router.push(assign({ name }, rest))
  else
    return await router.push(assign({ path }, rest))
}
