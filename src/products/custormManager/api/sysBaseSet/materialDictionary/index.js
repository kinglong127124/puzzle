import request from '@coreUtils/request';

export function getMaterial(params) {
  return request({
    url: '/api/smartpm/sysMaterialTypeTemplet/listTree',
    method: 'get',
    params: params
  });
}

export function getDiction(params) {
  return request({
    url: '/api/smartpm/sysMaterialDictionaryTemplet/page',
    method: 'get',
    params: params
  });
}

export function addDictionary(data) {
  return request({
    url: '/api/smartpm/sysMaterialDictionaryTemplet/addEntityList',
    method: 'post',
    data: data
  });
}

export function auditDic(data) {
  return request({
    url: '/api/smartpm/sysMaterialDictionaryTemplet/audit',
    method: 'put',
    data: data
  });
}

export function deleteDic(id) {
  return request({
    url: '/api/smartpm/sysMaterialDictionaryTemplet/' + id,
    method: 'delete'
  });
}

export function enableDic(data) {
  return request({
    url: '/api/smartpm/sysMaterialDictionaryTemplet/enable',
    method: 'put',
    data: data
  });
}

export function getUnit() {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/all',
    method: 'get'
  });
}
