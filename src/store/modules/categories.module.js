import axios from '@/axios/base'
import { transformDataFb } from '@/utils/transform-data-fb'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  mutations: {
    setCategories (state, requests) {
      state.categories = requests
    },
    updateCategories (state, requests) {
      state.categories.push(requests)
    }
  },
  actions: {
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
        const { data } = await axios.post('categories.json', payload)
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
    categories (state) {
      return state.categories
    }
  }
}
