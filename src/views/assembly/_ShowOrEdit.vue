<script setup lang="ts" >
import { throttle } from 'lodash-es'
import { NEllipsis, NInput } from 'naive-ui'

const props = defineProps<{
  modelValue?: string
}>()
const emit = defineEmits<{
  finish: [value: string | undefined]
  'update:modelValue': [value: string | undefined]
}>()
const { modelValue } = useVModels(props, emit)
const inputRef = ref<InstanceType<typeof NInput> | null>(null)
const [isEdit, setShowOrEdit] = useToggle(false)
async function handleOnClick() {
  setShowOrEdit(true)
  await nextTick()
  inputRef.value?.focus()
}
const handleChange = throttle(() => {
  isEdit.value = false
  emit('finish', toValue(modelValue))
}, 1000, {
  trailing: false,
})
</script>

<template >
  <div class="min-h-22px" >
    <NEllipsis
      :tooltip="{
        flip: false,
      }"
      @click="handleOnClick"
    >
      <template #tooltip >
        <span >{{ modelValue }}</span>
      </template>
      <template #default >
        <span
          v-if="!isEdit"
          @click="handleOnClick"
        >{{ modelValue }}</span>
        <NInput
          v-else
          ref="inputRef"
          v-model:value="modelValue"
          @blur="handleChange"
          @change="handleChange"
        />
      </template>
    </NEllipsis>
  </div>
</template>

<style scoped >

</style>
