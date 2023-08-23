interface routeMeta {
  /** 路由标题 */
  isTitle: string
  /** 是否改变网页标题
   * @default true
   * */
  changeTitle?: boolean
  /** 菜单顺序,同层比较
   * @default 0
   * */
  isOrder?: number
  /** 图标名称 */
  lineIcon?: string
  /** 本地图标名称 */
  localIcon?: string
  /** 是否是固定页，默认不固定
   * @default undefined
   * */
  isAffix?: true
  /** 是否隐藏在菜单,面包屑中隐藏，默认不隐藏
   * @default undefined
   **/
  isHidden?: true
  /** 是否缓存,默认缓存
   * @default undefined
   * */
  isKeepAlive?: false
}

interface routerObject extends Omit<import('vue-router').RouteRecordRaw, 'component' | 'meta' | 'children' | 'name'> {
  parentPath?: string
  component?: import('vue-router').RouteRecordRaw['component'] | routerTypeKeys
  meta: routeMeta
  children?: routerObject[]
  name?: 'ExteriorNotFoundView' | 'InteriorNotFound' | string
}
