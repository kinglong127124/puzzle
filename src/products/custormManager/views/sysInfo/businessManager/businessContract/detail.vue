<template>
  <div class="detail-container">
    <div class="handler-container">
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
        :disabled="deleteBtnDisabledFlag"
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
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getDetailForm">刷新</el-button>
    </div>
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
          <el-form-item label="合同编码">
            <el-input v-model="detailForm.code" :disabled="true" size="small" clearable placeholder="系统自动生成合同编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原始合同号" prop="orignalCode" hide-required-asterisk>
            <el-input
              ref="refOrignalCode"
              v-model="detailForm.orignalCode"
              :disabled="disabledFlag"
              size="small"
              clearable
              placeholder="请输入原始合同号"
              maxlength="100"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="合同名称" prop="name" hide-required-asterisk>
            <el-input
              ref="refName"
              v-model="detailForm.name"
              :disabled="disabledFlag"
              size="small"
              clearable
              placeholder="请输入合同名称"
              maxlength="100"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="产品开发单位">
            <el-input
              ref="refPerson"
              v-model="detailForm.devOrgName"
              :disabled="true"
              size="small"
              clearable
              placeholder="请输入产品开发单位"
              maxlength="100"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品服务单位" prop="serviceOrgName" hide-required-asterisk>
            <el-input
              v-model="detailForm.serviceOrgName"
              :disabled="disabledFlag "
              size="small"
              readonly
              placeholder="请选择产品服务单位">
              <el-button
                slot="append"
                :disabled="disabledFlag"
                size="small"
                icon="el-icon-plus"
                class="form-btn"
                @click="toipClick('org')"/>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品使用单位" prop="useOrgName" hide-required-asterisk>
            <el-input
              v-model="detailForm.useOrgName"
              :disabled="disabledFlag "
              size="small"
              readonly
              placeholder="请选择产品使用单位">
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
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :class="{disabled:disabledFlag}" label="授权模式" prop="authModel" class="add-border">
            <el-radio-group v-model="detailForm.authModel">
              <el-radio
                v-for="(row) in dataEnum.auth"
                :disabled="disabledFlag"
                :label="parseInt(row.code)"
                :key="row.code">
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :class="{disabled:disabledFlag}" label="授权方式" prop="authWay" class="add-border">
            <el-radio-group v-model="detailForm.authWay">
              <el-radio
                v-for="(row) in dataEnum.static.authModeType"
                :disabled="disabledFlag"
                :label="parseInt(row.code)"
                :key="row.code">
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权数" prop="authNum">
            <el-input
              :disabled="disabledFlag"
              v-model="detailForm.authNum"
              clearable
              size="small"
              min="0"
              maxlength="100"
              placeholder="请输入授权数"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="授权开始" prop="authBeginTime">
            <el-date-picker
              :editable="false"
              :clearable="false"
              v-model="detailForm.authBeginTime"
              :disabled="disabledFlag"
              size="small"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
              placeholder="选择时间"
              @change="changeBeginTime"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权截至" prop="authEndTime">
            <el-date-picker
              :editable="false"
              :clearable="false"
              v-model="detailForm.authEndTime"
              :disabled="disabledFlag"
              size="small"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
              placeholder="选择时间"
              @change="changeEndTime"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约金额">
            <basic-input
              :format-value="formatToMoney"
              :format="formatToThousands"
              v-model="detailForm.signPrice"
              :disabled="disabledFlag"
              :min="0"
              clearable
              price
              placeholder="请输入签约金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="签约日期">
            <el-date-picker
              :editable="false"
              :clearable="false"
              v-model="detailForm.signDate"
              :disabled="disabledFlag"
              size="small"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类型">
            <el-select
              v-model="detailForm.invoiceType"
              :disabled="disabledFlag"
              size="small"
              class="mode-select"
              placeholder="请选择发票类型"
              @change="detailForm.invoiceTypeId = dataDictionary.invoiceType.data.filter( item => item.name == detailForm.invoiceType )[0].id"
            >
              <el-option
                v-for="item in dataDictionary.invoiceType.data"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票税率">
            <basic-input
              :format-value="formatToMoney"
              :format="formatToThousands"
              :disabled="disabledFlag || (detailForm.invoiceType==='无')"
              v-model="detailForm.invoiceTaxRate"
              :min="0"
              :max="1"
              clearable
              placeholder="请输入发票税率"
              price
              @change="changeInvoiceTaxRate"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="商务人员" >
            <el-input
              v-model="detailForm.busPerson"
              :disabled="disabledFlag"
              clearable
              size="small"
              min="0"
              maxlength="100"
              placeholder="请输入商务人员"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="合同摘要">
            <el-input
              :disabled="disabledFlag"
              :autosize="{ minRows:6, maxRows: 8}"
              v-model="detailForm.summary"
              maxlength="5000"
              size="small"
              clearable
              type="textarea"
              placeholder="请输入合同摘要，不超过5000字"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="补充说明">
            <el-input
              :disabled="disabledFlag"
              :autosize="{ minRows:6, maxRows: 8}"
              v-model="detailForm.remark"
              maxlength="5000"
              size="small"
              clearable
              type="textarea"
              placeholder="请输入补充说明，不超过5000字"/>
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
            <el-input
              v-model="detailForm.inputPerson"
              :disabled="true"
              size="small"
              clearable
              placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input v-model="detailForm.inputTime" :disabled="true" size="small" clearable placeholder="系统自动生成登记时间"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncOrg" title="产品服务单位-选择">
      <dialog-organization
        v-if="visibleSyncOrg"
        @selectionChange="selectionChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncOrg = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
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
const dialogOrganization = () => import('@framesDashboardViewsComp/dialog/dialogOrganization');
const dialogUnit = () => import('@framesDashboardViewsComp/dialog/dialogUnit');
import formatBasic from '@coreMixins/formatBasic';
import { staticDataBasic } from '@coreData/basic';
import { validateLength, validateRegex, isNumber } from '@coreUtils/validate';
/**
   * api
   * */
import api from '@coreApi/common';

export default {
  name: 'BusinessContractDetail',
  components: {
    dialogOrganization,
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

      apiParams: {
        productAlias: 'smartpm',
        pageCode: 'sysBusContractMaster'
      },
      detailFormId: undefined,
      detailForm: {},
      saveBtnDisabledFlag: true,

      rules: {
        orignalCode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['原始合同号', 1, 100]);
            },
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['合同名称', 1, 100]);
            },
            trigger: 'change'
          }
        ],
        authNum: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['授权数', 1, 20]);
            },
            trigger: 'change'
          },
          {
            required: true,
            validator: (rule, value, callback) => {
              validateRegex(rule, value, callback, true, ['授权数'], isNumber);
            },
            trigger: 'change'
          }
        ],
        serviceOrgName: [
          { required: true, message: '请选择产品服务单位', trigger: 'change' }
        ],
        useOrgName: [
          { required: true, message: '请选择产品使用单位', trigger: 'change' }
        ],
        authBeginTime: [
          { required: true, message: '请选择授权开始时间', trigger: 'change' }
        ],
        authEndTime: [
          { required: true, message: '请选择授权结束时间', trigger: 'change' }
        ]
      },

      type: null,
      visibleSyncOrg: false,
      visibleSyncUnit: false,
      selectedRow: {}

    };
  },
  computed: {
    deleteBtnDisabledFlag() {
      return !(this.detailForm.validateStatus === 2) || !(this.detailForm.id);
    },
    auditBtnDisabledFlag() {
      if (this.validateStatus) {
        if (this.detailForm.validateStatus == 5 && this.reserve == 1) return false;
        return this.validateStatus.map(item => Number(item.code)).includes(this.detailForm.validateStatus);
      }
    },

    disabledFlag() {
      return this.auditBtnDisabledFlag;
    },
    validateStatus() {
      if (!Array.isArray(this.dataEnum.auditStatusEnum)) return {};
      return this.dataEnum.auditStatusEnum.filter(item => (item.code == 1 || item.code == 3 || item.code == 4 || item.code == 5));
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
      this.handleAddBtn();
    }, (id) => {
      this.detailFormId = id;
      this.getDetailForm();
    });
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetAuditStatusEnum',
      'GetAuthData',
      'GetInvoiceTypeList'
    ]);
    this.$store.dispatch('cacheId', '0');// 刷新
  },
  methods: {
    handleAddBtn() {
      this.addDetailForm();

      this.$nextTick(() => {
        // this.saveBtnDisabledFlag = true;
      });
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
          this.addDetailForm();
        } else {
          this.deleteDetailForm().then(() => {
            this.addDetailForm();
          }).catch(error => {
            console.log(error);
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    handleAuditBtn() {
      this.$confirm(staticDataBasic.info.audit, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.validateAfter(() => {
          this.saveDetailForm(true).then(() => {
            this.auditDetailForm();
          });
        });
      }).catch(error => {
        console.log(error);
      });
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
        this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
        return this.$utilsBasic.valideFocus(this, ['refOrignalCode', 'refName', 'refPerson']);
      }
    },

    /**
       * 点击显示哪种弹窗
       * */
    toipClick(type) {
      if (this.disabled) return;
      this.type = type;
      this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true;
    },
    selectionChange(row) {
      this.selectedRow = row.selectedRow;
    },
    /**
       * 弹窗传回的项目名称
       * */
    handleChange() {
      const row = this.selectedRow;
      if (!this.isSelectedRow(row)) return false;
      if (Object.keys(row).length === 0) return;
      switch (this.type) {
        case 'org':
          this.detailForm = Object.assign({}, this.detailForm, {
            serviceOrgName: row.name,
            serviceOrgId: row.id
          });
          break;
        case 'unit':
          this.detailForm = Object.assign({}, this.detailForm, {
            useOrgName: row.name,
            useOrgId: row.id
          });
          break;
      }
      this.saveBtnDisabledFlag = false;
      this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false;
    },

    /**
       * 新增表单内容
       * */
    addDetailForm() {
      this.$nextTick(() => {
        this.detailFormId = undefined;
        this.detailForm = {
          id: '',
          validateStatus: 2,
          handEndDate: new Date().getTime(),
          devOrgName: this.$store.state.user.login.orgName,
          devOrgId: this.$store.state.user.login.orgId,
          authModel: 2,
          authWay: 1,
          authNum: 10,
          authBeginTime: new Date().getTime(),
          authEndTime: new Date().getTime(),
          signDate: new Date().getTime(),
          invoiceTaxRate: '0.00',
          inputPerson: this.userLogin.inputPersonFullPath,
          inputTime: this.$utils.date.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
        };
      });
      this.$refs.refDetailForm.resetFields();
      this.$refs.refOrignalCode.focus();
      console.log('this.detailForm', this.detailForm);
    },
    /**
       * 获取表单内容
       * */
    getDetailForm() {
      if (this.detailFormId) {
        return api.static.getObjDetail({
          ...this.apiParams,
          field: { id: this.detailFormId }
        })
          .then((res) => {
            if (res.rel) {
              console.log('表单内容', res);
              this.detailForm = res.data;
              this.$set(this.detailForm, 'authBeginTime', new Date(res.data.authBeginTime).getTime());
              this.$set(this.detailForm, 'authEndTime', new Date(res.data.authEndTime).getTime());
              this.$set(this.detailForm, 'signDate', new Date(res.data.signDate).getTime());
              this.$nextTick(() => {
                // this.saveBtnDisabledFlag =true
              });
            } else {
              this.$message({ message: res.message, type: 'warning' });
            }
          }).catch(error => {
            console.log(error);
          });
      } else {
        this.addDetailForm();
      }
    },
    /**
       * save detailForm
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
              this.detailForm = res.data;
              this.$set(this.detailForm, 'authBeginTime', new Date(res.data.authBeginTime).getTime());
              this.$set(this.detailForm, 'authEndTime', new Date(res.data.authEndTime).getTime());
              this.$set(this.detailForm, 'signDate', new Date(res.data.signDate).getTime());
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
              this.detailForm = res.data;
              this.$set(this.detailForm, 'authBeginTime', new Date(res.data.authBeginTime).getTime());
              this.$set(this.detailForm, 'authEndTime', new Date(res.data.authEndTime).getTime());
              this.$set(this.detailForm, 'signDate', new Date(res.data.signDate).getTime());
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
       * delete detailForm
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
       * audit detailForm
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
            this.detailForm = res.data;
            this.$set(this.detailForm, 'authBeginTime', new Date(res.data.authBeginTime).getTime());
            this.$set(this.detailForm, 'authEndTime', new Date(res.data.authEndTime).getTime());
            this.$set(this.detailForm, 'signDate', new Date(res.data.signDate).getTime());
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
    changeInvoiceTaxRate() {
      if (this.detailForm.invoiceTaxRate < 0 || this.detailForm.invoiceTaxRate > 1) {
        this.detailForm.invoiceTaxRate = '0';
        this.$message({ message: staticDataBasic.info.invoiceTaxRate, type: 'warning' });
      }
    },
    changeBeginTime(time) {
      console.log('changeBeginTime', time, this.detailForm.authEndTime);
      if (time > this.detailForm.authEndTime) {
        this.$message({ message: '开始时间不能大于结束时间', type: 'warning' });
        this.$set(this.detailForm, 'authBeginTime', null);
      }
    },
    changeEndTime(time) {
      if (time < this.detailForm.authBeginTime) {
        this.$message({ message: '结束时间不能小于开始时间', type: 'warning' });
        this.$set(this.detailForm, 'authEndTime', null);
      }
    }

  }
};
</script>

