<script lang="ts" setup>
definePage({
  meta: {
    isAffix: true,
    isTitle: '首页',
    lineIcon: 'icon-material-symbols:home',
  },
})
const router = useRouter()
function logout() {
  // localStorage.removeItem('token')
  router.push({
    name: '/about',
    params: {
      di: '123',
      id: '123',
    },
  })
}
</script>

<template>
  <NCard title="home">
    <NInput class="mb-2" />
    <NButton @click="logout">
      退出登录
    </NButton>
  </NCard>
</template>
