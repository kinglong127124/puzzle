import { getAllMenus } from '@core/api/layout';
import { getMenusLeafList, getMarkSelected } from '@core/utils';

const layout = {
  state: {
    rootMenus: [],
    childrenMenus: [],
    productId: 0,
    rootMenusSelected: '',
    menusSearch: undefined,
    isLoadMenuData: false,
    rootMenusLeaf: []
  },
  mutations: {
    ROOT_MENUS: (state, rootMenus) => {
      state.rootMenus = rootMenus;
    },
    CHILDREN_MENUS: (state, childrenMenus) => {
      state.childrenMenus = childrenMenus;
    },
    PRODUCT_ID: (state, productId) => {
      state.productId = productId;
    },
    ROOTMENUS_SELECTED: (state, rootMenusSelected) => {
      state.rootMenusSelected = rootMenusSelected;
    },
    MENUS_SEARCH: (state, menusSearch) => {
      state.menusSearch = menusSearch;
    },
    IS_LOADMENUDATA: (state, isLoadMenuData) => {
      state.isLoadMenuData = isLoadMenuData;
    },
    ROOT_MENU_LEAF: (state, rootMenusLeaf) => {
      state.rootMenusLeaf = rootMenusLeaf;
    }
  },
  actions: {
    // 切换子菜单
    ChildrenMenus({
      commit,
      state
    }, menu) {
      return new Promise((resolve, reject) => {
        if (menu && menu['children'].length > 0) {
          // 如果存在被选中菜单，获取左边菜单
          commit('CHILDREN_MENUS', menu['children']);
          // 如果存在被选中菜单，获取左边搜索叶子节点数据
          commit('MENUS_SEARCH', getMenusLeafList(menu['children']));
        } else {
          commit('CHILDREN_MENUS', []);
          commit('MENUS_SEARCH', []);
        }
        resolve();
      });
    },
    // 获取产品信息
    RootMenus({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getAllMenus().then(response => {
          const menuDataAll = response.data;
          if (menuDataAll && menuDataAll.length > 0) {
            commit('ROOT_MENUS', menuDataAll);
            let isSelected = false;
            // 获得被选中的值
            for (const row in menuDataAll) {
              // 获得被选中的标识
              if (menuDataAll[row].productMark && menuDataAll[row].productMark == getMarkSelected()) {
                commit('ROOTMENUS_SELECTED', menuDataAll[row]);
                // 如果存在被选中菜单，获取左边菜单
                // commit('CHILDREN_MENUS', menuDataAll[selectedObj].children);
                // 如果存在被选中菜单，获取左边搜索叶子节点数据
                // commit('MENUS_SEARCH', getMenusLeafList(menuDataAll[selectedObj].children));
                isSelected = true;
                break;
              }
            }
            if (!isSelected) {
              commit('ROOTMENUS_SELECTED', menuDataAll[0]);
            }
          }
          resolve(menuDataAll);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 设置根菜单选中
    RootMenusSelected({
      commit,
      state
    }, data) {
      return new Promise(resolve => {
        if (data) {
          const menuDataAll = state.rootMenus;
          for (const selectedObj in menuDataAll) {
            if (menuDataAll[selectedObj].code == data) {
              commit('ROOTMENUS_SELECTED', menuDataAll[selectedObj]);
              break;
            }
          }
        }
      });
    },
    // 是否加载完数据完毕
    IsLoadMenuData({
      commit
    }) {
      return new Promise(resolve => {
        commit('IS_LOADMENUDATA', true);
      });
    },
    RootMenusLeaf({
      commit
    }, data) {
      return new Promise(resolve => {
        const leafList = getMenusLeafList(data.menuDataAll);
        commit('ROOT_MENU_LEAF', leafList);
        resolve();
      });
    }
  }
};
export default layout;
