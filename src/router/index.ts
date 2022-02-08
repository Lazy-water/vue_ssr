import { 
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory } from 'vue-router'

export const routes = [{
  path: '/',
  component: () => import('./../views/index.vue')
}, {
  path: '/about',
  component: () => import('./../views/about.vue')
}]

export const createRouter = _createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes
})