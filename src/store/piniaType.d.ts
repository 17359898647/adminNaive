import type { StateTree } from 'pinia'
import 'pinia'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

declare module 'pinia' {
  interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: boolean | PersistedStateOptions | PersistedStateOptions[]
  }
  interface PiniaCustomProperties {
    $hydrate: (opts?: {
      runHooks?: boolean
    }) => void
    $persist: () => void
  }
}
