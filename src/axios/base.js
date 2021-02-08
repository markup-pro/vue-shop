import axios from 'axios'
import store from '@/store'

const cartAxios = axios.create({
  baseURL: process.env.VUE_APP_URL_DB
})

cartAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/showAuth', true)
  }

  return Promise.reject(error)
})

export default cartAxios
