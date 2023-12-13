import type { EventHookOn, MaybeRefOrGetter } from '@vueuse/core/index'
import type { StrictUseAxiosReturn } from '@vueuse/integrations/useAxios'
import type { AxiosError, AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, Method } from 'axios'
import { isString } from 'lodash-es'
import { useMyAxios } from '@/composables/useMyAxios'

const transformParams = reactify((url: string, params?: Record<string, any>) => {
  const searchParams = new URLSearchParams(params)
  const queryString = searchParams.toString()
  return queryString ? `${url}?${queryString}` : `${url}`
})

export interface useRequestParams<T = any> {
  /**
   * 请求地址
   */
  url?: MaybeRefOrGetter<string>
  /**
   * 是否浅层监听
   */
  shallow?: boolean
  /**
   * params: 请求参数
   */
  params?: MaybeRefOrGetter<Record<string, any>>
  /**
   * data: 请求体
   */
  data?: MaybeRefOrGetter<Record<string, any>>
  /**
   * headers: 请求头
   */
  headers?: Record<string, any>
  /**
   * method: 请求方法
   */
  method?: Method
  /**
   * immediate: 是否立即执行
   */
  immediate?: boolean
  /**
   * reftch: 是否自动重新请求
   */
  refetch?: boolean
  /**
   * initialData: 初始数据
   */
  initialData?: T
  /**
   * retry: 重试次数
   */
  retry?: number | false
  /*
  * retryDelay: 重试延迟
  * */
  retryDelay?: number
  /**
   * resetOnExecute: 是否在执行时重置数据
   */
  resetOnExecute?: boolean
}

export interface useRequestReturn<T = any, R = AxiosRequestConfig<T>, D = any> extends Omit<StrictUseAxiosReturn<T, R, D>, 'execute'> {
  execute: (executeUrl?: string | AxiosRequestConfig<D>, executeConfig?: AxiosRequestConfig<D>) => Promise<useRequestReturn<T, R, D>>
  onSuccess: EventHookOn<T>
  onError: EventHookOn<unknown>
  onFinish: EventHookOn<never>
  onUploadProgress: EventHookOn<AxiosProgressEvent>
  onDownloadProgress: EventHookOn<AxiosProgressEvent>
}
/**
 * 请求工具
 */
export function useRequest<T = unknown>(instance: AxiosInstance, options: useRequestParams<T>): useRequestReturn<T> {
  const {
    url = '',
    headers,
    params,
    method = 'get',
    refetch = true,
    retryDelay = 500,
    data,
    initialData,
    immediate = true,
    resetOnExecute = true,
    shallow = true,
    retry = 0,
  } = options
  const successEvent = createEventHook<T>()
  const errorEvent = createEventHook<unknown>()
  const finishEvent = createEventHook<never>()
  const downloadProgressEvent = createEventHook<AxiosProgressEvent>()
  const uploadProgressEvent = createEventHook<AxiosProgressEvent>()
  const _url = transformParams(url, params)
  const axiosConfig = computed(() => {
    return {
      data: toValue(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      method,
      onDownloadProgress: downloadProgressEvent.trigger,
      onUploadProgress: uploadProgressEvent.trigger,
      __retry: retry,
      __retryDelay: retryDelay,
    } as AxiosRequestConfig
  })

  const _useAxios = useMyAxios<T>(
    _url.value,
    axiosConfig.value,
    instance,
    {
      immediate,
      initialData,
      onError: (err) => {
        if ((err as AxiosError)?.code === 'ERR_CANCELED')
          return
        errorEvent.trigger(err)
      },
      onFinish: finishEvent.trigger,
      onSuccess: successEvent.trigger,
      resetOnExecute,
      shallow,
    },
  )
  const scope = effectScope()
  scope.run(() => {
    toValue(refetch) && watchDeep([_url, axiosConfig], () => {
      _useAxios.execute(_url.value, axiosConfig.value)
    })
  })
  tryOnScopeDispose(() => {
    _useAxios?.abort()
    scope.stop()
  })
  return {
    ..._useAxios,
    onSuccess: successEvent.on,
    onError: errorEvent.on,
    onFinish: finishEvent.on,
    onDownloadProgress: downloadProgressEvent.on,
    onUploadProgress: uploadProgressEvent.on,
    execute: (executeUrl = _url.value, executeConfig = {}) => {
      return _useAxios.execute(
        isString(executeUrl)
          ? executeUrl
          : (
              _url.value ?? executeConfig?.url
            ),
        {
          ...axiosConfig.value,
          ...typeof executeUrl === 'object'
            ? executeUrl
            : executeConfig,
        },
      ) as Promise<useRequestReturn<T>>
    },
  }
}
