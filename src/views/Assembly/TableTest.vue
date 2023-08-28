<script lang="tsx" setup>
import { slice } from 'lodash-es'
import type { PaginationProps } from 'naive-ui'
import { NTag } from 'naive-ui'
import { useTable } from '@/composables/useTable'

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
  resetOnExecute: true,
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
      ellipsis: {
        tooltip: true,
      },
    },
    {
      key: 'completed',
      title: '是否完成',
      align: 'center',
      render(row) {
        return <NTag type={row.completed ? 'success' : 'error'}>{row.completed ? '是' : '否'}</NTag>
      },
    },
  ],
})
const paginationReactive = computed(() => ({
  page: api.value,
  pageCount: (data.value?.length ?? 0) / 10,
  onUpdatePage: (page) => {
    api.value = page
  },
} as PaginationProps))
const dataReactive = computed(() => {
  return slice(data.value, (api.value - 1) * 20, api.value * 20)
})
</script>

<template>
  <NCard
    :contentStyle="{
      display: 'flex',
      flexDirection: 'column',
    }"
    title="网络测试"
  >
    <NDataTable
      class="flex-shrink-0 flex-grow"
      :columns="columns"
      :data="dataReactive"
      :loading="isLoading"
      :pagination="paginationReactive"
      :remote="true"
      :rowKey="(row) => row.id"
      :virtualScroll="true"
      @update:checked-row-keys="console.log"
    />
  </NCard>
</template>
