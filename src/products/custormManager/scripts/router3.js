export default function(menusRouter, productName) {
  let router = [];
  // 动态路由
  for (let item of menusRouter) {
    let path="/" + productName + item.page;
      if (item.page && item.page.indexOf('/detail') > -1) {
          path = "/" + productName + item.page + '/id/:id*';
      }
      console.log(item.page);
      router.push({
          name: item.id,
          path: "/" + productName + item.page,
          component: () =>
              import(
                  /* webpackChunkName: "views/[request]" */
                  `../views${item.page}`
                  ),
          meta: {
              productName: productName,
              name: item.title,
              resource: item.resource ? item.resource : []
          }
      });
  }
  return router;
}
