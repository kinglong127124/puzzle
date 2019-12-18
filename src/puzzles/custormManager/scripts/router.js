export default function(menusRouter, puzzleName) {
  let router = [];
   console.log('menusRouter', menusRouter, puzzleName);
  // 动态路由
  for (let item of menusRouter) {
    let path="/" + puzzleName + item.page;
      if (item.page && item.page.indexOf('/detail') > -1) {
          path = "/" + puzzleName + item.page + '/id/:id*';
      }
      router.push({
          name: item.id,
          path: "/" + puzzleName + item.page,
          component: () =>
              import(
                  /* webpackChunkName: "views/[request]" */
                  `../views${item.page}`
                  ),
          meta: {
              puzzleName: puzzleName,
              name: item.name,
              resource: item.resource ? item.resource : []
          }
      });
  }
  return router;
}
