// 暴露接口
import {
  getAccountancyYear,
  addAccountancyYear,
  configAccountancyYear,
  deleteAccountancyYear,
  getAccountancyMonth,
  addAccountancyMonth,
  configAccountancyMonth,
  deleteAccountancyMonth,
  enableOrDisabledYear,
  enableOrDisabledMonth
} from '@custormManager/api/sysBaseSet/monthYearManager';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取年份列表
  GetAccountancyYear({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      getAccountancyYear(obj).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 新增年份
  AddAccountancyYear({
    state
  }, list) {
    return new Promise((resolve, reject) => {
      addAccountancyYear(list).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 删除年份
  DeleteAccountancyYear({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteAccountancyYear(id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 审核年份
  ConfigAccountancyYear({
    state
  }, row) {
    return new Promise((resolve, reject) => {
      configAccountancyYear(row).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 获取月份列表
  GetAccountancyMonth({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      getAccountancyMonth(obj).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 新增月份
  AddAccountancyMonth({
    state
  }, list) {
    return new Promise((resolve, reject) => {
      addAccountancyMonth(list).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 删除年份
  DeleteAccountancyMonth({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteAccountancyMonth(id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 审核月份
  ConfigAccountancyMonth({
    state
  }, row) {
    return new Promise((resolve, reject) => {
      configAccountancyMonth(row).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  /**
  * 启用 禁用 年份
   * */
  EnableOrDisabledYear({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      enableOrDisabledYear(obj).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  /**
   * 启用 禁用 月份
   * */
  EnableOrDisabledMonth({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      enableOrDisabledMonth(obj).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
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
