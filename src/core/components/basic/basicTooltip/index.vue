<!--文本提示-->
<!--参考页面：src\views\bpmaManager\goods\putStorage\outTheFront\detail.vue-->
<template>
  <el-tooltip v-if="data" placement="top" popper-class="basic-tooltip">
    <div slot="content">{{ data }}</div>
    <slot/>
  </el-tooltip>
  <div v-else>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BasicTooltip',
  props: {
    data: {
      type: String
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .basic-tooltip {
    div{
      max-width: 300px;
    }
  }
</style>
