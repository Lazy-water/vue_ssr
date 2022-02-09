import { createSSRApp } from 'vue'
import { createRouter as router } from './router'
import { store } from './store'
import App from './App.vue'
import './style/toot'

export const createApp = () => {
  const app = createSSRApp(App)
  app.use(store).use(router)
  return { app, router, store }
}
