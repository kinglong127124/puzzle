import request from '@coreUtils/request';

/**
 * 用户信息列表
 * @param query
 */
export function getUserManagerData(query) {
  return request({
    url: '/api/admin/user/page',
    method: 'get',
    params: query
  });
}
