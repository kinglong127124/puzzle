<template>
  <el-popover
    placement="bottom-start"
    title="版本更新记录"
    width="430"
    trigger="hover"
    popper-class="version-popper-container"
  >
    <svg-icon slot="reference" icon-class="icon-icon"/>
    <div>
      <el-steps :active="1" direction="vertical" process-status="process">
        <el-step title="2019-08-10 发布V1.2" status="finish">
          <template slot="description">
            <p>PC端：新功能开发（协同办公、施工管理-机械设备、施工管理-周转材料、），BUG优化</p>
            <p>APP端：新功能开发（企业管理，施工管理），BUG优化</p>
          </template>
        </el-step>
        <el-step title="2019-07-20 发布V1.1">
          <template slot="description">
            <p>PC端：新功能开发（施工管理-成本管理、首页功能），BUG优化</p>
            <p>APP端：新功能开发（协同办公）</p>
          </template>
        </el-step>
        <el-step title="2019-06-30 发布V1.0">
          <template slot="description">
            <p>PC端：新功能开发（系统管理、施工管理、协同办公、流程引擎），BUG优化</p>
            <p>APP端：无</p>
          </template>
        </el-step>
      </el-steps>
    </div>
  </el-popover>
</template>
<script>

export default {
  name: 'Version',
  methods: {
    click() {
      this.$message.error('开发中，敬请期待...');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
  .version-popper-container{
    height: 500px;overflow-y: auto
  }
</style>
