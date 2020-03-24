import request from '@coreUtils/request';

/**
 * 获取所有数据（单表使用）
 * 通用方法：查询所有的数据
 * @param params
 */
function getAll(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/all`,
    method: 'get',
    params: params.field
  });
}

/**
 * 获取分页数据（单表使用）
 * 通用方法：获取分页数据
 * {\"page\": 1, \"limit\": 10, \"fuzzy\": \"\", \"startTime\": \"2019-02-01\", \"endTime\": \"2019-02-10\", \"fuzzyKeys\": \"name, code, userName, email\"" +, \"selectOwn\": \"1\"}
 * page表示当前页码（必须的），limit表示每页条数（必须的），" +
 "fuzzy表示模糊查询字段（非必须），startTime表示开始时间（非必须），" +
 "endTime表示结束时间（非必须），fuzzyKeys表示列表字段所对应的key集合（非必须）," +
 "selectOwn 查询自己的数据inputPerson 是当前登陆人员(非必须)
 * @param params
 */
function getPage(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/page`,
    method: 'get',
    params: params.field
  });
}

/**
 * 新增（单表使用）
 * 通用方法：新增
 * @param params
 */
function postObj(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}`,
    method: 'post',
    data: params.field
  });
}

/**
 * 修改（单表使用）
 * 通用方法：修改
 * @param params
 */
function putObj(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/` + params.field.id,
    method: 'put',
    data: params.field
  });
}

/**
 * 删除（单表使用）
 * 通用方法：根据主键id 删除
 * @param params
 */
function deleteObj(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/` + params.field.id,
    method: 'delete'
  });
}

/**
 * 详情（单表使用）
 * 通用方法：根据主键id，查看详情
 * @param params
 */
function getObjDetail(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/` + params.field.id,
    method: 'get'
  });
}

/**
 * 审核（单表使用）
 *  通用方法：审核
 * @param params
 */
function putObjAudit(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/audit`,
    method: 'put',
    data: params.field
  });
}

/**
 * 启用，禁用（单表使用）
 * 通用方法：禁用启用
 * @param params
 */
function putObjEnable(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/enable`,
    method: 'put',
    data: params.field
  });
}

/**
 * 保存（新增及修改）（主子表使用）
 * 通用方法：根据对象保存数据
 * 主子表用/addOrUpdateEnterprise 请求方式post(以前使用)
 * 主子表用/addOrUpdate 请求方式post(以前使用)
 * 主子表用/dto 请求方式post
 *  @param params
 */
function postListAddOrUpdateDto(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/dto`,
    method: 'post',
    data: params.field
  });
}

/**
 * 删除（主子表使用）
 * 通用方法:根据ID删除主子表数据
 * @param params
 */
function deleteObjDto(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/dto/` + params.field.id,
    method: 'delete'
  });
}

/**
 * 详情（主子表使用）
 * 通用方法:根据ID查看主子表数据
 * @param params
 */
function getObjDetailDto(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/dto/` + params.field.id,
    method: 'get'
  });
}

/**
 * 删除（单表多条数据删除）（主子表使用）
 * 通用方法：根据ids批量删除(验证了是否审核)
 * @param params
 */
function deleteObjBatch(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/deleteBatch`,
    method: 'delete',
    data: params.field
  });
}

/**
 * 删除（单表多条数据删除）
 * 通用方法：根据ids批量删除(不带审核字段)
 * @param params
 */
function deleteObjBatchNoAuth(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/deleteBatch`,
    method: 'delete',
    data: params.field
  });
}

/**
 * 通用方法：下载EXCLE模板
 * @param params
 */
function getDownloadTemplate(params) {
  return `/api/${params.productAlias}/${params.pageCode}/downloadExcelTemplate?excelFileName=${params.field.excelFileName}`;
}
/**
 * 通用方法：后端导入Excel
 * @param params
 */
function postImportExcel(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/excelDataImport`,
    method: 'post',
    data: params.field
  });
}

/**
 * 通用方法：前端导入Excel
 * @param params
 */
function postImportExcelFront(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/excelDataImport1`,
    method: 'post',
    data: params.field,
    config: params.config
  });
}

/**
 * 通用方法：导出Excel
 * @param params
 */
function getExportExcel(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/excelDataExport`,
    method: 'get',
    params: params.field
  });
}
/**
 * 保存（新增及修改）（树及列表使用）
 * 通用方法：根据列表保存数据
 * 单表中多个列表用/addEntityList 请求方式put(以前使用)
 * 单表中多个列表用/addEntityList 请求方式put(以前使用)
 *  @param params
 */
function postListTreeAddEntity(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/addEntityList`,
    method: 'post',
    data: params.field
  });
}
/**
 * 审核（单表使用）（树使用）
 *  通用方法：根据列表单条数据审核
 * @param params
 */
function putTreeAudit(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/auditTree`,
    method: 'put',
    data: params.field
  });
}
/**
 * 启用，禁用（树使用）
 * 通用方法：禁用启用
 * @param params
 */
function putTreeEnable(params) {
  return request({
    url: `/api/${params.productAlias}/${params.pageCode}/enable/tree`,
    method: 'put',
    data: params.field
  });
}
const api = {
  static: {
    getAll,
    getPage,
    postObj,
    putObj,
    deleteObj,
    getObjDetail,
    putObjAudit,
    putObjEnable,
    postListAddOrUpdateDto,
    deleteObjDto,
    getObjDetailDto,
    deleteObjBatch,
    deleteObjBatchNoAuth,
    getDownloadTemplate,
    postImportExcel,
    postImportExcelFront,
    getExportExcel,
    postListTreeAddEntity,
    putTreeAudit,
    putTreeEnable
  }
};
export default api;
