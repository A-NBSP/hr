import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(function(response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const { success, data, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
  }
  return response
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
