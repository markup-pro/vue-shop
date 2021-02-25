import axios from '@/axios/base'
import { findIdx } from '@/utils/find-idx'
import { transformDataFb } from '@/utils/transform-data-fb'

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
    addProduct (state, requests) {
      state.products.push(requests)
    },
    updateProduct (state, requests) {
      const idx = findIdx(state.products, 'id', requests.id)
      state.products.splice(idx, 1, requests.values)
    },
    removeProduct (state, requests) {
      const idx = findIdx(state.products, 'id', requests.id)
      state.products.splice(idx, 1)
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
        const { data } = await axios.post('products.json', payload)
        commit('addProduct', {
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
    async productUpdate ({ commit, dispatch }, payload) {
      console.log(payload)
      try {
        const { data } = await axios.patch(`products/${payload.id}.json`, payload.values)
        commit('updateProduct', {
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
        await axios.delete(`products/${id}.json`)
        commit('removeProduct', { id })
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
    }
  }
}
