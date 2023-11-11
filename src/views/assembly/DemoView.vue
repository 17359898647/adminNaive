<script setup lang="tsx">
import dayjs from 'dayjs'
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
const now = new Date().getTime()
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
      IProps: {
        defaultValue: [now, now],
        type: 'daterange',
      },
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
watchDeep(demoJson, () => {
  console.log('change')
})
const { model, JsonOptions } = JsonFormHelp(demoJson)
const transformDate = computed(() => {
  const [startDate = now, endDate = now] = model.value.birthday || []
  return {
    ...model.value,
    birthday: {
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
    },
  }
})
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
      <pre v-html="toValue(useStringify(transformDate, null, 2))" />
    </NCard>
  </NCard>
</template>
