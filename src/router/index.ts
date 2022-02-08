import { 
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory } from 'vue-router'

export const routes = [{
  path: '/',
  component: () => import('./../views/index.vue'),
  meta: {
    title: '首页'
  },
  children: [{
    path: '/index',
    component: () => import('./../views/home.vue'),
    meta: {
      title: '首页1'
    }
  }]
}, {
  path: '/adout',
  component: () => import('./../views/about.vue'),
  meta: {
    title: '我的'
  }
}]

export const createRouter = _createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes
})