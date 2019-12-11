import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



export default [{
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Home.vue'),
        meta: {
            requeresAuth: true
        }

    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/fazer-login',
        name: 'login',
        component: () => import('@/views/User/HandleUser.vue')
    },
    {
        path: '/perfil-barbearia',
        name: 'profile-barber',
        component: () => import('@/components/Barber/ProfileBarber/ProfileBarber.vue')
    },
    {
        path: '/lista-barbeiros',
        name: 'history-client',
        component: () => import('@/components/HistoryClient/HistoryClient.vue')
    },
    {
        path: '/perfil-client',
        name: 'client-profile',
        component: () => import('@/components/Client/ClientProfile.vue')
    },

]