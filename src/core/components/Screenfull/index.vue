<template>
  <div :id="id" title="F11(全屏)" class="fullscreen">
    <svg-icon :icon-class="isFullscreen?'icon-exit-fullscreen':'icon-fullscreen'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Screenfull',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        });
        return false;
      }
      if (this.id) {
        screenfull.toggle(document.getElementById(this.id));
        return;
      }
      screenfull.toggle();
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen;
        });
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fullscreen  {
    .svg-icon{
      color: #409eff;
      vertical-align: -0.15em;
      cursor: pointer;
    }
  }
</style>
