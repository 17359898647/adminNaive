// 统一注册指令
import { forEach } from 'lodash-es'
import type { App, Directive } from 'vue'

const directivesModules = import.meta.glob('./**/*.ts', { eager: true }) as Record<string, Record<string, Directive>>
export function installDirective(app: App) {
  forEach(directivesModules, (item) => {
    forEach(item, (directive, key) => {
      app.directive(key, directive)
    })
  })
  console.log('指令装载完成')
}
