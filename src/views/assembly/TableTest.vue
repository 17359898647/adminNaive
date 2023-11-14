<script lang="tsx" setup >
import { findIndex, slice } from 'lodash-es'
import type { PaginationProps } from 'naive-ui'
import { NDataTable, NSwitch } from 'naive-ui'
import ShowOrEdit from './_ShowOrEdit.vue'
import { useTable } from '@/composables/useTable'

function PreView({ data }: { data: any }) {
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}
definePage({
  meta: {
    isKeepAlive: false,
    isTitle: '表格测试',
    lineIcon: 'icon-material-symbols:home',
  },
})
interface tableData {
  userId: number
  id: number
  title: string
  completed: boolean
}
const api = ref(1)
const { data, columns, isLoading } = useTable<tableData>({
  columns: [
    {
      align: 'center',
      type: 'selection',
    },
    {
      align: 'center',
      key: 'id',
      title: 'ID',
    },
    {
      align: 'center',
      key: 'title',
      render(row) {
        const index = findIndex(data.value, item => item.id === row.id)!
        return (
          <ShowOrEdit
            v-model={data.value![index].title}
            onFinish={() => {
              createMsg(() => (
                <PreView data={data.value![index]} />
              ), {
                type: 'success',
              })
            }}
          />
        )
      },
      title: '标题',
    },
    {
      align: 'center',
      key: 'completed',
      render(row) {
        const index = findIndex(data.value, item => item.id === row.id)!
        return (
          <NSwitch
            value={row.completed}
            onUpdateValue={(v) => {
              data.value![index].completed = v as boolean
              createMsg(() => (
                <PreView data={data.value![index]} />
              ), {
                type: 'success',
              })
            }}
          />
        )
      },
      title: '是否完成',
    },
  ],
  initialData: [],
  params: () => ({
    demo: api.value,
  }),
  resetOnExecute: false,
  retry: 3,
  shallow: false,
  url: '/todos',
})
const paginationReactive = computed(() => ({
  onUpdatePage: (page) => {
    api.value = page
    console.log(api.value)
  },
  page: api.value,
  pageCount: Math.ceil(data.value!.length / 50),
} as PaginationProps))
const dataReactive = computed(() => {
  return slice(data.value, (api.value - 1) * 50, api.value * 50)
})
const tableRef = shallowRef<InstanceType<typeof NDataTable>>()
</script>

<template >
  <NCard
    :contentStyle="{
      display: 'flex',
      flexDirection: 'column',
    }"
    title="表格测试"
  >
    <NDataTable
      ref="tableRef"
      class="flex-1"
      :columns="columns"
      :data="dataReactive"
      :flexHeight="true"
      :loading="isLoading"
      :pagination="paginationReactive"
      :remote="true"
      :rowKey="(row) => row.id"
      :scrollX="300"
      :virtualScroll="true"
      @updatecheckedRowKeys="console.log"
    />
  </NCard>
</template>
