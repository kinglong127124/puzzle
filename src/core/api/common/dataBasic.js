import request from '@core/utils/request';
/**
 * 除开枚举，数据字典，系统管理在内的其他数据
 */

/**
 * 计量单位
 */
export function getMeasureUnitData() {
  return request({
    url: '/api/smartpm/sysConfigUnitsTemplet/all',
    method: 'get'
  });
}

/**
 *处理待办事项
 * @param obj
 */
export function completeShowTask(data) {
  return request({
    url: '/api/activiti/leave/agent/complete',
    method: 'post',
    data: data
  });
}
/**
 * 获取公司仓库数据
 * @param obj
 */
export function getCompanyWarehouseData(obj) {
  return request({
    url: '/api/smartpm/sysConfigWarehouse/all',
    method: 'get',
    params: obj
  });
}
// 获取全部地理区域列表
export function getSysConfigArea(obj) {
  return request({
    url: '/api/smartpm/sysConfigArea/page',
    method: 'get',
    params: obj
  });
}
/**
 * 有权限的项目
 * */
export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  });
}

/**
 * 供应单位
 * */
export function getOfferEnterprise(params) {
  return request({
    url: '/api/smartpm/sysEnterpriseInfo/page',
    method: 'get',
    params
  });
}

// 获取全部会计期间年份(年度批次)
export function getReportAccountancyYear(obj) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyYear/page',
    method: 'get',
    params: obj
  });
}
/**
 * 视频-获取当前系统下的应用配置参数
 * @param obj
 * 单表使用 请求方式get
 */
export function getSiteHikCameraConfObj() {
  return request({
    url: '/api/site/siteHikCameraConf/get',
    method: 'get'
  });
}
/**
 * 获取分页数据(多表)
 * @param obj
 * 单表使用 请求方式get
 */
export function getPageProjectObj(obj) {
  return request({
    url: '/api/site/siteProCamera/getPage',
    method: 'get',
    params: obj
  });
}

// 所有项目信息
export function getProjectAll(params) {
  return request({
    url: '/api/admin/sysProInfo/page',
    method: 'get',
    params
  });
}
// 当前用户项目信息
export function getProjectAuditedUser(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  });
}
