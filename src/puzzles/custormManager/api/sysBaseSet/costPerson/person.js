import request from '@coreUtils/request';

export function getPersonTypeData() {
  return request({
    url: '/api/smartpm/sysPersonTypeTemplet/listTree',
    method: 'get'
  });
}

export function validateStatusPersonType(data) {
  return request({
    url: '/api/smartpm/sysPersonTypeTemplet/auditTree',
    method: 'put',
    data: data
  });
}

export function deletePersonType(data) {
  return request({
    url: '/api/smartpm/sysPersonTypeTemplet/' + data.id,
    method: 'delete'
  });
}

export function enablePersonType(data) {
  return request({
    url: '/api/smartpm/sysPersonTypeTemplet/enable/tree',
    method: 'put',
    data: data
  });
}

export function addOrUpdatePersonType(data) {
  return request({
    url: '/api/smartpm/sysPersonTypeTemplet/addOrUpdatePersonTypes',
    method: 'post',
    data: data
  });
}
