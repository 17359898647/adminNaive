<script lang="ts" setup >
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const themeStore = useThemeStore()
const { themeDefault } = storeToRefs(themeStore)
onUpdated(() => {
  console.log('themeDefault', themeDefault)
})
</script>

<template >
  <NConfigProvider
    class="relative overflow-hidden size-full"
    :dateLocale="dateZhCN"
    :inlineThemeDisabled="true"
    :locale="zhCN"
    :theme="isDark ? darkTheme : null"
    :themeOverrides="themeDefault"
  >
    <RouterView/>
    <NGlobalStyle/>
  </NConfigProvider>
</template>
