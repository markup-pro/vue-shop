import axios from '@/axios/base'
import store from '@/store'
import { transformDataFb } from '@/utils/transform-data-fb'

export default {
  namespaced: true,
  state () {
    return {
      orders: []
    }
  },
  mutations: {
    setOrders (state, requests) {
      state.orders = requests
    }
  },
  actions: {
    async orders ({ commit, dispatch }) {
      try {
        const id = store.getters['auth/user'].id
        const { data } = await axios.get(`orders/${id}.json`)
        commit('setOrders', data ? transformDataFb(data) : [])
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    orders (state) {
      return state.orders
    }
  }
}
