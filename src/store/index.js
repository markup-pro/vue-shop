import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import cart from './modules/cart.module'
import catalog from './modules/catalog.module'
import admin from './modules/admin.module'
import personal from './modules/personal.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state () {
    return {
      message: null,
      sidebar: false
    }
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = null
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth,
    cart,
    catalog,
    admin,
    personal
  }
})
