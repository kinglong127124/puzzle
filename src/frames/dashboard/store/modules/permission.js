export default {
  state: {
    pages: [],
    routers: [],
    addRouters: [],
    routesMenuLeaf: []
  },
  getters: {
    pages: state => state.pages
  },
  mutations: {
    SET_PAGES: (state, pages) => {
      state.pages = pages;
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routers;
    }
  }
};
