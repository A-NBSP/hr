import request from '@/utils/request'
export function login(data) {

}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetilById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
/**
 * 保存用户信息
 * @param {Object} data {}
 * @returns promise
 */
export function saveUserDetilById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
