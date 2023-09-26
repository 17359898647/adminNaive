<script setup lang="tsx">
import { map } from 'lodash-es'
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'
import type { _MenuOption } from '@/store/modules/useMenuStore'
import { useMenuStore } from '@/store/modules/useMenuStore'

const { isCollapsedWidth, isAccordion } = inject(layoutProvide)!
function renderMenuIcon(option: _MenuOption) {
  const { localIcon, lineIcon } = option as _MenuOption
  return (
    <SvgIcon
      lineIcon={lineIcon}
      localIcon={localIcon}
      size={24}
    />
  )
}
const MenuStore = useMenuStore()
const { setOpenKeys, setSelectKey } = MenuStore
const { openKeys, selectKey, menuOptions } = storeToRefs(MenuStore)
const menuOptionsComputed = computed(() => {
  const deepMap = (options: _MenuOption[]): _MenuOption[] => {
    return map(options, (option) => {
      const { children, ...rest } = option
      if (children && children.length) {
        return {
          ...rest,
          children: deepMap(children),
        }
      }
      else {
        return rest
      }
    })
  }
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  return deepMap(menuOptions.value)
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
    @updateExpandedKeys="setOpenKeys"
    @updateValue="setSelectKey"
  />
</template>

<style scoped>

</style>
