import request from '@coreUtils/request';

export function getFeeTypeData() {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet/listTree',
    method: 'get'
  });
}

export function validateStatusFeeType(data) {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet/auditTree',
    method: 'put',
    data: data
  });
}

export function deleteFeeType(data) {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet/' + data.id,
    method: 'delete'
  });
}

export function enableFeeType(data) {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet/enable/tree',
    method: 'put',
    data: data
  });
}

export function addOrUpdateFeeType(data) {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet/addOrUpdateFeeTypes',
    method: 'post',
    data: data
  });
}

export function addFeeType(data) {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet',
    method: 'post',
    data: data
  });
}

export function updateFeeType(data) {
  return request({
    url: '/api/smartpm/sysFeeTypeTemplet/' + data.id,
    method: 'put',
    data: data
  });
}

