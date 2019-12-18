import 'babel-polyfill';
console.log('babel-polyfill', Number.parseInt);
import Vue from "vue";
import router from "./router";
import store from "./store/";
import App from "./App.vue";
import Cookies from 'js-cookie';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// 接口
import axios from "./api/axios";
window.axios = axios;
Vue.use(Element, { size: Cookies.get('size') || 'medium'});

if (process.env.NODE_ENV == "development") {
  console.log("development mode");
  //开启debug模式
  Vue.config.debug = true;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
