import Vue from 'vue';

// Flattened array
export default function treeToArray(data, children = 'children', isLoadAll) {
  let tmp = [];
  data.forEach((item, index) => {
    Vue.set(item, 'treeRowIndex', index);
    tmp.push(item);
    if (isLoadAll) {
      if (item[children] && item[children].length > 0) {
        const res = treeToArray(item[children], children, isLoadAll);
        tmp = tmp.concat(res);
      }
    } else {
      if (item[children] && item[children].length > 0 && item.treeRowExpand) {
        const res = treeToArray(item[children], children, isLoadAll);
        tmp = tmp.concat(res);
      }
    }
  });
  return tmp;
}

export function addAttrs(data, { parent = null, preIndex = false, treeCode = '', level = 1, expand = false, children = 'children', show = true, select = false, isLoadAll } = {}) {
  let tmp = [];
  data.forEach((item, index) => {
    Vue.set(item, 'treeRowIndex', index);
    const treeRowId = (preIndex ? `${preIndex}-${index}` : index) + '';
    Vue.set(item, 'treeRowId', treeRowId);
    Vue.set(item, 'treeId', treeRowId);// 保存到后端
    const treeRowCode = (treeCode ? `${treeCode}` + (index < 9 ? '0' + (index + 1 + '') : (index + 1 + '')) : (index < 9 ? '0' + (index + 1 + '') : (index + 1 + ''))) + '';
    Vue.set(item, 'treeRowCode', treeRowCode);
    if (item.treeRowExpand == undefined) {
      Vue.set(item, 'treeRowExpand', expand);
    }
    Vue.set(item, 'treeRowLevel', level);
    // 如果有父元素
    if (parent) {
      Vue.set(item, 'treeRowParent', parent);
    }
    Vue.set(item, 'treeRowShow', false);
    Vue.set(item, 'treeRowSelect', select);
    if (item.treeRowVisible == undefined) {
      Vue.set(item, 'treeRowVisible', true);
    }
    Vue.set(item, 'persistStatus', 'nrm');
    tmp.push(item);
    if (item[children] && item[children].length > 0) {
      if (isLoadAll) {
        const res = addAttrs(item[children], {
          parent: item,
          level: level + 1,
          expand,
          preIndex: treeRowId,
          treeCode: treeRowCode,
          children,
          status,
          select,
          isLoadAll
        });
        tmp = tmp.concat(res);
      } else {
        if (item.treeRowExpand) {
          const res = addAttrs(item[children], {
            parent: item,
            level: level + 1,
            expand,
            preIndex: treeRowId,
            treeCode: treeRowCode,
            children,
            status,
            select,
            isLoadAll
          });
          tmp = tmp.concat(res);
        }
      }
      Vue.set(item, 'treeRowLeaf', false);
    } else {
      Vue.set(item, 'treeRowLeaf', true);
    }
  });
  return tmp;
}

export function cleanParentAttr(data, children = 'children') {
  data.forEach(item => {
    item.treeRowParent = null;
    if (item[children] && item[children].length > 0) {
      addAttrs(item[children], children);
    }
  });
  return data;
}
