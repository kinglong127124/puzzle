import request from '@coreUtils/request';

/**
 * 扩容处理 - 一键处理
 * @param obj
 * @returns {Promise<Response>}
 */
export function putHandle(obj) {
  return request({
    url: '/api/smartpm/sysBusAppCapacity/handle',
    method: 'put',
    data: obj
  });
}

