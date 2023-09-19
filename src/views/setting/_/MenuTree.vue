<script setup lang="ts">
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
const { copy } = useClipboard()
</script>

<template>
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
        @click="(e) => {
          e.stopPropagation()
          copy(String(key) || '')
          createMsg(
            `复制成功${key}`,
            {
              type: 'success',
            },
          )
        }"
      >
        <span>{{ label }}</span>
        <MenuTree v-model:menuOptions="getChildren(index).children" />
      </NCard>
    </template>
  </Draggable>
</template>

<style scoped>

</style>
