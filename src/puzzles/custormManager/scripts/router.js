export default function (menusRouter, puzzleName) {
  let router = [];
  // 动态路由
  for (let item of menusRouter) {
    const hrefArray = item.href.split('/');
    hrefArray.splice(0, 2);
    const page = hrefArray.join('/');
    // console.log(item, item.href, page);
    router.push({
      name: item.id,
      path: "/" + puzzleName + "/" + page,
      component: () =>
        import(
          /* webpackChunkName: "views/[request]" */
          `../views/${page}`
          ),
      meta: Object.assign({menuCode: item.code, ...item}, {
        isCache: item.isCache == 1,
        isAffix: item.affix == 1,
        name: item.title,
        puzzleName: puzzleName,
        resource: item.resource ? item.resource : []
      })
    });
  }
  return router;
}
