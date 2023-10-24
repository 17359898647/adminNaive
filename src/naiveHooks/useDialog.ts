import { toValue } from '@vueuse/core'
import type { DialogOptions } from 'naive-ui'
import { dialog } from '@/naiveHooks/useMessage'

export const defaultDialogOptions: DialogOptions = {
  action: undefined,
  autoFocus: true,
  blockScroll: true,
  bordered: false,
  class: undefined,
  closable: true,
  closeOnEsc: true,
  content: '提示框内容',
  icon: undefined,
  iconPlacement: 'left',
  loading: false,
  maskClosable: true,
  negativeButtonProps: undefined,
  negativeText: '取消',
  onAfterEnter: () => {
    // console.log('onAfterEnter')
  },
  onAfterLeave: () => {
    // console.log('onAfterLeave')
  },
  onClose: () => {
    // console.log('onClose')
  },
  onEsc: () => {
    // console.log('onEsc')
  },
  onMaskClick: () => {
    // console.log('onMaskClick')
  },
  onNegativeClick: () => {
    // console.log('onNegativeClick')
  },
  onPositiveClick: () => {
    // console.log('onPositiveClick')
  },
  positiveButtonProps: undefined,
  positiveText: '确定',
  showIcon: false,
  style: {},
  title: '提示框标题',
  transformOrigin: 'mouse',
  type: 'default',
}
export type PickDialogOptions = Partial<
  Pick<DialogOptions, 'content' | 'title' | 'negativeText' | 'positiveText' | 'type'>
>

/**
 * @description 弹出提示框
 * @param options
 * @return
 */
export function createDialog(options?: PickDialogOptions) {
  const optionsCopy = { ...defaultDialogOptions, ...options }
  const {
    loading,
    destroy,
    onPositiveClick,
    onNegativeClick,
  } = toRefs(dialog.create(optionsCopy))
  return {
    cancel: onNegativeClick!,
    confirm: onPositiveClick!,
    destroy: toValue(destroy)!,
    loading: loading!,
  }
}
export function closeAllDialog() {
  dialog.destroyAll()
}
