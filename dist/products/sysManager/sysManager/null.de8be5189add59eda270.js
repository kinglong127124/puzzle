(window.webpackJsonpproducts_sysManager=window.webpackJsonpproducts_sysManager||[]).push([["sysManager/null"],{37:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var a=r(17);function n(e){return Object(a.a)({url:"/api/admin/user/page",method:"get",params:e})}},9:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{attrs:{"label-width":"80px"}},[r("el-form-item",{attrs:{label:"群主|领导"}},[r("el-select",{attrs:{"remote-method":e.remoteLeaderMethod,multiple:"",filterable:"",remote:"",placeholder:"请输入关键词"},model:{value:e.leaders,callback:function(t){e.leaders=t},expression:"leaders"}},e._l(e.lItems,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})))],1),e._v(" "),r("el-form-item",{attrs:{label:"组员|下属"}},[r("el-select",{attrs:{"remote-method":e.remoteMemberMethod,multiple:"",filterable:"",remote:"",placeholder:"请输入关键词"},model:{value:e.members,callback:function(t){e.members=t},expression:"members"}},e._l(e.mItems,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})))],1),e._v(" "),r("el-form-item",[e.groupManagerBtnUserManager?r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]):e._e()],1)],1)};a._withStripped=!0;var n=r(6),s=r.n(n),o=r(37),l=r(30),i=r(25);function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}var u={name:"GroupUser",props:{groupId:{type:String,default:"1"}},data:function(){return{lItems:[],mItems:[],leaders:[],members:[],list:[],groupManagerBtnUserManager:!1}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(i.mapState)({elements:function(e){return e.user.login.elements}})),created:function(){this.initUsers(),this.groupManagerBtnUserManager=this.elements["groupManager:btn_userManager"]},methods:{remoteMemberMethod:function(e){var t=this;""!==e?Object(o.a)({name:e}).then((function(e){t.mItems=e.data.rows,t.total=e.data.total})):this.mItems=[]},remoteLeaderMethod:function(e){var t=this;""!==e?Object(o.a)({name:e}).then((function(e){t.lItems=e.data.rows,t.total=e.data.total})):this.lItems=[]},onSubmit:function(){var e=this,t={};this.members.length>0&&(t.members=this.members.join()),this.leaders.length>0&&(t.leaders=this.leaders.join()),Object(l.l)(this.groupId,t).then((function(){e.$emit("closeUserDialog"),e.$message({title:"成功",message:"保存成功",type:"success",duration:2e3})}))},initUsers:function(){var e=this;Object(l.j)(this.groupId).then((function(t){e.lItems=t.data.leaders,e.mItems=t.data.members;for(var r=[],a=0;a<t.data.members.length;a++)r.push(t.data.members[a].id);for(var n=[],s=0;s<t.data.leaders.length;s++)n.push(t.data.leaders[s].id);e.members=r,e.leaders=n}))}}},c=r(16),d=Object(c.a)(u,a,[],!1,null,null,null);d.options.__file="src/products/sysManager/views/groupAuth/group/components/groupUser.vue";t.default=d.exports}}]);