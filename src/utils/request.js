import axios from 'axios'
const service = axios.create({
  baseURL: '111',
  timeout: 5000
})
export default service
