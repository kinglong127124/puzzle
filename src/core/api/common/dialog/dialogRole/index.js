import request from '@coreUtils/request';

export function getRoleTreeData() {
  return request({
    url: '/api/admin/group/role/tree',
    method: 'get'
  });
}
