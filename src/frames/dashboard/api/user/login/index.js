import request from '@coreUtils/request';
import axios from 'axios';
var CancelToken = axios.CancelToken;
var cancel;

export function loginByPhone(mobilePhone, password) {
  const data = {
    mobilePhone,
    password
  };
  return request({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  });
}

export function logout(data) {
  return request({
    url: '/api/admin/user/logout',
    method: 'post',
    data
  });
}

export function getInfo() {
  return request({
    url: '/api/admin/user/front/info',
    method: 'get'
  });
}

export function getCode() {
  return request({
    url: '/api/admin/user/qrcode/generateQRCodeLogin',
    method: 'get'
  });
}

export function qrcodeLoginCheck(loginId) {
  return request({
    url: `/api/admin/user/qrcode/qrcodeLoginCheck/${loginId}`,
    method: 'GET',
    cancelToken: new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      cancel = c;
    }),
    notShowLoading: true
  });
}

export function abortRequest() {
  if (typeof cancel == 'function') {
    cancel('abortQrcodeLoginCheck');
  }
}

export function modifyPasswordObj(data) {
  return request({
    url: '/api/admin/user/front/modify/password',
    method: 'put',
    data
  });
}
