<script lang="tsx" setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const themeStore = useThemeStore()
const { themeDefault } = storeToRefs(themeStore)
onUpdated(() => {
  console.log('themeDefault', themeDefault)
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
    <router-view />
    <NGlobalStyle />
  </NConfigProvider>
</template>
