// 暴露接口
import {
  getSysConfigDataDictionary,
  putSysConfigDataDictionary,
  deleteSysConfigDataDictionary,
  putSysConfigDataDictionaryAudit,
  putSysConfigDataDictionaryEnable,

  getSysConfigDataDictionaryDetail,
  putSysConfigDataDictionaryDetail,
  deleteSysConfigDataDictionaryDetail,
  putSysConfigDataDictionaryDetailAudit,
  putSysConfigDataDictionaryDetailEnable

}
  from '@custormManager/api/sysBaseSet/dataDictionary';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取所有数据
  GetSysConfigDataDictionary({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      getSysConfigDataDictionary(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  PutSysConfigDataDictionary({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigDataDictionary(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  DeleteSysConfigDataDictionary({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteSysConfigDataDictionary(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  PutSysConfigDataDictionaryAudit({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigDataDictionaryAudit(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  PutSysConfigDataDictionaryEnable({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigDataDictionaryEnable(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  GetSysConfigDataDictionaryDetail({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      getSysConfigDataDictionaryDetail(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  PutSysConfigDataDictionaryDetail({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigDataDictionaryDetail(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PutSysConfigDataDictionaryDetailAudit({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigDataDictionaryDetailAudit(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  DeleteSysConfigDataDictionaryDetail({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteSysConfigDataDictionaryDetail(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    });
  },
  PutSysConfigDataDictionaryDetailEnable({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysConfigDataDictionaryDetailEnable(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
