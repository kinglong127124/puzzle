export default function(menusRouter, puzzleName) {
  let router = [];
  console.log('menusRouter', menusRouter, puzzleName);
  // 动态路由
  for (let item of menusRouter) {
    let path= item.href;
      if (item.href && item.href.indexOf('/detail') > -1) {
          path = "/" + item.href + '/id/:id*';
      }
      router.push({
          name: item.code,
          path: "/" + puzzleName + item.page,
          component: () =>
              import(
                  /* webpackChunkName: "views/[request]" */
                `../views${item.page}`
                  ),
          meta: Object.assign({ menuCode: item.code, ...item }, {
            isCache: item.isCache == 1,
            isAffix: item.affix == 1,
            name: item.title,
            puzzleName: puzzleName,
            resource: item.resource ? item.resource : []
          })
      });
    console.log(`${puzzleName}`, puzzleName);
  }
  return router;
}
