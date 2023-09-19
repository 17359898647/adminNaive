<script setup lang="tsx">
import { cloneDeep, map } from 'lodash-es'
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'
import type { _MenuOption } from '@/store/modules/useMenuStore'
import { useMenuStore } from '@/store/modules/useMenuStore'

const { isCollapsedWidth, isAccordion } = inject(layoutProvide)!
function renderMenuIcon(option: _MenuOption) {
  const { localIcon, lineIcon } = option as _MenuOption
  return <SvgIcon lineIcon={lineIcon} localIcon={localIcon} size={24} />
}
const MenuStore = useMenuStore()
const { setOpenKeys, setSelectKey } = MenuStore
const { openKeys, selectKey, menuOptions } = storeToRefs(MenuStore)
const menuOptionsComputed = computed(() => {
  const cloneMenuOptions = cloneDeep(menuOptions.value)
  const deepMap = (options: _MenuOption[]) => {
    return map(options, (option) => {
      const { children } = option
      if (children && children.length)
        option.children = deepMap(children)
      else
        delete option.children

      return option
    })
  }
  // @ts-expect-error
  return deepMap(cloneMenuOptions)
})
</script>

<template>
  <NMenu
    :accordion="isAccordion"
    class="select-none"
    :collapsedWidth="isCollapsedWidth"
    :expandedKeys="openKeys"
    :indent="18"
    :options="menuOptionsComputed"
    :renderIcon="renderMenuIcon"
    :value="selectKey"
    @update:expanded-keys="setOpenKeys"
    @update:value="setSelectKey"
  />
</template>

<style scoped>

</style>
