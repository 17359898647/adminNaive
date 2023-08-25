import { difference, filter, findIndex, forEach, isUndefined, some } from 'lodash-es'
import type { DropdownOption } from 'naive-ui'
import { watch } from 'vue'
import type { RouteRecordName } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from 'vue-router/auto'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useSleep } from '@/composables/useSleep'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'
import { scrollHelps } from '@/layout/TagView/scrollHelps'
import { allAffixRouters } from '@/router/helps/allRouters'
import { useLayoutStore } from '@/store/modules/useLayoutStore'

export type ActionTypes = 'closeAll' | 'closeOther' | 'closeRight' | 'closeLeft' | 'refresh' | 'fullScreen'

interface _DropdownOption extends Omit<DropdownOption, 'key'> {
  key: ActionTypes
}
export interface ITag extends RouteMeta {
  fullPath: string
  name?: RouteRecordName
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
  const { setAttrs } = layoutStore
  const { isCollapsed } = storeToRefs(layoutStore)
  const {
    undo,
    history,
    canUndo,
  } = useRefHistory(historyPath, {
    capacity: 10,
  })
  const createTag: ICreateTag = (route) => {
    const { meta, path, fullPath, name } = route
    return {
      ...meta!,
      fullPath: fullPath || path,
      name,
    }
  }
  const addTagList = (tag: ITag) => {
    const { fullPath } = tag
    const isExist = tagList.value.some(item => item.fullPath === fullPath)
    if (!isExist) {
      const historyIndex = findIndex(tagList.value, item => item.fullPath === historyPath.value)
      if (historyIndex === -1)
        tagList.value.push(tag)
      else
        tagList.value.splice(historyIndex + 1, 0, tag)
    }
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
  const _delCache = async <T extends ITag>(Fn: (item: T, index: number) => boolean, path: string) => {
    await router.push(path)
    // 动画时间
    await useSleep(300)
    const residueTagList = filter(tagList.value, Fn) as T[]
    const excludeTagList = difference(tagList.value, residueTagList)
    tagList.value = residueTagList
    await delCache(excludeTagList)
  }
  const tagDropdownClick = async (key: ActionTypes, tag: ITag) => {
    const { fullPath: selectTagFullPath } = tag
    const actionFn = {
      closeAll: async () => {
        await _delCache(item => !isUndefined(item.isAffix), tagList.value[0].fullPath)
      },
      closeOther: async () => {
        await _delCache(item => item.isAffix || item.fullPath === selectTagFullPath, selectTagFullPath)
      },
      closeRight: async () => {
        const index = findIndex(tagList.value, item => item.fullPath === selectTagFullPath)
        await _delCache((item, i) => item.isAffix || i <= index, selectTagFullPath)
      },
      closeLeft: async () => {
        const index = findIndex(tagList.value, item => item.fullPath === selectTagFullPath)
        await _delCache((item, i) => item.isAffix || i >= index, selectTagFullPath)
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
  const { scrollRef, scrollTo, contentRef, containerRef } = scrollHelps()
  const isMounted = useMounted()
  watch(route, async (to) => {
    // 确保所有的固定路由都已经加载完毕
    !isMounted.value && (
      forEach(unref(allAffixRouters), (item) => {
        addTagList(createTag(item))
      })
    )
    addTagList(createTag(to))
    historyPath.value = to.fullPath
    await nextTick()
    await scrollTo(findIndex(tagList.value, item => item.fullPath === historyPath.value))
  }, {
    immediate: true,
    flush: 'post',
  })
  const { width: windowWidth } = useWindowSize()
  watch([windowWidth, isCollapsed], async () => {
    await scrollTo(findIndex(tagList.value, item => item.fullPath === historyPath.value))
  })
  return {
    tagList,
    createTag,
    delTagList,
    tagDropdownOptions,
    tagDropdownClick,
    scrollRef,
    scrollTo,
    contentRef,
    containerRef,
  }
}, {
  persist: {
    paths: ['tagList'],
  },
})
