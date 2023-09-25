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
  iconPlacement: 'left',
  icon: undefined,
  showIcon: false,
  loading: false,
  maskClosable: true,
  negativeButtonProps: undefined,
  negativeText: '取消',
  positiveButtonProps: undefined,
  positiveText: '确定',
  style: {},
  title: '提示框标题',
  content: '提示框内容',
  transformOrigin: 'mouse',
  type: 'default',
  onAfterLeave: () => {
    // console.log('onAfterLeave')
  },
  onClose: () => {
    // console.log('onClose')
  },
  onEsc: () => {
    // console.log('onEsc')
  },
  onAfterEnter: () => {
    // console.log('onAfterEnter')
  },
  onMaskClick: () => {
    // console.log('onMaskClick')
  },
  onPositiveClick: () => {
    // console.log('onPositiveClick')
  },
  onNegativeClick: () => {
    // console.log('onNegativeClick')
  },
}
export type PickDialogOptions = Partial<
  Pick<DialogOptions, 'content' | 'title' | 'negativeText' | 'positiveText' | 'type'>
>

/**
 * @description: 弹出提示框
 * @param options
 * @return
 * @param options
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
    loading: loading!,
    confirm: onPositiveClick!,
    cancel: onNegativeClick!,
    destroy: toValue(destroy)!,
  }
}

export function closeAllDialog() {
  dialog.destroyAll()
}
