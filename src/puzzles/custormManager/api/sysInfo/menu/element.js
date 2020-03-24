import request from '@coreUtils/request';

export function page(query) {
  return request({
    url: '/api/smartpm/element/list',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: '/api/smartpm/element',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: '/api/smartpm/element/' + id,
    method: 'get'
  });
}

export function delObj(id) {
  return request({
    url: '/api/smartpm/element/' + id,
    method: 'delete'
  });
}

export function putObj(id, obj) {
  return request({
    url: '/api/smartpm/element/' + id,
    method: 'put',
    data: obj
  });
}
