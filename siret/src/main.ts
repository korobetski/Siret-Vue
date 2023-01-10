import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import Liste from './components/EntrepriseListe.vue'
import Ajout from './components/EntrepriseAjout.vue'
import Edite from './components/EntrepriseEdite.vue'
import Consulte from './components/EntrepriseConsulte.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

import './assets/main.css'

const routes = [
    { path: '/', component: Liste },
    { path: '/ajout', component: Ajout, meta: { needToken: true } },
    { path: '/:id', component: Consulte },
    { path: '/edite/:id', component: Edite, meta: { needToken: true } },
    { path: '/login', component: Login, name:'login' },
    { path: '/register', component: Register, name:'register' },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name == 'login' && localStorage.getItem('token')) {
        next({ path: '/' })
    }
    else if (to.meta.needToken && !localStorage.getItem('token')) {
        next({ path: '/login' })
    }
    else {
        next()
    }  
})
export default router
createApp(App).use(router).mount('#app')
