<script setup lang="ts">
definePage({
  meta: {
    isTitle: 'Naive Ui',
    lineIcon: 'icon-logos:naiveui',
    isIframe: true,
    isOrder: 2,
  },
})
const src = `https://www.naiveui.com/zh-CN/${isDark.value ? 'dark' : 'light'}`
</script>

<template>
  <IframeCom :src="src" />
</template>
