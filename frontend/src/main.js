import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './css/tailwind.css'
import LaravelVuePagination from "laravel-vue-pagination"
import router from './routes/routes'
import VueSweetalert2 from "vue-sweetalert2"

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(VueSweetalert2)
app.component('Pagination', LaravelVuePagination)
app.mount('#app')
