import { colord, extend } from 'colord'
import type { HsvColor } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import { map } from 'lodash-es'
import type { GlobalThemeOverrides } from 'naive-ui'

extend([mixPlugin])

type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

const hueStep = 2
const saturationStep = 16
const saturationStep2 = 5
const brightnessStep1 = 5
const brightnessStep2 = 15
const lightColorCount = 5
const darkColorCount = 4

/**
 * 根据颜色获取调色板颜色(从左至右颜色从浅到深，6为主色号)
 * @param color - 颜色
 * @param index - 调色板的对应的色号(6为主色号)
 * @description 算法实现从ant-design调色板算法中借鉴 https://github.com/ant-design/ant-design/blob/master/components/style/color/colorPalette.less
 */
export function getColorPalette(color: string, index: ColorIndex) {
  if (index === 6)
    return color

  const isLight = index < 6
  const hsv = colord(color).toHsv()
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1

  const newHsv: HsvColor = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  }

  return colord(newHsv).toHex()
}

/**
 * 根据颜色获取调色板颜色所有颜色
 * @param color - 颜色
 */
export function getAllColorPalette(color: string) {
  const indexs: ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return map(indexs, index => getColorPalette(color, index))
}

/**
 * 获取色相渐变
 * @param hsv - hsv格式颜色值
 * @param i - 与6的相对距离
 * @param isLight - 是否是亮颜色
 */
function getHue(hsv: HsvColor, i: number, isLight: boolean) {
  let hue: number
  if (hsv.h >= 60 && hsv.h <= 240) {
    // 冷色调
    // 减淡变亮 色相顺时针旋转 更暖
    // 加深变暗 色相逆时针旋转 更冷
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i
  }
  else {
    // 暖色调
    // 减淡变亮 色相逆时针旋转 更暖
    // 加深变暗 色相顺时针旋转 更冷
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i
  }
  if (hue < 0)
    hue += 360
  else if (hue >= 360)
    hue -= 360

  return hue
}

/**
 * 获取饱和度渐变
 * @param hsv - hsv格式颜色值
 * @param i - 与6的相对距离
 * @param isLight - 是否是亮颜色
 */
function getSaturation(hsv: HsvColor, i: number, isLight: boolean) {
  let saturation: number
  if (isLight)
    saturation = hsv.s - saturationStep * i
  else if (i === darkColorCount)
    saturation = hsv.s + saturationStep
  else saturation = hsv.s + saturationStep2 * i

  if (saturation > 100)
    saturation = 100

  if (isLight && i === lightColorCount && saturation > 10)
    saturation = 10

  if (saturation < 6)
    saturation = 6

  return saturation
}

/**
 * 获取明度渐变
 * @param hsv - hsv格式颜色值
 * @param i - 与6的相对距离
 * @param isLight - 是否是亮颜色
 */
function getValue(hsv: HsvColor, i: number, isLight: boolean) {
  let value: number
  if (isLight)
    value = hsv.v + brightnessStep1 * i
  else value = hsv.v - brightnessStep2 * i

  if (value > 100)
    value = 100

  return value
}

/**
 * 给颜色加透明度
 * @param color - 颜色
 * @param alpha - 透明度(0 - 1)
 */
export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}
export type colorType = 'primary' | 'success' | 'warning' | 'error' | 'info'
export type colorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
export type ColorKey = `${colorType}Color${colorScene}`
export type ThemeColor = Partial<Record<ColorKey, string>>

interface ColorAction {
  scene: colorScene
  handler: (color: string) => string
}
function getThemeColors(colors: [colorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: color => getColorPalette(color, 7) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) },
  ]

  const themeColor: ThemeColor = {}

  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color
      const colorKey: ColorKey = `${colorType}Color${action.scene}`
      themeColor[colorKey] = action.handler(colorValue)
    })
  })
  return themeColor
}
export function getNaiveThemeOverrides(colors: Record<colorType, string>): GlobalThemeOverrides {
  const { primary, success, warning, error, info } = colors
  // const info = getColorPalette(primary, 7)

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error],
  ])

  const colorLoading = primary

  return {
    common: {
      ...themeColors,
    },
    LoadingBar: {
      colorLoading,
    },
  }
}
