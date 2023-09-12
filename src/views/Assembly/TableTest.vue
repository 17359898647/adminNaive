<script lang="tsx" setup>
import { findIndex, slice } from 'lodash-es'
import type { PaginationProps } from 'naive-ui'
import { NDataTable, NSwitch } from 'naive-ui'
import ShowOrEdit from './_ShowOrEdit.vue'
import { useTable } from '@/composables/useTable'

function PreView({ data }: { data: any }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
definePage({
  meta: {
    isTitle: '表格测试',
    lineIcon: 'material-symbols:home',
    isKeepAlive: false,
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
  url: '/todos',
  params: () => ({
    demo: api.value,
  }),
  shallow: false,
  retry: 3,
  initialData: [],
  resetOnExecute: false,
  columns: [
    {
      type: 'selection',
      align: 'center',
    },
    {
      key: 'id',
      title: 'ID',
      align: 'center',
    },
    {
      key: 'title',
      title: '标题',
      align: 'center',
      render(row) {
        const index = findIndex(data.value, item => item.id === row.id)!
        return <ShowOrEdit v-model={data.value![index].title} onFinish={() => {
          createMsg(() => (
              <PreView data={data.value![index]} />
          ), {
            type: 'success',
          })
        }} />
      },
    },
    {
      key: 'completed',
      title: '是否完成',
      align: 'center',
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
    },
  ],
})
const paginationReactive = computed(() => ({
  page: api.value,
  pageCount: Math.ceil(data.value!.length / 50),
  onUpdatePage: (page) => {
    api.value = page
    console.log(api.value)
  },
} as PaginationProps))
const dataReactive = computed(() => {
  return slice(data.value, (api.value - 1) * 50, api.value * 50)
})
const tableRef = shallowRef<InstanceType<typeof NDataTable>>()
</script>

<template>
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
      @update:checked-row-keys="console.log"
    />
  </NCard>
</template>
