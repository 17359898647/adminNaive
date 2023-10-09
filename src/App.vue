<script lang="ts" setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { enhanceAutoRouter } from '@/views/enhanceAutoRouter'

const themeStore = useThemeStore()
const { themeDefault } = storeToRefs(themeStore)
onUpdated(() => {
  console.log('themeDefault', themeDefault, enhanceAutoRouter)
})
</script>

<template>
  <NConfigProvider
    class="relative h-full w-full overflow-hidden"
    :dateLocale="dateZhCN"
    :inlineThemeDisabled="true"
    :locale="zhCN"
    :theme="isDark ? darkTheme : null"
    :themeOverrides="themeDefault"
  >
    <RouterView />
    <NGlobalStyle />
  </NConfigProvider>
</template>
