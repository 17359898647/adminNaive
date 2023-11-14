<script setup lang="ts" >
import { useRouteParams } from '@vueuse/router'

definePage({
  meta: {
    isHidden: true,
    isTitle: '登录',
  },
})
const router = useRouter()
const redirect = useRouteParams<any>('redirect', 'Root', {
  transform: String,
})
function login() {
  console.log('redirect', redirect.value)
  localStorage.setItem('token', '123')
  router.push({
    name: '/',
  })
}
</script>

<template >
  <div class="flex justify-center size-full" >
    <NCard >
      <NButton @click="login" >
        <span >登录</span>
      </NButton>
    </NCard>
  </div>
</template>

<style scoped >

</style>
