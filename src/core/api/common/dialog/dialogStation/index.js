import request from '@coreUtils/request';

export function getStationTreeData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get'
  });
}
