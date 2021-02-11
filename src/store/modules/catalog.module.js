import axios from '@/axios/base'

export default {
  namespaced: true,
  state () {
    return {
      products: [],
      product: null,
      categories: []
    }
  },
  mutations: {
    setProducts (state, requests) {
      state.products = requests
    },
    setProduct (state, requests) {
      state.product = requests[0]
    },
    setCategories (state, requests) {
      state.categories = requests
    }
  },
  actions: {
    async products ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('products')

        commit('setProducts', data)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async product ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.get(`products/?id=${payload}`)

        commit('setProduct', data)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async categories ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('categories')

        commit('setCategories', data)
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
      console.log(filter)
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
    },
    categories (state) {
      return state.categories
    }
  }
}
