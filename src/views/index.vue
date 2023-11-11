<script lang="ts" setup>
definePage({
  meta: {
    isAffix: true,
    isOrder: Number.NEGATIVE_INFINITY,
    isTitle: '首页',
  },
})
const router = useRouter()
function logout() {
  localStorage.removeItem('token')
  router.push({
    name: '/login-[redirect]',
    params: {
      redirect: 'Root',
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
