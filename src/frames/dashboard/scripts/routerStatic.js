
/* Layout */
import Layout from '../views/layout/Layout';

export default [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "views/redirect" */ '../views/redirect'),
        meta: { isCache: false }
      }
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "views/Login" */ "../views/user/login")
  },
  {
    path: "/",
    name: 'dashboardIndex',
    component: () => import(/* webpackChunkName: "views/layout" */ "../views/layout/Layout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard",
      },
      {
        path: "/dashboard",
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "views/dashboard" */ "../views/dashboard/index"),
        meta: { title: '首页', icon: 'dashboard', isCache: true, affix: true }
      }
    ]
  },
  {
    name: "custormManager",
    path: "/custormManager",
    redirect: '/custormManager/index',
    meta: { title: '客户管理-首页', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/layout/Layout`)
  },
  {
    name: "sysManager",
    path: "/sysManager",
    redirect: '/sysManager/index',
    meta: { title: '系统管理-首页', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/layout/Layout`)
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "views/errorPage" */ '../views/errorPage/404')
  },
  { path: '*', redirect: '/404', hidden: true }
];
