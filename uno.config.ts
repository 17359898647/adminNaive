import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [
    presetUno,
    presetAttributify(),
    presetIcons({
      extraProperties: {
        cursor: 'pointer',
      },
      prefix: 'icon-',
      warn: true,
    }),
    presetExtra() as any,
    presetWebFonts({
      fonts: {
        mono: 'DM Mono',
        sans: 'DM Sans',
        serif: 'DM Serif Display',
      },
    }),
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'red': 'border-red-500 border-solid border',
  },
  theme: {
    colors: {
      dark: '#18181c',
      error: 'rgb(var(--error-color))',
      error_active: 'rgb(var(--error-color-active),0.1)',
      error_hover: 'rgb(var(--error-color-hover))',
      error_pressed: 'rgb(var(--error-color-pressed))',
      info: 'rgb(var(--info-color))',
      info_active: 'rgb(var(--info-color-active),0.1)',
      info_hover: 'rgb(var(--info-color-hover))',
      info_pressed: 'rgb(var(--info-color-pressed))',
      primary: 'rgb(var(--primary-color))',
      primary_1: 'rgb(var(--primary-color1))',
      primary_2: 'rgb(var(--primary-color2))',
      primary_3: 'rgb(var(--primary-color3))',
      primary_4: 'rgb(var(--primary-color4))',
      primary_5: 'rgb(var(--primary-color5))',
      primary_6: 'rgb(var(--primary-color6))',
      primary_7: 'rgb(var(--primary-color7))',
      primary_8: 'rgb(var(--primary-color8))',
      primary_9: 'rgb(var(--primary-color9))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_hover: 'rgb(var(--primary-color-hover))',
      primary_pressed: 'rgb(var(--primary-color-pressed))',
      success: 'rgb(var(--success-color))',
      success_active: 'rgb(var(--success-color-active),0.1)',
      success_hover: 'rgb(var(--success-color-hover))',
      success_pressed: 'rgb(var(--success-color-pressed))',
      warning: 'rgb(var(--warning-color))',
      warning_active: 'rgb(var(--warning-color-active),0.1)',
      warning_hover: 'rgb(var(--warning-color-hover))',
      warning_pressed: 'rgb(var(--warning-color-pressed))',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
