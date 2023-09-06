<script lang="tsx" setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const themeStore = useThemeStore()
const { themeDefault } = storeToRefs(themeStore)
const a = 123
const b = 321
console.log(a, b)
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
