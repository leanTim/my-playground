import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import { convertEnv } from '@/utils'
// // 环境变量中获取的数据都是string，
// const env = convertEnv(import.meta.env)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
