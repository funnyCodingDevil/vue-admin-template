import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户的基本资料
export function getUserBaseInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工基本信息
export function getEmployeeBaseInfo(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
export function logout() {

}
