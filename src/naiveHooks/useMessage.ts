import type { MaybeRef, MaybeRefOrGetter } from '@vueuse/core'
import { toValue } from '@vueuse/core'
import type { MessageOptions } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import type { LoadingBarProviderProps } from 'naive-ui/es/loading-bar'
import type { Ref, VNodeChild } from 'vue'
import { isVNode } from 'vue'

export type ContentType = string | (() => VNodeChild)
export const loadingBarProviderProps = ref<LoadingBarProviderProps>({
  themeOverrides: {},
})
const { message, dialog, notification, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    loadingBarProviderProps,
    messageProviderProps: {
      max: 3,
    },
    notificationProviderProps: {
      // max: 3,
    },
  },
)
export { dialog, notification, loadingBar }
export const defaultMessageOptions: MessageOptions = {
  closable: false,
  duration: 2000,
  keepAliveOnHover: false,
  showIcon: true,
  type: 'default',
  // onLeave: () => {
  //   console.log('onLeave')
  // },
  // onClose: () => {
  //   console.log('onClose')
  // },
  // onAfterLeave: () => {
  //   console.log('onAfterLeave')
  // },
}
export type PickMessageOptions = Partial<
  Pick<MessageOptions, 'keepAliveOnHover' | 'type' | 'onClose' | 'onAfterLeave' | 'onLeave' | 'duration'>
>
type createRef<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}
export function createMsg(
  msg: MaybeRefOrGetter<ContentType>,
  options?: MaybeRef<createRef<PickMessageOptions>>,
) {
  const optionsCopy = ref({
    ...defaultMessageOptions,
    ...toValue(options),
  })
  const _msg = (isVNode(toValue(msg)) ? msg : toValue(msg)) as ContentType
  const {
    destroy,
    content,
    type,
    duration,
  } = toRefs(message.create(_msg, toValue(optionsCopy)))
  const changeType = (ParamsType: MaybeRefOrGetter<MessageOptions['type']>) => {
    type.value = toValue(ParamsType)!
    // console.log("修改类型", type!.value);
  }
  const changeContent = (ParamsContent: MaybeRefOrGetter<ContentType>) => {
    content!.value = toValue(ParamsContent)!
  }
  const scope = effectScope()
  const timer: Ref<ReturnType<typeof setTimeout> | null> = ref(null)
  const createTimer = (time: number) => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
    timer.value = setTimeout(() => {
      scope.stop()
      timer.value = null
    }, time)
  }
  scope.run(() => {
    if (isRef(msg)) {
      watch(
        () => [msg, toValue(msg)],
        () => {
          changeContent(msg)
        },
      )
    }
    watch(optionsCopy, (newVal) => {
      changeType(newVal.type)
    })
    watch(
      duration as Ref<number>,
      (newVal) => {
        createTimer(newVal)
      },
      { deep: true, immediate: true },
    )
  })
  return {
    changeContent,
    changeType,
    destroy: () => {
      destroy.value()
    },
  }
}
export function closeAllMsg() {
  message.destroyAll()
}
