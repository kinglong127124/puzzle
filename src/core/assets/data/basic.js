/**
 * 使用该文件条件：后端自定义枚举数据，未通过API能获取数据Enum
 * 或多个地方使用静态数据就使用该文件定义对应静态数据
 */
export const staticDataBasic = {
  // 超级管理员(583946153259696128),不能删除组织机构权限
  nodeId: ['67', '72', '69', '70', '68', '98', '583946153259696128'],
  mark: ['opma', 'eoa', 'admin', 'brp', 'brp', 'site'],
  markSelected: 'eoa',
  // 管理员类型
  groupType: [{
    code: 1, // 注册添加  //     * 注册用户时默认角色类型：系统管理员角色，不能删除
    name: '超级管理员'
  },
  {
    code: 2, // 操作人员添加  //* 新增用户时默认角色类型：普通用户角色，可删除
    name: '非管理员'
  }],
  // 类型
  type: [{
    code: 1,
    name: '角色类型'// 类型和角色
  },
  {
    code: 2,
    name: '角色'
  }],
  // 用户类型
  userType: [{
    code: '1',
    name: '注册用户'//    REGISTER("1", "注册用户", "注册用户为超级管理员角色，不能修改删除"),
  },
  {
    code: '2',
    name: '普通用户'//    GENERAL("2", "普通用户", "普通用户，可以修改删除");
  }],
  // 办理类型
  dealType: [{
    code: 'index',
    name: '首页'
  },
  {
    code: 'task',
    name: '任务中心'
  },
  {
    code: 'workOvertime',
    name: '加班'
  }],
  info: {
    registerInfo: '亲，注册成功，继续跳转到登录页面',
    forgetPasswordInfo: '亲，重设密码成功，继续跳转到登录页面',
    delete: '亲，您是否确定删除当前数据，删除后数据不能恢复！',
    audit: '亲，您是否确定审核当前数据，审核后数据不能修改!',
    disEnable: '亲，您是否确定禁用当前数据，禁用后数据不能使用',
    enable: '亲，您是否确定启用当前数据，启用后数据即可使用！',
    auditDelete: '亲，您是否确定审核当前数据，审核后数据不能删除！',
    signingUpdate: '亲，您是否确定当前合同已签约，确定后数据不能修改！',
    updateEmpty: '亲，未修改任何数据！',
    updateEmptyError: '亲，请先完善和修正错误数据！',
    dataCleanError: '亲，您是否确定清理数据，数据清理后不能恢复！',
    dataInitError: '亲，您是否确定初始化数据，数据初始化后不能恢复！',
    time: '亲，开始时间不能大于结束时间！',
    person: '亲，请先选择人员！',
    auditProduct: '亲，您是否确定授权当前已选择产品！',
    auditMenu: '亲，您是否确定授权当前已选择功能！',
    resetPassword: '亲，您是否要重置密码为【123456】！'
  }
};
