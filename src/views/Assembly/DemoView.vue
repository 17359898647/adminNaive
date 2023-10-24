<script setup lang="tsx">
import { NCard } from 'naive-ui'
import type { IJsonType } from '@/components/JsonForm'
import { JsonForm, JsonFormHelp } from '@/components/JsonForm'

definePage({
  meta: {
    isTitle: '测试组件',
    lineIcon: 'icon-ph:test-tube-duotone',
    isOrder: Number.POSITIVE_INFINITY,
  },
})

const demoJson = computed(() => {
  const Json: IJsonType[] = [
    {
      type: 'input',
      formName: 'name',
      itemProps: {
        label: '名称',
        span: 12,
      },
    },
    {
      type: 'select',
      formName: 'sex',
      itemProps: {
        span: 12,
        label: '性别',
      },
      IProps: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    },
    {
      type: 'date',
      formName: 'birthday',
      itemProps: {
        label: '生日',
      },
    },
    {
      type: 'slider',
      formName: 'age',
      itemProps: {
        label: '年龄',
      },
      IProps: {
        min: 0,
        max: 100,
        value: 0,
        formatTooltip: value => `${value}岁`,
      },
    },
    {
      type: 'upload',
      formName: 'photograph',
      itemProps: {
        label: '生日照片',
      },
      IProps: {
        defaultUpload: true,
        action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
        listType: 'image-card',
        multiple: true,
        accept: 'image/png',
        onError: () => {
          console.log(1)
        },
      },
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
