<script setup lang="tsx">
import type { DrawingMode } from '@drauu/core'
import { toRefs } from '@vueuse/core'
import { map } from 'lodash-es'
import { ref } from 'vue'
import type { IRadioOptions } from '@/components/JsonForm'
import { JsonFormHelp } from '@/components/JsonForm'
import { JsonForm } from '@/components/JsonForm/JsonForm'

definePage({
  meta: {
    isTitle: '签名',
    lineIcon: 'icon-ph:signature-bold',
  },
})
const target = ref()
const layoutStore = useLayoutStore()
const { themeColor } = storeToRefs(layoutStore)
const { undo, redo, canUndo, canRedo, brush, clear } = useDraw(target, {
  brush: {
    color: themeColor.value,
    size: 5,
    arrowEnd: false,
    dasharray: 'circle',
  },
})
const { color, size, mode } = toRefs(brush)
const modeOptions: Record<DrawingMode, string> = {
  draw: '铅笔',
  stylus: '画笔',
  ellipse: '椭圆',
  eraseLine: '橡皮擦',
  line: '直线',
  rectangle: '矩形',
}
const createRadioOptions = computed(() => map(
  modeOptions,
  (label, value) => ({
    label,
    value,
    isButton: true,
  } as IRadioOptions),
))
interface IOptions {
  filename?: string
  type?: 'svg' | 'png'
  width?: number
  height?: number
}
function savePng(options: IOptions = {}) {
  const { filename = 'sign', type = 'png', width, height } = options
  const svg = unrefElement(target)
  if (!svg)
    throw new Error('target is not exist')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx)
    throw new Error('canvas is not exist')
  const img = new Image()
  const svgSize = svg.getBoundingClientRect()
  canvas.width = width || svgSize.width
  canvas.height = height || svgSize.height
  const svgString = new XMLSerializer().serializeToString(svg)
  const svg64 = btoa(svgString)
  const b64Start = 'data:image/svg+xml;base64,'
  const image64 = b64Start + svg64
  img.onload = () => {
    ctx?.drawImage(img, 0, 0)
    const a = document.createElement('a')
    a.download = `${filename}.${type}`
    a.href = canvas.toDataURL(`image/${type}`)
    a.click()
  }
  img.src = image64
}
const { JsonOptions, model } = JsonFormHelp([
  {
    type: 'color',
    formName: 'color',
    props: {
      modes: ['hex'],
      showAlpha: false,
      value: color.value,
      onUpdateValue: (value: string) => {
        color.value = value
        console.log('color', value)
      },
    },
  },
  {
    type: 'slider',
    formName: 'size',
    props: {
      max: 20,
      min: 1,
      step: 1,
      value: size.value,
      onUpdateValue: (value: number) => {
        size.value = value
        console.log('size', value)
      },
    },
  },
  {
    type: 'radio',
    formName: 'mode',
    radioOptions: createRadioOptions.value,
    props: {
      value: mode?.value,
      onUpdateValue: (value: DrawingMode) => {
        mode!.value = value
        console.log('mode', value)
      },
    },
  },
])
</script>

<template>
  <NCard
    :contentStyle="{
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div class="flex flex-1 gap-x-4">
      <div class="flex flex-1 flex-col">
        <NButtonGroup class="mb4">
          <RippleButton
            :disabled="!canUndo"
            @click="undo"
          >
            <SvgIcon name="ph:arrow-circle-left-bold" />
            后退
          </RippleButton>
          <RippleButton
            :disabled="!canRedo"
            @click="redo"
          >
            <SvgIcon name="ph:arrow-circle-right-bold" />
            前进
          </RippleButton>
          <RippleButton @click="clear">
            <SvgIcon name="ph:trash-bold" />
            清空
          </RippleButton>
          <RippleButton
            type="primary"
            @click="() => savePng()"
          >
            <SvgIcon lineIcon="ph:download-bold" />
            保存
          </RippleButton>
        </NButtonGroup>
        <JsonForm
          :jsonOptions="JsonOptions"
          :model="model"
        />
      </div>
      <NCard
        class="flex-1"
        :contentStyle="{
          padding: 0,
        }"
      >
        <svg
          ref="target"
          class="h-full w-full"
        />
      </NCard>
    </div>
  </NCard>
</template>
