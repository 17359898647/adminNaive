import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRefs } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'

export interface settingType {
  /** 是否折叠 */
  isCollapsed: boolean
  /** 是否刷新页面 */
  isRefreshPage: boolean
  /** 是否手风琴模式 */
  isAccordion: boolean
  /** 是否显示触发器 */
  isShowTrigger: 'bar' | 'arrow-circle' | undefined
  /** 是否反转色 */
  isInverted: boolean
  /** 是否固定底部 */
  isFixedFooter: boolean
  /** 是否固定头部 */
  isFixedHeader: boolean
  /** 是否显示抽屉 */
  isNDrawerShow: boolean
  /** 折叠宽度 */
  isCollapsedWidth: number
  /** 侧边栏宽度 */
  isSiderWidth: number
  /** 头部高度 */
  isHeaderHeight: number
  /** 底部高度 */
  isFooterHeight: number
  /** 标签栏高度 */
  isTagViewHeight: number
  /** 是否显示标签栏 */
  isTagViewShow: boolean
  /** 是否显示标签栏图标 */
  isTagViewShowIcon: boolean
  /** 内容内边距 */
  isContentPadding: number
  /** 是否显示面包屑 */
  isBreadcrumbShow: boolean
  /** 是否显示面包屑图标 */
  isBreadcrumbShowIcon: boolean
  /** 主题色 */
  themeColor: string
  /** 是否暗黑模式 */
  isDark: boolean
  /** 是否全屏 */
  isFullscreen: boolean
  /** 是否支持全屏 */
  isSupported: boolean
}
// NOTE (布局配置  2023-9-7 14:43)
export const useLayoutStore = defineStore(
  'useLayoutStore',
  () => {
    const { isFullscreen, enter, exit, isSupported } = useFullscreen(
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
      isSupported: isSupported.value,
    })
    const setAttrs = <T extends keyof settingType>(key: T, value: MaybeRefOrGetter<settingType[T]>) => {
      layoutAttrs[key] = toValue(value)
    }
    watch(() => layoutAttrs.isFullscreen, () => {
      layoutAttrs.isFullscreen ? enter() : exit()
    })
    return {
      ...toRefs(readonly(layoutAttrs)),
      setAttrs,
      layoutAttrs,
    }
  },
  {
    persist: {
      paths: ['layoutAttrs'],
      afterRestore: (ctx) => {
        ctx.store.setAttrs('isFullscreen', false)
      },
    },
  },
)
export type settingTypeRef = {
  [T in keyof settingType]: Readonly<Ref<settingType[T]>>
}
export const layoutProvide = Symbol('layoutProvide') as InjectionKey<settingTypeRef & {
  setAttrs: <T extends keyof settingType>(key: T, value: settingType[T]) => void
}>
