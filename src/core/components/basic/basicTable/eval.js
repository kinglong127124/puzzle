import Vue from 'vue';

export function addAttrs(data) {
  data.forEach((item, index) => {
    const tableRowId = index + '';
    Vue.set(item, 'tableRowId', tableRowId);
    Vue.set(item, 'listId', tableRowId);// 保存到后端
    const tableCode = (index < 9 ? '0' + (index + 1 + '') : (index + 1 + '')) + '';
    Vue.set(item, 'tableCode', tableCode);
  });
}
