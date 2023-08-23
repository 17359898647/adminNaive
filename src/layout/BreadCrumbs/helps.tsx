import { forEach, isUndefined } from 'lodash-es'
import type { DropdownOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { sortMenu } from '@/router/helps/getAllRouterFiles'

export { routes } from 'vue-router/auto/routes'
type BreadcrumbType = RouteRecordRaw & { parentPath?: string }
export function createBreadcrumb(router: RouteRecordRaw[]): Record<string, BreadcrumbType> {
  const resultMap: Record<string, BreadcrumbType> = {}
  const deep = (router: RouteRecordRaw[], parentPath?: string) => {
    forEach(router, (item) => {
      const { children, path } = item
      const breadcrumb: BreadcrumbType = {
        ...item,
        parentPath,
      }
      if (!isUndefined(children) && children?.length > 0)
        deep(children, path)
      resultMap[path] = breadcrumb
    })
  }
  deep(sortMenu(router))
  return resultMap
}
export function deepFindBreadcrumb(parentPath: string, breadcrumb: Record<string, BreadcrumbType>) {
  const result: RouteRecordRaw[] = []
  const deepFind = (deepPath: string) => {
    forEach(breadcrumb, (item) => {
      const { parentPath, path } = item
      if (deepPath === path) {
        if (!isUndefined(parentPath))
          deepFind(parentPath)

        result.push(item)
      }
    })
  }
  deepFind(parentPath)
  return result
}

export function createDropdownOptions(breadcrumbs: RouteRecordRaw[]): DropdownOption[] {
  const result: DropdownOption[] = []
  forEach(breadcrumbs, (breadcrumb) => {
    const {
      meta,
      children,
      path,
    } = breadcrumb
    const { isHidden, lineIcon, localIcon, isTitle } = meta!
    if (isUndefined(isHidden)) {
      result.push({
        icon: () => <SvgIcon lineIcon={lineIcon} localIcon={localIcon}/>,
        label: isTitle,
        key: path,
        children: isUndefined(children) ? undefined : createDropdownOptions(children),
      })
    }
  })
  return result
}
