<template>

  <el-menu :default-active="rootMenusSelectedCode" class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened"/>
    <!--<error-log class="errLog-container left-menu-item hover-effect"/>-->
    <screenfull class="screenfull-container left-menu-item hover-effect"/>
    <!--<version class="version-container left-menu-item hover-effect"/>-->
    <div v-if="rootMenus&&rootMenus.length&&rootMenus.length<5" class="menu-first">
      <el-menu-item v-for="(item) in rootMenus" :router="true" :index="item.code.toString()" :key="item.id">
        <router-link :to="item.href" class="inlineBlock" @click.native="childrenMenus(item)"><svg-icon :icon-class="item.icon"/>{{
        item.title }}
        </router-link>
      </el-menu-item>
    </div>
    <div v-else class="menu-first">
      <el-menu-item
        v-for="(item,index) in rootMenus"
        v-if="index<4"
        :router="true"
        :index="item.code.toString()"
        :key="item.id">
        <router-link :to="item.href" class="inlineBlock" @click.native="childrenMenus(item)">
          <svg-icon :icon-class="item.icon"/>
          {{
          item.title }}
        </router-link>
      </el-menu-item>
      <el-submenu index="14" popper-class="popper-submenu">
        <template slot="title">
          <svg-icon icon-class="icongengduochanpin"/>
          <span>更多产品</span>
        </template>
        <el-menu-item
          v-for="(item,index) in rootMenus"
          v-if="index>=4"
          :router="true"
          :index="item.code.toString()"
          :key="item.id">
          <router-link :to="item.href" class="" @click.native="childrenMenus(item)"><svg-icon :icon-class="item.icon"/>{{
          item.title }}
          </router-link>
        </el-menu-item>
      </el-submenu>
    </div>
    <el-dropdown class="avatar-container" trigger="hover" @command="command">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="../../../assets/img/layout/head.png">
        <div class="user-name">
          <span>您好！</span>
          <span :title="username">{{ username }}</span>
        </div>
        <i class="el-icon-arrow-down"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="avatar-dropdown">
        <el-dropdown-item command="home">
          <svg-icon icon-class="iconhome"/>
          首页
        </el-dropdown-item>
        <el-dropdown-item divided command="password">
          <svg-icon icon-class="iconrenyuan"/>
          修改密码
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <svg-icon icon-class="iconxianchangguanli"/>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <password v-if="visiblePassword" visible-password @confirm="confirm"/>
  </el-menu>
</template>

<script>
import {
  mapGetters, mapState
} from 'vuex';
import Hamburger from './Hamburger';
import ErrorLog from './ErrorLog';
import Screenfull from '@core/components/Screenfull';
import Message from './Message';
import Version from './Version';
import Password from './password';
export default {
  components: {
    Hamburger,
    ErrorLog,
    Screenfull,
    Message,
    Version,
    Password
  },
  data() {
    return {
      visiblePassword: false
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'rootMenus'
    ]),
    ...mapState({
      username: state => state.user.login.username,
      mobilePhone: state => state.user.login.mobilePhone,
      imageUrl: state => state.user.login.imageUrl
    }),
    rootMenusSelectedCode() {
      const rootMenusSelected = this.$store.getters.rootMenusSelected;
      if (rootMenusSelected) {
        this.childrenMenus(rootMenusSelected);
        return rootMenusSelected.code;
      }
      return '';
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    command(command) {
      switch (command) {
        case 'home':
          this.$router.push({ path: '/' });
          break;
        case 'logout':
          this.logout();
          break;
        case 'password': {
          this.visiblePassword = true;
          break;
        }
      }
    },
    logout() {
      this.$confirm('真的要注销登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({path: '/login'});
        });
      }).catch(() => {
      });
    },
    childrenMenus(menu) {
      this.$store.dispatch('ChildrenMenus', menu).then(() => {
      }).catch(() => {
      });
      // 删除tags
      // this.$store.dispatch('delAllViewsProduct',this.$route).then(({ visitedViews }) => {
      // })
    },
    confirm(model) {
      this.visiblePassword = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    background-color: #2979FF;
    height: 62px;
    line-height: 62px;
    border-radius: 0 !important;
    border-width: 0;
    .left-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      /deep/ .svg-icon {
        width: 24px;
        height: 24px;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    /deep/ .errLog-container, /deep/ .screenfull-container, /deep/ .version-container {
      display: inline-block;
      position: relative;
      top: -10px;
      margin-left: 2px;
      .svg-icon{
        color: #fff;
      }
    }
    &.el-menu--horizontal .el-menu-item {
      height: 42px;
      line-height: 42px;
      border-radius: 4px;
      margin-right: 6px;
      padding: 0;
      .svg-icon{
        width: 26px;
        height: 24px;
        margin-right: 6px;
        margin-left: 6px;
        position: relative;
        top: -2px;
      }
    }
    &.el-menu--horizontal .el-menu-item:hover{
      background-color: #0864FF;
    }
    &.el-menu--horizontal .el-menu-item a {
      color: #fff;
      font-size: 16px;
      padding-left: 10px;
      padding-right: 18px;
    }
    .el-menu-item.is-active {
      background-color: #0046B8;
    }
    /deep/ .el-submenu{
      .el-submenu__title{
        border-radius: 4px;
        padding: 0 10px;
        .svg-icon{
          font-size: 26px;
          width: 26px;
          height: 24px;
          margin-right: 6px;
        }
        span{
          font-size: 16px;
        }
        .svg-icon,span{
          color: #fff;
        }
        .el-submenu__icon-arrow{
          display: none;
        }
      }
      .el-submenu__title:hover{
        background-color: #0864FF;
      }
      &.is-active {
        background-color: #0046B8;
        border-radius: 4px;
        & > .el-submenu__title {
          color: #fff;
        }
        .el-submenu__title:hover{
          background-color: #0046B8;
        }
      }
    }
    .menu-first {
      float: right;
      margin-right: 175px;
      margin-top: 10px;
      display: inline-flex;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .avatar-container {
      height: 60px;
      display: inline-block;
      position: absolute;
      right: 0;
      width: 167px;
      border-left: 1px solid rgba(255,255,255,0.4);;
      padding-left: 16px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 10px;
        position: relative;
        width:140px;
        height:100%;
        .user-avatar {
          width: 42px;
          height: 42px;
          border-radius: 6px;
          position: absolute;
          left: 0;
        }
        .user-name {
          width: 80px;
          height: 40px;
          position: absolute;
          right: 0;
          span{
            display: block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            color: #fff;
            font-size: 12px !important;
            height: 20px;
            line-height: 24px;
          }
        }
        .el-icon-arrow-down {
          position: absolute;
          right: 0;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
      &:hover{
        background-color: #3a8ee6;
      }
    }
  }
  .el-menu--horizontal.popper-submenu {
    .el-menu .el-menu-item.is-active, .el-menu .el-submenu.is-active > .el-submenu__title{
      color: #2979ff;
    }
  }

  .el-menu--horizontal.popper-submenu {
    .el-menu.el-menu--popup {
      min-width: 120px;
      .el-menu-item {
        padding: 0 10px;
        a{
          width: 100px;
          height: 36px;
          display: inline-block;
          color: #606266;
          &:hover, &:active {
            color: #1682e6;
          }
        }
      }
      .el-menu-item.is-active {
        background-color: #e7f6ff;
      }
      .svg-icon {
        width: 12px;
        height: 12px;
        margin-right: 6px;
        position: relative;
        top: 0;
      }
    }
  }
  .el-dropdown-menu.avatar-dropdown{
    .svg-icon {
      width: 12px;
      height: 12px;
      margin-right: 6px;
      position: relative;
      top: 0;
    }
  }
  @media screen and (max-width: 1500px){
    .navbar {
      .menu-first {
        margin-right: 175px;
      }
      &.el-menu--horizontal .el-menu-item {
        margin-right: 6px;
        padding: 0;
        a{
          font-size: 14px;
          padding-left: 0;
          padding-right: 6px;
        }
        .svg-icon{
          width: 26px;
          height: 24px;
          margin-right: 6px;
          margin-left: 6px;
        }
      }
      /deep/ .el-submenu {
        .el-submenu__title {
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1200px){
    .navbar {
      .menu-first {
        margin-right: 175px;
      }
      &.el-menu--horizontal .el-menu-item {
        margin-right: 2px;
        padding: 0;
        a{
          font-size: 12px;
          padding-left: 2px;
          padding-right: 8px;
        }
        .svg-icon{
          width: 26px;
          height: 24px;
          margin-right: 6px;
          margin-left: 6px;
        }
      }
      /deep/ .el-submenu {
        .el-submenu__title {
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 900px){
    .navbar {
      &.el-menu--horizontal .el-menu-item {
        padding-left: 8px;
        .svg-icon{
          width: 18px;
          height: 18px;
          margin-right: 2px;
          margin-left: 2px;
        }
      }
      /deep/ .el-submenu {
        .el-submenu__title {
          border-radius: 4px;
          padding: 0 10px;
          .svg-icon {
            width: 18px;
            height: 18px;
            margin-right: 2px;
            margin-left: 2px;
          }
        }
      }
    }
  }
</style>
