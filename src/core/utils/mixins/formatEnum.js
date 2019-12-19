/**
 * 表格格式化枚举
 */
export default {
  methods: {
    /**
     * 是否主岗岗位
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfMainDuty(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifMainDuty) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否是操作员
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfOperate(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifOperate) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否是管理员
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIsAdmin(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.isAdmin) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },

    /**
     * 是否是投标
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIsTender(row) {
      let name = '未知';

      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.date) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否生成合同
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfInviteBid(row) {
      console.log(row.ifInviteBid);
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifInviteBid) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    }, /**
     * 是否招标
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfContract(row) {
      let name = '未知';

      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifContract) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否结算
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfPay(row) {
      let name = '未知';

      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifPay) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 男和女
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatSex(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.gender) {
        if (resultObj.code == row.sex || resultObj.code == row.gender || resultObj.code == row.personGender) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 启用和禁用
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatEnable(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.enabled) {
        if (resultObj.code == row.enable) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 未审核/已审核
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatValidateStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.validateStatus) {
        if (resultObj.code == row.validateStatus) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 角色类型，角色和类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatRoleType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.roleType) {
        if (resultObj.code == row.roleType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 在职 / 离职
     */
    formatJobStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.jobStatus) {
        if (resultObj.code == row.status) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 请假类型
     */
    formatHolidayType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.holidayType) {
        if (resultObj.code == row.type) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 机构/部门/岗位
     */
    formatType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.type) {
        if (resultObj.code == row.type) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 阅读状态
     */
    formatReadStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.readStatus) {
        if (resultObj.code == row.readStatus) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否末级
     */
    formatIfLastLevel(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifLastLevel) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否
     */
    formatIsOrNot(val) {
      let name = '否';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 审批流程状态
     */
    /* formatAuditStatusEnum(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.auditStatusEnum) {
        if (resultObj.code == val.validateStatus) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },*/
    /**
     * 是否有效
     */
    formatEnabledEnumSchedule(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.enableEnumSchedule) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 分包结算单据来源类型
     * */
    formatSubFinBillType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.subFinBillType) {
        if (resultObj.code == val.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 分包结算单据来源类型
     * */
    formatPurchaseBillType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.purchaseBillType) {
        if (resultObj.code == val.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 完工结算单据来源类型
     * */
    formatBillType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.billType) {
        if (resultObj.code == val.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    // 出库类型
    formatOutType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.outType) {
        if (resultObj.code == row.outType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    // 入库类型
    formatInType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.inType, row.inType);
    },
    // 任务类型
    formatAmType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.amType, row);
    },
    // 单位类型
    formatUseEnterpriseType1(row) {
      return this.$utilsBasic.formatName(this.dataEnum.useEnterpriseType, row);
    },
    // 处理意见类型及审批类型
    formatAuditStatusEnum(row) {
      row = typeof row == 'object' ? row.validateStatus : row;
      return this.$utilsBasic.formatName(this.dataEnum.auditStatusEnum, row);
    },
    // 库存入库类型
    formatStockTypeEnum(row) {
      return this.$utilsBasic.formatName(this.dataEnum.stockType, row['inType']);
    },
    /**
     * 领用单位类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatUseEnterpriseType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.static.useEnterpriseType, row['useEnterpriseType']);
    },

    /**
     *  成本管理 - 业务类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatProIncomeType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.proIncomeTypeEnum, row['billType']);
    },
    /**
     *  成本管理 - 成本类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatProCostType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.proCostTypeEnum, row['costType']);
    },
    /**
     *  成本管理 - 成本单据类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatProCostBillType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.proCostBillTypeEnum, row['billType']);
    },
    /**
     *  系统日志类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatLogType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.static.logType, row['logType']);
    },

    /**
     *  签约状态
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatSiginStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.siginStatus, row['signStatus']);
    },
    /**
     * 在场类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatSiteType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.siteType, row['siteType']);
    },
    /**
     * 设备状态
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatMachineStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.machineStatus, row['machineStatus']);
    },
    /**
     *  资证状态 1：闲置 2：外借
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatBorrowStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.certBorrowStatus, row['borrowStatus']);
    },
    /**
     * 资产状态  1 闲置 2 使用  3 报废     BrpPropertyStatus
     *
     * */
    formatStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.status) {
        if (resultObj.code == row.status) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 文档介质  枚举1-纸质2-电子3-纸质+电子
     * */
    formatMediumEnum(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.medium) {
        if (resultObj.code == row.medium) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 文档类别  枚举1-闲置 2-外借
     * */
    formatStatusEnum(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.statusEnum) {
        if (resultObj.code == row.status) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },

    /**
     *  车辆状态 1：闲置 2：外借 3 报废
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatVehicleStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.vehicleStatus, row['vehicleStatus']);
    },

    /**
     *  设备类型 1：枪机 2：球机 3 网络录像机
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatVideoType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.static.videoType, row['type']);
    },
    /**
     *  设备类型 1：枪机 2：球机 3 网络录像机
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatBindStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.static.bindStatus, row['bindStatus']);
    },
    // 紧急状态
    formatTaskEdEnum(row) {
      return this.$utilsBasic.formatName(this.dataEnum.taskEdEnum, row['emergencyDegree']);
    },
    // 完成状态
    formatCompletedState(row) {
      return this.$utilsBasic.formatName(this.dataEnum.completedState, row['status']);
    },
    /**
     * 物资预算  变更类型【1-合同变更;2-工程签证;3-其他】
     * */
    formatChangeType(row) {
      return this.$utilsBasic.formatName(this.dataEnum.ifchange, row['changeType']);
    },
    /**
     * 经营方式  【1-自建;2-联营】
     * */
    formatOperationWay(row) {
      return this.$utilsBasic.formatName(this.dataEnum.operate, row['operationWay']);
    },
    // 完成状态【1-未办理，2-办理中，3-已完成】
    formatTransactionStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.transactionStatus, row['status']);
    },
    /**
     * 合同类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatTypeStatus(row) {
      return this.$utilsBasic.formatName(this.dataEnum.static.contractType, row['type']);
    },
    /**
     * 合同类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatJobStatusUser(row) {
      return this.$utilsBasic.formatName(this.dataEnum.static.jobStatusUser, row['jobStatus']);
    },
    /**
     * 业主预算单据类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatBillTypeEnum(row) {
      row = typeof row == 'object' ? row.validateStatus : row;
      return this.$utilsBasic.formatName(this.dataEnum.billTypeEnum, row);
    },
    formatAuthMode(row) {
      row = typeof row == 'object' ? row.authMode : row;
      return this.$utilsBasic.formatName(this.dataEnum.static.authMode, row);
    },
    formatAuthModeType(row) {
      row = typeof row == 'object' ? row.authWay : row;
      return this.$utilsBasic.formatName(this.dataEnum.static.authModeType, row);
    }
  }
};

