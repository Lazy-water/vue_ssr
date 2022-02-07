import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  component: () => import('./../views/index.vue')
}, {
  path: '/adout',
  component: () => import('./../views/about.vue')
}]

export default createRouter({
  history: createWebHistory(),
  routes
})