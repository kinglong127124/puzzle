<template>
  <div :style="wrapStyle" class="v-timeline">
    <div ref="refTimeContainer"/>
  </div>
</template>

<script>
/* eslint-disable */
import Timelinepick from '@core/components/timelinepick';

export default {
  name: 'Index',
  props: {
    option: {
      type: Object,
      require: true,
      default: function() {
        return {};
      }
    },
    width: {
      type: Number,
      required: false,
      default: 800
    },
    height: {
      type: Number,
      required: false,
      default: 100
    },
    handler: {
      required: false
    }
  },
  data() {
    return {
      activeType: 'quarter',
      items: ['quarter', 'hour', 'date'],
      wrapStyle: {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    };
  },
  created() {
    this.$nextTick(() => {
      if (!(this.$refs && this.$refs.refTimeContainer)) return;
      this.option.el = this.$refs.refTimeContainer;
      this.option.parent = this.option.el.parentNode;
      this.option.callback = this.handler;
      this.wrapStyle.width = this.width + 'px';
      this.timelinepick = new Timelinepick(this.option);
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .v-timeline {
    /deep/ canvas {
      margin-top: -38px;
    }
  }
</style>
