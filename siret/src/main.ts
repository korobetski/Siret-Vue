import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import Liste from './components/EntrepriseListe.vue'
import Ajout from './components/EntrepriseAjout.vue'

import './assets/main.css'

const routes = [
    { path: '/', component: Liste },
    { path: '/ajout', component: Ajout },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
export default router
createApp(App).use(router).mount('#app')
