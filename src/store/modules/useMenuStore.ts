import { isUndefined, map } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto/routes'
import { routerHelper } from '@/router/helps/allRouters'

export type _MenuOption = MenuOption & {
  lineIcon?: string
  localIcon?: string
}
export const useMenuStore = defineStore('useMenuStore', () => {
  const route = useRoute()
  const router = useRouter()
  const allMenuName = ref(new Set<RouteRecordName>())
  const { allRouters } = routerHelper()
  const createAllMenuName = (router: RouteRecordRaw[]): void => {
    map(router, (item) => {
      const { name, children } = item
      name && allMenuName.value.add(name)
      if (isUndefined(children))
        return
      createAllMenuName(children)
    })
  }
  const createMenuOptions = (router: RouteRecordRaw[]): _MenuOption[] => {
    return map(router, (item) => {
      const { path, name, children, meta } = item
      const { lineIcon, localIcon, isHidden, isTitle } = meta || {}
      name && allMenuName.value.add(name)
      return {
        key: name || path,
        show: !isHidden,
        children: isUndefined(children) ? undefined : createMenuOptions(children),
        localIcon,
        lineIcon,
        label: isTitle,
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
  const isMounted = useMounted()
  watchEffect(() => {
    !isMounted.value && createAllMenuName(unref(allRouters))
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
},
{
  persist: {
    paths: ['openKeys', 'selectKey'],
  },
})
