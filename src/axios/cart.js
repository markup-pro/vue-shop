import axios from 'axios'

const cartAxios = axios.create({
  baseURL: process.env.VUE_APP_URL_DB
})

export default cartAxios
