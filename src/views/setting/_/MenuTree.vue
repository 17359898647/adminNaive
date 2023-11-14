<script setup lang="ts" >
import type { PropType } from 'vue'
import Draggable from 'vuedraggable'
import type { _MenuOption } from '@/store/modules/useMenuStore'

const props = defineProps({
  menuOptions: {
    type: Array as PropType<_MenuOption[]>,
  },
})
const { menuOptions } = useVModels(props)
function getChildren(index: number) {
  return menuOptions?.value?.[index] as _MenuOption & { children: _MenuOption[] }
}
const expandedNames = ref([])
onActivated(() => {
  console.log('menuOptions', expandedNames)
})
</script>

<template >
  <Draggable
    v-model="menuOptions"
    animation="150"
    :group="{ name: 'g1' }"
    itemKey="key"
  >
    <template
      #item="{
        element: {
          key,
          label,
          show,
        }, index,
      }"
    >
      <NCard
        v-if="show"
        :key="key"
        @click="(e) => {
          e.stopPropagation()
        }"
      >
        <KeepAlive >
          <NCollapse
            v-if="getChildren(index).children && getChildren(index).children.length"
            :key="key"
            v-model:expandedNames="expandedNames"
            displayDirective="show"
          >
            <NCollapseItem :title="label" >
              <MenuTree v-model:menuOptions="getChildren(index).children"/>
            </NCollapseItem>
          </NCollapse>
          <div v-else >
            <span >{{ label }}</span>
            <MenuTree v-model:menuOptions="getChildren(index).children"/>
          </div>
        </KeepAlive>
      </NCard>
    </template>
  </Draggable>
</template>

<style scoped >

</style>
