import { loginByPhone, logout, getInfo } from '@framesDashboard/api/user/login';
import { getToken, setToken, removeToken, removeKey, setCookie } from '@core/utils/auth';

const state = {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  name: '',
  userId: '',
  avatar: '',
  introduction: '',
  roles: [],
  menus: undefined,
  elements: [],
  permissionMenus: undefined,
  setting: {
    articlePlatform: []
  },
  sysUnitId: '',
  username: '',
  imageUrl: '',
  authCode: '',
  orgName: '',
  orgId: '',
  mobilePhone: '',
  inputPersonFullPath: ''
};
const getters = {};
const actions = {
  /**
   * 手机登录
   * @param commit
   * @param msg
   * @returns {Promise<any>}
   * @constructor
   */
  LoginByPhone({ commit }, userInfo) {
    const username = userInfo.username.trim();
    commit('SET_TOKEN', '');
    commit('SET_ROLES', []);
    commit('SET_MENUS', undefined);
    commit('SET_ELEMENTS', undefined);
    removeToken();
    return new Promise((resolve, reject) => {
      loginByPhone(username, userInfo.password).then(response => {
        setToken(response.data);
        commit('SET_TOKEN', response.data);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  /**
   * 初始化信息
   * @param commit
   * @param state
   * @returns {Promise<any>}
   * @constructor
   */
  GetInfo({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(async response => {
        const data = response.data;
        // 用户
        commit('SET_SYSUNITID', data.sysUserId);
        commit('SET_USERNAME', data.username);
        commit('SET_IMAGE_URL', data.image);
        commit('SET_AUTHCODE', data.authCode);
        commit('SET_USER_ID', data.id);
        commit('SET_NAME', data.name);
        commit('SET_ORG_NAME', data.orgName);
        commit('SET_ORG_ID', data.orgId);
        commit('SET_MOBILE_PHONE', data.mobilePhone);
        commit('INPUT_PERSONFULLPATH', data.inputPersonFullPath);
        setCookie('inputPersonFullPathSuper', data.inputPersonFullPath);
        setCookie('sysUnitIdSuper', data.sysUserId);
        setCookie('authCodeSuper', data.authCode);
        setCookie('userIdSuper', data.id);
        // 根菜单
        await dispatch('RootMenus', data, { root: true });
        // 按钮
        const elements = {};
        for (let i = 0; i < data.elements.length; i++) {
          elements[data.elements[i].code] = true;
        }
        commit('SET_ELEMENTS', elements);

        // 菜单列表
        const menusList = data.menus;
        const menus = {};
        for (let i = 0; i < menusList.length; i++) {
          menus[menusList[i].code] = menusList[i];
        }
        // commit('SET_MENUS', menus);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 第三方验证登录
  // LoginByThirdparty({ commit, state }, code) {
  //   return new Promise((resolve, reject) => {
  //     commit('SET_CODE', code)
  //     loginByThirdparty(state.status, state.email, state.code).then(response => {
  //       commit('SET_TOKEN', response.data.token)
  //       setToken(response.data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 前后端登出
  LogOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      const params = { mobilePhone: state.mobilePhone, userId: state.sysUnitId };
      logout(params).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('SET_MENUS', undefined);
        commit('SET_ELEMENTS', undefined);
        commit('SET_PERMISSION_MENUS', undefined);
        commit('SCREEN_HEIGHT', undefined);
        commit('ROOT_MENUS', undefined);
        commit('ROOTMENUS_SELECTED', undefined);
        commit('MENUS_SEARCH', undefined);
        commit('CHILDREN_MENUS', undefined);
        commit('IS_LOADMENUDATA', undefined);
        removeToken();
        removeKey('inputPersonFullPathSuper');
        removeKey('sysUnitIdSuper');
        removeKey('authCodeSuper');
        removeKey('userIdSuper');
        localStorage.clear();
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 前端 登出
  FedLogOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      commit('SET_MENUS', undefined);
      commit('SET_ELEMENTS', undefined);
      commit('SET_PERMISSION_MENUS', undefined);
      commit('SCREEN_HEIGHT', undefined);
      commit('ROOT_MENUS', undefined);
      commit('ROOTMENUS_SELECTED', undefined);
      commit('MENUS_SEARCH', undefined);
      commit('CHILDREN_MENUS', undefined);
      commit('IS_LOADMENUDATA', undefined);
      removeToken();
      removeKey('inputPersonFullPathSuper');
      removeKey('sysUnitIdSuper');
      removeKey('authCodeSuper');
      removeKey('userIdSuper');
      localStorage.clear();
      resolve();
    });
  },

  // 动态修改权限
  ChangeRole({
    commit
  }, role) {
    return new Promise(resolve => {
      commit('SET_ROLES', [role]);
      commit('SET_TOKEN', role);
      setToken(role);
      resolve();
    });
  }
};
const mutations = {
  SET_CODE: (state, code) => {
    state.code = code;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_ORG_NAME: (state, orgName) => {
    state.orgName = orgName;
  },
  SET_ORG_ID: (state, orgId) => {
    state.orgId = orgId;
  },
  SET_MOBILE_PHONE: (state, mobilePhone) => {
    state.mobilePhone = mobilePhone;
  },
  SET_SETTING: (state, setting) => {
    state.setting = setting;
  },
  SET_STATUS: (state, status) => {
    state.status = status;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_ELEMENTS: (state, elements) => {
    state.elements = elements;
  },
  LOGIN_SUCCESS: () => {
    console.log('login success');
  },
  LOGOUT_USER: state => {
    state.user = '';
  },
  SET_PERMISSION_MENUS: (state, permissionMenus) => {
    state.permissionMenus = permissionMenus;
  },
  SET_SYSUNITID: (state, sysUnitId) => {
    state.sysUnitId = sysUnitId;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_IMAGE_URL: (state, imageUrl) => {
    state.imageUrl = imageUrl;
  },
  SET_AUTHCODE: (state, authCode) => {
    state.authCode = authCode;
  },
  INPUT_PERSONFULLPATH: (state, inputPersonFullPath) => {
    state.inputPersonFullPath = inputPersonFullPath;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
