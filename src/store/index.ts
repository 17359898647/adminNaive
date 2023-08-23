import { cloneDeep } from 'lodash-es'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

const Pinia = createPinia()

export function installPinia(app: App) {
  // 持久化
  Pinia.use(piniaPluginPersistedstate)
  Pinia.use(({ store }) => {
    const initialState = cloneDeep(store.$state)
    store.resetStores = () => {
      store.$patch(cloneDeep(initialState))
      console.log(`被重置的storeId: ${store.$id}`, store.$state)
    }
  })
  app.use(Pinia)
  console.log('pinia装载完成')
}
