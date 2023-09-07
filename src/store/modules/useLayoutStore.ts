import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRefs } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'

/**
 * isCollapse : 是否折叠;
 * isInverted : 是否反转色;
 * isFixedFooter : 是否固定底部;
 * isFixedHeader : 是否固定头部;
 * isSiderWidth : 侧边栏宽度;
 * isHeaderHeight : 头部高度;
 * isFooterHeight : 底部高度;
 * isTagViewHeight : 标签栏高度;
 * isAccordion : 是否手风琴模式;
 * isShow-trigger : 是否显示触发器;
 * isCollapsedWidth : 折叠宽度;
 * isBgColor : 背景色;
 * isNDrawerShow : 是否显示抽屉;
 * isTagViewShow : 是否显示标签栏;
 * isTagViewShowIcon : 是否显示标签栏图标;
 * isBreadcrumbShow : 是否显示面包屑;
 * isBreadcrumbShowIcon : 是否显示面包屑图标;
 * isDark : 是否暗黑模式;
 * isFullscreen : 是否全屏;
 */
export interface settingType {
  isCollapsed: boolean
  isRefreshPage: boolean
  isAccordion: boolean
  isShowTrigger: boolean | 'bar' | 'arrow-circle'
  isFixedFooter: boolean
  isFixedHeader: boolean
  isTagViewShow: boolean
  isTagViewShowIcon: boolean
  isNDrawerShow: boolean
  isInverted: boolean
  isBreadcrumbShow: boolean
  isBreadcrumbShowIcon: boolean
  isCollapsedWidth: number
  isSiderWidth: number
  isHeaderHeight: number
  isFooterHeight: number
  isTagViewHeight: number
  isContentPadding: number
  isDark: boolean
  themeColor: string
  isFullscreen: boolean
}
// NOTE (布局配置  2023-9-7 14:43)
export const useLayoutStore = defineStore(
  'useLayoutStore',
  () => {
    const { isFullscreen, enter, exit } = useFullscreen(
      document.documentElement,
    )
    const layoutAttrs = reactive<settingType>({
      isCollapsed: false,
      isRefreshPage: true,
      isAccordion: true,
      isShowTrigger: 'bar',
      isInverted: true,
      isFixedFooter: true,
      isFixedHeader: true,
      isNDrawerShow: false,
      isCollapsedWidth: 60,
      isSiderWidth: 200,
      isHeaderHeight: 64,
      isFooterHeight: 46,
      isTagViewHeight: 44,
      isTagViewShow: true,
      isTagViewShowIcon: true,
      isContentPadding: 8,
      isBreadcrumbShow: true,
      isBreadcrumbShowIcon: false,
      themeColor: '#1890ff',
      isDark: isDark as unknown as boolean,
      isFullscreen: isFullscreen.value,
    })
    const setAttrs = <T extends keyof settingType>(key: T, value: MaybeRefOrGetter<settingType[T]>) => {
      layoutAttrs[key] = toValue(value)
    }
    watch(() => layoutAttrs.isFullscreen, () => {
      layoutAttrs.isFullscreen ? enter() : exit()
    })
    return {
      ...toRefs(layoutAttrs),
      setAttrs,
    }
  },
  {
    persist: {
      afterRestore: (ctx) => {
        ctx.store.$state.isFullscreen = false
      },
    },
  },
)
export type settingTypeRef = {
  [T in keyof settingType]: Ref<settingType[T]>
}
export const layoutProvide = Symbol('layoutProvide') as InjectionKey<settingTypeRef & {
  setAttrs: <T extends keyof settingType>(key: T, value: settingType[T]) => void
}>
