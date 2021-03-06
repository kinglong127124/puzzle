import request from '@coreUtils/request';

export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  });
}
