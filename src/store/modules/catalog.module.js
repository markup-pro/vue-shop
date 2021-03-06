import axios from '@/axios/base'
import { transformDataFb } from '@/utils/transform-data-fb'

export default {
  namespaced: true,
  state () {
    return {
      products: [],
      product: null
    }
  },
  mutations: {
    setProducts (state, requests) {
      state.products = requests
    },
    setProduct (state, requests) {
      state.product = requests
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
    async product ({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`products/${id}.json`)
        if (data) {
          commit('setProduct', { ...data, id: id })
        }
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    products: (state) => (filter) => {
      let { products } = state

      if (filter.category) {
        products = state.products.filter((el) => {
          if (filter.category && el.category === filter.category) {
            return true
          }
        })
      }
      if (filter.search) {
        products = products.filter((el) => {
          return ~el.title.toLowerCase().indexOf(filter.search.toLowerCase())
        })
      }
      return products.sort((a, b) => (a.count === 0) - (b.count === 0))
    },
    product (state) {
      return state.product
    }
  }
}
