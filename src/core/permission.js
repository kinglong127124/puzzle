import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';// progress bar style
import { getToken, getCookie } from '@core/utils/auth'; // getToken from cookie
import { logout } from '@core/utils/index';
import { getMenus } from "./api/frame";
import _import from "./scripts/_import";
import _import_map from "./scripts/_import_map";
import { handleMenus } from "./scripts/utils";


NProgress.configure({ showSpinner: false });// NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/register', '/choose', '/forgetPassword'];// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const sysUserIdOrigin = store.state.user.login.userId;
      const sysUserId = getCookie('userIdSuper');
      if (sysUserIdOrigin && sysUserId && sysUserId != sysUserIdOrigin) {
        logout('亲，您已被登出，请重新登录！', 'warning');
        return false;
      }
      const selectedCode = to.fullPath.split('/')[1];
      if (!store.getters.isLoadMenuData) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('IsLoadMenuData', true);
      //   store.dispatch('GetInfo').then(async response => { // 拉取user_info
      //     console.log('GetInfo', response);
      // store.dispatch('RootMenusSelected', selectedCode);
      // let res = await getMenus();
      //
      // // 保存菜单
      // let menus = res.data;
      // // const menus = store.getters.rootMenus;
      // store.commit("SET_MENUS", menus);
      // console.log('rootMenus', menus);
      //
      // // 获取缓存map
      // const modulesMap = await _import_map();
      // // 获取架构
      // let frame = await _import(
      //   "frames",
      //   localStorage.getItem("frame") || PUZZLE_CONFIG.frame,
      //   modulesMap
      // );
      // router.addRoutes(frame.routerStatic);
      // // 嵌套路由 / 默认两级路由
      // let childRouter = frame.routerStatic.filter(item => item.path == "/");
      // // Store
      // for (let name in frame.store)
      //   store.registerModule(name, frame.store[name]);
      //
      // let pages = childRouter[0].children;
      //
      // // 获取模块 / 异步获取
      // for (let puzzle of menus)
      //   _import("puzzles", puzzle.id, modulesMap)
      //     .then(p => {
      //       // 需要生成路由的菜单
      //       let menusRouter = [];
      //       // handleMenus(puzzle.children, menusRouter);
      //       // 路由
      //       childRouter[0].children = p
      //         .router(menusRouter, puzzle.id)
      //         .concat(p.routerStatic);
      //       pages.push(...childRouter[0].children);
      //       router.addRoutes(childRouter);
      //       // Store
      //       for (let name in p.store)
      //         store.registerModule(name, p.store[name]);
      //     })
      //     .catch(err => {});
      // // 储存路由表
      // store.commit("SET_PAGES", pages);
      // console.log(pages);
      next({...to, replace: true});
      // }).catch((err) => {
      //   console.log(err);
      //   store.dispatch('FedLogOut').then(() => {
      //     next({ path: '/' });
      //   });
      // });
      } else {
        store.dispatch('RootMenusSelected', selectedCode);
        next();
      }
    }
  } else {
    debugger;
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach((to, from) => {
  // if(from.path != '/register' &&from.path != '/login' && from.path != '/' && to.path == '/login'){
  //   window.location.reload();
  // }
  NProgress.done();
});
