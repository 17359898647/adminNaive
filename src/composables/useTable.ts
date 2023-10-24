import type { DataTableBaseColumn, DataTableExpandColumn, DataTableSelectionColumn } from 'naive-ui'
import type { TableColumnGroup } from 'naive-ui/es/data-table/src/interface'
import type { Ref } from 'vue'
import { request } from '@/api'
import type { useRequestParams } from '@/composables/useRequest'

/**
 * 自定义的列 key
 */
type CustomColumnKey<K = never> = K | 'action'

/**
 * 表格的列
 */
export type HookTableColumn<tableData = Record<string, unknown>> =
  | (Omit<TableColumnGroup<tableData>, 'key'> & { key: CustomColumnKey<keyof tableData> })
  | (Omit<DataTableBaseColumn<tableData>, 'key'> & { key: CustomColumnKey<keyof tableData> })
  | DataTableSelectionColumn<tableData>
  | DataTableExpandColumn<tableData>
interface useTableOptions<tableData> extends useRequestParams {
  columns: HookTableColumn<tableData>[]
}

export function useTable<tableData = Record<string, unknown>>(options: useTableOptions<tableData>) {
  const {
    columns,
    ...rest
  } = options
  const { data: _data, isLoading, execute } = request<tableData[]>({
    ...rest,
  })

  const _columns = ref(columns) as Ref<HookTableColumn<tableData>[]>

  return {
    columns: _columns,
    data: _data,
    execute,
    isLoading,
  }
}
