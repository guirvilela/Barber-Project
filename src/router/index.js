import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')

  },
  {
    path: '/fazer-login',
    name: 'login',
    component: () => import('@/components/Home/UserLogin/Login.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router