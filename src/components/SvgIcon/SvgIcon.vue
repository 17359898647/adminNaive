<script setup lang="ts">
interface IProps {
  lineIcon?: string
  localIcon?: string
  size?: string | number
}
withDefaults(defineProps<IProps>(), {
  size: '1rem',
  lineIcon: 'icon-material-symbols:disabled-by-default',
})
const emits = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <NIcon
    class="cursor-pointer !flex"
    :size="size"
    @click="(e) => {
      emits('click', e)
    }"
  >
    <svg
      v-if="localIcon"
      :aria-hidden="true"
      class="fill-current"
    >
      <use :href="`#${localIcon}`" />
    </svg>
    <i
      v-else
      :class="lineIcon"
    />
  </NIcon>
</template>
