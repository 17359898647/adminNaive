import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRefs } from '@vueuse/core'
import { forEach, isFunction, map } from 'lodash-es'
import type { ColorPickerProps, DatePickerProps, InputProps, RadioGroupProps, SelectProps, SliderProps, UploadProps } from 'naive-ui'
import {
  NColorPicker,
  NDatePicker,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NRadio,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSlider,
  NUpload,
} from 'naive-ui'
import type { Ref } from 'vue'
import type { IJsonType } from '@/components/JsonForm/JsonFormType'
import { JsonFormProps } from '@/components/JsonForm/JsonFormType'

type GetKey<T extends readonly any[], K extends keyof T[number]> = T[number][K]

export function JsonFormHelp(JsonOptions: MaybeRefOrGetter<IJsonType[]>) {
  const extract = (options: MaybeRefOrGetter<IJsonType[]>) => {
    const result: Record<string, any> = {}
    forEach(toValue(options), (option) => {
      const { formName, props = {}, type } = option
      const { defaultValue, value } = props as any
      result[formName] = (defaultValue || value) ?? (type === 'upload' ? [] : null)
    })
    return result as Record<GetKey<IJsonType[], 'formName'>, any>
  }
  const _JsonOptions = ref(toValue(JsonOptions)) as Ref<IJsonType[]>
  const scope = effectScope()
  scope.run(() => {
    isRef(JsonOptions) && watch(JsonOptions, (newVal) => {
      _JsonOptions.value = newVal
    })
  })
  tryOnScopeDispose(() => {
    scope.stop()
  })
  return {
    model: ref(extract(_JsonOptions)),
    JsonOptions: _JsonOptions,
  }
}
export const JsonForm = defineComponent({
  name: 'JsonForm',
  props: JsonFormProps,
  setup(props) {
    const { jsonOptions, model, formProps, rules } = toRefs(props)
    return () => (
      <NForm
        model={model.value}
        rules={rules.value}
        {...formProps.value}
      >
        <NGrid
          xGap={16}
          {...formProps.value}
        >
          {
            map(jsonOptions.value, (item) => {
              const {
                formName,
                itemProps,
                props: moduleProps = {},
                type,
                slot,
                radioOptions,
              } = item
              return (
                <NFormItemGi
                  path={formName}
                  span={24}
                  {...itemProps}
                >
                  {
                    () => {
                      switch (type) {
                        case 'input': {
                          return (
                            <NInput
                              {...(moduleProps as InputProps)}
                              v-model:value={toValue(model)[formName]}
                            />
                          )
                        }
                        case 'select':{
                          return (
                            <NSelect
                              {...(moduleProps as SelectProps)}
                              v-model:value={toValue(model)[formName]}
                            />
                          )
                        }
                        case 'date':{
                          return (
                            <NDatePicker
                              {...(moduleProps as DatePickerProps)}
                              class='w-full'
                              v-model:value={toValue(model)[formName]}
                            />
                          )
                        }
                        case 'slider':{
                          return (
                            <NSlider
                              {...(moduleProps as SliderProps)}
                              v-model:value={toValue(model)[formName]}
                            />
                          )
                        }
                        case 'upload':{
                          return (
                            <NUpload
                              defaultUpload={false}
                              {...(moduleProps as UploadProps)}
                              v-model:fileList={toValue(model)[formName]}
                            >
                              {
                                isFunction(slot) ? slot() : slot
                              }
                            </NUpload>
                          )
                        }
                        case 'color':{
                          return (
                            <NColorPicker
                              {...(moduleProps as ColorPickerProps)}
                              v-model:value={toValue(model)[formName]}
                            />
                          )
                        }
                        case 'radio': {
                          return (
                            <NRadioGroup
                              {...(moduleProps as RadioGroupProps)}
                              v-model:value={toValue(model)[formName]}
                            >
                              {
                                map(radioOptions, (option) => {
                                  const {
                                    label,
                                    value,
                                    isButton = false,
                                    onUpdateChecked,
                                  } = option
                                  const _isFunction = isFunction(label)
                                  return (
                                    isButton
                                      ? (
                                        <NRadioButton
                                          key={value}
                                          label={_isFunction ? undefined : label as string}
                                          value={value}
                                          onUpdateChecked={onUpdateChecked}
                                        >
                                          {
                                            _isFunction ? label() : null
                                          }
                                        </NRadioButton>
                                        )
                                      : (
                                        <NRadio
                                          key={value}
                                          label={label as string}
                                          value={value}
                                          onUpdateChecked={onUpdateChecked}
                                        />
                                        )
                                  )
                                })
                              }
                            </NRadioGroup>
                          )
                        }
                      }
                    }
                  }
                </NFormItemGi>
              )
            })
          }
        </NGrid>
      </NForm>
    )
  },
})
