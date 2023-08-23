import { isUndefined, map } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import { routerPush } from '@/composables/routerPush'
import { sortMenu } from '@/router/helps/getAllRouterFiles'
import { moduleRouters } from '@/router/modules'

export type _MenuOption = MenuOption & {
  lineIcon?: string
  localIcon?: string
}
export const useMenuStore = defineStore('useMenuStore', () => {
  const route = useRoute()
  const allMenuPath = new Set<string>()
  const createMenuOptions = (router: routerObject[]): _MenuOption[] => {
    return map(sortMenu(router), (item) => {
      const { path, children, meta: { isTitle, isHidden, lineIcon, localIcon } } = item
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
  const menuOptions = ref(createMenuOptions(moduleRouters))

  const openKeys = ref<string[]>([])
  const setOpenKeys = (keys: string[]) => {
    openKeys.value = keys
  }
  const selectKey = ref < string | null>(null)
  const setSelectKey = async (path: string, item?: _MenuOption) => {
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
