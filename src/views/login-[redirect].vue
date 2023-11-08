<script setup lang="ts">
definePage({
  meta: {
    isHidden: true,
    isTitle: '登录',
  },
})
const route = useRoute('/login-[redirect]')
const router = useRouter()
function login() {
  const { redirect = 'Root' } = route.params
  localStorage.setItem('token', '123')
  router.push({
    name: (redirect as any),
  })
}
</script>

<template>
  <div class="flex justify-center size-full">
    <NCard>
      <NButton @click="login">
        <span>登录</span>
      </NButton>
    </NCard>
  </div>
</template>

<style scoped>

</style>
