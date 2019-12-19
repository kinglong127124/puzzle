<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">页面配置</h3>

      <div class="drawer-item">
        <span>是否展现Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>切换主岗岗位</span>
        <el-switch v-model="switchStation" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span title="默认2列布局，切换3列布局，施工首页显示3列布局">切换3列布局</span>
        <el-switch v-model="switchlayoutMode" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@core/components/ThemePicker';

export default {
  name: 'Settings',
  components: { ThemePicker },
  data() {
    return {};
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        });
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        });
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        });
      }
    },
    switchStation: {
      get() {
        return this.$store.state.settings.switchStation;
      },
      set(val) {
        // this.$store.dispatch('settings/changeSetting', {
        //   key: 'switchStation',
        //   value: val
        // })
        this.$message.error('开发中，敬请期待...');
      }
    },
    switchlayoutMode: {
      get() {
        return this.$store.state.settings.switchlayoutMode;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'switchlayoutMode',
          value: val
        });
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
