<template>
  <div class="top-logo">
    <div v-show="!isCollapse&&showLogo" class="menu-logo"/>
    <div v-show="!isCollapse" class="menu-search">
      <el-autocomplete
        v-model="searchValue"
        :fetch-suggestions="querySearchAsync"
        placeholder="菜单快速搜索"
        @select="handlerMenuSelected">
        <i
          slot="suffix"
          class="el-icon-search el-input__icon"/>
      </el-autocomplete>
    </div>
    <el-scrollbar :class="showLogo?'':'hideLogo'" wrap-class="scrollbar-wrapper">
      <el-menu
        ref="refMenu"
        :default-active="defaultActive"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        unique-opened
        @select="selectMenu"
        @open="handleOpen"
        @close="handleClose"
      >
        <sidebar-item v-for="menu in childrenMenus" :key="menu.path" :item="menu" :base-path="menu.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@framesDashboard/styles/variables.scss';

export default {
  components: { SidebarItem },
  data() {
    return {
      searchValue: '',
      timeout: null
    };
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'childrenMenus'
    ]),
    ...mapState({
      menusSearch: state => state.layout.menusSearch
    }),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    defaultActive() {
      const path = this.$route.path;
      if (path.includes('/dashboard')) {
        if (this.$refs.refMenu) {
          /* eslint-disable-next-line*/
          this.$refs.refMenu.activeIndex = '';
        }
      }
      const existPathValues = '/id/';
      if (this.$route && this.$route.path) {
        if (path.includes(existPathValues)) {
          return path.substring(0, path.lastIndexOf(existPathValues));
        }
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var results = queryString ? this.menusSearch.filter(this.createStateFilter(queryString)) : this.menusSearch;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    handlerMenuSelected(item) {
      this.searchValue = '';
      // 选择菜单
      this.$router.push({
        path: item.href
      });
    },
    selectMenu(key, keyPath) {
      // console.log('selectMenu', key, keyPath);
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .top-logo{
    .menu-logo{
      width: 100%;
      height: 62px;
      background: #222974 url('../../../../assets/img/layout/logo.png') no-repeat 20px 9px;
    }
    .menu-search{
      width: 100%;
      background-color: #111D5C;
      padding-bottom: 10px;
      .el-autocomplete{
        width: 220px;
        padding-left: 20px;
        margin-top: 10px;
      }
    }
  }
  .el-menu{
    border-radius: 0;
  }
</style>
