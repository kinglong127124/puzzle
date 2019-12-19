/**
 * 公共模块验证
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/* 合法uri*/
export function isURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}
/* 小写字母*/
export function isLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}
/* 大写字母*/
export function isUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}
/* 大小写字母*/
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/**
 * 整型数字
 * @param str
 * @returns {boolean}
 */
export function isInt(str) {
  const reg = /^[-]?[1-9]+\d*$/i;
  return reg.test(str);
}
/**
 * 小数数字
 * @param str
 * @returns {boolean}
 */
export function isFloat(str) {
  const reg = /^[-]?([0-9]+\.[0-9]+)$/;
  return reg.test(str);
}
/**
 * 小数数字,保留2位
 * @param str
 * @returns {boolean}
 */
export function isFloatNum(str) {
  const reg = /^\d+(\.\d{2})+$/;
  return reg.test(str);
}
/**
 * 整形或带小数数字
 * @param str
 * @returns {boolean}
 */
export function isIntOrFloat(str) {
  const reg = /^[-]?[1-9]+([0-9]*(\.\d+)?)$/;
  return reg.test(str);
}
/**
 * 验证数字
 * @param str
 * @returns {boolean}
 */
export function isNumber(str) {
  const reg = /^\d+$/;
  return reg.test(str);
}
/**
 * 规定整形带两位小数数字
 * @param str
 * @returns {boolean}
 */
export function isIntOrFloatTwo(str) {
  const reg = /(^[0-9]{1,6}$)|(^[0-9]{1,6}[\.]{1}[0-9]{1}$)|(^[0-9]{1,6}[\.]{1}[0-9]{2}$)/;
  return reg.test(str);
}
/**
 * 只能输入六位数字
 * @param str
 * @returns {boolean}
 */
export function isIntSix(str) {
  const reg = /^[0-9]\d{5}$/;
  return reg.test(str);
}
/**
 * 只能输入大于0的整数
 * @param str
 * @returns {boolean}
 */
export function isIntZero(str) {
  const reg = /^[1-9]+$/;
  return reg.test(str);
}
/**
 * 只能输入大于0的数字（小数）
 * @param str
 * @returns {boolean}
 */
export function isIntZeroPre(str) {
  const reg = /([1-9]\d*(\.\d*[1-9])?)/;
  return reg.test(str);
}
/**
 * 只能输入数字 或 正无穷大
 * @param str
 * @returns {boolean}
 */
export function isIntRangeMax(str) {
  const reg = /^(∞|\+?[1-9]\d*)$/;
  return reg.test(str);
}
/**
 * 验证汉字
 * @param str
 * @returns {boolean}
 */
export function isCHS(str) {
  const reg = /^[\u4E00-\uFA29]+$/;// /^[\u0391-\uFFE5]/
  return reg.test(str);
}
/**
 * 大写，数字，横杆（-）
 * @param str
 * @returns {boolean}
 */
export function isValidOne(str) {
  const reg = /^[A-Z\d-]+$/;
  return reg.test(str);
}
/**
 * 大写，小写，中文，数字，横杆（-），小括号（中文）
 * @param str
 * @returns {boolean}
 */
export function isValidTwo(str) {
  const reg = /^[A-Za-z0-9\u4E00-\uFA29-（）/,.]+$/;
  return reg.test(str);
}
/**
 * 大写，小写，中文，数字，;(英文分号)
 * @param str
 * @returns {boolean}
 */
export function isValidThree(str) {
  const reg = /^[A-Za-z0-9\u4E00-\uFA29;]+$/;
  return reg.test(str);
}
/**
 * 大写，下划线（_）
 * @param str
 * @returns {boolean}
 */
export function isValidFour(str) {
  const reg = /^[A-Z_]+$/;
  return reg.test(str);
}
/**
 * 编码验证,字母开头，允许字母、数字、下划线
 * @param str
 * @returns {boolean}
 */
export function isValidFive(str) {
  const reg = /^[a-zA-Z][a-zA-Z0-9_]+$/;
  return reg.test(str);
}
/**
 * 编码验证,字母开头，允许字母、数字、下划线
 * @param str
 * @returns {boolean}
 */
export function isValidSix(str) {
  const reg = /^[a-zA-Z0-9_\u4E00-\uFA29-]+$/;
  return reg.test(str);
}
/**
 * 编码验证,允许字母、数字、下划线
 * @param str
 * @returns {boolean}
 */
export function isValidSeven(str) {
  const reg = /^[a-zA-Z0-9_]+$/;
  return reg.test(str);
}
/**
 * 编码验证,字母开头，允许字母、数字、下划线
 * @param str
 * @returns {boolean}
 */
export function isValidEleven(str) {
  const reg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{6,18}$/;
  return reg.test(str);
}
/**
 *
 * 判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isIdCard(str) {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  return reg.test(str);
}
/**
 * 身份证号码
 * @param str
 * @returns {boolean}
 */
export function isIdCardOne(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(str);
}
/**
 * 验证身份证号
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateIdCard(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!isIdCard(value)) {
      callback(new Error('格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
/**
 * 邮箱验证
 * @param str
 * @returns {boolean}
 */
export function isEmail(str) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(str);
}
/**
 * 手机号验证
 * @param str
 * @returns {boolean}
 */
export function isPhone(str) {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|171|19[0-9])[0-9]{8}$/;
  return reg.test(str);
}
/**
 * 座机号码
 * @param str
 * @returns {boolean}
 */
export function isMobile(str) {
  const reg = /^\d{3,4}([\-]{1})?\d{7,8}$/;
  return reg.test(str);
}
/**
 * 座机号码和手机号码
 * @param str
 * @returns {boolean}
 */
export function isMobilePhone(str) {
  if (isPhone(str) || isMobile(str)) {
    return true;
  }
  return false;
}
/**
 * IP地址
 * @param str
 * @returns {boolean}
 */
export function isIP(str) {
  const reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return reg.test(str);
}

/**
 * 通用长度格式验证
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateLength(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (value.length < array[1] || value.length > array[2]) {
      callback(new Error(array[0] + '长度在 ' + array[1] + ' 到 ' + array[2] + ' 个字符！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 *
 * 通用值大小格式验证
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateValue(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error('不能为空！'));
    }
  }
  if (value) {
    let valueData = value;
    if (typeof value == 'string') {
      valueData = Number(value);
    }
    if (!valueData) {
      callback(new Error('不能为零！'));
    } else if (valueData < array[1]) {
      callback(new Error('值大小小于 ' + array[1] + '！'));
    } else if (valueData < array[1] || valueData > array[2]) {
      callback(new Error('值大小在 ' + array[1] + ' 到 ' + array[2] + ' 区间！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 通用验证格式错误
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 * @param fun 已定义方法
 */
export function validateRegex(rule, value, callback, required, array, fun) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!fun(value)) {
      callback(new Error('格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 验证不能为空
 * @param rule 规则
 * @param value 验证值
 * @param callback 回调
 */
export function validateEmpty(rule, value, callback) {
  if (!value) {
    callback(new Error('不能为空！'));
  } else {
    callback();
  }
}

/**
 * validate email
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateEmail(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!isEmail(value)) {
      callback(new Error('格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
/**
 * 验证手机号
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validatePhone(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!isPhone(value)) {
      callback(new Error(array[0] + '格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
/**
 * 验证手机号或座机号
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateMobilePhone(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!isMobilePhone(value)) {
      callback(new Error('格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
/**
 * 两次输入值相等
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateEquals(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!(value == array[1])) {
      callback(new Error('格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
/**
 * 验证中文字符长度
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateChineseLength(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    var len = 0;
    var compareLength = array[2];
    for (var i = 0; i < value.length; i++) {
      var c = value.charCodeAt(i);
      // 单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        len++;
      } else { // 中文长度+3
        len += 3;
      }
    }
    if (len <= compareLength) {
      callback(new Error('值大小在 ' + array[1] + ' 到 ' + array[2] + ' 区间（注：1个汉字等于3个字符）！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
/**
 *
 * 通用值不能等于零
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateValueZero(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error('不能为空！'));
    }
  }
  if (value) {
    let valueData = value;
    if (typeof value == 'string') {
      valueData = Number(value);
    }
    if (valueData == 0) {
      callback(new Error('值不能为零！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 车牌号
 * */
export function isVehicleNo(str) {
  const regExp = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
  return regExp.test(str);
}

/**
 * 验证车牌号
 * @param rule 当前规则对象
 * @param value 当前值
 * @param callback 回调
 * @param required 是否必须，true:必输，false:非必输
 * @param array 数组长度
 */
export function validateVehicleNo(rule, value, callback, required, array) {
  if (required) {
    if (!value) {
      callback(new Error(array[0] + '不能为空！'));
    }
  }
  if (value) {
    if (!isVehicleNo(value)) {
      callback(new Error('格式错误！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
