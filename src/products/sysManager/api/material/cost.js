import request from '@coreUtils/request';

export function getFeeTypeData() {
  return request({
    url: '/api/admin/sysFeeType/listTree',
    method: 'get'
  });
}

export function validateStatusFeeType(data) {
  return request({
    url: '/api/admin/sysFeeType/auditTree',
    method: 'put',
    data: data
  });
}

export function deleteFeeType(data) {
  return request({
    url: '/api/admin/sysFeeType/' + data.id,
    method: 'delete'
  });
}

export function enableFeeType(data) {
  return request({
    url: '/api/admin/sysFeeType/enable/tree',
    method: 'put',
    data: data
  });
}

export function addOrUpdateFeeType(data) {
  return request({
    url: '/api/admin/sysFeeType/addOrUpdateFeeTypes',
    method: 'post',
    data: data
  });
}

export function addFeeType(data) {
  return request({
    url: '/api/admin/sysFeeType',
    method: 'post',
    data: data
  });
}

export function updateFeeType(data) {
  return request({
    url: '/api/admin/sysFeeType/' + data.id,
    method: 'put',
    data: data
  });
}

