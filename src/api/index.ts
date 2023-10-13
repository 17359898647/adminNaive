import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'
import type { useRequestParams, useRequestReturn } from '@/composables/useRequest'
import { useRequest } from '@/composables/useRequest'

console.log(import.meta.env.VITE_BASEURL)
const instance = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_BASEURL,
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: false,
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    const { headers } = config
    config.headers = {
      Authorization: 'userToken',
      ...headers,
    } as AxiosRequestHeaders
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
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
export interface dataFormat<T = any> {
  data: T
}

export type requestFn = <T>(options: useRequestParams<dataFormat<T>>) => useRequestReturn<dataFormat<T>>
export const request: requestFn = options => useRequest(instance, {
  retry: 3,
  ...options,
})
