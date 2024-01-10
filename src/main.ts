import { includes } from 'lodash-es'
import { createApp } from 'vue'
import App from '@/App.vue'
import { LoadingFn } from '@/components/LoadingView/LoadingView'
import { installDirective } from '@/directive'
import { setupAssets } from '@/plugins/setupAssets'
import { installRouter } from '@/router'
import { installPinia } from '@/store'

async function setupApp() {
  const app = createApp(App)
  app.config.warnHandler = (msg, instance, trace) => {
    if (includes(msg, 'data-v-inspector'))
      return
    console.warn(msg, instance, trace)
  }
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
  setupAssets()
  installPinia(app)
  installDirective(app)
  const loadingApp = await LoadingFn({
    isTitle: '加载中',
    timeOut: 0.3,
  })
  await installRouter(app)
  loadingApp.unmount()
  app.mount('#app')
}

setupApp().then(() => {
  console.log('页面加载完成')
})
