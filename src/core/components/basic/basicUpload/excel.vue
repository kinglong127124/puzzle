<!--上传文件-->
<!--参考页面：src\views\sysManager\groupAuth\userManager\detail.vue-->
<template>
  <el-upload
    ref="upload"
    :action="actionUrl"
    :on-progress="handleProgress"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-change="handleChange"
    :with-credentials="true"
    :file-list="fileListArray"
    :http-request="uploadFile"
    :limit="1"
    :data="uploadFileParams"
    :headers="myHeader"
    :auto-upload="false"
    :disabled="disabled"
    v-bind="$attrs"
    class="upload"
    name="file"
    accept=".xlsx, .xls"
    list-type="text"
    v-on="$listeners">
    <el-button slot="trigger" :disabled="disabled" size="small" type="primary" icon="el-icon-if-upload">选择文件</el-button>
    <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>-->
    <el-button
      :disabled="disabled"
      style="margin-left: 10px;"
      size="small"
      type="danger"
      icon="el-icon-if-clean"
      @click="clickClearUpload">清空
    </el-button>
    <span v-if="!disabled" slot="tip" class="el-upload__tip">
      无法上传超过【2M】单文件。
      <template name="tip"/>
    </span>
  </el-upload>
</template>

<script>
import { startLoading, endLoading } from '@core/utils/loading';
import { getToken, getCookie } from '@core/utils/auth';
import api from '@core/api/common';
export default {
  name: 'BasicUpload',
  props: {
    formId: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 包含文件类型,排除和包含只能执行一个
    // isFileType:true,isFileTypeExclude:false
    isFileType: {
      type: Boolean,
      default: true
    },
    type: String,
    // 是否需要排除文件类型
    // isFileType:false,isFileTypeExclude:true
    isFileTypeExclude: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentRow: undefined,
      modelSearchFilter: undefined,
      fileTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.xlsx', '.xls'],
      fileTypesExclude: ['.exe'],
      actionUrl: '/api/upload/sysAttacheFile/upload/',
      fileListArray: [],
      disabledClear: true,
      isUploadSuccess: true,
      uploadList: [],
      uploadFileParams: { id: '', type: 1 },
      fileData: Function
    };
  },
  computed: {
    myHeader() {
      const tokenValue = getToken();
      const authCode = getCookie('authCodeSuper');
      const sysUnitId = getCookie('sysUnitIdSuper');
      if (tokenValue) {
        return {
          'SuperAuthorization': tokenValue,
          'AuthCode': authCode,
          'SysUserId': sysUnitId
        };
      }
    }
  },
  watch: {
    formId(value) {
      if (!value) {
        this.fileListArray = [];
      } else {
        this.getAttacheFileData(this.formId);
      }
    }
  },
  created() {
    if (this.formId) {
      this.getAttacheFileData(this.formId);
    }
  },
  methods: {
    handleProgress(event, file, fileList) {
      startLoading();
    },
    // handleBeforeRemove(file, fileList) {
    //   console.log('handleBeforeRemove', file, fileList);
    //   return this.$confirm(`确定移除【${ file.name }】文件吗？`,'提示',{ type: 'warning'});
    // },
    handleRemove(file, fileList) {
      this.deleteAttacheFileById(file, fileList);
    },
    handlePreview(file) {
      if (file.url) {
        window.open(file.url, '_blank');
      } else {
        this.$message({
          message: '文件地址不存在,可能未保存或服务器地址错误',
          type: 'warning'
        });
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件，本次选择了【${files.length}】个文件，共选择了【${files.length + fileList.length}】个文件`);
    },
    handleSuccess(response, file, fileList) {
      endLoading();
      this.getAttacheFileData(this.formId);
      if (response.status && response.status !== 200) {
        this.$message({
          message: response.message,
          type: 'error'
        });
      }
    },
    handleError(err, file, fileList) {
      if (err) {
        console.log(err);
      }
      endLoading();
    },
    handleChange(file, fileList) {
      this.fileListArray = fileList;
    },
    handleBeforeUpload(file) {
      let isFile = false;
      if (this.isFileTypeExclude) {
        // 获得路径后缀
        const { name } = file;
        const lastIndex = name.lastIndexOf('.');
        const fileType = name.substr(lastIndex, name.length - lastIndex);
        isFile = !this.fileTypesExclude.includes(fileType.toLocaleLowerCase());
        if (!isFile) {
          console.log('handleBeforeUpload', `无法上传【${this.fileTypesExclude}】类型文件`);
          this.uploadList.push({ message: `无法上传【${this.fileTypesExclude}】类型文件`, file });
        }
      }
      if (this.isFileType) {
        // 获得路径后缀
        const { name } = file;
        const lastIndex = name.lastIndexOf('.');
        const fileType = name.substr(lastIndex, name.length - lastIndex);
        isFile = this.fileTypes.includes(fileType);
        if (!isFile) {
          console.log('handleBeforeUpload', `无法上传【${file.type}】类型文件!`);
          this.uploadList.push({ message: `无法上传【${file.type}】类型文件!`, file });
        }
      }
      const isSize = file.size / 1024 / 1024 < 2;
      if (!isSize) {
        console.log('handleBeforeUpload', `无法上传超过【2M】的文件!` + isSize);
        this.uploadList.push({ message: '无法上传超过【2M】的文件!', file });
      }
      this.isUploadSuccess = isFile && isSize;
      return this.isUploadSuccess;
    },
    getAttacheFileData(id) {
      if (this.$utils.length(id)) {
        endLoading();
        this.fileListArray = [];
      }
    },
    async submitUpload(form) {
      const id = (typeof form === 'string') ? form : form.id;
      this.fileData = new FormData();
      const params = {};
      params.data = form.data || [];
      this.fileData.append('params', JSON.stringify(params.data));
      this.$refs.upload.submit();
      if (this.$utils.length(this.uploadList)) {
        this.uploadList = [];
        this.$message.error(`上传失败：附件中包含超过【2M】单文件！`);
        return false;
      }
      if (this.$utils.length(this.fileListArray) > 1) {
        this.$message.error(`上传失败：不能上传多个文件！`);
        return false;
      }
      if (this.$utils.length(this.fileListArray)) {
        return await this.postAttacheFiles(id, form);
      } else {
        this.$message.error(`请选择可使用Excel模板文件！`);
        return false;
      }
    },
    async postAttacheFiles(id, form) {
      return await new Promise((resolve, reject) => {
        if (this.$utils.length(id)) {
          const config = {
            // 添加请求头
            headers: { 'Content-Type': 'multipart/form-data' },
            // 添加上传进度监听事件
            onUploadProgress: e => {
              // var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
              // this.progress = completeProgress;
            }
          };
          api.static.postImportExcel({ ...form, field: this.fileData, config }).then((response) => {
            endLoading();
            if (response.status == 200) {
              // this.$message.success(response.message);
              this.getAttacheFileData(this.formId);
              resolve(response);
            } else {
              resolve(false);
            }
          }).catch((err) => {
            reject(false);
            console.log(err);
          });
        }
      });
    },
    async clearAttacheFile() {
      return await new Promise((resolve, reject) => {
        if (this.formId) {
          this.fileListArray = [];
          this.$refs.upload.clearFiles();
          this.disabledClear = true;
        } else {
          this.fileListArray = [];
        }
        resolve(true);
      });
    },
    clickClearUpload() {
      if (this.$utils.length(this.fileListArray) <= 0) {
        this.$message({
          message: '亲，无附件！',
          type: 'warning'
        });
        return;
      }
      this.$confirm('亲，您确定清空文件列表数据，清空后数据不能恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fileListArray = [];
          this.$refs.upload.clearFiles();
          this.disabledClear = true;
        }, (cancel) => {
          console.log(cancel);
        });
    },
    deleteAttacheFileById(file, fileList) {
      this.getAttacheFileData(this.formId);
    },
    uploadFile: function(file) {
      this.fileData.append('file', file.file);
      // return this.handleBeforeUpload(file);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .upload {
    padding: 10px 10px 0 10px;
    margin-left: -10px;
    .el-button {
      margin-bottom: 0;
    }
    span {
      margin-left: 10px
    }
    /deep/ .el-upload-list__item {
      width: 49%;
      background-color: #ecf5ff;
      float: left;
      margin-top: 10px;
      margin-left: 10px;
    }
    /deep/ .el-upload-list__item:nth-of-type(odd) {
      margin-top: 10px !important;
      margin-left: 0 !important;
    }
  }
</style>
