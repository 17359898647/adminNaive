import { filter, findIndex, forEach, isUndefined, some } from 'lodash-es'
import type { DropdownOption } from 'naive-ui'
import { watch } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from 'vue-router/auto'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'
import { allAffixRoutes } from '@/router/helps/allRoutes'
import { useLayoutStore } from '@/store/modules/useLayoutStore'

export type ActionTypes = 'closeAll' | 'closeOther' | 'closeRight' | 'closeLeft' | 'refresh' | 'fullScreen'

interface _DropdownOption extends Omit<DropdownOption, 'key'> {
  key: ActionTypes
}
// export interface ITag extends RouteMeta {
//   fullPath: string
// }
export type ITag = RouteMeta & {
  fullPath: string
}
type ICreateTag = (route: RouteLocationNormalizedLoaded | (RouteRecordRaw & {
  fullPath?: string
})) => ITag
export const useTagStore = defineStore('useTagStore', () => {
  const tagList = ref<ITag[]>([])
  const route = useRoute()
  const router = useRouter()
  const historyPath = ref(route.fullPath)
  const layoutStore = useLayoutStore()
  const { delCache } = useKeepAliveCacheStore()
  // const { isRefreshPage } = storeToRefs(layoutStore)
  const { setAttrs } = layoutStore
  const {
    undo,
    history,
    canUndo,
  } = useRefHistory(historyPath)
  const createTag: ICreateTag = (route) => {
    const { meta, path, fullPath } = route
    return {
      ...meta!,
      fullPath: fullPath || path,
    }
  }
  const addTagList = (tag: ITag) => {
    const { fullPath } = tag
    const isExist = tagList.value.some(item => item.fullPath === fullPath)
    if (!isExist)
      tagList.value.push(tag)
  }
  const delTagList = async (tag: ITag) => {
    const { fullPath } = tag
    const _historyPath = historyPath.value
    if (fullPath === historyPath.value) {
      undo()
      let hasCurrent = some(tagList.value, item => item.fullPath === historyPath.value)
      while (((!hasCurrent && history.value.length !== 0) || _historyPath === historyPath.value) && canUndo.value) {
        undo()
        hasCurrent = some(tagList.value, item => item.fullPath === historyPath.value)
      }
      await router.push(historyPath.value)
    }
    const index = findIndex(tagList.value, item => item.fullPath === fullPath)
    index !== -1 && tagList.value.splice(index, 1)
    await delCache(tag)
  }
  const isMounted = useMounted()

  // tag 下拉菜单
  const tagDropdownOptions = ref<_DropdownOption[]>([
    // {
    //   label: isFullscreen.value ? '退出全屏' : '进入全屏',
    //   key: 'fullScreen',
    //   icon: () => (
    //     <SvgIcon lineIcon={isFullscreen.value ? 'ant-design:shrink-outlined' : 'ant-design:expand-alt-outlined'} />
    //   ),
    //   disabled: !isSupported.value,
    // },
    {
      label: '关闭所有',
      key: 'closeAll',
      icon: () => <SvgIcon lineIcon={'ant-design:close-outlined'} />,
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      icon: () => <SvgIcon lineIcon={'ant-design:swap-outlined'} />,
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      icon: () => <SvgIcon lineIcon={'ant-design:swap-right-outlined'} />,
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      icon: () => <SvgIcon lineIcon={'ant-design:swap-left-outlined'} />,
    },
    {
      label: '刷新当前页',
      key: 'refresh',
      icon: () => <SvgIcon lineIcon={'ic:twotone-refresh'} />,
    },
  ])
  const tagDropdownClick = async (key: ActionTypes, tag: ITag) => {
    const { fullPath: selectTagFullPath } = tag
    const actionFn = {
      closeAll: async () => {
        await router.push({
          path: tagList.value[0].fullPath,
        })
        // await useSleep(300)
        tagList.value = filter(tagList.value, item => !isUndefined(item.isAffix))
      },
      closeOther: async () => {
        await router.push({
          path: selectTagFullPath,
        })
        // await useSleep(300)
        tagList.value = filter(tagList.value, item => item.isAffix || item.fullPath === selectTagFullPath)
      },
      closeRight: async () => {
        const index = findIndex(tagList.value, item => item.fullPath === selectTagFullPath)
        await router.push({
          path: selectTagFullPath,
        })
        // await useSleep(300)
        tagList.value = filter(tagList.value, (item, i) => item.isAffix || i <= index)
      },
      closeLeft: async () => {
        const index = findIndex(tagList.value, item => item.fullPath === selectTagFullPath)
        await router.push({
          path: selectTagFullPath,
        })
        // await useSleep(300)
        tagList.value = filter(tagList.value, (item, i) => item.isAffix || i >= index)
      },
      refresh: async () => {
        setAttrs('isRefreshPage', false)
        await delCache(tag)
        setAttrs('isRefreshPage', true)
      },
      fullScreen: async () => {
        console.log('fullScreen')
        // !isUndefined(selectTagFullPath)
        // && !layoutStore.isFullscreen
        // && (await routerPush({
        //   path: selectTagFullPath,
        // }))
        // layoutStore.setAttrs('isFullscreen', !layoutStore.isFullscreen)
      },
      default: () => {
        console.error(new Error('actionTag type error'))
      },
    }
    const action = actionFn[key] || actionFn.default
    await action()
  }

  watch(route, (to) => {
    !isMounted.value && (
      forEach(allAffixRoutes, (item) => {
        addTagList(createTag(item))
      })
    )
    addTagList(createTag(to))
    historyPath.value = to.fullPath
  }, {
    immediate: true,
    flush: 'post',
  })
  return {
    tagList,
    createTag,
    delTagList,
    tagDropdownOptions,
    tagDropdownClick,
  }
}, {
  persist: {
    paths: ['tagList'],
  },
})
