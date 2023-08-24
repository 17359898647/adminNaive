import { isUndefined, map } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto/routes'
import { allRoutes } from '@/router/helps/allRoutes'

export type _MenuOption = MenuOption & {
  lineIcon?: string
  localIcon?: string
}
export const useMenuStore = defineStore('useMenuStore', () => {
  const route = useRoute()
  const router = useRouter()
  const allMenuName = new Set<RouteRecordName>()
  const createMenuOptions = (router: RouteRecordRaw[]): _MenuOption[] => {
    return map(router, (item) => {
      const { path, name, children, meta } = item
      const { lineIcon, localIcon, isHidden, isTitle } = meta || {}
      name && allMenuName.add(name)
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
  const menuOptions = ref(createMenuOptions(allRoutes))

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
    const { path, name } = route
    if (allMenuName.has(name))
      selectKey.value = path
  }, {
    flush: 'post',
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
