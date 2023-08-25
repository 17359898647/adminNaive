import type { MaybeRefOrGetter } from '@vueuse/core'
import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'
import type { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from 'axios'
import { isUndefined } from 'lodash-es'

const instance = axios.create({
  baseURL: ' ',
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: false,
})
instance.interceptors.request.use(
  (config) => {
    const { headers } = config
    config.headers = {
      Authorization: 'userToken',
      ...headers,
    } as any
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED')
      console.log('请求超时')

    if (error.code === 'ERR_CANCELED')
      console.log('请求取消')

    return Promise.reject(error)
  },
)

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
  method?: MaybeRefOrGetter<'get' | 'post' | 'put' | 'delete'>
  immediate?: MaybeRefOrGetter<boolean>
  baseURL?: MaybeRefOrGetter<string>
  onDownloadProgress?: (e: AxiosProgressEvent) => void
  onUploadProgress?: (e: AxiosProgressEvent) => void
  refetch?: MaybeRefOrGetter<boolean>
  initialData?: MaybeRefOrGetter<T>
  onSuccess?: (data: T) => void
  onError?: (err: unknown) => void
}
export function useRequest<T = unknown>(options: useRequestParams<T>) {
  const { url = '', baseURL, onDownloadProgress, headers, onUploadProgress, params, method = 'get', refetch = true, onError, data, initialData, onSuccess, immediate = true } = options
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
      onError,
      onSuccess,
      resetOnExecute: true,
      shallow: true,
      immediate: toValue(immediate),
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
    execute: (executeUrl?: MaybeRefOrGetter<string>) => {
      const _executeUrl = toValue(executeUrl)
      return _useAxios.execute(isUndefined(_executeUrl) ? _url.value : _executeUrl)
    },
  }
}
