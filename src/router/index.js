import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
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
    component: () => import(/* webpackChunkName: 'cart' */ '../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: 'order' */ '../views/Order.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: 'product' */ '../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: 'personal' */ '../views/Personal.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    component: () => import(/* webpackChunkName: 'admin' */'../views/admin/Admin.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import(/* webpackChunkName: 'admin-products' */'../views/admin/Products.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import(/* webpackChunkName: 'admin-categories' */'../views/admin/Categories.vue')
      }
    ]
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: 'not-found' */ '../views/NotFound.vue'),
    meta: {
      layout: 'error',
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const requireAuth = to.meta.auth
  const admin = to.meta.admin
  const user = store.getters['auth/user']

  if (requireAuth && admin && user.role === 'user' && isAuthenticated) {
    next('/')
  } else if (requireAuth && isAuthenticated) {
    next()
  } else if (requireAuth && !isAuthenticated) {
    next('/')
    store.commit('auth/showAuth', true)
  } else {
    next()
  }
})

export default router
