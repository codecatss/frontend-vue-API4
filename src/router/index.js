import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue')
    }, 
    {
      path: '/auth',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/client/cadastro',
      name: 'CasCli',
      component: () => import('../views/CadCli.vue')
    }
  ]
})

export default router
