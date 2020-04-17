import request from '@coreUtils/request';

/**
 *  基本信息
 * @param query
 */

export function deleteUserManagerDetailDelete(id) {
  return request({
    url: '/api/admin/user/deleteUserPostRole/' + id,
    method: 'delete'
  });
}
export function getUserManagerDetailData(id) {
  return request({
    url: '/api/admin/user/' + id,
    method: 'get'
  });
}
export function putUserManagerDetailUpdate(obj) {
  return request({
    url: '/api/admin/user/' + obj.id,
    method: 'put',
    data: obj
  });
}
export function putUserManagerDetailEnable(obj) {
  return request({
    url: '/api/admin/user/enable',
    method: 'put',
    data: obj
  });
}
export function postUserManagerDetailAddAll(obj) {
  return request({
    url: '/api/admin/user/saveUserPostRole',
    method: 'post',
    data: obj
  });
}
export function putUserManagerDetailAudit(obj) {
  return request({
    url: '/api/admin/user/audit',
    method: 'put',
    data: obj
  });
}

/**
 *  岗位信息
 * @param query
 */
export function postUserManagerDetailStationAdd(obj) {
  return request({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  });
}
export function postUserManagerDetailStationAddOk(obj) {
  return request({
    url: '/api/admin/user/constant/user/post',
    method: 'post',
    data: obj
  });
}
export function deleteUserManagerDetailStationDelete(id) {
  return request({
    url: '/api/admin/user/deletePost/' + id,
    method: 'delete'
  });
}
export function getUserManagerDetailStationData(id) {
  return request({
    url: '/api/admin/sysOrgInfo/post/' + id,
    method: 'get'
  });
}

export function putUserManagerDetailStationUpdate(baseUserId, mainId) {
  return request({
    url: '/api/admin/user/main/post/' + mainId + '/' + baseUserId,
    method: 'put'
  });
}
export function getUserManagerDetailStationTreeData(id) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get'
  });
}
/**
 *  角色信息
 * @param query
 */
export function postUserManagerDetailRolesAdd(obj) {
  return request({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  });
}
export function postUserManagerDetailRolesAddOk(obj) {
  return request({
    url: '/api/admin/user/constant/user/role',
    method: 'post',
    data: obj
  });
}
export function deleteUserManagerDetailRolesDelete(id) {
  return request({
    url: '/api/admin/user/deleteRole/' + id,
    method: 'delete'
  });
}
export function getUserManagerDetailRolesData(id) {
  return request({
    url: '/api/admin/group/user/role/' + id,
    method: 'get'
  });
}
export function putUserManagerDetailRolesUpdate(id, obj) {
  return request({
    url: '/api/admin/user/' + id,
    method: 'put',
    data: obj
  });
}
export function getUserManagerDetailRolesTreeData(id) {
  return request({
    url: '/api/admin/group/role/tree',
    method: 'get'
  });
}
