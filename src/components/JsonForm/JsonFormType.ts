import type { ColorPickerProps, DatePickerProps, FormItemGiProps, FormProps, FormRules, GridProps, InputProps, RadioGroupProps, SelectProps, SliderProps, UploadProps } from 'naive-ui'
import type { ExtractPropTypes, PropType, VNode } from 'vue'

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
export interface IRadioOptions {
  label: string | (() => VNode)
  value: any
  isButton?: boolean
}
export type IJsonType<T extends IComType = IComType> = T extends infer t ? t extends IComType ? {
  type?: t
  readonly formName: string
  props?: IComProps[t]
  itemProps?: FormItemGiProps
  slot?: t extends 'upload' ? () => VNode : never
  radioOptions?: t extends 'radio' ? IRadioOptions[] : never
} : never
  : never

export const JsonFormProps = {
  jsonOptions: {
    type: Array as PropType<IJsonType[]>,
    default: () => [],
  },
  formProps: {
    type: Object as PropType<FormProps & GridProps>,
    default: () => ({}),
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
}
export type IJsonFormProps = ExtractPropTypes<typeof JsonFormProps>
