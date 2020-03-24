import prodInfo from './sysInfo/prodInfo';
import authInfo from './sysInfo/authInfo';
import sysDataDictionary from './sysBaseSet/dataDictionary';
import measureUnit from './sysBaseSet/measureUnit';
import monthYearManager from './sysBaseSet/monthYearManager';
import areaManager from './sysBaseSet/areaManager';

const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
  modules: {
    prodInfo,
    authInfo,
    measureUnit,
    monthYearManager,
    sysDataDictionary,
    areaManager
  }
};
