import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

export function delRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

export function getRoleById(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}

export function updateRole(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
