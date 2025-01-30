import { createApp } from 'vue'
import './global.scss'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(VueQueryPlugin)

app.mount('#app')
