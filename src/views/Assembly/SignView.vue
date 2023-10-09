<script setup lang="tsx">
import type { DrawingMode } from '@drauu/core'
import { toRefs } from '@vueuse/core'
import { map } from 'lodash-es'
import { ref } from 'vue'
import type { IRadioOptions } from '@/components/JsonForm'
import { JsonFormHelp } from '@/components/JsonForm'
import { JsonForm } from '@/components/JsonForm/JsonForm'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

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
  },
})
const { color, size, mode, arrowEnd } = toRefs(brush)
const modeOptions: Record<DrawingMode | string, {
  label: string
  icon?: string
  value?: DrawingMode | boolean | string
  onUpdateChecked?: (checked: boolean) => void
}> = {
  draw: {
    label: '画笔',
    icon: 'icon-ic:twotone-draw',
    value: 'draw',
  },
  stylus: {
    label: '钢笔',
    icon: 'icon-ph:pen-bold',
    value: 'stylus',
  },
  ellipse: {
    label: '椭圆',
    icon: 'icon-ph:circle-bold',
    value: 'ellipse',
  },
  eraseLine: {
    label: '橡皮擦',
    icon: 'icon-ph:eraser-bold',
    value: 'eraseLine',
  },
  line: {
    label: '直线',
    icon: 'icon-material-symbols:straighten-outline-sharp',
    value: 'line',
  },
  rectangle: {
    label: '矩形',
    icon: 'icon-ph:square-bold',
    value: 'rectangle',
  },
  arrow: {
    label: '箭头',
    icon: 'icon-streamline:interface-arrows-corner-up-right-keyboard-top-arrow-right-up',
    value: 'arrowLine',
  },
}
const createRadioOptions = computed(() => map(
  modeOptions,
  ({ label, icon, value, onUpdateChecked }) => ({
    label: () => (
      <div class='flex items-center gap-1'>
        <SvgIcon lineIcon={icon} />
        {label}
      </div>
    ),
    value,
    isButton: true,
    onUpdateChecked,
  } as IRadioOptions),
))
interface IOptions {
  filename?: string
  type?: 'svg' | 'png'
  width?: number
  height?: number
}
const time = useDateFormat(
  useNow(),
  'YYYY-MM-DD-HH-mm-ss',
)
function savePng(options: IOptions = {}) {
  const { filename = `${time.value}`, type = 'png', width, height } = options
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
    itemProps: {
      label: '颜色',
    },
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
    itemProps: {
      label: '尺寸',
    },
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
    itemProps: {
      label: '画笔类型',
    },
    radioOptions: createRadioOptions.value,
    props: {
      value: mode?.value,
      onUpdateValue: (value: DrawingMode | 'arrowLine') => {
        if (value === 'arrowLine') {
          mode!.value = 'line'
          arrowEnd!.value = true
          return
        }
        arrowEnd!.value === true && (arrowEnd!.value = false)
        mode!.value = value
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
            <SvgIcon lineIcon="icon-ph:arrow-circle-left-bold" />
            后退
          </RippleButton>
          <RippleButton
            :disabled="!canRedo"
            @click="redo"
          >
            <SvgIcon lineIcon="icon-ph:arrow-circle-right-bold" />
            前进
          </RippleButton>
          <RippleButton @click="clear">
            <SvgIcon lineIcon="icon-ph:trash-bold" />
            清空
          </RippleButton>
          <RippleButton
            type="primary"
            @click="() => savePng()"
          >
            <SvgIcon lineIcon="icon-ph:download-bold" />
            保存
          </RippleButton>
        </NButtonGroup>
        <JsonForm
          :jsonOptions="JsonOptions"
          :model="model"
        />
        <pre>
          {{ toValue(useStringify(model, null, 2)) }}
        </pre>
      </div>
      <NCard
        class="flex-1"
        :contentStyle="{
          padding: 0,
        }"
        title="绘画版"
      >
        <svg
          ref="target"
          class="h-full w-full"
        />
      </NCard>
    </div>
  </NCard>
</template>
