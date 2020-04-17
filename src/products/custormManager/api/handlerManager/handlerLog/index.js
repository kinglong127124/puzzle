import request from '@coreUtils/request';

export function page(query) {
  return request({
    url: '/api/smartpm/sysLog/page',
    method: 'get',
    params: query
  });
}
