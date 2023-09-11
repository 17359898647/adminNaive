import type { MaybeRefOrGetter } from '@vueuse/core/index'
import type { StrictUseAxiosReturn } from '@vueuse/integrations/useAxios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosError, AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, Method } from 'axios'
import { isNumber, isUndefined } from 'lodash-es'

const transformParams = reactify((url: string, params?: Record<string, any>) => {
  const searchParams = new URLSearchParams(params)
  const queryString = searchParams.toString()
  return queryString ? `${url}?${queryString}` : `${url}`
})

/**
* url: 请求地址
* retry: 重试次数
* params: 请求参数
* data: 请求体
* headers: 请求头
* method: 请求方法
* immediate: 是否立即执行
* baseURL: 基础路径
* refetch: 是否重新请求
* initialData: 初始数据
* onSuccess: 请求成功回调
* onError: 请求失败回调
* onFinish: 请求完成回调
* onUploadProgress: 上传进度回调
* onDownloadProgress: 下载进度回调
* resetOnExecute: 是否在执行时重置数据
* */
export interface useRequestParams<T = any> {
  url?: MaybeRefOrGetter<string>
  retry?: MaybeRefOrGetter<number>
  shallow?: MaybeRefOrGetter<boolean>
  params?: MaybeRefOrGetter<Record<string, any>>
  data?: MaybeRefOrGetter<Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, any>>
  method?: MaybeRefOrGetter<Method>
  immediate?: MaybeRefOrGetter<boolean>
  baseURL?: MaybeRefOrGetter<string>
  refetch?: MaybeRefOrGetter<boolean>
  initialData?: MaybeRefOrGetter<T>
  onSuccess?: (data: T) => void
  onError?: (err: unknown) => void
  onFinish?: () => void
  onUploadProgress?: (e: AxiosProgressEvent) => void
  onDownloadProgress?: (e: AxiosProgressEvent) => void
  resetOnExecute?: MaybeRefOrGetter<boolean>
}

export interface useRequestReturn<T = any, R = AxiosRequestConfig<T>, D = any> extends Omit<StrictUseAxiosReturn<T, R, D>, 'execute'> {
  execute: (executeUrl?: MaybeRefOrGetter<string>) => Promise<useRequestReturn<T, R, D>>
}
export function useRequest<T = unknown>(instance: AxiosInstance, options: useRequestParams<T>): useRequestReturn<T> {
  const {
    url = '',
    baseURL,
    headers,
    params,
    method = 'get',
    refetch = true,
    data,
    initialData,
    immediate = true,
    resetOnExecute = true,
    retry,
    shallow = true,
    onError,
    onSuccess,
    onFinish,
    onDownloadProgress,
    onUploadProgress,
  } = options
  const _url = transformParams(url, params)
  const axiosConfig = computed(() => {
    return {
      method: toValue(method),
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        ...toValue(headers),
      },
      data: toValue(data),
      baseURL: toValue(baseURL),
      onDownloadProgress,
      onUploadProgress,
    } as AxiosRequestConfig
  })
  let _retry = toValue(retry)
  let isSuccessful = false
  const _useAxios = useAxios<T>(
    _url.value,
    axiosConfig.value,
    instance,
    {
      initialData: toValue(initialData),
      resetOnExecute: toValue(resetOnExecute),
      shallow: toValue(shallow),
      immediate: toValue(immediate),
      onError: (err) => {
        if (isNumber(_retry) && _retry-- > 0 && (err as AxiosError).code !== 'ERR_CANCELED') {
          _useAxios.execute(_url.value, axiosConfig.value)
          return
        }
        onError?.(err)
      },
      onSuccess: (data: T) => {
        isSuccessful = true
        onSuccess?.(data)
      },
      onFinish: () => {
        if (isNumber(_retry) && _retry >= 0 && !isSuccessful)
          return
        isSuccessful = false
        _retry = toValue(retry)
        onFinish?.()
      },
    },
  )
  const scope = effectScope()
  scope.run(() => {
    toValue(refetch) && watchDeep([_url, axiosConfig], () => {
      _useAxios.execute(_url.value, axiosConfig.value)
    })
  })
  tryOnScopeDispose(() => {
    console.log('dispose')
    _useAxios?.abort()
    scope.stop()
  })
  return {
    ..._useAxios,
    data: computed({
      get: () => {
        return _useAxios.data.value
      },
      set: val => _useAxios.data.value = val,
    }),
    execute: (executeUrl?: MaybeRefOrGetter<string>) => {
      const _executeUrl = toValue(executeUrl)
      return _useAxios.execute(isUndefined(_executeUrl) ? _url.value : _executeUrl) as Promise<useRequestReturn<T>>
    },
  }
}
