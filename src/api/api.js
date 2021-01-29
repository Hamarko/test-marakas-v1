import axios from 'axios'
import token from './token'
import router from '../router'

let baseUrl = ''

let api = axios.create({
  baseURL: baseUrl  
})

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
api.interceptors.request.use(
  (config) => {
    let tokenData = token.get()

    if (tokenData) {
      config.headers['Authorization'] = `Bearer ${tokenData}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use((response) => {
  return response
}, (err) => {
  return new Promise(() => {
    if (err.response.status === 401) {
      token.clear()        
    }     
    throw err
  })
})

export default api
