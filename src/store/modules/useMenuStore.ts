import { isUndefined, map } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import { routerPush } from '@/composables/routerPush'
import { sortMenu } from '@/router/helps/getAllRouterFiles'

export type _MenuOption = MenuOption & {
  lineIcon?: string
  localIcon?: string
}
export const useMenuStore = defineStore('useMenuStore', () => {
  const route = useRoute()
  const allMenuPath = new Set<string>()
  const createMenuOptions = (router: RouteRecordRaw[]): _MenuOption[] => {
    return map(sortMenu(router), (item) => {
      const { path, children, meta } = item
      const { lineIcon, localIcon, isHidden, isTitle } = meta!
      allMenuPath.add(path)
      return {
        key: path,
        show: !isHidden,
        localIcon,
        lineIcon,
        label: isTitle,
        children: isUndefined(children) ? undefined : createMenuOptions(children),
      } as _MenuOption
    })
  }
  const menuOptions = ref(createMenuOptions(routes))

  const openKeys = ref<string[]>([])
  const setOpenKeys = (keys: string[]) => {
    openKeys.value = keys
  }
  const selectKey = ref < string | null>(null)
  const setSelectKey = async (path: string) => {
    if (/^http(s)?:\/\//.test(path)) {
      window.open(path, '_blank')
      return
    }
    await routerPush({
      path,
    })
    selectKey.value = path
  }
  watchEffect(() => {
    const { path } = route
    if (allMenuPath.has(path))
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
