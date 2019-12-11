import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home.vue')

  },
  {
    path: '/fazer-login',
    name: 'login',
    component: () => import('@/views/User/HandleUser.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router