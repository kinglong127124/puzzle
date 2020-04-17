export default function(menusRouter, productName) {
  let router = [];
  console.log('menusRouter', menusRouter, productName);
  // 动态路由
  for (let item of menusRouter) {
    let path= item.href;
      if (item.href && item.href.indexOf('/detail') > -1) {
          path = "/" + item.href + '/id/:id*';
      }
      router.push({
          name: item.code,
          path: "/" + productName + item.page,
          component: () =>
              import(
                  /* webpackChunkName: "views/[request]" */
                `../views${item.page}`
                  ),
          meta: Object.assign({ menuCode: item.code, ...item }, {
            isCache: item.isCache == 1,
            isAffix: item.affix == 1,
            name: item.title,
            productName: productName,
            resource: item.resource ? item.resource : []
          })
      });
    console.log(`${productName}`, productName);
  }
  return router;
}
