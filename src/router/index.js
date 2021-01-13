import { createRouter, createWebHistory } from 'vue-router'
import pipeline from './pipeline'
import AuthMiddleware from './middleware/AuthMiddleware'
import AccessMiddleware from './middleware/AccessMiddleware'
import IsLoggedMiddleware from './middleware/IsLoggedMiddleware'
import store from '../store'

const routes = [
  //APPLICATION
  {
    path: '/',
    name: 'app.desktop',
    component: () => import('@/views/App/Desktop.vue'),
    meta: {
      title: 'Рабочий стол',
      layout: 'App',
      middleware: [AuthMiddleware]
    },
  },
  {
    path: '/app/patient-card/cards/:id',
    name: 'get.card',
    component: () => import('../views/App/Card'),
    meta: {
      title: 'Карта пациента',
      layout: 'App',
      middleware: [AuthMiddleware, AccessMiddleware],
      permission: 'GET_CARD'
    }
  },
  {
    path: '/app/patient-card/cards',
    name: 'get.cards',
    component: () => import('../views/App/Cards'),
    meta: {
      title: 'Поиск карт',
      layout: 'App',
      middleware: [AuthMiddleware, AccessMiddleware],
      permission: 'GET_CARDS'
    },
  },
  // ADMINISTRATION
  {
    path: '/admin',
    name: 'adminDesktop',
    component: () => import('@/views/Admin/Desktop.vue'),
    meta: { title: 'Рабочий стол', layout: 'Admin' }
  },
  // CORE
  {
    path: '/auth/doAuth',
    name: 'core.authenticate',
    component: () => import('@/views/Core/Auth.vue'),
    meta: {
      title: 'Авторизация',
      layout: 'Auth',
      middleware: [IsLoggedMiddleware]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store,
    router
  }


  return middleware[0]({
    ...context,
    next: pipeline(context, middleware, 1)
  })

})

export default router
