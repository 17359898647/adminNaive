import { assign, isUndefined } from 'lodash-es'
import type { Component } from 'vue'

export type asyncComponentType = () => Promise<{
  default: Component
}>
export async function setComponentName(asyncComponent: asyncComponentType, name: string) {
  try {
    const component = await asyncComponent()
    if (!isUndefined(component.default)) {
      assign(component.default, { name })
      return component
    }
  }
  catch (e) {
    return asyncComponent
  }
}
