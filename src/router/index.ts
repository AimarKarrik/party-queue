import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPanel',
      component: () => import('../views/MainPanel.vue')
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: () => import('../views/AdminPanel.vue')
    },
    {
      path: '/join',
      name: 'JoinView',
      component: () => import('../views/JoinView.vue')
    },
  ]
})

export default router
