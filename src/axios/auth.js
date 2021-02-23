import axios from 'axios'
import store from '@/store'
import router from '@/router'

const authAxios = axios.create({
  baseURL: process.env.VUE_APP_URL_AUTH
})

authAxios.defaults.params = {}

authAxios.interceptors.request.use(async config => {
  if (!store.getters['auth/isAuthenticated']) {
    return config
  }

  if (store.getters['auth/isExpired']) {
    await store.dispatch('auth/refresh')
  }

  config.params.auth = store.getters['auth/token']

  return config
})

authAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/logout')
    router.push('/?auth=true')
  }

  return Promise.reject(error)
})

export default authAxios
