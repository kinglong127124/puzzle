import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';// progress bar style
import {getToken, getCookie} from '@core/utils/auth'; // getToken from cookie
import {logout} from '@core/utils/index';
import {getMenus} from "./api/frame";
import _import from "./scripts/_import";
import _import_map from "./scripts/_import_map";
import {handleMenus} from "./scripts/utils";


// NProgress.configure({showSpinner: false});// NProgress Configuration

// const whiteList = ['/login', '/auth-redirect', '/register', '/choose', '/forgetPassword'];// no redirect whitelist
//

// router.beforeEach(async (to, from, next) => {
//   NProgress.start(); // start progress bar
//   if (getToken()) { // determine if there has token
//     /* has token*/
//     if (to.path === '/login') {
//       next({path: '/'});
//       NProgress.done();
//     } else {
//       const sysUserIdOrigin = store.state.user.login.userId;
//       const sysUserId = getCookie('userIdSuper');
//       if (sysUserIdOrigin && sysUserId && sysUserId != sysUserIdOrigin) {
//         logout('亲，您已被登出，请重新登录！', 'warning');
//         return false;
//       }
//       const selectedCode = to.fullPath.split('/')[1];
//       if (!store.getters.isLoadMenuData) { // 判断当前用户是否已拉取完user_info信息
//       store.dispatch('IsLoadMenuData', true);
//       //   store.dispatch('GetInfo').then(async response => { // 拉取user_info
//       //     debugger;
//       //     console.log('GetInfo', response);
//       //     store.dispatch('RootMenusSelected', selectedCode);
//       //     // store.dispatch('RootMenusSelected', selectedCode);
//       //     let rootMenus = this.$store.getters.rootMenus;
//       //     // console.log('menus1', rootMenus);
//       //     let res = await getMenus();
//       //
//       //     // 保存菜单
//       //     let menus = res.data;
//       //     store.commit("SET_MENUS", rootMenus);
//       //     console.log('menus', menus);
//       //     // 获取缓存map
//       //     const modulesMap = await _import_map();
//       //
//       //     // 获取架构
//       //     let frame = await _import(
//       //       "frames",
//       //       PUZZLE_CONFIG.frame,//localStorage.getItem("frame") ||
//       //       modulesMap
//       //     );
//       //     this.$router.addRoutes(frame.routerStatic);
//       //     // 嵌套路由 / 默认两级路由
//       //     let childRouter = frame.routerStatic.filter(item => item.path == "/");
//       //     // Store
//       //     for (let name in frame.store)
//       //       store.registerModule(name, frame.store[name]);
//       //
//       //     let pages = childRouter[0].children;
//       //     // 获取模块 / 异步获取
//       //     for (let puzzle of rootMenus) {
//       //       Vue.set(puzzle, 'id', puzzle.code);
//       //       Vue.set(puzzle, 'page', puzzle.href);
//       //       Vue.set(puzzle, 'name', puzzle.title);
//       //       Vue.set(puzzle, 'puzzle', puzzle.code);
//       //       if (puzzle.type == 'menu') {
//       //         Vue.set(puzzle, 'leaf', true);
//       //       } else {
//       //         Vue.set(puzzle, 'leaf', false);
//       //       }
//       //       _import("puzzles", puzzle.id, modulesMap)
//       //         .then(p => {
//       //           // 需要生成路由的菜单
//       //           let menusRouter = [];
//       //           handleMenus(Vue, puzzle.children, menusRouter);
//       //           console.log('menusRouter', menusRouter);
//       //           // 路由
//       //           childRouter[0].children = p
//       //             .router(menusRouter, puzzle.id)
//       //             .concat(p.routerStatic);
//       //           pages.push(...childRouter[0].children);
//       //           router.addRoutes(childRouter);
//       //           // Store
//       //           for (let name in p.store)
//       //             store.registerModule(name, p.store[name]);
//       //         })
//       //         .catch(err => {
//       //           console.log(err);
//       //         });
//       //     }
//       //     // 储存路由表
//       //     store.commit("SET_PAGES", pages);
//       //     console.log('pages', pages);
//       //     next({...to, replace: true});
//       //   }).catch((err) => {
//       //     console.log(err);
//       //     store.dispatch('FedLogOut').then(() => {
//       //       next({path: '/'});
//       //     });
//       //   });
//         next({...to, replace: true});
//       } else {
//         store.dispatch('RootMenusSelected', selectedCode);
//         next();
//       }
//     }
//   } else {
//     /* has no token*/
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next();
//     } else {
//       next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
//       NProgress.done();
//     }
//   }
// });

// router.afterEach((to, from) => {
//   // if(from.path != '/register' &&from.path != '/login' && from.path != '/' && to.path == '/login'){
//   //   window.location.reload();
//   // }
//   NProgress.done();
// });
