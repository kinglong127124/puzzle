import request from '@coreUtils/request';

/**
 * 设备状态
 */
export function GetMachineStatus() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.MachineStatusEnum'
    }
  });
}
/**
 * 办理意见
 * 未审核/已审核
 */
export function getAuditStatusEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.ActivitiAuditStatusEnum'
    }
  });
}
/**
 * 未审核/已审核
 */
export function getValidateStatusData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.AuditStatusEnum'
    }
  });
}
/**
 * 启用/禁用
 */
export function getEnabledData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.EnabledEnum'
    }
  });
}
/**
 * 启用/禁用
 */
export function getUseEnterpriseTypeEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.UseEnterpriseTypeEnum'
    }
  });
}
/**
 * 已签约/未签约
 */
export function GetSiginStatusData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.SignStatusEnum'
    }
  });
}
/**
 * 审批任务类型
 */
export function GetAmTypeData(search) {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.ModelEnum'
    }
  });
}
/**
 * 审批流程状态
 */
export function GetActivitiModelData(search) {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.ActivitiModelEnum'
    }
  });
}
/**
 * 配送方式
 */
export function GetAmTransportModeEnum(search) {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.TransportModeEnum'
    }
  });
}
/**
 * 完工结算单据来源类型
 */
export function getBillTypeData(search) {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.BillTypeEnum'
    }
  });
}
/**
 * 有效状态
 */
export function GetEnabledEnumSchedule(search) {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.EnabledEnumSchedule'
    }
  });
}
/**
 * 试用/租赁/永久
 */
export function getAuthData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.admin.enums.AuthModeEnum'
    }
  });
}
/**
 * 注册用户/普通用户
 */
export function getUserTypeData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.admin.enums.UserTypeEnum'
    }
  });
}
/**
 * 是或否
 */
export function getIsOrNotData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.IsOrNotEnum'
    }
  });
}
/**
 * 男或女
 */
export function getGenderData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.GenderEnum'
    }
  });
}
/**
 * 组织机构类型
 */
export function getOrgTypeData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.admin.enums.OrgTypeEnum'
    }
  });
}

/**
 * 工作状态：离职 在职
 */
export function getJobStatusData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.admin.enums.JobStatusEnum' }
  });
}
/**
 * 角色类型
 */
export function getRoleTypeData() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.admin.enums.RoleTypeEnum'
    }
  });
}
/**
 * 获取请假枚举类型
 * @param obj
 */
export function getHolidayTypeData() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.EoaHolidayTypeEnum' }
  });
}

// 已读未读枚举
export function getReadStatus() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.ReadStatusEnum' }
  });
}

// 经营方式
export function getOperateData() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.admin.enums.AdminProOpWay' }
  });
}

// 变更类型
export function getIfchange() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.ChangeTypeEnum' }
  });
}

// 出库类型
export function GetOutTypeData() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.OutTypeEnum' }
  });
}

// 其他入库类型
export function GetInTypeData() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.InTypeEnum' }
  });
}

// 库存类型
export function getStockTypeData() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.StockTypeEnum' }
  });
}

// 单据来源类型
export function getIncomeTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.IncomeTypeEnum' }
  });
}

// 分包结算单据类型
export function getSubFinBillTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.SubFinBillTypeEnum' }
  });
}

// 采购结算单据类型
export function getPurchaseBillTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.PurchaseBillTypeEnum' }
  });
}

// 应付查询来源类型枚举
export function getShouldPayOrderTypeData() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.ShouldPayOrderTypeEnum' }
  });
}
/**
 * 成本管理 - 业务类型
 * */
export function getProIncomeTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.BpamProIncomeTypeEnum' }
  });
}

/**
 * 成本管理 - 成本类型
 * */
export function getProCostTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.BpamProCostCostTypeEnum' }
  });
}
/**
 * 成本管理 - 单据类型
 * */
export function getProCostBillTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.BpamProCostBillTypeEnum' }
  });
}
/**
 * 资证状态 1：闲置 2：外借
 * */
export function getCertBorrowStatusEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.BrpBorrowStatusEnum' }
  });
}

/**
 * 在场类型 1：进场；2：出场；3：结转
 */
export function GetSiteType() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.ReuseMaterialStockEnum'
    }
  });
}
/**
 * 资产状态  1.闲置  2.使用   3.报废
 *status
 * */
export function GetBrpPropertyStatusEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.BrpPropertyStatusEnum'
    }
  });
}

/**
 * 车辆状态  1.闲置  2.使用   3.报废
 *status
 * */
export function getBrpVehicleStatusEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.BrpVehicleStatusEnum'
    }
  });
}

/**
 * 紧急程度  1-重要紧急 2-重要不紧急 3-紧急不重要 4-不紧急不重要
 *status
 * */
export function getTaskEdEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.TaskEdEnum'
    }
  });
}

/**
 * 完成状态  1-已完成 2-未完成
 *status
 * */
export function getCompletedState() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.CompletedStateEnum'
    }
  });
}
/**
 * 文档介质  枚举  1-纸质  2-电子  3-纸质+电子
 *status
 * */
export function getDocumentMediumEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.DocumentMediumEnum'
    }
  });
}
/**
 * 文档状态  枚举  1-闲置  2-外借
 *status
 * */
export function getDocumentStatusEnum() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.DocumentStatusEnum'
    }
  });
}

/**
 * 完成状态  枚举  1-未办理  2-办理中 3-办理完成
 *status
 * */
export function getTransactionStatus() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.TransactionStatusEnum'
    }
  });
}
// 单据来源类型
export function getOpmaShouldPayOrderTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.OpmaShouldPayOrderTypeEnum' }
  });
}
// 单据类型
export function getOpmaBillTypeEnum() {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params: { enumClassName: 'com.epmsoft.security.common.enums.OpmaBillTypeEnum' }
  });
}
