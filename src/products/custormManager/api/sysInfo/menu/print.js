import request from '@coreUtils/request';
import api from '@coreApi/common';

function getAllSchema(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/allSchema`,
    method: 'get'
  });
}

function getAllSchemaTables(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/allSchemaTables`,
    method: 'get',
    params: params.field
  });
}

const result = {
  ...api,
  getAllSchema,
  getAllSchemaTables
};
export default result;
