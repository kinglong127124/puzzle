import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium',
    screenHeight: 0,
    screenWidth: 0,
    menuItem: {},
    cacheId: undefined// 用于列表到详情缓存
  },
  mutations: {
    UPDATE_MENU_ITEM: (state, data) => {
      state.menuItem = data;
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set('language', language);
    },
    SET_SIZE: (state, size) => {
      state.size = size;
      Cookies.set('size', size);
    },
    SCREEN_HEIGHT: (state, screenHeight) => {
      state.screenHeight = screenHeight;
      Cookies.set('screenHeight', screenHeight);
    },
    SCREEN_WIDTH: (state, screenWidth) => {
      state.screenWidth = screenWidth;
      Cookies.set('screenWidth', screenWidth);
    },
    CACHE_ID: (state, cacheId) => {
      state.cacheId = cacheId;
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size);
    },
    screenHeight({ commit }, screenHeight) {
      commit('SCREEN_HEIGHT', screenHeight.innerHeight);
    },
    screenWidth({ commit }, screenWidth) {
      commit('SCREEN_WIDTH', screenWidth.innerWidth);
    },
    cacheId({ commit }, cacheId) {
      commit('CACHE_ID', cacheId);
    }
  }
};

export default app;
