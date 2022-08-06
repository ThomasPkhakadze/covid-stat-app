import { createApp } from 'vue'
import App from './App.vue'
import store from '../store/index.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import './assets/main.css'

createApp(App).use(store).mount('#app')
