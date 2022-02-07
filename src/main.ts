import { createSSRApp } from 'vue'
import { createRouter as router } from './router'
import App from './App.vue'
import './style/toot'

export const createApp = () => {
  const app = createSSRApp(App)
  app.use(router)
  return { app, router }
}
