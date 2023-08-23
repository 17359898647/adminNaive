import type { MaybeRefOrGetter } from '@vueuse/core'

export const useSleep = (time: MaybeRefOrGetter<number> = 1000) => new Promise(resolve => setTimeout(resolve, toValue(time)))
