// 暴露接口
import {
  getAllMenus
} from '@productsCustorm/api/sysInfo/authInfo';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取主菜单列表
  GetAllMenus({
    state
  }) {
    return new Promise((resolve, reject) => {
      getAllMenus().then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
  // 获取产品列表
  /* GetGoodslist({
	  		state
	  	},page,limit){
	  		return new Promise((resolve, reject) => {
	  			getGoodslist(page,limit).then(response => {
		  				resolve(response);
		  		}).catch(error => {
		        reject(error);
		      })
	  		}).catch(error => {
        reject(error);
      });
	},
	  //获取产品信息
  	GetGoods({
	  		state
	  	},productId){
	  		return new Promise((resolve, reject) => {
	  			getGoods(productId).then(response => {
		  				resolve(response);
		  		}).catch(error => {
		        reject(error);
		      })
	  		}).catch(error => {
        reject(error);
      });
	  }*/
};

export default {
  state,
  getters,
  actions,
  mutations
};
