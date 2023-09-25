import { isUndefined, map } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto/routes'
import { routerHelper } from '@/router/helps/allRouters'

export type _MenuOption = MenuOption & {
  lineIcon?: string
  localIcon?: string
}
function createAllMenuName(router: RouteRecordRaw[]) {
  const result = new Set<RouteRecordName>()
  const deep = (router: RouteRecordRaw[]) => {
    map(router, (item) => {
      const { name, children, meta } = item
      if (name && !meta?.isHidden)
        result.add(name)
      if (isUndefined(children))
        return
      deep(children)
    })
  }
  deep(router)
  return result
}
// NOTE (菜单配置  2023-9-7 14:43)
export const useMenuStore = defineStore('useMenuStore', () => {
  const route = useRoute()
  const router = useRouter()
  const { allRouters } = routerHelper()
  const allMenuName = ref(createAllMenuName(unref(allRouters)))
  const createMenuOptions = (router: RouteRecordRaw[]): _MenuOption[] => {
    return map(router, (item) => {
      const { path, name, children, meta } = item
      const { lineIcon, localIcon, isHidden, isTitle } = meta || {}
      name && allMenuName.value.add(name)
      return {
        key: name || path,
        show: !isHidden,
        children: isUndefined(children) ? [] : createMenuOptions(children),
        localIcon,
        lineIcon,
        label: isTitle || path,
      } as _MenuOption
    })
  }
  const menuOptions = ref(createMenuOptions(unref(allRouters)))
  const openKeys = ref<string[]>([])
  const setOpenKeys = (keys: string[]) => {
    openKeys.value = keys
  }
  const selectKey = ref < string | null>(null)
  const setSelectKey = async (name: keyof RouteNamedMap) => {
    if (/^http(s)?:\/\//.test(name)) {
      window.open(name, '_blank')
      return
    }
    await router.push({
      name,
    })
    selectKey.value = name
  }
  watchEffect(() => {
    const { name } = route
    if (allMenuName.value.has(name))
      selectKey.value = name
  })
  return {
    menuOptions,
    setOpenKeys,
    openKeys,
    setSelectKey,
    selectKey,
  }
}, {
  persist: {
    paths: ['openKeys', 'selectKey', 'menuOptions'],
  },
})
