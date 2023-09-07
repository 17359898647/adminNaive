import { isUndefined, kebabCase } from 'lodash-es'
import type { GlobalThemeOverrides } from 'naive-ui'
import { type colorType, getNaiveThemeOverrides } from '../utils/colorHelper'
import { loadingBarProviderProps } from '@/naiveHooks/useMessage'
import { getColorPalettes, getRgbOfColor } from '@/store/utils/setHemlVar'

type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>
type ThemeVarsKeys = keyof ThemeVars
// NOTE (添加css vars至html  2023-9-7 14:44)
function addThemeCssVarsToHtml(themeVars: ThemeVars) {
  const keys = Object.keys(themeVars) as ThemeVarsKeys[]
  const style: string[] = []
  keys.forEach((key) => {
    const color = themeVars[key]

    if (color) {
      const { r, g, b } = getRgbOfColor(color)
      style.push(`--${kebabCase(key)}: ${r},${g},${b}`)

      if (key === 'primaryColor') {
        const colorPalettes = getColorPalettes(color)

        colorPalettes.forEach((palette, index) => {
          const { r: pR, g: pG, b: pB } = getRgbOfColor(palette)
          style.push(`--${kebabCase(key)}${index + 1}: ${pR},${pG},${pB}`)
        })
      }
    }
  })
  const styleStr = style.join(';')
  document.documentElement.style.cssText += styleStr
}
// NOTE (主题配置  2023-9-7 14:44)
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
        if (!isUndefined(themeDefault.value.common))
          addThemeCssVarsToHtml(themeDefault.value.common)
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
