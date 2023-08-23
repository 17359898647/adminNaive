<script setup lang="tsx">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { layoutProvide } from '@/store/modules/useLayoutStore'
import type { _MenuOption } from '@/store/modules/useMenuStore'
import { useMenuStore } from '@/store/modules/useMenuStore'

const { isCollapsedWidth } = inject(layoutProvide)!
function renderMenuIcon(option: _MenuOption) {
  const { localIcon, lineIcon } = option as _MenuOption
  return <SvgIcon lineIcon={lineIcon} localIcon={localIcon} size={24} />
}
const MenuStore = useMenuStore()
const { setOpenKeys, setSelectKey } = MenuStore
const { openKeys, selectKey, menuOptions } = storeToRefs(MenuStore)
</script>

<template>
  <NMenu
    class="select-none"
    :collapsedWidth="isCollapsedWidth"
    :expandedKeys="openKeys"
    :options="menuOptions"
    :renderIcon="renderMenuIcon"
    :value="selectKey"
    @update:expanded-keys="setOpenKeys"
    @update:value="setSelectKey"
  />
</template>

<style scoped>

</style>
