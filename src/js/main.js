import { createApp } from 'vue'
import App from '../views/App.vue'
import router from './router.js'
import cookie from './cookie'
import storage from './storage'

createApp(App).use(router).use(cookie).use(storage).mount('#app')
