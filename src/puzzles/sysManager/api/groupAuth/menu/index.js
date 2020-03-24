import request from '@coreUtils/request';

/**
 *  获取用户所有菜单
 * @param query
 */
export function fetchTree(query) {
  return request({
    url: '/api/admin/menu/menuTree',
    method: 'get',
    params: query
  });
}

/**
 *  获取用户授权的菜单
 * @param query
 */
export function fetchTreeAuth(query) {
  return request({
    url: '/api/admin/menu/user/menus',
    method: 'get',
    params: query
  });
}

export function fetchAll() {
  return request({
    url: '/api/admin/menu/all',
    method: 'get'
  });
}
export function addObj(obj) {
  return request({
    url: '/api/admin/menu',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: '/api/admin/menu/' + id,
    method: 'get'
  });
}

export function delObj(id) {
  return request({
    url: '/api/admin/menu/' + id,
    method: 'delete'
  });
}

export function putObj(id, obj) {
  return request({
    url: '/api/admin/menu/' + id,
    method: 'put',
    data: obj
  });
}
export function getCrmProductInfoAll() {
  return request({
    url: '/api/admin/sysCrmProductInfo/all',
    method: 'get'
  });
}
