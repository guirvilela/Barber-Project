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
        path: '/perfil-barbearia/configuracoes',
        name: 'barber-config',
        component: () => import('@/components/Barber/ProfileBarber/ConfigBarber/ConfigBarber.vue')
    },
    {
        path: '/lista-barbeiros',
        name: 'history-client',
        component: () => import('@/components/HistoryClient/HistoryClient.vue')
    },
    {
        path: '/criar-barbearia',
        name: 'before-create',
        component: () => import('@/components/Barber/BeforeCreate/BeforeCreate.vue')
    },
    {
        path: '/cadastrar-barbearia',
        name: 'barber-register',
        component: () => import('@/components/Barber/RegisterBarber/RegisterBarber.vue')
    },
    {
        path: '/cadastro-barbeiro',
        name: 'barber-create',
        component: () => import('@/components/Barber/RegisterHair/RegisterHair.vue')
    },
    {
        path: '/perfil-cliente',
        name: 'client-profile',
        component: () => import('@/components/Client/ClientProfile.vue'),

        children: [{
                path: '/perfil-cliente/dados-pessoais',
                name: 'client-data',
                component: () => import('@/components/Client/components/DataClient/DataClient.vue')
            },
            {
                path: '/perfil-cliente/configuracoes',
                name: 'client-config',
                component: () => import('@/components/Client/components/Config/Config.vue'),

                children: [{
                        path: '/perfil-cliente/configuracoes/alterar-nome',
                        name: 'change-name',
                        component: () => import('@/components/Client/components/Config/components/ChangeName/ChangeName.vue')
                    },
                    {
                        path: '/perfil-cliente/configuracoes/alterar-email',
                        name: 'change-email',
                        component: () => import('@/components/Client/components/Config/components/ChangePass/ChangePass.vue')
                    }
                ]
            }
        ]
    },

]