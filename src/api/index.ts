import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { useRequestParams } from '@/composables/uesRequest'
import { useRequest } from '@/composables/uesRequest'

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
export function request<T = any>(options: useRequestParams<T>) {
  return useRequest<T>(instance, options)
}
