import { toValue } from '@vueuse/core'
import type { NotificationOptions } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { notification } from '@/naiveHooks/useMessage'

export type msgType = string | (() => VNodeChild)

export const defaultNotificationOptions: NotificationOptions = {
  type: 'default',
  duration: 3000,
  description: '',
  closable: false,
  keepAliveOnHover: false,
}
type _NotificationOptions = myTypes.Pick<
  NotificationOptions,
  'keepAliveOnHover' | 'duration' | 'type' | 'title' | 'onClose' | 'onLeave' | 'onAfterEnter' | 'onAfterLeave'
>
export function createNotification(
  msg: myTypes.MaybeComputedRef<msgType>,
  options?: myTypes.MaybeComputedRef<_NotificationOptions>,
) {
  return notification.create({
    content: toValue(msg),
    ...defaultNotificationOptions,
    ...toValue(options),
  })
}
export function closeNotification() {
  notification.destroyAll()
}
