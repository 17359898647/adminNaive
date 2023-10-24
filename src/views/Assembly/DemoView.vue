<script setup lang="tsx">
import { NCard } from 'naive-ui'
import type { IJsonType } from '@/components/JsonForm'
import { JsonForm, JsonFormHelp } from '@/components/JsonForm'

definePage({
  meta: {
    isOrder: Number.POSITIVE_INFINITY,
    isTitle: '测试组件',
    lineIcon: 'icon-ph:test-tube-duotone',
  },
})

const demoJson = computed(() => {
  const Json: IJsonType[] = [
    {
      formName: 'name',
      itemProps: {
        label: '名称',
        span: 12,
      },
      type: 'input',
    },
    {
      IProps: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
      formName: 'sex',
      itemProps: {
        label: '性别',
        span: 12,
      },
      type: 'select',
    },
    {
      formName: 'birthday',
      itemProps: {
        label: '生日',
      },
      type: 'date',
    },
    {
      IProps: {
        formatTooltip: value => `${value}岁`,
        max: 100,
        min: 0,
        value: 0,
      },
      formName: 'age',
      itemProps: {
        label: '年龄',
      },
      type: 'slider',
    },
    {
      IProps: {
        accept: 'image/png',
        action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
        defaultUpload: true,
        listType: 'image-card',
        multiple: true,
        onError: () => {
          console.log(1)
        },
      },
      formName: 'photograph',
      itemProps: {
        label: '生日照片',
      },
      type: 'upload',
      // slot() {
      //   return (
      //     <NButton>
      //       123
      //     </NButton>
      //   )
      // },
    },
  ]
  return Json
})

const { model, JsonOptions } = JsonFormHelp(demoJson)
</script>

<template>
  <NCard title="测试组件">
    <NCard class="mb-4">
      <NSpace
        :itemStyle="{
          width: '100%',
        }"
        :wrap="false"
      >
        <JsonForm
          :formProps="{
            labelAlign: 'left',
          }"
          :jsonOptions="JsonOptions"
          :model="model"
        />
      </NSpace>
    </NCard>
    <NCard>
      <pre v-html="toValue(useStringify(model, null, 2))" />
    </NCard>
  </NCard>
</template>
