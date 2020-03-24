import request from '@coreUtils/request';

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
export function addProdInfo(obj) {
  return request({
    url: '/api/smartpm/user',
    method: 'post',
    data: obj
  });
}
/* 获取主菜单列表*/
export function getAllMenus() {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/getProductInfo',
    method: 'get'
  });
}
/* 获取产品列表*/
export function getGoodslist(page, limit) {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/page',
    method: 'get',
    params: {
      page: page,
      limit: limit
    }
  });
}
/* 获取产品列表详情*/
export function getGoods(productId) {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/fun/tree',
    method: 'get',
    params: {
      productId
    }
  });
}
/* 获取用户公司信息*/
export function getCompanyMsg(id) {
  return request({
    url: '/api/smartpm/sysCrmUserInfo/' + id,
    method: 'get'
  });
}
/* 修改用户公司信息*/
export function changeCompanyMsg(data) {
  return request({
    url: '/api/smartpm/sysCrmUserInfo/',
    method: 'put',
    data: data
  });
}
/* 获取主菜单列表*/
export function getFunctionMenu(params) {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/fun/auth/tree',
    // url: '/api/smartpm/menu/user/getFunctionMenu',
    method: 'get',
    params
  });
}
export function configWorkFlowMenu(params) {
  return request({
    url: '/api/smartpm/sysCrmUserFunction/user/updateFunctionMenuByMenuId',
    method: 'post',
    params
  });
}
