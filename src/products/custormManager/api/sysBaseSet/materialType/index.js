import request from '@coreUtils/request';

export function getMaterialTypeData() {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/listTree',
    method: 'get'
  });
}

export function validateStatusMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/auditTree',
    method: 'put',
    data: data
  });
}

export function deleteMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/' + data.id,
    method: 'delete'
  });
}

export function enableMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/enable/tree',
    method: 'put',
    data: data
  });
}

export function addOrUpdateMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/addOrUpdateMaterialTypes',
    method: 'post',
    data: data
  });
}

export function addMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet',
    method: 'post',
    data: data
  });
}

export function updateMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/' + data.id,
    method: 'put',
    data: data
  });
}

