// 处理菜单
export function handleMenus(obj, menus, result) {
  for (let item of menus) {
    obj.set(item, 'id', item.code);
    obj.set(item, 'page', item.href);
    obj.set(item, 'name', item.title);
    obj.set(item, 'puzzle', item.code);
    // console.log(`${item.type}`,item.code);
    if (item.type == 'menu'){
      obj.set(item, 'leaf', true);
      result.push(item)
    }else{
      obj.set(item, 'leaf', false);
      handleMenus(obj, item.children, result)
    }
  }
}
export function handleMenusApp(obj, menus, result) {
  for (let item of menus) {
    obj.$set(item, 'id', item.code);
    obj.$set(item, 'page', item.href);
    obj.$set(item, 'name', item.title);
    obj.$set(item, 'puzzle', item.code);
    // console.log(`${item.type}`,item.code);
    if (item.type == 'menu'){
      obj.$set(item, 'leaf', true);
      result.push(item)
    }else{
      obj.$set(item, 'leaf', false);
      handleMenusApp(obj, item.children, result)
    }
  }
}
