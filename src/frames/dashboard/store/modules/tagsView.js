const tagsView = {
  state: {
    visitedViews: [],
    menuViews: [],
    cachedViews: [],
    basePage: {}
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      let title = view.meta.title;
      // tag页签上可以增加信息
      const names = ['videoDetail', 'historyVideoDetail', 'borrowTrackDetail'];
      if (names.includes(view.name)) {
        if (view.query.name) {
          title += `-${view.query.name}`;
        } else if (view.params.id) {
          title += `-${view.params.id}`;
        } else {
          title = view.meta.title;
        }
      }
      let icon = view.meta.icon;
      if (state.basePage.menu && state.basePage.menu.meta.icon) {
        icon = state.basePage.menu.meta.icon;
      }
      state.visitedViews.push(
        Object.assign({}, view, {
          title: title || 'no-name',
          icon: icon || ''
        })
      );
    },
    ADD_MENU_VIEW: (state, obj) => {
      const view = obj.$route;
      state.basePage.code = view.meta.code || view.name;
      state.basePage.name = view.meta.title;
      state.basePage.menuCode = view.meta.menuCode || obj.$utilsBasic.getDeleteDetailInfo(view.name, view.meta.title).code;
      const routesMenuLeaf = obj.$store.state.permission.routesMenuLeaf;
      // 获取
      const menuCodeObj = routesMenuLeaf.find(v => v.meta.code === state.basePage.menuCode);
      if (menuCodeObj) {
        const apiUrl = view.meta.apiUrl || menuCodeObj.meta.apiUrl;
        if (apiUrl) {
          const apiUrlArray = apiUrl.split('/');
          state.basePage.productAlias = apiUrlArray[2];
          state.basePage.pageCode = apiUrlArray[3];
        } else {
          state.basePage.productAlias = menuCodeObj.meta.productMark;
          state.basePage.pageCode = state.basePage.menuCode;
        }
        state.basePage.menu = menuCodeObj;
      } else {
        state.basePage.menu = null;
      }
      state.basePage.route = view;
      // console.log('state.basePage', state.basePage);
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return;
      if (view.meta.isCache) {
        state.cachedViews.push(view.name);
      }
    },

    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_MENU_VIEW: (state, obj) => {
      const view = obj.$route;
      const deleteDetailCode = obj.$utilsBasic.getDeleteDetailInfo(view.name, view.meta.title);
      if (state.menuViews.some(v => v.name === deleteDetailCode.code)) return;
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path;
      });
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, index + 1);
          break;
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: state => {
      // keep affix tags
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    DEL_ALL_MENU_VIEWS: state => {
      state.menuViews = [];
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = [];
    },

    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    }

  },
  actions: {
    addView({ dispatch }, obj) {
      const view = obj.$route;
      dispatch('addMenuView', obj);
      dispatch('addVisitedView', view);
      dispatch('addCachedView', view);
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view);
    },
    addMenuView({ commit }, view) {
      commit('ADD_MENU_VIEW', view);
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view);
    },

    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view);
        dispatch('delCachedView', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view);
        resolve([...state.visitedViews]);
      });
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_CACHED_VIEW', view);
        resolve([...state.cachedViews]);
      });
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view);
        dispatch('delOthersCachedViews', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view);
        resolve([...state.cachedViews]);
      });
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view);
        dispatch('delAllCachedViews', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delAllViewsProduct({ dispatch, state }, view) {
      return new Promise(resolve => {
        var views = state.visitedViews.concat();
        // eslint-disable-next-line no-unused-vars
        for (const [i, v] of views.entries()) {
          if (!((v.path && v.path.includes('/' + view.path.split('/')[1] + '/')) || v.meta.affix)) {
            dispatch('delVisitedView', v);
            dispatch('delCachedView', v);
          }
        }
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS');
        resolve([...state.visitedViews]);
      });
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS');
        resolve([...state.cachedViews]);
      });
    },

    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view);
    }
  }
};

export default tagsView;
