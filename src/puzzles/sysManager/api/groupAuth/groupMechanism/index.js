import request from '@coreUtils/request';

export function getGroupMechanismData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params: { type: 'all' }// 查询所有数据，空就是已审核
  });
}
export function validateStatusGroupMechanism(data) {
  return request({
    url: '/api/admin/sysOrgInfo/audit',
    method: 'put',
    data
  });
}
export function deleteGroupMechanism(params) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/delete',
    method: 'delete',
    params
  });
}
export function enableGroupMechanism(obj) {
  return request({
    url: '/api/admin/sysOrgInfo/enable/tree',
    method: 'put',
    data: obj
  });
}
export function addOrUpdateGroupMechanism(data) {
  return request({
    url: '/api/admin/sysOrgInfo/addOrUpdateOrgInfos',
    method: 'post',
    data
  });
}

export function addOrgInfo(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/add',
    method: 'post',
    data
  });
}
export function update(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/update',
    method: 'post',
    data
  });
}
export function getOrgInfo2(params) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params
  });
}

