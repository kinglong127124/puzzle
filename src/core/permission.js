import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';// progress bar style
import {getToken, getCookie} from '@core/utils/auth'; // getToken from cookie
import {logout} from '@core/utils/index';

NProgress.configure({showSpinner: false});// NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/register', '/choose', '/forgetPassword'];// no redirect whitelist


router.beforeEach(async (to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({path: '/'});
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
        next({...to, replace: true});
      } else {
        store.dispatch('RootMenusSelected', selectedCode);
        next();
      }
    }
  } else {
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
