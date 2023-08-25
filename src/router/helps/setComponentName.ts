import { assign, isFunction, isUndefined } from 'lodash-es'
import type { Component } from 'vue'

export type asyncComponentType = () => Promise<{
  default: Component
}>
export async function setComponentName(asyncComponent: asyncComponentType, name: string) {
  if (!isFunction(asyncComponent)) {
    console.error('组件必须是一个函数！')
    return asyncComponent
  }
  try {
    const component = await asyncComponent()
    if (!isUndefined(component.default)) {
      console.log('component.default', component.default, name)
      assign(component.default, { name })
      return () => component
    }
  }
  catch (e) {
    return asyncComponent
  }
}
