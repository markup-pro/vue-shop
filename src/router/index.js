import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'
import Shop from '../views/Shop.vue'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
//
// router.beforeEach((to, from, next) => {
//   const requireAuth = to.meta.auth
//
//   if (requireAuth && store.getters['auth/isAuthenticated']) {
//     next()
//   } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
//     next('/auth?message=auth')
//   } else {
//     next()
//   }
// })

export default router
