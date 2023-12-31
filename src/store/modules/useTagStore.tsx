import { difference, filter, findIndex, forEach, isUndefined, map, some } from 'lodash-es'
import type { DropdownOption } from 'naive-ui'
import { watch } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from 'vue-router/auto'
import type { RouteNamedMap } from 'vue-router/auto/routes'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useSleep } from '@/composables/useSleep'
import { useKeepAliveCacheStore } from '@/layout/HKeepAlive/useKeepAliveCacheStore'
import { scrollHelps } from '@/layout/TagView/scrollHelps'
import { routerHelper } from '@/router/helps/allRouters'
import { useLayoutStore } from '@/store/modules/useLayoutStore'

export type ActionTypes = 'closeAll' | 'closeOther' | 'closeRight' | 'closeLeft' | 'refresh' | 'fullScreen'

interface _DropdownOption extends Omit<DropdownOption, 'key'> {
  key: ActionTypes
}
export interface ITag extends RouteMeta {
  fullPath: string
  name?: keyof RouteNamedMap
}
type ICreateTag = (route: RouteLocationNormalizedLoaded | (RouteRecordRaw & {
  fullPath?: string
})) => ITag

export const createTag: ICreateTag = (route) => {
  const { meta, path, fullPath, name } = route
  return {
    ...meta!,
    fullPath: fullPath || path,
    name: name as keyof RouteNamedMap,
  }
}
// NOTE (tag 栏  2023-9-7 , 14:42 14:42)
export const useTagStore = defineStore('useTagStore', () => {
  const route = useRoute()
  const router = useRouter()
  const historyPath = ref()
  const layoutStore = useLayoutStore()
  const { delCache } = useKeepAliveCacheStore()
  const { setAttrs } = layoutStore
  const { isCollapsed, isFullscreen } = storeToRefs(layoutStore)
  const { allAffixRouters } = routerHelper()
  const tagList = ref<ITag[]>(map(allAffixRouters.value, item => createTag(item)))
  const {
    undo,
    history,
    canUndo,
  } = useRefHistory(historyPath, {
    capacity: 10,
  })
  const addTagList = (tag: ITag) => {
    const { fullPath, isHidden } = tag
    const isExist = tagList.value.some(item => item.fullPath === fullPath)
    if (!isExist && !isHidden) {
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
      await router.push(historyPath.value === _historyPath
        ? tagList.value[0].fullPath
        : (historyPath.value ?? tagList.value[0].fullPath))
    }
    const index = findIndex(tagList.value, item => item.fullPath === fullPath)
    index !== -1 && tagList.value.splice(index, 1)
    await delCache(tag)
  }
  // tag 下拉菜单
  const tagDropdownOptions = ref<_DropdownOption[]>([
    {
      icon: () => (
        <SvgIcon lineIcon={isFullscreen.value ? 'icon-material-symbols:fullscreen-exit' : 'icon-material-symbols:fullscreen'} />
      ),
      key: 'fullScreen',
      label: () => (
        <span>
          {
        isFullscreen.value ? '关闭全屏' : '开启全屏'
      }
        </span>
      ),
    },
    {
      icon: () => <SvgIcon lineIcon='icon-ant-design:close-outlined' />,
      key: 'closeAll',
      label: '关闭所有',
    },
    {
      icon: () => <SvgIcon lineIcon='icon-ant-design:swap-outlined' />,
      key: 'closeOther',
      label: '关闭其他',
    },
    {
      icon: () => <SvgIcon lineIcon='icon-ant-design:swap-right-outlined' />,
      key: 'closeRight',
      label: '关闭右侧',
    },
    {
      icon: () => <SvgIcon lineIcon='icon-ant-design:swap-left-outlined' />,
      key: 'closeLeft',
      label: '关闭左侧',
    },
    {
      icon: () => <SvgIcon lineIcon='icon-ic:twotone-refresh' />,
      key: 'refresh',
      label: '刷新当前页',
    },
  ])
  const _delCache = async <T extends ITag>(Fn: (item: T, index: number) => boolean, path: string) => {
    await router.push(path)
    // 动画时间
    await useSleep(300)
    const residueTagList = filter(tagList.value, Fn) as T[]
    const excludeTagList = difference(tagList.value, residueTagList)
    forEach(excludeTagList, (item) => {
      const index = findIndex(tagList.value, item)
      index !== -1 && tagList.value.splice(index, 1)
    })
    await delCache(excludeTagList)
  }
  const tagDropdownClick = async (key: ActionTypes, tag: ITag) => {
    const { fullPath: selectTagFullPath } = tag
    const actionFn = {
      closeAll: async () => {
        await _delCache(
          item => !isUndefined(item.isAffix),
          tagList.value[0].fullPath,
        )
      },
      closeLeft: async () => {
        const index = findIndex(tagList.value, item => item.fullPath === selectTagFullPath)
        await _delCache(
          (item, i) => item.isAffix || i >= index,
          selectTagFullPath,
        )
      },
      closeOther: async () => {
        await _delCache(
          item => item.isAffix || item.fullPath === selectTagFullPath,
          selectTagFullPath,
        )
      },
      closeRight: async () => {
        const index = findIndex(
          tagList.value,
          item => item.fullPath === selectTagFullPath,
        )
        await _delCache(
          (item, i) => item.isAffix || i <= index,
          selectTagFullPath,
        )
      },
      default: () => {
        console.error(new Error('actionTag type error'))
      },
      fullScreen: async () => {
        setAttrs('isFullscreen', !isFullscreen.value)
      },
      refresh: async () => {
        setAttrs('isRefreshPage', false)
        await delCache(tag)
        setAttrs('isRefreshPage', true)
      },
    }
    await (actionFn[key] || actionFn.default)()
  }
  const { scrollRef, scrollTo, contentRef, containerRef } = scrollHelps()
  tryOnBeforeMount(async () => {
    addTagList(createTag(route))
    !route.meta.isHidden && (historyPath.value = route.fullPath)
    await scrollTo(findIndex(tagList.value, item => item.fullPath === historyPath.value))
  })
  watch(() => route.fullPath, async () => {
    addTagList(createTag(route))
    !route.meta.isHidden && (historyPath.value = route.fullPath)
    await scrollTo(findIndex(tagList.value, item => item.fullPath === route.fullPath))
  }, {
    flush: 'post',
  })
  const { width: windowWidth } = useWindowSize()
  watch([windowWidth, isCollapsed], async () => {
    await scrollTo(findIndex(tagList.value, item => item.fullPath === route.fullPath))
  })
  return {
    containerRef,
    contentRef,
    createTag,
    delTagList,
    scrollRef,
    scrollTo,
    tagDropdownClick,
    tagDropdownOptions,
    tagList,
  }
}, {
  persist: {
    paths: ['tagList'],
  },
})
