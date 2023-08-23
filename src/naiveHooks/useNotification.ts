import type { MaybeRefOrGetter } from '@vueuse/core'
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
type _NotificationOptions = Pick<
  NotificationOptions,
  'keepAliveOnHover' | 'duration' | 'type' | 'title' | 'onClose' | 'onLeave' | 'onAfterEnter' | 'onAfterLeave'
>
export function createNotification(
  msg: MaybeRefOrGetter<msgType>,
  options?: MaybeRefOrGetter<_NotificationOptions>,
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
