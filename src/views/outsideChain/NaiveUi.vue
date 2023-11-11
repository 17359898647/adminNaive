<script setup lang="ts">
definePage({
  meta: {
    isIframe: true,
    isOrder: 2,
    isTitle: 'Naive Ui',
    lineIcon: 'icon-logos:naiveui',
  },
})
const src = `https://www.naiveui.com/zh-CN/${isDark.value ? 'dark' : 'light'}`
</script>

<template>
  <IframeCom :src="src" />
</template>
