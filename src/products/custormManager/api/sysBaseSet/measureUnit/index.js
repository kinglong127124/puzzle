import request from '@coreUtils/request';

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
// 获取全部计量单位列表
export function getMeasureUnit(obj) {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/page',
    method: 'get',
    params: obj
  });
}

// 批量新增及修改的计量单位
export function addMeasureUnit(list) {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/addEntityList',
    method: 'post',
    data: list
  });
}

// 删除单个计量单位
export function deleteMeasureUnit(id) {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/' + id,
    method: 'delete'
  });
}

// 审核单个计量单位
export function configMeasureUnit(row) {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/audit',
    method: 'put',
    data: row
  });
}
/*
/!* 获取产品列表详情*!/
export function getGoods(productId) {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/fun/tree',
    method: 'get',
    params: {
    	productId
    }
  })
}
/!* 获取用户公司信息*!/
export function getCompanyMsg(id) {
  return request({
    url: '/api/smartpm/sysCrmUserInfo/' + id,
    method: 'get'
  })
}
/!* 修改用户公司信息*!/
export function changeCompanyMsg(data) {
  return request({
    url: '/api/smartpm/sysCrmUserInfo/',
    method: 'put',
    data: data
  })
}*/

/**
 * 是否启用或禁用
* */

export function putSysConfigUnits(obj) {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/enable',
    method: 'put',
    data: obj
  });
}
