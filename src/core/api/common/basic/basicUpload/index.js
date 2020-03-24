import request from '@coreUtils/request';

/**
 * 根据(附件表)的主键id查询列表
 * @param id
 */
export function getAttacheFileData(params) {
  return request({
    url: `/api/upload/sysAttacheFile/table/${params.tableId}`,
    method: 'get',
    params
  });
}

/**
 * 上传附件地址
 */
export function postAttacheFileUrl(data) {
  return request({
    url: `/api/upload/sysAttacheFile/upload`,
    method: 'post',
    data
  });
}
/**
 * 根据(业务表)的主键id删除(清空附件)
 * @param id
 */
export function clearAttacheFile(id) {
  return request({
    url: '/api/upload/sysAttacheFile/table/' + id,
    method: 'delete'
  });
}

/**
 * 根据(附件表)的主键id删除(单个图片删除)
 * @param id
 */
export function deleteAttacheFileById(id) {
  return request({
    url: '/api/upload/sysAttacheFile/' + id,
    method: 'delete'
  });
}
// 根据url删除文件
export function deleteByUrl(params) {
  return request({
    url: `/api/upload/sysAttacheFile/deleteByUrl`,
    method: 'delete',
    params
  });
}

/**
 * 上传附件地址
 */
export function postAttacheFiles(data, config) {
  return request({
    url: `/api/upload/sysAttacheFile/upload`,
    method: 'post',
    data,
    config
  });
}
