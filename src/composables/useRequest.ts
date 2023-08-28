import type { MaybeRefOrGetter } from '@vueuse/core/index'
import type { StrictUseAxiosReturn } from '@vueuse/integrations/useAxios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, Method } from 'axios'
import { isUndefined } from 'lodash-es'

const transformParams = reactify((url: string, params?: Record<string, any>) => {
  const searchParams = new URLSearchParams(params)
  const queryString = searchParams.toString()
  return queryString ? `${url}?${queryString}` : `${url}`
})
export interface useRequestParams<T = any> {
  url?: MaybeRefOrGetter<string>
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
    resetOnExecute = false,
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
  const _useAxios = useAxios<T>(
    _url.value,
    axiosConfig.value,
    instance,
    {
      initialData: toValue(initialData),
      resetOnExecute: toValue(resetOnExecute),
      shallow: true,
      immediate: toValue(immediate),
      onError,
      onSuccess,
      onFinish,
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
