import request from '@core/utils/request';

export function getStationTreeData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get'
  });
}
