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

let instance: any = null

function render(props: any = {}) {
  const { container, routerBase } = props || {}
  // 在渲染函数中创建路由器
  const router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? routerBase : '/'),
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

  const app = createApp(App)
  app.use(router)
  app.use(store)

  instance = app.mount(container ? container.querySelector('#app') : '#app')

  return { app, router, store }
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
      render(props);
    },
    bootstrap() { 
      console.warn('bootstrap')
    },
    unmount() {
      console.warn('unmount')
      instance.unmount();
    },
    update: function (props: QiankunProps): void | Promise<void> {
      console.warn('update')
      throw new Error('Function not implemented.');
    }
  })
}

export async function mount(props: any) {
  console.log('[vue3] props from main framework', props)

  // 注册全局状态
  commonStore.globalRegister(store, props)

  initQianKun()
}

export async function unmount() {
  // Vue 3 的卸载方式
  if (instance) {
    instance.unmount()
    instance = null
  }
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()
