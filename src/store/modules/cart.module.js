import axios from '@/axios/cart'
import { findIdx } from '@/utils/findIdx'

export default {
  namespaced: true,
  state () {
    return {
      products: []
    }
  },
  mutations: {
    setProducts (state, requests) {
      state.products = requests
    },
    updateProduct (state, requests) {
      const idx = findIdx(state.products, 'id', requests.id)
      state.products[idx].quantity = requests.quantity
    },
    removeProduct (state, requests) {
      const idx = findIdx(state.products, 'id', requests.id)
      state.products.splice(idx, 1)
    }
  },
  actions: {
    async products ({ commit, dispatch }, payload) {
      const filter = Object.keys(payload).map((el) => `id=${el}`).join('&')
      try {
        const { data } = await axios.get(`products?${filter}`, payload)

        const result = data.map(el => {
          return {
            quantity: payload[el.id],
            ...el
          }
        })
        commit('setProducts', result)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async updateProduct ({ commit }, payload) {
      commit('updateProduct', payload)
    },
    async removeProduct ({ commit }, payload) {
      commit('removeProduct', payload)
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    },
    getTotalPrice (state) {
      let totalPrice = 0
      state.products.forEach(el => {
        totalPrice += el.quantity * el.price
      })
      return totalPrice
    }
  }
}
