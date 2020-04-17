<template>
  <basic-container>
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getObjDetail">
        刷新
      </el-button>
    </basic-handler>
    <el-form
      ref="refModelForm"
      :model="modelForm"
      :show-message="false"
      label-width="130px"
      class="form-container">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item :title="modelForm.inputPerson" label="操作人" class="add-border disabled">
            {{ modelForm.inputPerson }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="操作人编号" class="add-border disabled">
            {{ modelForm.userId }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="操作人IP" class="add-border disabled">
            {{ modelForm.ip }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="操作时间" class="add-border disabled">
            {{ modelForm.inputTime }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位编码" class="add-border disabled">
            {{ modelForm.authCode }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="日志内容">
            <el-input
              :autosize="{ minRows: 3, maxRows: 8}"
              v-model="modelForm.logContent"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="日志类型" class="add-border disabled">
            {{ formatLogType(modelForm) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="请求类型" class="add-border disabled">
            {{ modelForm.requestType }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="消耗时间" class="add-border disabled">
            {{ modelForm.costTime?modelForm.costTime:'0' }}ms
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请求参数">
            <el-input
              :autosize="{ minRows: 1, maxRows: 8}"
              v-model="modelForm.requestParam"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请求路径">
            <el-input
              :autosize="{ minRows: 1, maxRows: 8}"
              v-model="modelForm.requestUrl"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="终端/浏览器">
            <el-input
              :autosize="{ minRows: 1, maxRows: 8}"
              v-model="modelForm.ua"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请求方法">
            <el-input
              :autosize="{ minRows: 1, maxRows: 8}"
              v-model="modelForm.method"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请求结果">
            <el-input
              :autosize="{ minRows: 3, maxRows: 12}"
              v-model="modelForm.result"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请求异常信息">
            <el-input
              :autosize="{ minRows: 3, maxRows: 12}"
              v-model="modelForm.exDesc"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请求异常详细内容">
            <el-input
              :autosize="{ minRows: 3, maxRows: 12}"
              v-model="modelForm.exDetail"
              disabled
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </basic-container>
</template>
<script>
import pageDetail from '@coreMixins/pageDetail';

export default {
  name: 'GateLogDetail',
  mixins: [pageDetail],
  data() {
    return {
      menuObj: {}
    };
  },
  computed: {
    disabledUeditor: function() {
      if (this.modelForm && this.modelForm.validateStatus == 1 && this.modelForm.enable == 2) {
        return true;
      }
      return false;
    }
  },
  deactivated() {
    this.$store.dispatch('cacheId', undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(this, (resultInfo) => {
      this.menuObj = resultInfo;
      this.clickAdd();
    }, id => {
      this.modelForm.id = id;
      this.getObjDetail((obj) => {
        if (obj.menuId) {
          this.$set(this.menuObj, 'id', obj.menuId);
        }
      });
    });
  },
  created() {
    this.$store.dispatch('cacheId', '0');// 刷新
    this.$set(this.pageInfo, 'productAlias', 'smartpm');
    this.$set(this.pageInfo, 'pageCode', 'sysLog');
  }
};
</script>
