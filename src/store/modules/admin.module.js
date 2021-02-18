import axios from '@/axios/base'
import store from '@/store'
import { findIdx } from '@/utils/find-idx'
import { transformDataFb } from '@/utils/transform-data-fb'

export default {
  namespaced: true,
  state () {
    return {
      products: [],
      categories: []
    }
  },
  mutations: {
    setProducts (state, requests) {
      state.products = requests
    },
    updateProducts (state, requests) {
      state.products.push(requests)
    },
    removeProduct (state, requests) {
      const idx = findIdx(state.products, 'id', requests.id)
      state.products.splice(idx, 1)
    },
    setCategories (state, requests) {
      state.categories = requests
    },
    updateCategories (state, requests) {
      state.categories.push(requests)
    }
  },
  actions: {
    async products ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('products.json')
        commit('setProducts', data ? transformDataFb(data) : [])
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async productCreate ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post(`products.json?auth=${store.getters['auth/token']}`, payload)
        commit('updateProducts', {
          id: data.name,
          ...payload
        })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async productRemove ({ commit, dispatch }, id) {
      try {
        await axios.delete(`products/${id}.json?auth=${store.getters['auth/token']}`)
        commit('removeProduct', { id })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async categories ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('categories.json')
        commit('setCategories', data ? transformDataFb(data) : [])
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async categoryCreate ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post(`categories.json?auth=${store.getters['auth/token']}`, payload)
        commit('updateCategories', {
          id: data.name,
          ...payload
        })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    }
  },
  getters: {
    products (state) {
      return state.products.sort((a, b) => (a.count === 0) - (b.count === 0))
    },
    categories (state) {
      return state.categories
    }
  }
}
