
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
    component: () =>
      import(/* webpackChunkName: "views/Login" */ "../views/user/login")
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "views/Frame" */ "../views/Frame/"),
    children: [
      {
        path: "/",
        redirect: "/home"
      },
      {
        path: "/home",
        component: () =>
          import(/* webpackChunkName: "views/Home" */ "../views/Home")
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboardIndex',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "views/dashboard" */ '../views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', isCache: true, affix: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "views/errorPage" */ '../views/errorPage/404')
  }
];
