import axios from '@/axios/base'
import { findIdx } from '@/utils/findIdx'
import { isEmptyObj } from '@/utils/isEmptyObj'

export default {
  namespaced: true,
  state () {
    return {
      cartModel: {},
      products: []
    }
  },
  mutations: {
    setProducts (state, requests) {
      state.products = requests
    },
    removeProduct (state, requests) {
      const idx = findIdx(state.products, 'id', requests.id)
      state.products.splice(idx, 1)
    },
    updateCartModel (state, requests) {
      if (requests.count === 0) {
        delete state.cartModel[requests.id]
      } else {
        state.cartModel[requests.id] = requests.count
      }
    }
  },
  actions: {
    async products ({ commit, state, dispatch }) {
      const filter = Object.keys(state.cartModel).map((el) => `id=${el}`).join('&')
      try {
        const { data } = await axios.get(`products?${filter || 'id='}`)
        commit('setProducts', data)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async removeProduct ({ commit }, payload) {
      commit('removeProduct', payload)
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    productCountInCart: (state) => (id) => {
      let count = 0

      if (!isEmptyObj(state.cartModel)) {
        if (typeof state.cartModel[id] !== 'undefined') {
          count = state.cartModel[id]
        }
      }

      return count
    },
    productCountAllInCart (state) {
      const obj = state.cartModel
      let count = 0

      if (!isEmptyObj(state.cartModel)) {
        for (const key in obj) {
          count += obj[key]
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
