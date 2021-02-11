import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
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
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: 'product' */ '../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    component: () => import(/* webpackChunkName: 'admin' */'../views/admin/Admin.vue'),
    meta: {
      layout: 'admin',
      auth: true
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
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/')
    store.commit('auth/showAuth', true)
  } else {
    next()
  }
})

export default router
