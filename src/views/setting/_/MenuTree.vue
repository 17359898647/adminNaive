<script setup lang="ts">
import { filter } from 'lodash-es'
import type { PropType } from 'vue'
import Draggable from 'vuedraggable'
import type { _MenuOption } from '@/store/modules/useMenuStore'

const props = defineProps({
  menuOptions: {
    type: Array as PropType<_MenuOption[]>,
    required: true,
  },
})
const { menuOptions } = useVModels(props)
const menuOptionsComputed = computed({
  get: () => filter(menuOptions.value, 'show'),
  set: val => menuOptions.value = val,
})
function getChildren(index: number) {
  return menuOptions?.value[index] as _MenuOption & { children: _MenuOption[] }
}
const { copy } = useClipboard()
</script>

<template>
  <Draggable
    v-model="menuOptionsComputed"
    animation="150"
    :group="{ name: 'g1' }"
    itemKey="key"
  >
    <template #item="{ element, index }">
      <NCard
        @click="(e) => {
          e.stopPropagation()
          copy(String(element.key) || '')
          createMsg(
            `复制成功${element.key}`,
            {
              type: 'success',
            },
          )
        }"
      >
        <span>{{ element.label }}</span>
        <MenuTree
          v-if="element.children && element.children.length >= 1"
          v-model:menuOptions="getChildren(index).children"
        />
      </NCard>
    </template>
  </Draggable>
</template>

<style scoped>

</style>
