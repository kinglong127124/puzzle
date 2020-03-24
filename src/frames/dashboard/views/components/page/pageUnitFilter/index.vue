<template>
  <el-card class="card-container">
    <div slot="header" class="clearfix">
      <span class="title">客户注册信息</span>
      <el-row class="fr">
        <el-button size="small" icon="el-icon-refresh" @click="clickRefresh" />
      </el-row>
    </div>
    <el-form class="form-card">
      <el-form-item>
        <el-input
          v-model="modelSearchFilter.name"
          clearable
          placeholder="请输入关键字"
          size="small"
          @keyup.enter.native.prevent="getUnitData"
          @clear="clickRefresh"
        >
          <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
      </el-form-item>
      <el-form-item class="menu-box">
        <div class="menu-containerr">
          <el-menu
            v-if="listData&&listData.length>0"
            ref="menu"
            :default-active="activeSelect"
            size="small"
            @select="contractChange"
          >
            <el-menu-item
              v-for="(item, index) in listData"
              :index="(item.id || index) + ''"
              :key="item.id || index"
              :title="item['name']"
            >
              <span slot="title">{{ item['name'] }}</span>
            </el-menu-item>
          </el-menu>
          <div v-else>
            <el-alert :closable="false" title="暂无客户注册信息" type="info" center />
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import api from '@coreApi/common';
export default {
  name: 'PageUnitFilter',
  props: {

  },
  data() {
    return {
      activeSelect: null,
      listData: [],
      isCreated: true,
      modelSearchFilter: {
        page: 1,
        limit: 10000,
        enable: 1,
        validateStatus: 1,
        name: ''
      }
    };
  },
  computed: {},
  created() {
    // console.log('created');
    this.getUnitData();
  },
  activated() {
    // console.log('activated');
    let defaultActiveSelect = '';
    if (!this.$utils.isEmpty(this.activeSelect)) {
      console.log(12);
      this.isCreated = false;
      defaultActiveSelect = this.activeSelect;
      this.getUnitData().then(() => {
        if (this.listData.filter(item => item.id === defaultActiveSelect)[0]) {
          this.contractChange(this.activeSelect);
          this.isCreated = true;
        }
      });
    } else {
      console.log(13);
      this.isCreated = true;
      this.getUnitData();
    }
  },
  methods: {
    getUnitData() {
      return api.static.getPage({
        productAlias: 'smartpm',
        pageCode: 'sysCrmUserInfo',
        field: this.modelSearchFilter
      }).then(res => {
        this.listData = res.data.rows;
        if (!this.$utils.isEmpty(res.data.rows) && this.isCreated) {
          this.contractChange(res.data.rows[0].id);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    clickRefresh() {
      this.$set(this.modelSearchFilter, 'name', '');
      this.getUnitData();
    },
    contractChange(index) {
      this.activeSelect = index;
      const rowData = this.listData.filter(item => item.id === index)[0];
      this.$emit('change', rowData);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card.card-container {
  border: none;
  border-radius: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  /deep/ .el-card__header {
    span.title {
      color: #409eff;
      font-size: 14px;
    }
    .el-row {
      .el-button {
        border-width: 0;
        background-color: transparent;
      }
      .el-button--small,
      .el-button--small.is-round {
        height: 14px;
        margin: -10px;
      }
      [class*="el-icon-"],
      [class^="el-icon-"] {
        font-size: 18px;
      }
    }
  }
  /deep/ .el-card__body {
    padding: 5px 0 0 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f3f6fa;
    .el-menu {
      border-right-width: 0;
      .el-menu-item,
      .el-submenu__title {
        height: 38px;
        line-height: 38px;
      }
      .el-menu-item {
        padding-left: 10px !important;
        padding-right: 10px !important;
        border-bottom: 1px solid #dcdfe6;
        color: #454e67;
        background-color: #f3f6fa;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        color: #409eff;
      }
      .el-menu-item.is-active {
        color: #409eff;
        background-color: #c8dcff;
      }
    }
    .el-form.form-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      .menu-box {
        flex: 1;
        overflow: auto;
        position: relative;
        & /deep/ .el-form-item__content {
          height: 100%;
        }
        .menu-containerr {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>

<style>
  .card-container .menu-box .el-form-item__content {
    height: 100%;
  }
</style>
