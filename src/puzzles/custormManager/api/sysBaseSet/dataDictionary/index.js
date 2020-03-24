import request from '@coreUtils/request';

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */

export function getSysConfigDataDictionary(parameters) { // 类型 获取
  return request({
    url: '/api/smartpm/sysConfigDataTypeTemplet/page',
    method: 'get',
    params: parameters
  });
}

export function putSysConfigDataDictionary(obj) { // 类型 保存
  return request({
    url: '/api/smartpm/sysConfigDataTypeTemplet/addEntityList',
    method: 'post',
    data: obj
  });
}

export function deleteSysConfigDataDictionary(id) { // 类型 删除
  return request({
    url: '/api/smartpm/sysConfigDataTypeTemplet/' + id,
    method: 'delete'
  });
}

export function putSysConfigDataDictionaryAudit(obj) { // 类型 审核
  return request({
    url: '/api/smartpm/sysConfigDataTypeTemplet/audit',
    method: 'put',
    data: obj
  });
}

export function putSysConfigDataDictionaryEnable(obj) { // 类型 启用 禁用
  return request({
    url: '/api/smartpm/sysConfigDataTypeTemplet/dataTypeEnable',
    method: 'put',
    data: obj
  });
}

export function getSysConfigDataDictionaryDetail(obj) { // 类型数据 获取
  return request({
    url: '/api/smartpm/sysConfigDataDictionaryTemplet/page/dataDictionary/' + obj.dataTypeId,
    method: 'get',
    params: obj
  });
}

export function deleteSysConfigDataDictionaryDetail(id) { // 数据数据 删除
  return request({
    url: '/api/smartpm/sysConfigDataDictionaryTemplet/' + id,
    method: 'delete'
  });
}

export function putSysConfigDataDictionaryDetail(obj) { // 类型数据 保存
  return request({
    url: '/api/smartpm/sysConfigDataDictionaryTemplet/addEntityList',
    method: 'post',
    data: obj
  });
}

export function putSysConfigDataDictionaryDetailAudit(obj) { // 类型数据 审核
  return request({
    url: '/api/smartpm/sysConfigDataDictionaryTemplet/audit',
    method: 'put',
    data: obj
  });
}

export function putSysConfigDataDictionaryDetailEnable(obj) { // 类型数据 启用 禁用
  return request({
    url: '/api/smartpm/sysConfigDataDictionaryTemplet/enable',
    method: 'put',
    data: obj
  });
}

