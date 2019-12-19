import {
  getMeasureUnitData,
  completeShowTask,
  getCompanyWarehouseData,
  getProjectList,
  getOfferEnterprise,
  getReportAccountancyYear,
  getSysConfigArea
} from '@core/api/common/dataBasic';
import { staticDataBasic } from '@core/assets/data/basic';
import Vue from 'vue';

const state = {
  measureUnit: [],
  static: staticDataBasic,
  companyWarehouse: [],
  projectByAuth: [],
  offerEnterprise: [],
  businessArea: [], // 业务区域
  administrativeArea: [], // 行政区划
  year: []
};
const getters = {};
const mutations = {
  MEASURE_UNIT: (state, measureUnit) => {
    state.measureUnit = measureUnit;
  },
  COMPANY_WAREHOUSE: (state, companyWarehouse) => {
    state.companyWarehouse = companyWarehouse;
  },
  PROJECT_BY_AUTH: (state, projectByAuth) => {
    state.projectByAuth = projectByAuth;
  },
  OFFER_ENTERPRISE: (state, offerEnterprise) => {
    state.offerEnterprise = offerEnterprise;
  },
  BUSINESS_AREA: (state, businessArea) => {
    state.businessArea = businessArea;
  },
  YEAR: (state, year) => {
    state.year = year;
  },
  ADMINISTRATIVE_AREA: (state, administrativeArea) => {
    state.administrativeArea = administrativeArea;
  }
};

const actions = {
  /**
   * 未审核/已审核
   */
  GetValidateStatusData1({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      if (!(state.measureUnit && state.measureUnit.length > 0)) {
        getMeasureUnitData().then(response => {
          commit('MEASURE_UNIT', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      }
    });
  },
  /**
   * 公司仓库
   * */
  GetCompanyWarehouseData({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getCompanyWarehouseData().then(response => {
        commit('COMPANY_WAREHOUSE', response);
        resolve(response);
      });
    });
  },
  /**
   * 有权限的项目
   * */
  GetProjectList({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getProjectList({
        page: 1,
        limit: 10000,
        validateStatus: 1,
        enable: 1,
        belong: 1
      }).then(response => {
        commit('PROJECT_BY_AUTH', response.data.rows);
        resolve(response);
      });
    });
  },
  /**
   * 供应单位
   * */
  GetOfferEnterprise({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getOfferEnterprise({
        page: 1,
        limit: 10000,
        validateStatus: 1,
        enable: 1
      }).then(response => {
        commit('OFFER_ENTERPRISE', response.data.rows);
        resolve(response);
      });
    });
  },
  /**
   * 地理区域
   * */
  GetSysConfigArea({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getSysConfigArea({
        page: 1,
        limit: 10000,
        validateStatus: 1,
        enable: 1
      }).then(response => {
        commit('BUSINESS_AREA', response.data.rows);
        resolve(response);
      });
    });
  },
  /**
   * 年度批次
   * */
  GetReportAccountancyYear({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getReportAccountancyYear({
        page: 1,
        limit: 10000,
        validateStatus: 1,
        enable: 1
      }).then(response => {
        commit('YEAR', response.data.rows);
        resolve(response);
      });
    });
  },
  /**
   * 行政区划 (没有接口，假数据)
   * */
  GetAdministrativeArea({
    commit, state
  }) {
    commit('ADMINISTRATIVE_AREA', [
      { name: '北京', id: 1 },
      { name: '上海', id: 2 }
    ]);
  },
  OpenSelectUserAndHandleAudit({ commit, state }, config) {
    // this.handleContainer = this.$pagePPSelect.open({
    //   // processId: '750052'
    //   processId: this.formData.processInstanceId,
    //   formData: this.formData
    // }).then(res => {
    //   this.msg.nextCandidateId = res.nextCandidateId
    //   this.msg.nextGroupId = res.nextGroupId
    //   this.msg.sendUserId = res.sendUserId
    //   this.formData.opinion = res.handleText
    //   this.completeData('1')
    // }).catch(err => {
    //   this.dialogStatus = true
    // })
    return new Promise((reslove, reject) => {
      const { formData, processId } = config;
      Vue.prototype.$pagePPSelect.open(config).then(res => {
        completeShowTask({
          flag: '1',
          inputPersonId: formData.inputPersonId,
          nextCandidateId: res.nextCandidateId,
          nextGroupId: res.nextGroupId,
          opId: formData.inputPersonId,
          opName: formData.inputPerson,
          opinion: res.handleText,
          processInstanceId: processId
        }).then(res => {
          reslove();
        });
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
