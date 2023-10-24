import type { ColorPickerProps, DatePickerProps, FormItemGiProps, FormProps, FormRules, GridProps, InputProps, RadioGroupProps, SelectProps, SliderProps, UploadProps } from 'naive-ui'
import type { ExtractPropTypes, PropType, VNode } from 'vue'

/**
 * @description 组件的props类型
 */
export interface IComProps {
  input: InputProps
  date: DatePickerProps
  select: SelectProps
  slider: SliderProps
  upload: UploadProps
  color: ColorPickerProps
  radio: RadioGroupProps
}
export type IComType = keyof IComProps
/**
 * @description radio组件的选项
 */
export interface IRadioOptions {
  label: string | (() => VNode)
  value: any
  isButton?: boolean
  onUpdateChecked?: (checked: boolean) => void
}

/**
 * @description jsonOptions的类型
 */
export type IJsonType<T extends IComType = IComType> = T extends infer t ? t extends IComType ? {
  type?: t
  readonly formName: string
  IProps?: IComProps[t]
  itemProps?: FormItemGiProps
  slot?: t extends 'upload' ? () => VNode : never
  radioOptions?: t extends 'radio' ? IRadioOptions[] : never
} : never
  : never

export const JsonFormProps = {
  formProps: {
    default: () => ({}),
    type: Object as PropType<FormProps & GridProps>,
  },
  jsonOptions: {
    default: () => [],
    type: Array as PropType<IJsonType[]>,
  },
  model: {
    default: () => ({}),
    type: Object as PropType<Record<string, any>>,
  },
  rules: {
    default: () => ({}),
    type: Object as PropType<FormRules>,
  },
}
export type IJsonFormProps = ExtractPropTypes<typeof JsonFormProps>
