import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'appDesktop',
    component: () => import('@/views/App/Desktop.vue'),
    meta: { title: 'Рабочий стол', layout: 'App' }
  },
  {
    path: '/app/patient-card/cards/:id',
    name: 'getCard',
    component: () => import('../views/App/Card'),
    meta: { title: 'Карта пациента', layout: 'App' }
  },
  {
    path: '/app/patient-card/cards',
    name: 'getCards',
    component: () => import('../views/App/Cards'),
    meta: { title: 'Поиск карт', layout: 'App' }
  },
  {
    path: '/admin',
    name: 'adminDesktop',
    component: () => import('@/views/Admin/Desktop.vue'),
    meta: { title: 'Рабочий стол', layout: 'Admin' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
