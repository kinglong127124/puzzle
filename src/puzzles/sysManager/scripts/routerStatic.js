export default [
  {
    name: "sysManagerIndex",
    path: "sysManager/index",
    meta: { title: '系统管理-首页', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/index`)
  }
];
