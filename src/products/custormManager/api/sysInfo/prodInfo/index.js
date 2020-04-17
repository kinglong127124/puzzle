import request from '@coreUtils/request';
import api from '@core/api/common';

function getProductInfo(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/${params.field.sysUserId}/authority/product`,
    method: 'get'
  });
}
function putProductInfo(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/${params.field.sysUserId}/authority/product`,
    method: 'put',
    data: params.field.productIds
  });
}
function deleteProductInfo(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/${params.field.sysUserId}/authority/product`,
    method: 'delete',
    data: params.field.productIds
  });
}

function getProductMenuTreeAll(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/menu/tree/${params.field.productId}`,
    method: 'get'
  });
}
function getProductMenuTree(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/authority/menu/tree/${params.field.productId}/${params.field.sysUserId}`,
    method: 'get'
  });
}
function putProductMenuTree(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/${params.field.sysUserId}/authority/menu`,
    method: 'put',
    data: params.field.menuIds
  });
}
function deleteProductMenuTree(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/${params.field.sysUserId}/authority/menu`,
    method: 'delete',
    data: params.field.menuIds
  });
}
const result = {
  ...api,
  getProductInfo,
  putProductInfo,
  deleteProductInfo,
  getProductMenuTreeAll,
  getProductMenuTree,
  putProductMenuTree,
  deleteProductMenuTree
};
export default result;
