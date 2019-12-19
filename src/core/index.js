import 'babel-polyfill';
console.log('babel-polyfill', Number.parseInt);
import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import Cookies from 'js-cookie';
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
import '@core/assets/theme/chalk/index.css';
import '@core/icons'; // icon
import '@core/assets/plugins/iconfont/iconfont.css';
import '@core/styles/index.scss'; // global css

// 接口
import axios from "./api/axios";
window.axios = axios;
import '@core/mock'; // simulation data
import * as filters from '@core/filters'; // global filters
import utils from '@core/utils/util';
import utilsBasic from '@core/utils/basic';
import '@core/components/basic';
import elDragDialog from '@core/directive/el-dragDialog';

Vue.prototype.bus = new Vue(); // 中央事件总线
Vue.use(Element, { size: Cookies.get('size') || 'medium'});

elDragDialog.install(Vue);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.prototype.$utils = utils;
Vue.prototype.$utilsBasic = utilsBasic;
Vue.config.productionTip = false;
Vue.config.devtools = true;
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
