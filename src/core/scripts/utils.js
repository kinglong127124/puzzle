// 处理菜单
export function handleMenus(menus, result) {
  for (let item of menus) {
    if (!(item.children && item.children.length > 0)) result.push(item);
    else if (item.children && item.children.length > 0) handleMenus(item.children, result);
  }
}
