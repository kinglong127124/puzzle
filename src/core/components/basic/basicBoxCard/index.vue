<!--面板-->
<!--参考页面：src\views\eoaManager\index.vue-->
<template>
  <el-card class="box-card">
    <div v-if="type=='basic'" slot="header" class="clearfix">
      <span class="left"><span class="title">{{ title }}</span> <span v-if="showFlag">（共<span
        class="total">{{ total }}</span>条）</span></span>
      <el-button size="mini" style="float: right; padding: 3px 0" type="text" @click="clickMore">更多<i
        class="el-icon-arrow-right el-icon--right"/></el-button>
    </div>
    <div v-if="type=='basicNoTitle'" slot="header" class="clearfix">
      <span class="left"><span class="title">{{ title }}</span></span>
      <!--<el-button size="mini" style="float: right; padding: 3px 0;margin-right: 5px;" type="text" @click="clickMore(1)"><i-->
      <!--class="el-icon-zoom-in"></i>放大</el-button>-->
      <!--<el-button size="mini" style="float: right; padding: 3px 0" type="text" @click="clickMore(2)"><i-->
      <!--class="el-icon-back"></i>历史回放</el-button>-->
    </div>
    <slot/>
  </el-card>
</template>

<script>
export default {
  name: 'BasicBoxCard',
  props: {
    showFlag: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      default: 'basic'
    }
  },
  methods: {
    clickMore(type) {
      this.$emit('clickMore', type);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card {
    .left {
      border-left: 2px solid #2979FF;
      padding-left: 6px;
      font-size: 14px;
      .title {
        color: #606266
      }
      .total {
        color: #2979FF
      }
    }
    & /deep/ .el-card__header{
      cursor: move;
    }
    & /deep/ .el-card__body {
      padding: 0 !important;
    }
  }

</style>
