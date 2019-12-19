<!--导出，导入-->
<!--参考页面：src\views\sysManager\resourceDictionary\materialDictionary\index.vue-->
<template>
  <el-dropdown @command="command">
    <el-button icon="el-icon-menu" size="small" type="primary" plain>
      更多<i class="el-icon-arrow-down el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="disabled" command="downloadTemplate">下载模板</el-dropdown-item>
      <el-dropdown-item :disabled="disabled" divided command="importExcel">导入Excel</el-dropdown-item>
      <el-dropdown-item v-if="false" divided command="importExcelFront">前端导入Excel</el-dropdown-item>
      <el-dropdown-item v-if="false" command="exportExcel">导出Excel</el-dropdown-item>
    </el-dropdown-menu>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncImportExcel" title="导入Excel-选择" class="basic-dialog">
      <basic-upload-excel v-if="visibleSyncImportExcel" ref="refBasicUploadExcel" form-id="12"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncImportExcel = false">取 消</el-button>
        <el-button type="primary" @click="clickOk">导入Excel</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncImportExcelFront" title="导入Excel-选择">
      <upload-excel v-if="visibleSyncImportExcelFront" :on-success-front="successFront" :before-upload="beforeUploadFront"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncImportExcelFront = false">取 消</el-button>
      </div>
    </basic-dialog>
  </el-dropdown>
</template>

<script>
import api from '@core/api/common';
import uploadExcel from '@core/components/UploadExcel';
import basicUploadExcel from '../basicUpload/excel';

export default {
  name: 'BasicButtonMore',
  components: {
    uploadExcel,
    basicUploadExcel
  },
  props: {
    pageInfo: {
      type: Object,
      required: true
    },
    type: {
      type: Array,
      required: true,
      default: () => {
        return ['downloadTemplate', 'importExcel'];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      types: ['downloadTemplate', 'importExcel', 'importExcelFront'],
      visibleSyncImportExcel: false,
      visibleSyncImportExcelFront: false,
      results: [],
      header: []
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    command(command) {
      switch (command) {
        case 'downloadTemplate':
          this.downloadTemplate();
          break;
        case 'importExcel':
          this.importExcel();
          break;
        case 'importExcelFront':
          this.importExcelFront();
          break;
        case 'exportExcel': {
          this.exportExcel();
          break;
        }
      }
    },
    downloadTemplate() {
      window.open(api.static.getDownloadTemplate(this.pageInfo), '_blank');
    }, importExcel() {
      this.visibleSyncImportExcel = true;
    }, importExcelFront() {
      this.visibleSyncImportExcelFront = true;
    }, exportExcel() {
      api.static.getExportExcel(this.pageInfo).then(response => {
      });
    },
    success({ results, header }) {
      console.log(results);
      this.results = results;
      this.header = header;
      this.clickOk();
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 2;
      if (isLt1M) {
        return true;
      }
      this.$message.warning('仅支持上传大小为【2M】单文件');
      return false;
    },
    clickOk() {
      const importData = this.$refs.refBasicUploadExcel.submitUpload({ ...this.pageInfo, id: '12', data: this.results });
      if (!importData) return false;
      this.visibleSyncImportExcel = false;
      this.$emit('importData', importData);
    },
    successFront({ results, header }) {
      console.log(results);
      this.results = results;
      this.header = header;
      this.clickOkFront();
    },
    beforeUploadFront(file) {
      const isLt1M = file.size / 1024 / 1024 < 2;
      if (isLt1M) {
        return true;
      }
      this.$message.warning('仅支持上传大小为【2M】单文件');
      return false;
    }, clickOkFront() {
      this.$message.successFront('上传成功');
      this.$set(this.pageInfo, 'field', this.results);
      api.static.postImportExcelFront(this.pageInfo).then(response => {
        this.visibleSyncImportExcelFront = false;
        this.$message.successFront('上传成功');
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 .basic-dialog{
   /deep/ .el-dialog__body{
    max-height: 120px;
    overflow: auto;
  }
}
</style>
