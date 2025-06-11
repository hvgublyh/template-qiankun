import './public-path'
import { store as commonStore } from 'common'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
// 只导入路由配置
import { routes } from './router'
import './style.css'
import App from './App.vue'
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps
} from 'vite-plugin-qiankun/dist/helper'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Sentry from '@sentry/vue';

let instance: ReturnType<typeof createApp> | null = null
let history: ReturnType<typeof createWebHistory> | null = null
let router = null
const __POWERED_BY_QIANKUN__ = qiankunWindow.__POWERED_BY_QIANKUN__

function render(props: any = {}) {
  const { container, routerBase } = props || {}
  // 在渲染函数中创建路由器
  instance = createApp(App)
  // 如果是 qiankun 环境，使用传入的 routerBase
  history = createWebHistory(__POWERED_BY_QIANKUN__ ? routerBase : '/')
  router = createRouter({
    history,
    routes
  })
  // 添加导航守卫
  router.beforeEach((to, from, next) => {
    if (to.matched.length > 0) {
      next()
    } else {
      next('/error')
    }
  })

  router.afterEach((to) => {
    if (to.meta?.title) {
      document.title = to.meta.title as string
    }
  })
  instance.use(router)
  instance.use(store)
  instance.use(ElementPlus);
  instance.mount(container ? container.querySelector('#app') : '#app')
  // 初始化 Sentry
  Sentry.init({
    app: instance,
    dsn: 'https://ca4564fc443d2f2a571a5b91711ce756@o4509479427833856.ingest.de.sentry.io/4509479439302736', // 替换为你的 DSN
    // dsn: 'https://1ac592830c27cdf6179f3a52d3acee50@o4509479427833856.ingest.de.sentry.io/4509479431635024', // 替换为你的 DSN
    sendDefaultPii: true,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration()
    ],
    // Tracing
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0
  });

  return { instance, router, store }
}


// 导出 qiankun 生命周期钩子
export async function bootstrap() {
  console.log('[vue3] app bootstraped')
}

const initQianKun = () => {
  console.warn('initQianKun')
  renderWithQiankun({
    mount(props) {
      console.warn('mount')
      // 注册全局状态
      commonStore.globalRegister(store, props)
      render(props);
    },
    bootstrap() {
      console.warn('bootstrap')
    },
    unmount() {
      console.warn('unmount')
      if (instance) {
        instance.unmount()
      }
      history && history.destroy() // 不卸载  router 会导致其他应用路由失败
      router = null
      instance = null
    },
    update: function (props: QiankunProps): void | Promise<void> {
      console.warn('update')
      throw new Error('Function not implemented.');
    }
  })
}

__POWERED_BY_QIANKUN__ ? initQianKun() : render()
