<template>
  <div>
    <basic-handler>
      <el-button
        v-if="addBtnShowFlag && isUpdateAuthWorkFlow"
        type="primary"
        plain
        icon="el-icon-plus"
        size="small"
        @click="handleAddBtn">新增
      </el-button>
      <el-button
        v-if="saveBtnShowFlag"
        :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag"
        type="primary"
        icon="el-icon-if-save"
        size="small"

        plain
        @click="handleSaveBtn">保存
      </el-button>

      <el-button
        v-if="deleteBtnShowFlag && isUpdateAuthWorkFlow"
        :disabled="deleteBtnDisabledFlag || !detailFormId"
        type="danger"
        icon="el-icon-delete"
        size="small"
        plain
        @click="handleDeleteBtn">删除
      </el-button>
      <el-button
        v-if="auditBtnShowFlag && isUpdateAuthWorkFlow"
        :disabled="auditBtnDisabledFlag || detailForm.validateStatus !== 2"
        type="primary"
        icon="el-icon-if-auth"
        size="small"
        plain
        @click="handleAuditBtn">审核
      </el-button>
      <basic-see-process :id="detailForm.processInstanceId"/>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getDetail">刷新</el-button>
    </basic-handler>
    <el-form
      ref="refDetailForm"
      :model="detailForm"
      :rules="rules"
      :show-message="false"
      class="form-container"
      label-width="120px">
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="detailForm"/>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码">
            <el-input v-model="detailForm.code" :disabled="true" size="small" clearable placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文件名称" prop="name" hide-required-asterisk>
            <el-input
              ref="refName"
              v-model="detailForm.name"
              :disabled="disabledFlag"
              size="small"
              clearable
              maxlength="100"
              placeholder="请输入文件名称"/>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="客户单位" prop="cusOrgName" hide-required-asterisk>
            <el-input
              v-model="detailForm.cusOrgName"
              :disabled="disabledFlag"
              size="small"
              readonly
              placeholder="请选择客户单位">
              <el-button
                slot="append"
                :disabled="disabledFlag"
                size="small"
                icon="el-icon-plus"
                class="form-btn"
                @click="toipClick('unit')"/>
            </el-input>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签字人员" >
            <el-input
              v-model="detailForm.signaturePerson"
              :disabled="disabledFlag"
              size="small"
              clearable
              maxlength="100"
              placeholder="请输入签字人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实施人员" prop="impPerson">
            <el-input
              ref="refImpPerson"
              v-model="detailForm.impPerson"
              :disabled="disabledFlag"
              size="small"
              clearable
              maxlength="100"
              placeholder="请输入实施人员"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="业务日期" prop="signDate">
            <el-date-picker
              :editable="false"
              :clearable="false"
              v-model="detailForm.signDate"
              :disabled="disabledFlag"
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="timestamp"
              placeholder="选择日期"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="备注说明">
            <el-input
              :disabled="disabledFlag"
              :autosize="{ minRows:6, maxRows: 8}"
              :maxlength="5000"
              v-model="detailForm.remark"
              size="small"
              clearable
              type="textarea"
              placeholder="请输入备注说明，不超过5000字"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :form-id="detailFormId"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input v-model="detailForm.inputPerson" :disabled="true" size="small" clearable placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input
              v-model="detailForm.inputTime"
              :disabled="true"
              size="small"
              clearable
              placeholder="系统自动生成登记时间"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUnit" title="产品使用单位-选择">
      <dialog-unit
        v-if="visibleSyncUnit"
        @selectionChange="selectionChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncUnit = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import formatBasic from '@coreMixins/formatBasic';
const dialogUnit = () => import('@framesDashboardViewsComp/dialog/dialogUnit');
import { staticDataBasic } from '@coreData/basic';
import { validateLength } from '@coreUtils/validate';
/**
   * api
   * */
import api from '@coreApi/common';
export default {
  name: 'ResultsFileDetail',
  components: {
    dialogUnit
  },
  mixins: [computed, methods, formatEnum, formatBasic],
  props: {
    isUpdateAuthWorkFlow: {
      type: Boolean,
      default: () => true
    },
    reserve: null
  },
  data() {
    return {
      addBtnShowFlag: true, // 待系统菜单配置
      saveBtnShowFlag: true,
      deleteBtnShowFlag: true,
      auditBtnShowFlag: true,

      saveBtnDisabledFlag: true,
      detailForm: {},
      detailFormId: undefined,

      rules: {
        name: [
          { required: true, message: '请输入单据名称', trigger: 'change' }
        ],
        cusOrgName: [
          { required: true, message: '请选择客户单位', trigger: 'change' }
        ],
        impPerson: [
          { required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['实施人员', 1, 100]);
            },
            trigger: 'change' }
        ],
        signDate: [
          { required: true, message: '请输入业务日期', trigger: 'change' }
        ]
      },
      apiParams: {
        productAlias: 'smartpm',
        pageCode: 'sysBusResult'
      },
      /**
         * 弹窗
         * */
      type: null,
      visibleSyncUnit: false,
      selectedRow: {}

    };
  },
  computed: {
    deleteBtnDisabledFlag() {
      if (!this.$utils.isEmpty(this.detailForm)) {
        return this.detailForm.validateStatus !== 2;
      } else {
        return true;
      }
    },
    auditBtnDisabledFlag() {
      if (this.validateStatus) {
        if (this.reserve == 1) return false;
        return this.validateStatus.map(item => Number(item.code)).includes(this.detailForm.validateStatus);
      }
    },
    validateStatus() {
      if (!Array.isArray(this.dataEnum.auditStatusEnum)) return {};
      return this.dataEnum.auditStatusEnum.filter(item => (item.code == 1 || item.code == 3 || item.code == 4 || item.code == 5));
    },
    disabledFlag() {
      return this.auditBtnDisabledFlag;
    }
  },
  watch: {
    detailForm: {
      handler() {
        this.saveBtnDisabledFlag = false;
      },
      deep: true
    }

  },
  deactivated() {
    this.$store.dispatch('cacheId', undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(this, () => {
      if (this.$route.params) {
        this.detailFormId = this.$route.params.id ? this.$route.params.id : undefined;
      }
      if (this.$route.query) {
        this.detailForm.cusOrgId = this.$route.query.id ? this.$route.query.id : undefined;
        this.detailForm.cusOrgName = this.$route.query.name ? this.$route.query.name : undefined;
      }
      this.handleAddBtn();
    }, (id) => {
      this.detailFormId = id;
      this.getDetail();
    });
  },

  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData'
    ]);
    this.$store.dispatch('cacheId', '0');// 刷新
  },
  methods: {
    handleAddBtn() {
      this.addDetail();
    },
    handleSaveBtn() {
      this.validateAfter(() => {
        this.saveDetailForm().catch(err => {
          console.log(err);
        });
      });
    },
    handleDeleteBtn() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$utils.isEmpty(this.detailFormId)) {
          this.$set(this.detailForm, 'cusOrgId', '');
          this.$set(this.detailForm, 'cusOrgName', '');
          this.addDetail();
        } else {
          this.deleteDetailForm().then(() => {
            this.$set(this.detailForm, 'cusOrgId', '');
            this.$set(this.detailForm, 'cusOrgName', '');
            this.addDetail();
          }).catch(err => {
            console.log(err);
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    handleAuditBtn() {
      this.validateAfter(() => {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveDetailForm(true).then(() => {
            this.auditDetailForm();
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
      });
    },

    /**
       * 新增表单内容
       * */
    addDetail() {
      this.$nextTick(() => {
        this.detailFormId = undefined;
        this.detailForm = {
          id: '',
          validateStatus: 2,
          cusOrgId: this.detailForm.cusOrgId,
          cusOrgName: this.detailForm.cusOrgName,
          name: '',
          signDate: new Date().getTime(),
          inputPerson: this.userLogin.inputPersonFullPath,
          inputTime: this.$utils.date.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
        };
        this.$refs.refDetailForm.resetFields();
        this.$refs.refName.focus();
        console.log('this.detailForm', this.detailForm);
      });
    },
    /**
       * 保存
       * */
    saveDetailForm(boolean) {
      const saveFormData = this.$utils.copy(this.detailForm);
      if (this.$utils.isEmpty(this.detailFormId)) {
        return api.static.postObj({
          ...this.apiParams,
          field: saveFormData
        })
          .then(async(res) => {
            if (res.status && res.status === 200) {
              console.log('保存成功', res);
              this.detailForm.id = res.data.id;
              this.detailFormId = res.data.id;
              // this.detailForm = res.data;
              this.detailForm = Object.assign({}, res.data, {
                signDate: res.data.signDate ? new Date(res.data.signDate).getTime() : ''
              });
              // 上传文件
              if (!await this.$refs.refBasicUpload.submitUpload(res.data)) return false;
              if (!boolean) {
                this.$message.success(res.message);
              }
            } else {
              this.$message({ message: res.message, type: 'warning' });
            }
          }).catch(error => {
            console.log(error);
          });
      } else {
        return api.static.putObj({
          ...this.apiParams,
          field: saveFormData
        })
          .then(async(res) => {
            if (res.status && res.status === 200) {
              // this.detailForm = res.data;
              this.detailForm = Object.assign({}, res.data, {
                signDate: res.data.signDate ? new Date(res.data.signDate).getTime() : ''
              });
              console.log('修改成功', res);
              // 上传文件
              if (!await this.$refs.refBasicUpload.submitUpload(res.data)) return false;
              if (!boolean) {
                this.$message.success(res.message);
              }
            } else {
              this.$message({ message: res.message, type: 'warning' });
            }
          }).catch(error => {
            console.log(error);
          });
      }
    },
    /**
       * 保存或者审核之前验证
       */
    validateAfter(callback) {
      let result = true;
      // 表单验证
      this.$refs.refDetailForm.validate(valid => {
        valid ? null : result = valid;
        return !result;
      });

      if (result) {
        // 验证
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        this.$message({
          message: staticDataBasic.info.updateEmptyError,
          type: 'warning'
        });
        return this.$utilsBasic.valideFocus(this, ['refName', 'refImpPerson']);
      }
    },

    /**
       * 删除表单
       * */
    deleteDetailForm() {
      return api.static.deleteObj({
        ...this.apiParams,
        field: { id: this.detailFormId }
      })
        .then((res) => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message);
            this.$refs.refBasicUpload.clearAttacheFile();
          } else {
            this.$message({ message: res.message, type: 'warning' });
          }
        }).catch(error => {
          console.log(error);
        });
    },

    /**
       * 审核
       * */
    auditDetailForm() {
      console.log('this.detailForm', this.detailForm);
      return api.static.putObjAudit({
        ...this.apiParams,
        field: this.detailForm
      })
        .then((res) => {
          console.log('audit res', res);
          if (res.status && res.status === 200) {
            // this.detailForm = res.data;
            this.detailForm = Object.assign({}, res.data, {
              signDate: res.data.signDate ? new Date(res.data.signDate).getTime() : ''
            });
            if (res.data.processInstanceId) {
              return this.$store.dispatch('OpenSelectUserAndHandleAudit', {
                processId: res.data.processInstanceId,
                formData: res.data
              }).then(() => {
                this.$message.success(res.message);
              });
            } else {
              this.$message.success(res.message);
            }
          } else {
            this.$message({ message: res.message, type: 'warning' });
          }
        }).catch(error => {
          console.log(error);
        });
    },

    /**
       * 获取表单内容
       * */
    getDetail() {
      if (this.$utils.isEmpty(this.detailFormId)) {
        this.addDetail();
      } else {
        return api.static.getObjDetail({
          ...this.apiParams,
          field: { id: this.detailFormId }
        }).then(res => {
          if (res.status && res.status === 200) {
            console.log('get detailForm', res);
            this.detailForm = Object.assign({}, res.data, {
              signDate: res.data.signDate ? new Date(res.data.signDate).getTime() : ''
            });
          } else {
            this.$message({ message: res.message, type: 'warning' });
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    /**
       * 点击显示哪种弹窗 项目  单位
       * */
    toipClick(type) {
      if (this.disabled) return;
      this.type = type;
      this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true;
    },
    selectionChange(row) {
      console.log('回传row', row);
      this.selectedRow = row.selectedRow;
    },

    /**
       * 弹窗传回的名称
       * */
    handleChange() {
      const row = this.selectedRow;
      if (!this.isSelectedRow(row)) return false;
      if (Object.keys(row).length === 0) return;
      switch (this.type) {
        case 'unit':
          if (this.detailForm.cusOrgId !== row.id) {
            this.detailForm = Object.assign({}, this.detailForm, {
              cusOrgName: row.name,
              cusOrgId: row.id
            });
          }
          break;
      }
      this.saveBtnDisabledFlag = false;
      this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false;
    }
  }
};
</script>

