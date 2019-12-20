export default [
  {
    name: "productManagerDetail",
    path: "/custormManager/sysInfo/productManager/id/:id*",
    meta: {
      name: "产品管理-详情"
    },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/sysInfo/productManager/detail`)
  },
  {
    name: "unitInfoDetail",
    path: "/custormManager/sysInfo/unitInfo/id/:id*",
    meta: {
      name: "客户管理-详情"
    },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/sysInfo/unitInfo/detail`)
  }
];
