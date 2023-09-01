import { forEach, isUndefined } from 'lodash-es'
import type { DropdownOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

type BreadcrumbType = RouteRecordRaw & { parentName?: string }
export function createBreadcrumb(router: RouteRecordRaw[]): Record<string, BreadcrumbType> {
  const resultMap: Record<string, BreadcrumbType> = {}
  const deep = (router: RouteRecordRaw[], parentName?: string) => {
    forEach(router, (item) => {
      const { children, path, name } = item
      const breadcrumb: BreadcrumbType = {
        ...item,
        parentName,
      }
      if (!isUndefined(children) && children?.length > 0)
        deep(children, path)
      resultMap[String(name) || path] = breadcrumb
    })
  }
  deep(router)
  return resultMap
}
export function deepFindBreadcrumb(name: string, breadcrumb: Record<string, BreadcrumbType>) {
  const result: RouteRecordRaw[] = []
  const deepFind = (deepPath: string) => {
    forEach(breadcrumb, (item) => {
      const { parentName, name } = item
      if (deepPath === name) {
        if (!isUndefined(parentName))
          deepFind(parentName)

        result.push(item)
      }
    })
  }
  deepFind(name)
  return result
}

export function createDropdownOptions(breadcrumbs: RouteRecordRaw[]): DropdownOption[] {
  const result: DropdownOption[] = []
  forEach(breadcrumbs, (breadcrumb) => {
    const {
      meta,
      children,
      path,
      name,
    } = breadcrumb
    const { isHidden, lineIcon, localIcon, isTitle } = meta || {}
    if (isUndefined(isHidden)) {
      result.push({
        icon: () => <SvgIcon lineIcon={lineIcon} localIcon={localIcon}/>,
        label: isTitle,
        key: String(name) || path,
        children: isUndefined(children) ? undefined : createDropdownOptions(children),
      })
    }
  })
  return result
}
