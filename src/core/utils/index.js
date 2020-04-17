// import store from 'store';
import { removeToken } from '@core/utils/auth'; // getToken from cookie
import { MessageBox } from 'element-ui';
import { staticDataBasic } from '@core/assets/data/basic';
/**
 * 不常用方法，页面手工导入方式
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time);
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
  ).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  );
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date(new Date().toDateString());
      end.setTime(start.getTime());
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }
];

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (!(keys == 'treeRowParent')) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  });
  return targetObj;
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

export function tags(data) {
  let a = data.recvPerson.slice();
  let b = data.recvPersonId.slice();
  a = a.split(',');
  b = b.split(',');
  const arr = [];
  const arr2 = [];
  for (let i = 0; i < a.length; i++) {
    arr.push({ name: a[i] });
  }
  for (let i = 0; i < b.length; i++) {
    arr2.push({ name: b[i] });
  }
  const arr3 = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (i == j) {
        arr3.push({
          name: arr[i].name,
          id: arr2[j].name
        });
      }
    }
  }
  return arr3;
}

export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '-';
  const seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    ' ' + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds();
  return currentdate;
}

/** * 获取当天日期方法
 * */
export function todayFormat() {
  const dateFormat = new Date();
  const year = dateFormat.getFullYear();
  let month = dateFormat.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let date = dateFormat.getDate();
  if (date < 10) date = '0' + date;
  const time = `${year}-${month}-${date}`;
  return time;
}

/**
 * 日期格式化
 * */
export function dateFormat(dateVal) {
  if (dateVal) {
    const dateFormat = new Date(dateVal);
    const year = dateFormat.getFullYear();
    let month = dateFormat.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let date = dateFormat.getDate();
    if (date < 10) date = '0' + date;
    const time = `${year}-${month}-${date}`;
    return time;
  } else {
    return '';
  }
}

export function getEnumData(that, arrays) {
  console.log(that, 'that');
  console.log(arrays, 'arrays');
  for (const obj of arrays) {
    that.$store.dispatch(obj);
  }
}

export const jsonString = {
  validateStatus: [{
    id: 1,
    name: '已审核'
  },
  {
    id: 2,
    name: '未审核'
  }, {
    id: 3,
    name: '审核中'
  }],
  type: [{
    id: 1,
    name: '机构'
  },
  {
    id: 2,
    name: '部门'
  },
  {
    id: 3,
    name: '岗位'
  }],
  enable: [{
    id: 1,
    name: '启用'
  },
  {
    id: 2,
    name: '禁用'
  }],
  ifLastLevel: [{
    id: 1,
    name: '是'
  },
  {
    id: 2,
    name: '否'
  }],
  reinput: [{
    id: 1,
    name: '是'
  },
  {
    id: 2,
    name: '否'
  }],
  readStatus: [{
    id: 1,
    name: '已阅读'
  },
  {
    id: 2,
    name: '未阅读'
  }]

};

/**
 * 使用js判断类
 * @param className 类名
 * @param element 元素
 */
export function hasClass(className, element) {
  if (element.className.trim().length === 0) return false;
  const allClass = element.className.trim().split(' ');
  return allClass.indexOf(className) > -1;
}

/**
 * 使用js添加类
 * @param className 类名
 * @param element 元素
 */
export function addClass(className, element) {
  if (!hasClass(className, element)) {
    if (element.setAttribute) {
      if (element.getAttribute('class')) {
        element.setAttribute('class', element.getAttribute('class') + ' ' + className);
      } else {
        element.setAttribute('class', className);
      }
    } else {
      element.className = element.className + ' ' + className;
    }
  }
}

/**
 * 使用js移除类
 * @param className 类名
 * @param element 元素
 */
export function removeClass(className, element) {
  if (hasClass(className, element)) {
    if (element.getAttribute) {
      element.removeAttribute('class', element.getAttribute('class'));
    }
  }
}

/**
 *  使用递归的方式实现数组、对象的深拷贝
 * @param obj
 * @returns {*}
 */
export function deepCloneByObject(obj) {
  // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  const objClone = Array.isArray(obj) ? [] : {};
  // 进行深拷贝的不能为空，并且是对象
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]);
        } else {
          if (!(key == 'treeRowParent')) {
            objClone[key] = obj[key];
          }
        }
      }
    }
  }
  return objClone;
}

/**
 * 通过js的内置对象JSON来进行数组对象的深拷贝
 * @param obj
 * @returns {any}
 */
export function deepCloneByJson(obj) {
  const stringifyObj = JSON.stringify(obj);
  const objClone = JSON.parse(stringifyObj);
  return objClone;
}

/**
 * 执行常规启用，禁用操作
 * @param treeData 树数据
 * @param status 启用，禁用状态
 */
export function updateTableTreeEnableData(treeData, status) {
  const childrens = treeData['children'];
  if (childrens && childrens.length > 0) {
    childrens.forEach((row, index, array) => {
      row.enable = status;
      updateTableTreeEnableData(row, status);
    });
  }
}

/**
 * 获取已更改的数据
 * @param changedArray 已更改的数据
 * @param oldJsonString 老字符串
 * @param newJsonString 新增字符串
 */
export function getChangedTableTreeData(changedArray, oldJsonString, newJsonString) {
  const newArray = [];
  let isExist = false;
  if (oldJsonString !== newJsonString) {
    const currentObject = JSON.parse(newJsonString);
    const changedArrayNew = changedArray.slice(0);
    if (changedArrayNew && changedArrayNew.length > 0) {
      // 存在数组中，更新
      for (const changedRow of changedArrayNew) {
        // this.changedArray如果存在id，先删除
        if (changedRow.treeId === currentObject.treeId) {
          newArray.push(currentObject);
          isExist = true;
        } else {
          newArray.push(changedRow);
        }
      }
    }
    // 不存changedArray数组中，添加
    if (!isExist) {
      // 不存在直接添加
      newArray.push(currentObject);
    }
  }
  return newArray;
}

/**
 * 清空表格验证
 * @param obj 当前对象
 * @param dataArray 当前数组对象
 * @param resetFieldsArray重置字段
 * @returns {Promise<any>}返回promise
 */
export function clearTableValidate(obj, dataArray, resetFieldsArray) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      this.$nextTick(function() {
        if (!this.$utils.isEmpty(dataArray)) {
          dataArray.some((item, idx) => {
            for (const value of resetFieldsArray) {
              this.$refs[value + idx].resetFields();
            }
          });
        }
      });
    }.bind(obj), 100);
  });
}

/**
 *  使用实现对象的数据拷贝
 * @param obj
 * @returns {*}
 */
export function cloneDataObject(obj1, obj2) {
  // 判断拷贝的对象的话进行对象拷贝
  const objClone = Array.isArray(obj1) ? [] : obj1;
  // 进行拷贝的不能为空，并且是对象
  if (obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') {
    for (const key in obj1) {
      if (!(key == 'children' || key == 'treeRowParent')) {
        if (obj2.hasOwnProperty(key)) {
          objClone[key] = obj2[key];
        }
      }
    }
  }
  return objClone;
}

// 字符串转时间戳
export function strToTime(str) {
  return new Date(str.substring(0, 19).replace(/-/g, '/')).getTime();
}

/**
 * 生成编码规则
 * createCodeNew({})
 * createCodeNew([{}],true)
 * //this.$set(addRowData, "code",createCodeNew(this.modelGroupMechanismForm));
 * //this.$set(addRowData, "code",createCodeNew(this.dataGroupMechanism,true));
 * @param obj 对象
 * @param isRoot 是否是根节点
 * @returns {*} 返回编码
 */
export function createCodeNew(obj, isRoot) {
  let code;
  if (isRoot) {
    if (obj && obj.length) {
      code = obj.length < 10 ? '0' + String(obj.length + 1) : String(obj.length + 1);
    } else {
      code = '01';
    }
  } else {
    if (obj.code) {
      if (obj.children && obj.children.length) {
        code = obj.code + (obj.children.length < 10 ? '0' + String(obj.children.length + 1) : String(obj.children.length + 1));
      } else {
        code = obj.code + '01';
      }
    }
  }
  return code;
}

/**
 * 数组对象去重，适合不相同对象（必须存在id）
 * @param arrayUnique  数组
 * @returns {Array} 新数组对象
 */
export function arrayUniqueNoSameObj(array) {
  const newArr = [];
  for (let i = 0; i < array.length; i++) {
    let b = false;
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j].id == array[i].id && newArr[j].tid == array[i].tid) {
        b = true;
      }
    }
    if (!b) newArr.push(this.tableData.sel[i]);
  }
  return newArr;
}

/**
 *  数组对象去重，适合相同对象
 * @param array
 */
export function arrayUniqueSameObj(array) {
  return Array.from(new Set(array));
}

/**
 * 左边菜单获取叶子节点
 * @param array
 */
export function getMenusLeafList(menuArray) {
  const menusSearchArray = [];
  const menusList = function(array) {
    array.forEach((row) => {
      if (row.type === 'menu') {
        row.value = row.title;
        menusSearchArray.push(row);
      }
      if (row.children && row.children.length > 0) {
        menusList(row.children);
      }
    });
  };
  menusList(menuArray);
  return menusSearchArray;
}

export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')));
}

/**
 * 重新登录
 * @param msg
 * @param type
 * @returns {{params: {id}}}
 */
export function logout(msg, type) {
  removeToken();
  MessageBox.confirm(msg, '提示', {
    confirmButtonText: '重新登录',
    showClose: false,
    showCancelButton: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: type
  }).then(() => {
    store.dispatch('FedLogOut').then(() => {
      this.$router.push({path: '/login'});
    });
  });
}

export function getMarkSelected() {
  return staticDataBasic.markSelected;
}

