export default [
  {
    name: "sysManagerIndex",
    path: "sysManager/index",
    meta: { title: '系统管理-首页', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/index`)
  },
  {
    path: 'sysManager/groupAuth/userManager/id/:id*',
    component: () => import(/* webpackChunkName: "views/[request]" */ '../views/groupAuth/userManager/detail'),
    name: 'userManagerDetail',
    meta: { title: '操作人员-详情', icon: 'dashboard', isCache: true, affix: false }
  }
];
