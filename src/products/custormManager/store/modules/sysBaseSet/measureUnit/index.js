// 暴露接口
import {
  getMeasureUnit,
  addMeasureUnit,
  deleteMeasureUnit,
  configMeasureUnit,
  putSysConfigUnits
} from '@productsCustorm/api/sysBaseSet/measureUnit';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取主菜单列表
  GetMeasureUnit({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      getMeasureUnit(obj).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  AddMeasureUnit({
    state
  }, list) {
    return new Promise((resolve, reject) => {
      addMeasureUnit(list).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  DeleteMeasureUnit({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteMeasureUnit(id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  ConfigMeasureUnit({
    state
  }, row) {
    return new Promise((resolve, reject) => {
      configMeasureUnit(row).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  PutSysConfigUnits({ state }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigUnits(obj).then(response => {
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
