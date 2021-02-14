import axiosAuth from '@/axios/auth'
import axiosBase from '@/axios/base'
import { error } from '@/utils/error'
const TOKEN_KEY = 'jwt-token'
const USER_KEY = 'user-role'

export default {
  namespaced: true,
  state () {
    return {
      showAuth: false,
      token: localStorage.getItem(TOKEN_KEY) ?? null,
      user: JSON.parse(localStorage.getItem(USER_KEY)) ?? null
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setUser (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    logout (state) {
      state.token = false
      state.user = false
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
    },
    showAuth (state, payload) {
      state.showAuth = payload
    }
  },
  actions: {
    async setRole ({ commit, dispatch }, payload) {
      try {
        const url = `users/${payload.localId}.json?auth=${payload.idToken}`
        const { data } = await axiosBase.put(url, {
          name: payload.email,
          role: 'user'
        })
        commit('setUser', data)
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async getRole ({ commit, dispatch }, payload) {
      try {
        const url = `users/${payload.localId}.json?auth=${payload.idToken}`
        const { data } = await axiosBase.get(url)
        commit('setUser', { id: payload.localId, ...data })
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async login ({ commit, dispatch }, payload) {
      try {
        const url = `accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axiosAuth.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data.idToken)
        dispatch('getRole', data)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async register ({ commit, dispatch }, payload) {
      try {
        const url = `accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axiosAuth.post(url, { ...payload })
        commit('setToken', data.idToken)
        dispatch('setRole', data)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.user
    },
    isAuthenticated (_, getters) {
      return !!getters.token
    },
    isShowAuth (state) {
      return state.showAuth
    }
  }
}
