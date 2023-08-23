<script lang="tsx" setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <NConfigProvider
    class="relative h-full w-full overflow-hidden"
    :dateLocale="dateZhCN"
    :inlineThemeDisabled="true"
    :locale="zhCN"
    :theme="isDark ? darkTheme : null"
  >
    <router-view />
    <NGlobalStyle />
  </NConfigProvider>
</template>
