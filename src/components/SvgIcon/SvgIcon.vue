<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface IProps {
  lineIcon?: string
  localIcon?: string
  size?: string | number
}
const props = withDefaults(defineProps<IProps>(), {
  size: '1rem',
  lineIcon: 'material-symbols:disabled-by-default',
})
const emits = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <NIcon
    class="flex-center cursor-pointer"
    :size="props.size"
    @click="(e) => {
      emits('click', e)
    }"
  >
    <svg
      v-if="props.localIcon"
      :aria-hidden="true"
      class="fill-current"
    >
      <use :href="`#${props.localIcon}`" />
    </svg>
    <span
      v-else
      class="pointer-events-none"
    >
      <Icon
        class="SvgIcon fill-current"
        :icon="props.lineIcon"
      />
    </span>
  </NIcon>
</template>
