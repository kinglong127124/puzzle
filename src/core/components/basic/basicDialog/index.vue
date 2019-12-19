<!--搜索布局-->
<!--参考页面：src\views\sysManager\groupAuth\userManager\detail.vue    @open="handleOpen"-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="visibleSync"
    :width="width"
    v-bind="$attrs"
    :top="top"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :style="{height: height}"
    lock-scroll
    append-to-body
    v-on="$listeners"
    @close="handleClose"
  >
    <template slot="title">
      <slot name="title"/>
    </template>
    <slot/>
    <template slot="footer">
      <slot name="footer"/>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'BasicDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '70%'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => () => {
      }
    },
    height: String
  },
  computed: {
    visibleSync: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    handleOpen() {
      // this.$emit('open')
    }
  }
};
</script>
