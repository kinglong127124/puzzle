<template>
  <div>
    <basic-handler>
      <el-button
        :disabled="disabledFlag"
        type="primary"
        plain
        icon="el-icon-edit-outline"
        size="small"
        @click="handleDispose">一键处理
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getDetail">刷新</el-button>
    </basic-handler>
    <el-form
      ref="refDetailForm"
      :model="detailForm"
      :rules="rules"
      :show-message="false"
      class="form-container"
      label-width="120px">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="info">
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
              <el-form-item label="单据名称">
                <el-input
                  v-model="detailForm.name"
                  :disabled="true"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入单据名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="申请单位">
                <el-input
                  v-model="detailForm.appOrgName"
                  :disabled="true"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入申请单位"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="申请日期">
                <el-date-picker
                  :editable="false"
                  :clearable="false"
                  v-model="detailForm.appTime"
                  :disabled="true"
                  size="small"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="timestamp"
                  placeholder="选择日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人员" >
                <el-input
                  v-model="detailForm.appPerson"
                  :disabled="true"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入申请人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人电话">
                <el-input
                  v-model="detailForm.appPersonPhone"
                  :disabled="true"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入申请人电话"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="是否处理" prop="isHandle" class="add-border disabled">
                <el-radio-group v-model="detailForm.isHandle">
                  <el-radio
                    v-for="(row) in dataEnum.isOrNot"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    :disabled="true"
                  >
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="处理人员" prop="handlePerson">
                <el-input
                  ref="refHandlePerson"
                  v-model="detailForm.handlePerson"
                  :disabled="disabledFlag"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入处理人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="处理时间" prop="handleTime" hide-required-asterisk>
                <el-date-picker
                  :editable="false"
                  :clearable="false"
                  v-model="detailForm.handleTime"
                  :disabled="disabledFlag"
                  size="small"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="timestamp"
                  placeholder="选择时间"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="申请前" name="before">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="授权模式" prop="beforAuthModel" class="add-border disabled">
                <el-radio-group v-model="detailForm.beforAuthModel">
                  <el-radio
                    v-for="(row) in dataEnum.auth"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    :disabled="true">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="授权方式" prop="beforAuthWay" class="add-border disabled">
                <el-radio-group v-model="detailForm.beforAuthWay">
                  <el-radio
                    v-for="(row) in dataEnum.static.authModeType"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    :disabled="true">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="授权数量">
                <el-input
                  v-model="detailForm.beforAuthNum"
                  :disabled="true"
                  clearable
                  size="small"
                  min="0"
                  maxlength="100"
                  placeholder="请输入授权数量"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="授权开始" prop="beforAuthBeginTime">
                <el-date-picker
                  :editable="false"
                  :clearable="false"
                  v-model="detailForm.beforAuthBeginTime"
                  :disabled="true"
                  size="small"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="timestamp"
                  placeholder="选择时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="授权截至" prop="beforAuthEndTime">
                <el-date-picker
                  :editable="false"
                  :clearable="false"
                  v-model="detailForm.beforAuthEndTime"
                  :disabled="true"
                  size="small"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="timestamp"
                  placeholder="选择时间"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="申请后" name="after">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item :class="{disabled:disabledFlag}" label="授权模式" prop="afterAuthModel" class="add-border">
                <el-radio-group v-model="detailForm.afterAuthModel">
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
              <el-form-item :class="{disabled:disabledFlag}" label="授权方式" prop="afterAuthWay" class="add-border">
                <el-radio-group v-model="detailForm.afterAuthWay">
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
              <el-form-item label="授权数量" prop="afterAuthNum">
                <el-input
                  v-model="detailForm.afterAuthNum"
                  :disabled="disabledFlag"
                  clearable
                  size="small"
                  min="0"
                  maxlength="15"
                  placeholder="请输入授权数量"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="授权开始" prop="afterAuthBeginTime">
                <el-date-picker
                  :editable="false"
                  v-model="detailForm.afterAuthBeginTime"
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
              <el-form-item label="授权截至" prop="afterAuthEndTime">
                <el-date-picker
                  :editable="false"
                  v-model="detailForm.afterAuthEndTime"
                  :disabled="disabledFlag"
                  size="small"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="timestamp"
                  placeholder="选择时间"
                  @change="changeEndTime"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="申请说明">
                <el-input
                  :disabled="disabledFlag"
                  :autosize="{ minRows:6, maxRows: 8}"
                  :maxlength="5000"
                  v-model="detailForm.appNote"
                  size="small"
                  clearable
                  type="textarea"
                  placeholder="请输入申请说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="扩容合同" name="contract">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item :class="{disabled:disabledFlag}" label="是否签约" class="add-border">
                <el-radio-group v-model="detailForm.signStatus">
                  <el-radio
                    v-for="(row) in dataEnum.isOrNot"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    :disabled="disabledFlag"
                  >
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号" prop="" hide-required-asterisk>
                <el-input
                  v-model="detailForm.contractCode"
                  :disabled="disabledFlag"
                  size="small"
                  readonly
                  placeholder="请选择合同编号">
                  <el-button
                    slot="append"
                    :disabled="disabledFlag"
                    size="small"
                    icon="el-icon-plus"
                    class="form-btn"
                    @click="toipClick('contractCode')"/>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原始合同号" >
                <el-input
                  v-model="detailForm.contractOrignalCode"
                  :disabled="disabledFlag"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入原始合同号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="合同名称" >
                <el-input
                  v-model="detailForm.contractName"
                  :disabled="disabledFlag"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入合同名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签约日期">
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
              <el-form-item label="商务人员" >
                <el-input
                  v-model="detailForm.busPerson"
                  :disabled="disabledFlag"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入商务人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商务人员电话" >
                <el-input
                  v-model="detailForm.busPersonPhone"
                  :disabled="disabledFlag"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入商务人员电话"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商务人员邮箱" prop="busPersonEmail">
                <el-input
                  v-model="detailForm.busPersonEmail"
                  :disabled="disabledFlag"
                  size="small"
                  clearable
                  maxlength="100"
                  placeholder="请输入商务人员邮箱"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="签约说明">
                <el-input
                  :disabled="disabledFlag"
                  :autosize="{ minRows:6, maxRows: 8}"
                  :maxlength="5000"
                  v-model="detailForm.signNote"
                  size="small"
                  clearable
                  type="textarea"
                  placeholder="请输入签约说明，不超过5000字"/>
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
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContractCode" title="合同编号-选择">
      <dialog-business-contract
        v-if="visibleSyncContractCode"
        @selectionChange="selectionChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContractCode = false">取 消</el-button>
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
const dialogBusinessContract = () => import('@framesDashboardViewsComp/dialog/dialogBusinessContract');
import { staticDataBasic } from '@coreData/basic';
import { validateLength } from '@coreUtils/validate';
/**
   * api
   * */
import api from '@coreApi/common';
import { putHandle } from '@custormManager/api/sysInfo/businessManager';
export default {
  name: 'ServiceLogDetail',
  components: {
    dialogBusinessContract
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
      detailForm: {},
      detailFormId: undefined,
      activeNames: ['info', 'before', 'after', 'contract'],
      rules: {
        handlePerson: [
          { required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['处理人员', 1, 100]);
            }, trigger: 'change' }
        ],
        handleTime: [
          { required: true, message: '请选择处理时间', trigger: 'change' }
        ],
        afterAuthModel: [
          { required: true, message: '请选择授权模式', trigger: 'change' }
        ],
        afterAuthWay: [
          { required: true, message: '请选择授权方式', trigger: 'change' }
        ],
        afterAuthNum: [
          { required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['授权数量', 1, 100]);
            },
            trigger: 'change' }
        ]
      },
      apiParams: {
        productAlias: 'smartpm',
        pageCode: 'sysBusAppCapacity'
      },
      /**
         * 弹窗
         * */
      type: null,
      visibleSyncContractCode: false,
      selectedRow: {}

    };
  },
  computed: {
    disabledFlag() {
      return this.detailForm && this.detailForm.isHandle === 1;
    }
  },
  watch: {},
  deactivated() {
    this.$store.dispatch('cacheId', undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(this, () => {
      if (this.$route.params) {
        this.detailFormId = this.$route.params.id ? this.$route.params.id : undefined;
      }
    }, (id) => {
      this.detailFormId = id;
      this.getDetail();
    });
  },

  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetIsOrNotData',
      'GetAuthData'
    ]);
    this.$store.dispatch('cacheId', '0');// 刷新
  },
  methods: {
    /**
     * 一键处理
     */
    handleDispose() {
      this.validateAfter(() => {
        this.disposeData();
      });
    },
    disposeData() {
      return putHandle(this.detailForm).then((res) => {
        if (res.status && res.status === 200) {
          this.detailForm = Object.assign({}, res.data, {
            afterAuthBeginTime: res.data.afterAuthBeginTime ? new Date(res.data.afterAuthBeginTime).getTime() : '',
            afterAuthEndTime: res.data.afterAuthEndTime ? new Date(res.data.afterAuthEndTime).getTime() : '',
            appTime: res.data.appTime ? new Date(res.data.appTime).getTime() : '',
            beforAuthBeginTime: res.data.beforAuthBeginTime ? new Date(res.data.beforAuthBeginTime).getTime() : '',
            beforAuthEndTime: res.data.beforAuthEndTime ? new Date(res.data.beforAuthEndTime).getTime() : '',
            handleTime: res.data.handleTime ? new Date(res.data.handleTime).getTime() : '',
            signDate: res.data.signDate ? new Date(res.data.signDate).getTime() : ''
          });
          this.$message.success(res.message);
        }
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
        this.$message({
          message: staticDataBasic.info.updateEmptyError,
          type: 'warning'
        });
        return this.$utilsBasic.valideFocus(this, ['refHandlePerson']);
      }
    },
    /**
     * 获取表单内容
     * */
    getDetail() {
      return api.static.getObjDetail({
        ...this.apiParams,
        field: { id: this.detailFormId }
      }).then(res => {
        if (res.status && res.status === 200) {
          console.log('get detailForm', res);
          this.detailForm = Object.assign({}, res.data, {
            afterAuthBeginTime: res.data.afterAuthBeginTime ? new Date(res.data.afterAuthBeginTime).getTime() : '',
            afterAuthEndTime: res.data.afterAuthEndTime ? new Date(res.data.afterAuthEndTime).getTime() : '',
            appTime: res.data.appTime ? new Date(res.data.appTime).getTime() : '',
            beforAuthBeginTime: res.data.beforAuthBeginTime ? new Date(res.data.beforAuthBeginTime).getTime() : '',
            beforAuthEndTime: res.data.beforAuthEndTime ? new Date(res.data.beforAuthEndTime).getTime() : '',
            handleTime: res.data.handleTime ? new Date(res.data.handleTime).getTime() : '',
            signDate: res.data.signDate ? new Date(res.data.signDate).getTime() : ''
          });
          this.$refs.refDetailForm.resetFields();
        } else {
          this.$message({ message: res.message, type: 'warning' });
        }
      }).catch(err => {
        console.log(err);
      });
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
        case 'contractCode':
          if (this.detailForm.contractCode !== row.code) {
            this.detailForm = Object.assign({}, this.detailForm, {
              contractCode: row.code,
              contractName: row.name,
              contractOrignalCode: row.orignalCode,
              signDate: new Date(row.signDate).getTime(),
              signPrice: row.signPrice
            });
          }
          break;
      }
      this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false;
    },
    changeBeginTime(time) {
      console.log('changeBeginTime', time, this.detailForm.afterAuthEndTime);
      if (this.detailForm.afterAuthEndTime && time > this.detailForm.afterAuthEndTime) {
        this.$message({ message: '开始时间不能大于结束时间', type: 'warning' });
        this.$set(this.detailForm, 'afterAuthBeginTime', null);
      }
    },
    changeEndTime(time) {
      if (this.detailForm.afterAuthBeginTime && time < this.detailForm.afterAuthBeginTime) {
        this.$message({ message: '结束时间不能小于开始时间', type: 'warning' });
        this.$set(this.detailForm, 'afterAuthEndTime', null);
      }
    }
  }
};
</script>

