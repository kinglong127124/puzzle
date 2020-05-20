// 产品信息
import api from '@custormManager/api/sysInfo/prodInfo';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  GetGoodslist({
    state
  }, params) {
    return new Promise((resolve, reject) => {
      api.static.getPage(params).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  // 获取产品信息
  GetGoods({
    state
  }, params) {
    return new Promise((resolve, reject) => {
      api.static.getProductMenuTreeAll(params).then(response => {
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
