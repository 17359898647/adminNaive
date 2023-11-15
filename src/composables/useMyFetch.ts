import { createFetch } from '@vueuse/core'

export const useMyFetch = createFetch({
  baseUrl: import.meta.env.DEV ? '/api' : import.meta.env.VITE_BASEURL,
  options: {
    immediate: true,
    timeout: 10000,
    initialData: null,
    refetch: true,
    updateDataOnError: true,
    beforeFetch({ options, url }) {
      // console.log('beforeFetch', ctx)
      options.headers = {
        ...options.headers,
        token: 'userToken',
      }
      return {
        options,
        url,
      }
    },
    afterFetch(ctx) {
      console.log('afterFetch', ctx)
      ctx.data = null
      return ctx
    },
    onFetchError(ctx) {
      console.log('onFetchError', ctx)
      return ctx
    },
  },
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
    },
  },
  combination: 'chain',
})
