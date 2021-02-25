import axios from '@/axios/base'
import store from '@/store'
import router from '@/router'
import { findIdx } from '@/utils/find-idx'
import { isEmptyObj } from '@/utils/is-empty-obj'
const CART_MODEL_KEY = 'cart-model'

export default {
  namespaced: true,
  state () {
    return {
      cartModel: JSON.parse(localStorage.getItem(CART_MODEL_KEY)) ?? {},
      products: []
    }
  },
  mutations: {
    setProducts (state, requests) {
      state.products = requests
    },
    removeProduct (state, id) {
      const idx = findIdx(state.products, 'id', id)
      state.products.splice(idx, 1)
    },
    updateCartModel (state, requests) {
      if (requests.count === 0) {
        delete state.cartModel[requests.id]
      } else {
        state.cartModel[requests.id] = requests.count
      }
      localStorage.setItem(CART_MODEL_KEY, JSON.stringify(state.cartModel))
    },
    clearCart (state) {
      state.cartModel = {}
      state.products = []
      localStorage.removeItem(CART_MODEL_KEY)
    }
  },
  actions: {
    async products ({ commit, state }) {
      const idArr = Object.keys(state.cartModel)
      if (!isEmptyObj(state.cartModel)) {
        const products = await Promise.all(idArr.map(async (id) => {
          const { data } = await axios.get(`products/${id}.json`)
          return { id, ...data }
        }))
        commit('setProducts', products)
      }
    },
    updateCartModel ({ commit, state }, payload) {
      if (payload.count === 0 && state.products.length > 0) {
        commit('removeProduct', payload.id)
      }
      commit('updateCartModel', payload)
    },
    removeProduct ({ commit }, id) {
      commit('removeProduct', id)
      commit('updateCartModel', { id, count: 0 })
    },
    async updateCountProducts ({ state }) {
      state.products.forEach(el => {
        const newCount = el.count - state.cartModel[el.id]
        axios.patch(`products/${el.id}/.json}`, { count: newCount })
      })
    },
    async order ({ commit, state, dispatch }) {
      const user = store.getters['auth/user']
      const orderProducts = state.products.map(el => {
        return {
          ...el,
          count: state.cartModel[el.id]
        }
      })
      await axios.post(`orders/${user.id}.json`, {
        date: Date.now(),
        list: orderProducts
      })
      dispatch('updateCountProducts')
      commit('clearCart')
      router.push('/thanks')
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    productCountInCart: (state) => (id) => {
      return !isEmptyObj(state.cartModel) && state.cartModel[id] ? state.cartModel[id] : 0
    },
    productCountAllInCart (state) {
      const { cartModel } = state
      let count = 0

      if (!isEmptyObj(cartModel)) {
        for (const key in cartModel) {
          count += cartModel[key]
        }
      }

      return count
    },
    totalPrice (state) {
      let totalPrice = 0
      state.products.forEach(el => {
        totalPrice += el.price * state.cartModel[el.id]
      })
      return totalPrice
    }
  }
}
