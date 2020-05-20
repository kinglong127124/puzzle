// 暴露接口
import {
  getArea,
  addArea,
  deleteArea,
  configArea,
  putEnableOrDisableArea
} from '@custormManager/api/sysBaseSet/areaManager';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取主菜单列表
  GetArea({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      getArea(obj).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  AddArea({
    state
  }, list) {
    return new Promise((resolve, reject) => {
      addArea(list).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  DeleteArea({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteArea(id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  ConfigArea({
    state
  }, row) {
    return new Promise((resolve, reject) => {
      configArea(row).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  PutEnableOrDisableArea({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      putEnableOrDisableArea(id).then(response => {
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
