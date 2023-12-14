import type { EventHookOn, MaybeRefOrGetter } from '@vueuse/core/index'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { StrictUseAxiosReturn } from '@vueuse/integrations/useAxios'
import type { AxiosError, AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { cloneDeep, forEach, isString } from 'lodash-es'

const transformParams = reactify((url: string, params?: Record<string, any>) => {
  const cloneParams = cloneDeep(params)
  forEach(cloneParams, (value, key) => {
    if (value === undefined)
      delete cloneParams?.[key]
  })
  const searchParams = new URLSearchParams(cloneParams)
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

// type _AxiosRequestConfig<D = unknown, P = unknown> = Omit<AxiosRequestConfig<D>, 'params'> & {
//   params?: P
// }
interface _AxiosRequestConfig<D = unknown, P = unknown> extends Omit<AxiosRequestConfig<D>, 'params'> {
  params?: P
}

export interface useRequestReturn<T = any, D = unknown, P = unknown> extends Omit<StrictUseAxiosReturn<T, AxiosResponse<T>, any>, 'execute'> {
  execute: (executeUrl?: string | _AxiosRequestConfig<D, P>, executeConfig?: _AxiosRequestConfig<D, P>) => Promise<useRequestReturn<T, D, P>>
  onSuccess: EventHookOn<T>
  onError: EventHookOn<unknown>
  onFinish: EventHookOn<never>
  onUploadProgress: EventHookOn<AxiosProgressEvent>
  onDownloadProgress: EventHookOn<AxiosProgressEvent>
}
/**
 * 请求工具
 */
export function useRequest<T = unknown, D = unknown, P = unknown>(instance: AxiosInstance, options: useRequestParams<T>): useRequestReturn<T, D, P> {
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

  const _useAxios = useAxios<T>(
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
    console.log('tryOnScopeDispose')
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
