import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './style/toot'

const APP = createApp(App)

APP.use(router)

APP.mount('#app')
