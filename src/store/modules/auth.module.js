import axios from 'axios'
import axiosBase from '@/axios/base'
import { error } from '@/utils/error'
const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_KEY = 'shop-user'
const AUTH_URL = process.env.VUE_APP_URL_AUTH

export default {
  namespaced: true,
  state () {
    return {
      showAuth: false,
      token: localStorage.getItem(TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_KEY),
      expiresDate: new Date(localStorage.getItem(EXPIRES_KEY)),
      user: JSON.parse(localStorage.getItem(USER_KEY)) ?? {}
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    setToken (state, { refreshToken, idToken, expiresIn = '3600' }) {
      const expiresDate = new Date(new Date().getTime() + Number(expiresIn) * 1000)
      state.token = idToken
      state.refreshToken = refreshToken
      state.expiresDate = expiresDate
      localStorage.setItem(TOKEN_KEY, idToken)
      localStorage.setItem(REFRESH_KEY, refreshToken)
      localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
    },
    logout (state) {
      state.token = null
      state.refreshToken = null
      state.expiresDate = null
      state.user = {}
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(USER_KEY)
    },
    showAuth (state, payload) {
      state.showAuth = payload
    }
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      try {
        const url = `${AUTH_URL}accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data)
        dispatch('getUser', data)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async signUp ({ commit, dispatch }, payload) {
      try {
        const url = `${AUTH_URL}accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload })
        commit('setToken', data)
        dispatch('createUser', data)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    },
    async refresh ({ state, commit }) {
      try {
        const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, {
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken
        })
        commit('setToken', {
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in
        })
      } catch (e) {
        console.log('Error:', e.message)
      }
    },
    async createUser ({ commit, dispatch }, payload) {
      try {
        const url = `users/${payload.localId}.json`
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
    async getUser ({ commit, dispatch }, payload) {
      try {
        const url = `users/${payload.localId}.json`
        const { data } = await axiosBase.get(url)
        commit('setUser', { id: payload.localId, ...data })
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
      return !!getters.token && !getters.isExpired
    },
    isAdmin (state) {
      return state.user.role === 'admin'
    },
    isUser (_, getters) {
      return !getters.isAdmin
    },
    isExpired (state) {
      return new Date() >= state.expiresDate
    },
    isShowAuth (state) {
      return state.showAuth
    }
  }
}
