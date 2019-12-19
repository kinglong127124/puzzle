import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, getCookie } from '@core/utils/auth';
import { startLoading, endLoading } from '@core/utils/loading';
import { logout } from './index';
// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // request timeout
});

// request interceptor
const requestContainer = new Set();
service.interceptors.request.use(
  config => {
    const tokenValue = getToken();
    const authCode = getCookie('authCodeSuper');
    const sysUnitId = getCookie('sysUnitIdSuper');
    if (tokenValue) {
      config.headers['SuperAuthorization'] = tokenValue;
      config.headers['AuthCode'] = authCode;
      config.headers['SysUserId'] = sysUnitId;
    }
    if (!config.notShowLoading) {
      requestContainer.add(config);
      startLoading();
    }
    return config;
  },
  error => {
    // MessageBox.alert('数据加载超时,请检查您的网络或稍后重试!').then(action => {
    // });

    console.log(error.config);
    endLoading();
    console.log(error);
    Promise.reject('请求异常！');
  }
);
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    requestContainer.delete(response.config);
    if (requestContainer.size == 0) endLoading();
    if (response.status === 401 || res.status === 40101) {
      logout('你已被登出，请重新登录！', 'warning');
      return Promise.reject(res);
    }
    // token超时
    if (res.status === 40300) {
      logout(res.message, 'warning');
      return Promise.reject(res);
    }
    // token禁用
    if (res.status === 40301) {
      Message({
        message: res.message,
        type: 'warning'
      });
      return Promise.reject(res);
    }
    if (res.status === 40001) {
      Message({
        message: res.message,
        type: 'warning'
      });
      return Promise.reject(res);
    }
    if (response.status !== 200) {
      let message = response.statusText;
      if (response.status == 503) {
        message = response.message;
      } else {
        message = response.statusText;
      }
      Message({
        message: message,
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(response);
    }
    if (res.status && res.status !== 200) {
      Message({
        message: res.message,
        type: 'warning',
        duration: 3 * 1000
      });
      return Promise.reject(res);
    } else if (!res.status) {
      // TODO:后端未返回status和message
      return res;
    } else {
      return res;
    }
  },
  error => {
    requestContainer.delete(error.config);
    if (requestContainer.size == 0) endLoading();
    if (error.response && error.response.status && error.response.status == 500) {
      Message({
        message: '服务器内部错误！',
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(error);
    }
    if (error.response && error.response.status && error.response.status == 503) {
      Message({
        message: '当前产品未注册到服务中心！',
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(error);
    }
    if (error.response && error.response.status && error.response.status == 504) {
      Message({
        message: '网关请求超时！',
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(error);
    }
    // 终止请求
    if (error.message != 'abortQrcodeLoginCheck') {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      });
    }
    //   MessageBox.alert('数据加载失败!').then(action => {
    // });

    return Promise.reject(error);
  }
);

export default service;
