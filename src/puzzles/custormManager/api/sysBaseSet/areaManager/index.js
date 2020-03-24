import request from '@coreUtils/request';

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
// 获取全部地理区域列表
export function getArea(obj) {
  return request({
    url: '/api/smartpm/sysConfigAreaTemplet/page',
    method: 'get',
    params: obj
  });
}

// 批量新增及修改的地理区域
export function addArea(list) {
  return request({
    url: '/api/smartpm/sysConfigAreaTemplet/addEntityList',
    method: 'post',
    data: list
  });
}

// 删除单个地理区域
export function deleteArea(id) {
  return request({
    url: '/api/smartpm/sysConfigAreaTemplet/' + id,
    method: 'delete'
  });
}

// 审核单个地理区域
export function configArea(row) {
  return request({
    url: '/api/smartpm/sysConfigAreaTemplet/audit',
    method: 'put',
    data: row
  });
}

/**
* 启用 禁用
* */
export function putEnableOrDisableArea(obj) {
  return request({
    url: '/api/smartpm/sysConfigAreaTemplet/enable',
    method: 'put',
    data: obj
  });
}
