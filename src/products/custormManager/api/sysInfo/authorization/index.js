import request from '@coreUtils/request';

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */

/**
 * 获限右边单位
 * */
export function getUnit(menuId) {
  return request({
    url: `/api/smartpm/sysCrmUserInfo/authority/menu/user/${menuId}`,
    method: 'get'
  });
}
/**
 * save
 * */
export function saveUnit(data) {
  return request({
    url: '/api/smartpm/sysCrmUserInfo/authority/menu/user',
    method: 'put',
    data
  });
}/**
 * delete
 * */
export function delUnit(data) {
  return request({
    url: `/api/smartpm/sysCrmUserInfo/${data.menuId}/all/authority/menu`,
    method: 'Delete',
    data: data.sysUserIds
  });
}

