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

let instance: ReturnType<typeof createApp> | null = null
let history: ReturnType<typeof createWebHistory> | null = null
let router = null
const __POWERED_BY_QIANKUN__ = qiankunWindow.__POWERED_BY_QIANKUN__

function render(props: any = {}) {
  const { container, routerBase } = props || {}
  // 在渲染函数中创建路由器
  instance = createApp(App)
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
