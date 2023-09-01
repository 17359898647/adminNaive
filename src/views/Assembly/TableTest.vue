<script lang="tsx" setup>
import { findIndex, slice, throttle } from 'lodash-es'
import type { PaginationProps } from 'naive-ui'
import { NDataTable, NInput, NPopover, NSwitch } from 'naive-ui'
import type { PropType } from 'vue'
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
const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number] as PropType<string | number>,
    onUpdateValue: [Function, Array] as PropType<(v: string | number) => void>,
  },
  setup(props) {
    const isEdit = ref(false)
    const inputRef = ref<InstanceType<typeof NInput> | null>(null)
    const inputValue = ref(props.value)
    function handleOnClick() {
      isEdit.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
    function _handleChange() {
      props.onUpdateValue?.(inputValue.value as any)
      isEdit.value = false
    }
    const handleChange = throttle(_handleChange, 1000, {
      trailing: false,
    })
    return () => (
        <div style={{
          'min-height': '22px',
          'white-space': 'nowrap',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        }} onClick={handleOnClick}
        >
          <NPopover>
            {{
              default: () => (
                  <span>{props.value}</span>
              ),
              trigger: () => (
                isEdit.value
                  ? (
                  <NInput
                    ref={inputRef}
                    value={inputValue.value as any}
                    onUpdateValue={e => inputValue.value = e}
                    onChange={handleChange} onBlur={handleChange}
                  />
                    )
                  : <span>{props.value}</span>
              ),
            }}
          </NPopover>
        </div>
    )
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
        return <ShowOrEdit value={row.title} onUpdateValue={(v) => {
          data.value![index].title = v as string
          triggerRef(data)
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
                  triggerRef(data)
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
  pageCount: Math.ceil(data.value!.length / 100),
  onUpdatePage: (page) => {
    api.value = page
    console.log(api.value)
  },
} as PaginationProps))
const dataReactive = computed(() => {
  return slice(data.value, (api.value - 1) * 100, api.value * 100)
})
const tableRef = ref<InstanceType<typeof NDataTable>>()
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
      ref="tableRef"
      class="flex-1"
      :columns="columns"
      :data="dataReactive"
      :flexHeight="true"
      :loading="isLoading"
      :pagination="paginationReactive"
      :remote="true"
      :rowKey="(row) => row.id"
      :virtualScroll="true"
      @update:checked-row-keys="console.log"
    />
  </NCard>
</template>
