import {
  defineConfig,
  presetAttributify,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [
    presetWind(),
    presetAttributify(),
    presetExtra(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    red: 'border-red-500 border-solid border',
    'flex-center': 'flex justify-center items-center',
  },
})
