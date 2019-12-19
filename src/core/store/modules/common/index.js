import dataEnum from './dataEnum';
import dataDictionary from './dataDictionary';
import dataBasic from './dataBasic';

const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
  modules: { dataEnum, dataDictionary, dataBasic }
};
