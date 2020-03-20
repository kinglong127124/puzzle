export default [
  // {
  //   name: "productManagerDetail",
  //   path: "/custormManager/sysInfo/productManager/id/:id*",
  //   meta: { title: '产品管理-详情', icon: 'dashboard', isCache: true, affix: false },
  //   component: () =>
  //     import(/* webpackChunkName: "views/[request]" */ `../views/sysInfo/productManager/detail`)
  // },
  {
    name: "unitInfoDetail",
    path: "/custormManager/sysInfo/unitInfo/id/:id*",
    meta: { title: '客户注册-详情', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/sysInfo/unitInfo/detail`)
  }
  // {
  //   name: "businessContractDetail",
  //   path: "/custormManager/sysInfo/businessManager/businessContract/id/:id*",
  //   meta: { title: '商务合同-详情', icon: 'dashboard', isCache: true, affix: false },
  //   component: () =>
  //     import(/* webpackChunkName: "views/[request]" */ `../views/sysInfo/businessManager/businessContract/detail`)
  // }
];
