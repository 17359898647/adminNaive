<script lang="ts" setup >
import DefaultButton from './_ButtonDefault.vue'
import ButtonGroup from './_ButtonGroup.vue'

definePage({
  meta: {
    isTitle: '按钮测试',
    lineIcon: 'icon-teenyicons:button-outline',
    roles: ['admin'],
  },
})
</script>

<template >
  <NCard >
    <NSpace :vertical="true" >
      <DefaultButton/>
      <ButtonGroup/>
    </NSpace>
  </NCard>
</template>
