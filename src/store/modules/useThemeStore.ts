import type { GlobalThemeOverrides } from 'naive-ui'
import { type colorType, getNaiveThemeOverrides } from '../utils/colorHelper'
import { loadingBarProviderProps } from '@/naiveHooks/useMessage'

export const useThemeStore = defineStore(
  'useThemeStore',
  () => {
    const LayoutStore = useLayoutStore()
    const { themeColor } = storeToRefs(LayoutStore)
    const allColor = computed<{ [key in colorType]: string }>(() => {
      return {
        primary: themeColor.value,
        error: '#f5222d',
        success: '#52c41a',
        warning: '#faad14',
        info: '#40a9ff',
      }
    })
    const themeDefault = ref<GlobalThemeOverrides>({
      common: {},
      LoadingBar: {},
    })
    watch(
      allColor,
      (newColor) => {
        const { primary, error, success, warning, info } = newColor
        // 设置进度条颜色
        loadingBarProviderProps.value.themeOverrides!.colorLoading = primary
        themeDefault.value = getNaiveThemeOverrides({
          primary,
          error,
          success,
          warning,
          info,
        })
      },
      { deep: true, immediate: true },
    )
    return {
      themeDefault,
    }
  },
  {
    persist: true,
  },
)
