import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import Liste from './components/EntrepriseListe.vue'
import Ajout from './components/EntrepriseAjout.vue'
import Edite from './components/EntrepriseEdite.vue'
import Consulte from './components/EntrepriseConsulte.vue'

import './assets/main.css'

const routes = [
    { path: '/', component: Liste },
    { path: '/ajout', component: Ajout },
    { path: '/:id', component: Consulte },
    { path: '/edite/:id', component: Edite },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})
export default router
createApp(App).use(router).mount('#app')
