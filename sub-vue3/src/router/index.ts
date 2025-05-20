import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@/components/HelloWorld.vue'),
    meta: {
      title: 'HelloWorld'
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error.vue'),
    meta: {
      title: 'error'
    }
  },
]
