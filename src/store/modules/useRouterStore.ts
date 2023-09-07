// NOTE (路由配置  2023-9-7 14:43)
export const useRouterStore = defineStore('useRouterStore', () => {
  const [isReady, setReady] = useToggle(false)
  const addRouter = async () => {
    // forEach(getAllRouterFiles(moduleRouters), (item) => {
    //   !isUndefined(item.name) && !router.hasRoute(item.name) && router.addRoute('rootRouter', item)
    // })
    setReady(true)
  }

  return {
    isReady,
    setReady,
    addRouter,
  }
})
