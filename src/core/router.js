import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/";
// import NProgress from 'nprogress'; // progress bar
// import 'nprogress/nprogress.css';// progress bar style
// import {getToken, getCookie} from '@core/utils/auth'; // getToken from cookie
// import {logout} from '@core/utils/index';

Vue.use(VueRouter);

// 创建一个路由器实例
const router = new VueRouter({
  mode: "hash",
  // base: "__dirname",
  routes: [],
  // 设置滚动条位置
  scrollBehavior: to => {
    if (document.getElementById("con")) {
      if (to.meta.scrollTop)
        document.getElementById("con").scrollTop = to.meta.scrollTop;
      else document.getElementById("con").scrollTop = 0;
    }
  }
});

// 记录滚动条位置
function markScroll(to, from, next) {
  if (document.getElementById("con"))
    from.meta.scrollTop = document.getElementById("con").scrollTop;
  // 根据url打开标签
  if (
    !from.name &&
    to.path != "/mainIndex" &&
    to.name &&
    PUZZLE_CONFIG.pageHome != to.name
  ) {
    store.commit("ADD_TAB", to.name);
  }
}
// NProgress.configure({showSpinner: false});// NProgress Configuration
// const whiteList = ['/login', '/auth-redirect', '/register', '/choose', '/forgetPassword'];// no redirect whitelist
// router.beforeEach((to, from, next) => {
//   markScroll(to, from, next);
//   NProgress.start(); // start progress bar
//   // console.log('getToken()',getToken());
//   // console.log('to.path',to.path);
//   if (getToken()) { // determine if there has token
//     /* has token*/
//     if (to.path === '/login') {
//       next({path: '/'});
//       NProgress.done();
//     } else {
//       next();
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
// 防止路由到错误地址
// router.beforeEach((to, from, next) => {
//   if (to.matched.length > 0)
//     next();
// });

// 错误捕获
// router.onError(err => { });


console.log('router', 'router');
export default router;
