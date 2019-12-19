import Vue from 'vue';
import basicFormItem from './basicFormItem';
import basicInput from './basicInput';
import basicContainer from './basicContainer';
import basicHandler from './basicHandler';
import basicSearch from './basicSearch';
import basicSearchQuery from './basicSearch/query';
import basicSplitPane from './basicSplitPane';
import basicTable from './basicTable';
import basicTableTree from './basicTableTree';
import basicValidateStatus from './basicValidateStatus';
import basicDialog from './basicDialog';
import basicUpload from './basicUpload';
import basicIfOrNot from './basicIfOrNot';
import basicBoxCard from './basicBoxCard';
import basicTooltip from './basicTooltip';
import basicDate from './basicDate';
import basicButtonMore from './basicButtonMore';

/**
 * basic注册
 */
Vue.component('basicFormItem', basicFormItem); // el-form-item二次封装组件
Vue.component('basicInput', basicInput); // el-input二次封装组件
Vue.component('basicContainer', basicContainer); // 自动撑开高度适应全屏
Vue.component('basicHandler', basicHandler); // 按钮盒子组件
Vue.component('basicSearch', basicSearch); // 关键字搜索组件
Vue.component('basicSearchQuery', basicSearchQuery); // 查询组件
Vue.component('basicSplitPane', basicSplitPane); // 布局拖动组件二次封装
Vue.component('basicTable', basicTable); // el-table二次封装组件
Vue.component('basicTableTree', basicTableTree); // 表格树组件
Vue.component('basicValidateStatus', basicValidateStatus); // 审核状态ui组件
Vue.component('basicDialog', basicDialog); // 弹框
Vue.component('basicUpload', basicUpload); // 文件上传
Vue.component('basicIfOrNot', basicIfOrNot); // 是否ui组件
Vue.component('basicBoxCard', basicBoxCard); // 首页盒子更多
Vue.component('basicTooltip', basicTooltip); //  文本提示
Vue.component('basicDate', basicDate); //  日期
Vue.component('basicButtonMore', basicButtonMore); // 更多的导入，导出Excel及模板
