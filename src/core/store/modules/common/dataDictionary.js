import {
  getDictionaryDataByType,
  getDictionaryDataByTypeFilter
} from '@core/api/common/dataDictionary';
import { staticDataDictionary } from '@core/assets/data/dictionary';
const state = {
  validateStatus: [],
  type: staticDataDictionary.type,
  static: staticDataDictionary,
  invoiceType: [],
  ProjectStage: [],
  trainType: [],
  moneyName: []
};
const getters = {};
const mutations = {
  MONEY_NAME: (state, moneyName) => {
    state.moneyName = moneyName;
  },
  VALIDATE_STATUS: (state, validateStatus) => {
    state.validateStatus = validateStatus;
  },
  INVOICE_TYPE: (state, invoiceType) => {
    state.invoiceType = invoiceType;
  },
  PROJECT_STAGE: (state, ProjectStage) => {
    state.ProjectStage = ProjectStage;
  },
  TRAIN_TYPE: (state, trainType) => {
    state.trainType = trainType;
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
      getDictionaryDataByType('VALIDATE_STATUS').then(response => {
        commit('VALIDATE_STATUS', response);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  /**
   * 发票类型
   * */
  GetInvoiceTypeList({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE').then(response => {
        commit('INVOICE_TYPE', response);
        resolve(response);
      });
    });
  },
  /**
   * 培训类型
   * */
  GetTrainTypeList({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getDictionaryDataByTypeFilter('SYS_TRAIN_TYPE').then(response => {
        commit('TRAIN_TYPE', response.data);
        resolve(response);
      });
    });
  },
  /**
   * 项目阶段
   * */
  GetProjectStage({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then(response => {
        commit('PROJECT_STAGE', response.data);
        resolve(response);
      });
    });
  },
  /**
 * 款项名称
 * */
  GetMoneyName({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      getDictionaryDataByTypeFilter('MONEY_NAME').then(response => {
        commit('MONEY_NAME', response.data);
        resolve(response);
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
