import request from '@coreUtils/request';
import api from '@coreApi/common';

function putResetPassword(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/reset`,
    method: 'put',
    data: params.field
  });
}

const result = {
  ...api,
  putResetPassword
};
export default result;
