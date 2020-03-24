export default [
  {
    name: "custormManagerIndex",
    path: "/custormManager/index",
    meta: { title: '客户管理-首页', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/index`)
  },
  {
    name: "unitInfoDetail",
    path: "/custormManager/id/:id*",
    meta: { title: '客户注册-详情', icon: 'dashboard', isCache: true, affix: false },
    component: () =>
      import(/* webpackChunkName: "views/[request]" */ `../views/sysInfo/unitInfo/detail`)
  },
  {
    path: 'businessContract/id/:id*',
    component: () => import(/* webpackChunkName: "views/[request]" */ '../views/sysInfo/businessManager/businessContract/detail'),
    name: 'businessContractDetail',
    meta: { title: '商务合同-详情', icon: 'dashboard', isCache: true, affix: false }
  }, {
    path: 'resultsFile/id/:id*',
    component: () => import(/* webpackChunkName: "views/[request]" */ '../views/sysInfo/businessManager/resultsFile/detail'),
    name: 'resultsFileDetail',
    meta: { title: '成果文件-详情', icon: 'dashboard', isCache: true, affix: false }
  }, {
    path: 'serviceLog/id/:id*',
    component: () => import(/* webpackChunkName: "views/[request]" */ '../views/sysInfo/businessManager/serviceLog/detail'),
    name: 'serviceLogDetail',
    meta: { title: '服务记录-详情', icon: 'dashboard', isCache: true, affix: false }
  }, {
    path: 'expansion/id/:id*',
    component: () => import(/* webpackChunkName: "views/[request]" */ '../views/sysInfo/businessManager/expansion/detail'),
    name: 'expansionDetail',
    meta: { title: '扩容处理-详情', icon: 'dashboard', isCache: true, affix: false }
  }
];
