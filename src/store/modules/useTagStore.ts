import type { RouteLocationNormalizedLoaded, RouteMeta } from 'vue-router'

interface ITag extends RouteMeta {
  path: string
  fullPath: string
}

export const useTagStore = defineStore('useTagStore', () => {
  const tagList = ref<ITag[]>([])
  const createTag = (route: RouteLocationNormalizedLoaded) => {
    const { meta, path, fullPath } = route
    return {
      ...meta,
      path,
      fullPath,
    } as ITag
  }
  return {
    tagList,
    createTag,
  }
}, {
  persist: {
    paths: ['tagList'],
  },
})
