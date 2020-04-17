import request from '@coreUtils/request';

export function getPersonTypeData() {
  return request({
    url: '/api/admin/sysPersonType/listTree',
    method: 'get'
  });
}

export function validateStatusPersonType(data) {
  return request({
    url: '/api/admin/sysPersonType/auditTree',
    method: 'put',
    data: data
  });
}

export function deletePersonType(data) {
  return request({
    url: '/api/admin/sysPersonType/' + data.id,
    method: 'delete'
  });
}

export function enablePersonType(data) {
  return request({
    url: '/api/admin/sysPersonType/enable/tree',
    method: 'put',
    data: data
  });
}

export function addOrUpdatePersonType(data) {
  return request({
    url: '/api/admin/sysPersonType/addOrUpdatePersonTypes',
    method: 'post',
    data: data
  });
}
