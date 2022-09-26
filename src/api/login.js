import request from '@/utils/request'
// 登录请求
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
