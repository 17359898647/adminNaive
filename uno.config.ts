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
      error: 'rgba(var(--error-color))',
      error_active: 'rgba(var(--error-color-active),0.1)',
      error_hover: 'rgba(var(--error-color-hover))',
      error_pressed: 'rgba(var(--error-color-pressed))',
      info: 'rgba(var(--info-color))',
      info_active: 'rgba(var(--info-color-active),0.1)',
      info_hover: 'rgba(var(--info-color-hover))',
      info_pressed: 'rgba(var(--info-color-pressed))',
      primary: 'rgba(var(--primary-color))',
      primary_1: 'rgba(var(--primary-color1))',
      primary_2: 'rgba(var(--primary-color2))',
      primary_3: 'rgba(var(--primary-color3))',
      primary_4: 'rgba(var(--primary-color4))',
      primary_5: 'rgba(var(--primary-color5))',
      primary_6: 'rgba(var(--primary-color6))',
      primary_7: 'rgba(var(--primary-color7))',
      primary_8: 'rgba(var(--primary-color8))',
      primary_9: 'rgba(var(--primary-color9))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_hover: 'rgba(var(--primary-color-hover))',
      primary_pressed: 'rgba(var(--primary-color-pressed))',
      success: 'rgba(var(--success-color))',
      success_active: 'rgba(var(--success-color-active),0.1)',
      success_hover: 'rgba(var(--success-color-hover))',
      success_pressed: 'rgba(var(--success-color-pressed))',
      warning: 'rgba(var(--warning-color))',
      warning_active: 'rgba(var(--warning-color-active),0.1)',
      warning_hover: 'rgba(var(--warning-color-hover))',
      warning_pressed: 'rgba(var(--warning-color-pressed))',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
