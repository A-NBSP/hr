import request from '@/utils/request'

export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
/** *
 *  保存用户详情的基础信息
 * **/
export function savePersonalDetail(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
/**
 * 获取岗位信息
 * @param {String} id 员工id
 * @returns promise
 */
export function getEmployeesJobInfo(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
/**
 * 保存岗位信息
 * @param {String} data 员工信息
 * @returns promise
 */
export function saveEmployeesJobInfo(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}