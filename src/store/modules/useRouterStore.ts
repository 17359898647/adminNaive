import { forEach, isUndefined } from 'lodash-es'
import { router } from '@/router'
import { getAllRouterFiles } from '@/router/helps/getAllRouterFiles'
import { moduleRouters } from '@/router/modules'

export const useRouterStore = defineStore('useRouterStore', () => {
  const [isReady, setReady] = useToggle(false)
  const addRouter = async () => {
    forEach(getAllRouterFiles(moduleRouters), (item) => {
      !isUndefined(item.name) && !router.hasRoute(item.name) && router.addRoute('rootRouter', item)
    })
    setReady(true)
  }
  return {
    isReady,
    setReady,
    addRouter,
  }
})
