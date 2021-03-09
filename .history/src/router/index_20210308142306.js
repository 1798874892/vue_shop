import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'

Vue.use(Router)

const routes = [
  { path: '/login', component: Login }
]

const router = new Router({
  routes
})

export default router
