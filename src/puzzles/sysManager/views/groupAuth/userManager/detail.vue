<template>
  <div>
    <div class="handler-container">
      <el-button
        v-if="userManagerDetailBtnAdd"
        type="primary"
        size="small"
        icon="el-icon-plus"
        plain
        @click="clickUserManagerDetailAdd">新增
      </el-button>
      <el-button
        v-if="userManagerDetailBtnEdit"
        type="primary"
        size="small"
        icon="el-icon-if-save"
        plain
        @click="clickUserManagerDetailEdit">保存
      </el-button>
      <el-button
        v-if="userManagerDetailBtnDelete"
        :disabled="disabledUserManagerDetailDelete"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="clickUserManagerDetailDelete">删除
      </el-button>
      <el-button
        v-if="userManagerDetailBtnAudit"
        :disabled="disabledUserManagerDetailAudit"
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        plain
        @click="clickUserManagerDetailAudit">
        审核
      </el-button>
      <el-button
        v-if="userManagerDetailBtnDisenable"
        :disabled="disabledUserManagerDetailDisenable"
        type="danger"
        size="small"
        icon="el-icon-circle-close-outline"
        plain
        @click="clickUserManagerDetailDisenable">禁用
      </el-button>
      <el-button
        v-if="userManagerDetailBtnEnable"
        :disabled="disabledUserManagerDetailEnable"
        type="success"
        size="small"
        icon="el-icon-circle-check-outline"
        plain
        @click="clickUserManagerDetailEnable">启用
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-refresh"
        plain
        @click="getUserManagerDetailData">刷新
      </el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form
          ref="refUserManagerDetail"
          :model="modelUserManagerDetail"
          :rules="rulesUserManager"
          :show-message="false"
          class="form-container"
          label-width="120px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                <el-radio-group v-model="modelUserManagerDetail.validateStatus">
                  <el-radio
                    v-for="(row) in dataEnum.validateStatus"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="启用状态" prop="enable" class="add-border disabled">
                <el-radio-group v-model="modelUserManagerDetail.enable">
                  <el-radio
                    v-for="(row) in dataEnum.enabled"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="系统编码">
                <el-input v-model="modelUserManagerDetail.code" clearable size="small" placeholder="自动生成系统编码" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="中文姓名" prop="username" hide-required-asterisk>
                <el-input
                  ref="refUserManagerDetailName"
                  v-model="modelUserManagerDetail.username"
                  :disabled="disableduserManagerDetailName"
                  clearable
                  size="small"
                  placeholder="请输入中文姓名,最大长度10字符"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="英文姓名" prop="englishName">
                <el-input
                  v-model="modelUserManagerDetail.englishName"
                  clearable
                  size="small"
                  placeholder="请输入英文姓名,最大长度20字符"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工ID号" prop="jobNumber">
                <el-input
                  v-model="modelUserManagerDetail.jobNumber"
                  clearable
                  size="small"
                  placeholder="请输入员工ID号,最大长度20字符"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item :class="{disabled:disabledIfOperate}" label="是否操作员" prop="ifOperate" class="add-border">
                <el-radio-group v-model="modelUserManagerDetail.ifOperate" :disabled="disabledIfOperate">
                  <el-radio
                    v-for="(row) in dataEnum.isOrNot"
                    :label="parseInt(row.code)"
                    :key="row.code">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登录手机号" prop="mobilePhone" hide-required-asterisk>
                <el-input
                  ref="refUserManagerDetailMobilePhone"
                  v-model="modelUserManagerDetail.mobilePhone"
                  clearable
                  size="small"
                  placeholder="请输入登录手机号，以11位手机号格式标准"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :class="{disabled:disabledIsAdmin}" label="是否系统管理员" prop="isAdmin" class="add-border">
                <el-radio-group v-model="modelUserManagerDetail.isAdmin" :disabled="disabledIsAdmin">
                  <el-radio
                    v-for="(row) in dataEnum.isOrNot"
                    :label="parseInt(row.code)"
                    :key="row.code">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="性别" prop="sex" class="add-border">
                <el-radio-group v-model="modelUserManagerDetail.sex">
                  <el-radio
                    v-for="(row) in dataEnum.gender"
                    :label="row.code"
                    :key="row.code">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族" prop="nation">
                <el-input v-model="modelUserManagerDetail.nation" clearable size="small" placeholder="请输入民族,最大长度10字符"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="主岗岗位">
                <el-input
                  v-model="modelUserManagerDetail.mainName"
                  clearable
                  size="small"
                  placeholder="自动生成主岗岗位"
                  disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="补充说明" prop="description">
                <el-input
                  v-model="modelUserManagerDetail.description"
                  clearable
                  size="small"
                  placeholder="请输入补充说明,最大长度200字符"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :form-id="modelUserManagerDetail.id"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input
                  v-model="modelUserManagerDetail.crtName"
                  clearable
                  size="small"
                  placeholder="自动生成登记人员"
                  disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input
                  v-model="modelUserManagerDetail.crtTime"
                  clearable
                  size="small"
                  placeholder="自动生成登记时间"
                  disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <transition name="slide-fade">
      <div
        v-if="modelUserManagerDetail.id"
        ref="refSplitPane"
        :style="{height:heightSplitPane + 'px'}"
        class="splitPane-container margin-top10">
        <split-pane :min-percent="30" :default-percent="60" split="vertical">
          <template slot="paneL">
            <div class="left-container">
              <div class="handler-container">
                <el-button
                  v-if="elements['userManagerDetailStation:btn_add']"
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                  plain
                  @click="clickUserManagerDetailStationAdd">引入岗位
                </el-button>
                <el-button
                  v-if="elements['userManagerDetailStation:btn_delete']"
                  :disabled="disabledStationDelete"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  plain
                  @click="clickUserManagerDetailStationDelete">删除
                </el-button>
                <el-button
                  v-if="elements['userManagerDetailStation:btn_setStation']"
                  :disabled="disabledSetStation"
                  type="primary"
                  size="small"
                  icon="el-icon-if-introduce"
                  plain
                  @click="clickUserManagerDetailStationSetStation">主岗岗位
                </el-button>
              </div>
              <el-table
                ref="refStation"
                :key="stationDataKey"
                :data="stationData"
                height="310"
                border
                fit
                highlight-current-row
                stripe
                @current-change="clickStationCurrentChange">
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"/>
                <el-table-column
                  prop="code"
                  label="岗位编码"
                  width="120"
                  align="left"
                  header-align="center"
                  show-overflow-tooltip/>
                <el-table-column
                  prop="orgPathName"
                  label=" 名称"
                  min-width="160"
                  align="left"
                  header-align="center"
                  show-overflow-tooltip/>
                <el-table-column
                  :formatter="formatIfMainDuty"
                  prop="ifMainDuty"
                  label="是否主岗"
                  width="80"
                  align="center"/>
                <el-table-column
                  class-name="spacing-set"
                  label="补充说明"
                  min-width="120"
                  align="left"
                  header-align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.orgUserOrgReserve" clearable size="small" maxlength="100"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
          <template slot="paneR">
            <div class="right-container">
              <div class="handler-container">
                <el-button
                  v-if="elements['userManagerDetailRoles:btn_add']"
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                  plain
                  @click="clickUserManagerDetailRolesAdd">引入角色
                </el-button>
                <el-button
                  v-if="elements['userManagerDetailRoles:btn_delete']"
                  :disabled="disabledRolesDelete"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  plain
                  @click="clickUserManagerDetailRolesDelete">删除
                </el-button>
              </div>
              <el-table
                ref="refRoles"
                :key="rolesDataKey"
                :data="rolesData"
                height="310"
                border
                fit
                highlight-current-row
                stripe
                @current-change="clickRolesCurrentChange">
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"/>
                <el-table-column
                  prop="code"
                  label="角色编码"
                  width="140"
                  align="left"
                  header-align="center"
                  show-overflow-tooltip/>
                <el-table-column
                  prop="name"
                  label=" 角色名称"
                  width="160"
                  align="left"
                  header-align="center"
                  show-overflow-tooltip/>
                <el-table-column
                  class-name="spacing-set"
                  label="补充说明"
                  min-width="120"
                  align="left"
                  header-align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.reserve" clearable size="small" maxlength="100"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </split-pane>
      </div>
    </transition>
    <basic-dialog v-el-drag-dialog :visible.sync="station.visibleSync" title="引入岗位-选择">
      <dialog-station
        v-if="station.visibleSync"
        ref="refDialogStation"
        :station-data="stationData"
        :is-show-checked="true"
        @selectionChange="selectionChangeStation"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickUserManagerDetailStationCancel">取 消</el-button>
        <el-button type="primary" @click="clickUserManagerDetailStationOk">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="roles.visibleSync" title="引入角色-选择" width="50%">
      <dialog-role
        v-if="roles.visibleSync"
        ref="refDialogRole"
        :role-data="rolesData"
        @selectionChange="selectionChangeRole"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickUserManagerDetailRolesCancel">取 消</el-button>
        <el-button type="primary" @click="clickUserManagerDetailRolesOk">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import {
  getUserManagerDetailData,
  putUserManagerDetailEnable,
  deleteUserManagerDetailDelete,
  postUserManagerDetailAddAll,
  putUserManagerDetailAudit,
  getUserManagerDetailStationData,
  postUserManagerDetailStationAddOk,
  putUserManagerDetailStationUpdate,
  deleteUserManagerDetailStationDelete,
  getUserManagerDetailRolesData,
  postUserManagerDetailRolesAddOk,
  deleteUserManagerDetailRolesDelete
} from '@puzzlesSys/api/groupAuth/userManager/detail';
import { deepCloneByObject, logout } from '@coreUtils/index';
import { validatePhone, validateLength } from '@coreUtils/validate';
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import splitPane from 'vue-splitpane';
import { staticDataBasic } from '@coreData/basic';
import { staticDataEnum } from '@coreData/enum';
import dialogStation from '@framesDashboardViews/components/dialog/dialogStation';
import dialogRole from '@framesDashboardViews/components/dialog/dialogRole';

export default {
  name: 'UserManagerDetail',
  components: { splitPane, dialogStation, dialogRole },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      activeNames: ['1'],
      disabledUserManagerDetailDelete: true,
      disabledUserManagerDetailAudit: true,
      disabledUserManagerDetailDisenable: true,
      disabledUserManagerDetailEnable: true,
      autofocusMobilePhone: false,
      disableduserManagerDetailName: false,
      disabledUserManagerDetailRefresh: false,
      modelUserManagerDetail: {},
      userManagerDetailId: undefined,
      stationDataKey: 0,
      rolesDataKey: 0,
      rulesUserManager: {
        username: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.modelUserManagerDetail.validateStatus !== 1) {
                validateLength(rule, value, callback, true, ['中文姓名', 1, 10]);
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
        englishName: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['英文姓名', 1, 20]);
            },
            trigger: 'change'
          }
        ],
        jobNumber: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['员工ID号', 1, 20]);
            },
            trigger: 'change'
          }
        ],
        mobilePhone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validatePhone(rule, value, callback, true, ['登录手机号']);
            },
            trigger: 'change'
          }
        ],
        nation: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['民族', 1, 10]);
            },
            trigger: 'change'
          }
        ],
        description: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['补充说明', 1, 200]);
            },
            trigger: 'change'
          }
        ]
      },
      stationData: [],
      stationDataTotal: null,
      stationDataValue: 0,
      currentRowStationData: null,
      rolesData: [],
      rolesDataTotal: null,
      rolesDataValue: 0,
      currentRowRolesData: null,
      userManagerDetailBtnAdd: false,
      userManagerDetailBtnEdit: false,
      userManagerDetailBtnDelete: false,
      userManagerDetailBtnAudit: false,
      userManagerDetailBtnDisenable: false,
      userManagerDetailBtnEnable: false,
      // 岗位选择
      station: {
        visibleSync: false,
        stationSelectionChange: []
      },
      stationFilterText: '',
      // 角色选择
      roles: {
        visibleSync: false
      },
      heightSplitPane: '380',
      disabledIfOperate: false,
      disabledIsAdmin: false,
      visibleSyncUpload: false
    };
  },
  computed: {
    disabledStationDelete() {
      if (this.currentRowStationData && this.currentRowStationData.id) {
        if (this.currentRowStationData.ifMainDuty == 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    disabledSetStation() {
      if (this.currentRowStationData && this.currentRowStationData.id && this.currentRowStationData.ifMainDuty) {
        return false;
      } else {
        return true;
      }
    },
    disabledRolesDelete() {
      if (this.currentRowRolesData && this.currentRowRolesData.id) {
        if (this.modelUserManagerDetail.type == 2) {
          return false;// 可删
        } else {
          if (this.currentRowRolesData.groupType == staticDataBasic.groupType[0].code) {
            return true;// 不可删
          } else {
            return false;// 可删
          }
        }
      }
      return true;
    }
  },
  deactivated() {
    this.$store.dispatch('cacheId', undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(this, () => {
      this.clickUserManagerDetailAdd();
    }, (id) => {
      this.userManagerDetailId = id;
      this.getUserManagerAllData();
    });
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetIsOrNotData',
      'GetGenderData'
    ]);
    this.$store.dispatch('cacheId', '0');// 刷新
    // 基本信息权限
    this.userManagerDetailBtnAdd = this.elements['userManagerDetail:btn_add'];
    this.userManagerDetailBtnEdit = this.elements['userManagerDetail:btn_edit'];
    this.userManagerDetailBtnDelete = this.elements['userManagerDetail:btn_del'];
    this.userManagerDetailBtnAudit = this.elements['userManagerDetail:btn_audit'];
    this.userManagerDetailBtnDisenable = this.elements['userManagerDetail:btn_disenable'];
    this.userManagerDetailBtnEnable = this.elements['userManagerDetail:btn_enable'];
  },
  methods: {
    /**
       * 获取用户管理信息数据
       */
    getUserManagerDetailData() {
      if (this.userManagerDetailId) {
        getUserManagerDetailData(this.userManagerDetailId)
          .then(response => {
            if (response && response.data) {
              this.modelUserManagerDetail = response.data;
              // 1启用和2禁用
              this.isShowUserManagerDetailEnabled();
              // 已审核
              this.isShowUserManagerDetailValidateStatused();
              // 如果是注册用户不可操作
              if (this.modelUserManagerDetail.type === staticDataBasic.userType[0].code) {
                this.disabledIfOperate = true;
                this.disabledIsAdmin = true;
              }
            } else {
              // 重置页面
              this.clickUserManagerDetailAdd();
            }
          }).catch((error) => {
            console.log(error);
          });
      } else {
        // 重置页面
        this.clickUserManagerDetailAdd();
      }
    },
    getUserManagerAllData() {
      setTimeout(() => {
        // 基本信息数据
        this.getUserManagerDetailData();
        // 岗位数据
        this.getUserManagerDetailStationData();
        // 角色数据
        this.getUserManagerDetailRolesData();
      }, 300);
    },
    /**
       * 登记人员
       */
    getUserManagerDetailPersonName() {
      if (this.modelUserManagerDetail.mainName) {
        this.modelUserManagerDetail.personName = this.modelUserManagerDetail.mainName + '/' + this.modelUserManagerDetail.username;
      }
    },
    /**
       * 1启用和2禁用,显示按钮
       */
    isShowUserManagerDetailEnabled() {
      if (this.modelUserManagerDetail.enable == 2) {
        this.disabledUserManagerDetailDisenable = true;
        this.disabledUserManagerDetailEnable = false;
      } else {
        this.disabledUserManagerDetailDisenable = false;
        this.disabledUserManagerDetailEnable = true;
      }
    },
    /**
       * 已审核,显示处理
       */
    isShowUserManagerDetailValidateStatused() {
      if (this.modelUserManagerDetail.validateStatus === 1) {
        this.disabledUserManagerDetailDelete = true;
        this.disabledUserManagerDetailAudit = true;
        this.disabledUserManagerDetailDelete = true;
        this.disableduserManagerDetailName = true;
      } else {
        this.disabledUserManagerDetailDelete = false;
        this.disabledUserManagerDetailAudit = false;
        this.disabledUserManagerDetailDisenable = true;
        this.disabledUserManagerDetailEnable = true;
        this.disableduserManagerDetailName = false;
      }
      // 刷新
      this.disabledUserManagerDetailRefresh = false;
    },
    /**
       * 获取岗位信息数据
       */
    getUserManagerDetailStationData() {
      if (this.userManagerDetailId) {
        getUserManagerDetailStationData(this.userManagerDetailId)
          .then(response => {
            if (!this.$utils.isEmpty(response.data)) {
              this.stationData = response.data;
              this.$nextTick(function() {
                if (this.$refs.refStation) {
                  this.$refs.refStation.setCurrentRow(this.stationData[0]);
                }
              });
            } else {
              this.stationData = [];
            }
          }).catch((error) => {
            console.log(error);
          });
      }
    },
    /**
       * 获取角色数据
       */
    getUserManagerDetailRolesData() {
      if (this.userManagerDetailId) {
        getUserManagerDetailRolesData(this.userManagerDetailId)
          .then(response => {
            if (!this.$utils.isEmpty(response.data)) {
              this.rolesData = response.data;
              this.$nextTick(function() {
                if (this.$refs.refRoles) {
                  this.$refs.refRoles.setCurrentRow(this.rolesData[0]);
                }
              });
            } else {
              this.rolesData = [];
            }
          }).catch((error) => {
            console.log(error);
          });
      }
    },
    /**
       * 新增
       */
    clickUserManagerDetailAdd() {
      this.userManagerDetailId = undefined;
      this.stationData = [];
      this.rolesData = [];
      this.disabledUserManagerDetail(true);
      this.$nextTick(() => {
        // 增加默认值
        this.modelUserManagerDetail = {
          validateStatus: parseInt(staticDataEnum.validateStatus[1].code),
          enable: parseInt(staticDataEnum.enable[0].code),
          ifOperate: parseInt(staticDataEnum.isOrNot[0].code),
          isAdmin: parseInt(staticDataEnum.isOrNot[0].code),
          sex: staticDataEnum.gender[0].code
        };
        this.$refs.refUserManagerDetailName.focus();
      });
    },
    /**
       * 保存
       */
    clickUserManagerDetailEdit() {
      return this.validateAfter(() => {
        this.putUserManagerDetailUpdateAll();
      });
    },
    /**
       * 保存或者审核之前验证
       */
    validateAfter(callback) {
      this.$refs.refUserManagerDetail.validate(valid => {
        if (valid) {
          // 验证
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          if (!this.$refs.refUserManagerDetailName.value) {
            this.$refs.refUserManagerDetailName.focus();
            return false;
          }
          if (!this.$refs.refUserManagerDetailMobilePhone.value) {
            this.$refs.refUserManagerDetailMobilePhone.focus();
            return false;
          }
          return false;
        }
      });
    },
    /**
       * 新增，按钮可用判断
       */
    disabledUserManagerDetail(boolValue) {
      this.disabledUserManagerDetailDelete = boolValue;
      this.disabledUserManagerDetailAudit = boolValue;
      this.disabledUserManagerDetailDisenable = boolValue;
      this.disabledUserManagerDetailEnable = boolValue;
      this.disableduserManagerDetailName = false;
      this.disabledUserManagerDetailRefresh = boolValue;
    },
    /**
       * 保存页面所有数据
       */
    postUserManagerDetailAddAll() {
      const userManagerDetailObj = Object.assign({}, {
        userInfo: this.modelUserManagerDetail,
        postInfos: this.stationData,
        roleInfos: this.rolesData
      });
      postUserManagerDetailAddAll(userManagerDetailObj).then((response) => {
        if (response.status === 200) {
          this.$message({
            message: response.message,
            type: 'success'
          });
          if (response && response.data) {
            this.userManagerDetailId = response.data.id;
          }
          this.getUserManagerDetailData();
        } else {
          this.$message({
            message: response.message,
            type: 'warning'
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    /**
       * 更新页面所有数据
       */
    putUserManagerDetailUpdateAll(callback) {
      const userManagerDetailObj = Object.assign({}, {
        userInfo: this.modelUserManagerDetail,
        postInfos: this.stationData,
        roleInfos: this.rolesData
      });
      postUserManagerDetailAddAll(userManagerDetailObj).then(async(response) => {
        if (response.status === 200) {
          this.userManagerDetailId = response.data.id;
          if (this.userManagerDetailId) {
            // 第1种方式：上传文件submitUpload加了一个回调函数（文件上传成功执行，不成功不执行）
            // this.$refs.refBasicUpload.submitUpload(this.userManagerDetailId, ()=> {
            //   //审核
            //   if (callback && typeof callback === "function") {
            //     callback(this.userManagerDetailId);
            //   } else {
            //     //保存成功
            //     this.$message({
            //       message: response.message,
            //       type: 'success'
            //     })
            //     this.getUserManagerDetailData();
            //   }
            // });
            // 第2种方式：上传文件 if(! await this.$refs.refBasicUpload.submitUpload(this.userManagerDetailId)) return false;
            if (!await this.$refs.refBasicUpload.submitUpload(response.data)) return false;
            // 审核
            if (callback && typeof callback === 'function') {
              callback(this.userManagerDetailId);
            } else {
              // 保存成功
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getUserManagerDetailData();
            }
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    /**
       * 删除
       */
    clickUserManagerDetailDelete() {
      if (this.userManagerDetailId) {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteUserManagerDetailDelete(this.userManagerDetailId)
              .then((response) => {
                if (response.status === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.$refs.refBasicUpload.clearAttacheFile();
                  this.clickUserManagerDetailAdd();
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
          }, (cancel) => {
            console.log(cancel);
          });
      }
    },
    /**
       * 审核
       */
    clickUserManagerDetailAudit() {
      return this.validateAfter(() => {
        // 岗位和角色信息必新增
        if (!this.$utils.length(this.stationData)) {
          this.$message({
            message: '亲，请先引入岗位',
            type: 'warning'
          });
          return false;
        }
        if (!this.$utils.length(this.rolesData)) {
          this.$message({
            message: '亲，请先引入角色',
            type: 'warning'
          });
          return false;
        }
        if (this.userManagerDetailId) {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.putUserManagerDetailUpdateAll((id) => {
                this.modelUserManagerDetail.id = id;
                this.putUserManagerDetailAudit();
              });
            }, (cancel) => {
              console.log(cancel);
            });
        }
      });
    },
    putUserManagerDetailAudit() {
      putUserManagerDetailAudit(this.modelUserManagerDetail)
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              this.getUserManagerDetailData();
            }
            this.$message({
              message: response.message,
              type: 'success'
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    /**
       * 禁用
       */
    clickUserManagerDetailDisenable() {
      const enable = 2;
      this.putUserManagerDetailEnable(staticDataBasic.info.disEnable, enable);
    },
    /**
       * 启用
       */
    clickUserManagerDetailEnable() {
      const enable = 1;
      this.putUserManagerDetailEnable(staticDataBasic.info.enable, enable);
    },
    /**
       * 启用和禁用
       */
    putUserManagerDetailEnable(info, enable) {
      if (this.userManagerDetailId) {
        this.$confirm(info, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const modelUserManagerDetail = deepCloneByObject(this.modelUserManagerDetail);
            modelUserManagerDetail.enable = enable;
            putUserManagerDetailEnable(modelUserManagerDetail)
              .then((response) => {
                if (response.status === 200) {
                  if (enable == 2) {
                    this.modelUserManagerDetail.enable = 2;
                    this.disabledUserManagerDetailDisenable = true;
                    this.disabledUserManagerDetailEnable = false;
                  } else {
                    this.modelUserManagerDetail.enable = 1;
                    this.disabledUserManagerDetailDisenable = false;
                    this.disabledUserManagerDetailEnable = true;
                  }
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getUserManagerDetailRolesData();
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
          }, (cancel) => {
            console.log(cancel);
          });
      }
    },
    /**
       * 新增岗位
       */
    clickUserManagerDetailStationAdd() {
      this.station.visibleSync = true;
    },
    /**
       * 获得当前岗位信息
       */
    clickStationCurrentChange(row) {
      this.currentRowStationData = row;
    },
    /**
       * 删除当前岗位信息
       */
    clickUserManagerDetailStationDelete() {
      if (this.currentRowStationData === null) {
        this.$message({
          message: '请先选中一行',
          type: 'warning'
        });
        return false;
      }
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUserManagerDetailStationDelete(this.currentRowStationData.orgUserOrgId)
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getUserManagerDetailStationData();
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            }).catch((error) => {
              console.log(error);
            });
        }, (cancel) => {
          console.log(cancel);
        });
    },
    /**
       * 设置岗位
       */
    clickUserManagerDetailStationSetStation() {
      if (this.userManagerDetailId) {
        if (this.currentRowStationData === null) {
          this.$message({
            message: '请先选中一行',
            type: 'warning'
          });
          return false;
        }
        putUserManagerDetailStationUpdate(this.userManagerDetailId, this.currentRowStationData.orgUserOrgId)
          .then(async(response) => {
            if (response.status === 200) {
              await this.getUserManagerDetailStationData();
              // 更新岗位信息
              this.modelUserManagerDetail.mainName = this.currentRowStationData.orgPathName;
              if (this.modelUserManagerDetail.mainName) {
                this.modelUserManagerDetail.personName = this.modelUserManagerDetail.mainName + '/' + this.modelUserManagerDetail.username;
              }
              // 岗位设置成功，重新登录
              logout('亲，切换主岗岗位成功，请重新登录！', 'success');
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          }).catch((error) => {
            console.log(error);
          });
      }
    },
    /**
       * 岗位弹框显示和隐藏
       */
    clickUserManagerDetailStationCancel() {
      this.station.visibleSync = false;
    },
    selectionChangeStation(data) {
      this.station.stationSelectionChange = data.selectedRows;
    },
    /**
       * 岗位弹框显示之后，确定
       */
    clickUserManagerDetailStationOk() {
      const resultObj = this.station.stationSelectionChange;
      if (!this.isSelectedRows(resultObj)) return false;
      this.station.visibleSync = false;
      // 数据加入到引入岗位列表中
      const stationSelectionChange = resultObj.filter(row => {
        return (row.ifLastLevel == 1 && row.type == 3);
      });
      if (stationSelectionChange && stationSelectionChange.length > 0) {
        const newArray = [];
        let stationJson = '';
        if (this.stationData && this.stationData.length > 0) {
          stationJson = this.stationData.map(value => value.code).join(',');
          for (const stationSelection of stationSelectionChange) {
            if (stationJson.indexOf(stationSelection.code) < 0) {
              const stationObj = Object.assign({}, {
                code: stationSelection.code,
                orgPathName: stationSelection.orgPathName,
                id: stationSelection.id
              });
              newArray.push(stationObj);
            }
          }
        } else {
          for (const stationSelection of stationSelectionChange) {
            const stationObj = Object.assign({}, {
              code: stationSelection.code,
              orgPathName: stationSelection.orgPathName,
              id: stationSelection.id
            });
            newArray.push(stationObj);
          }
        }
        // 岗位添加给用户
        this.postUserManagerDetailStationAddOk(newArray);
      }
    },
    /**
       * 岗位弹框显示之后，确定岗位添加给用户
       */
    postUserManagerDetailStationAddOk(newArray) {
      const userManagerDetailObj = Object.assign({}, {
        userInfo: this.modelUserManagerDetail,
        postInfos: newArray
      });
      postUserManagerDetailStationAddOk(userManagerDetailObj)
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getUserManagerDetailData();
            this.getUserManagerDetailStationData();
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    /**
       * 引入角色
       */
    clickUserManagerDetailRolesAdd() {
      this.roles.visibleSync = true;
    },
    /**
       * 角色选择
       */
    clickRolesCurrentChange(row) {
      this.currentRowRolesData = row;
    },
    /**
       * 删除角色
       */
    clickUserManagerDetailRolesDelete() {
      if (this.userManagerDetailId) {
        if (this.currentRowRolesData === null) {
          this.$message({
            message: '请先选中一行',
            type: 'warning'
          });
          return false;
        }
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteUserManagerDetailRolesDelete(this.currentRowRolesData.groupLeaderId)
              .then((response) => {
                if (response.status === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getUserManagerDetailRolesData();
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
          }, (cancel) => {
            console.log(cancel);
          });
      }
    },
    /**
       * 弹框，选择角色
       */
    clickUserManagerDetailRolesSelectionChange(selection) {
      console.log('SelectionChange', selection);
      this.roles.rolesSelectionChange = selection;
    },
    /**
       * 弹框之后，取消
       */
    clickUserManagerDetailRolesCancel() {
      this.roles.visibleSync = false;
    },
    selectionChangeRole(data) {
      this.roles.rolesSelectionChange = data.selectedRows;
    },
    /**
       * 弹框之后，确定
       */
    clickUserManagerDetailRolesOk() {
      const resultObj = this.roles.rolesSelectionChange;
      if (!this.isSelectedRows(resultObj)) return false;
      this.roles.visibleSync = false;
      // 数据加入到引入角色列表中
      const rolesSelectionChange = this.roles.rolesSelectionChange.filter(row => {
        return !(row.typeCode === '1');
      });
      if (rolesSelectionChange && rolesSelectionChange.length > 0) {
        const newArray = [];
        let rolesJson = [];
        if (this.rolesData && this.rolesData.length > 0) {
          rolesJson = this.rolesData.map(value => value.code);
          for (const rolesSelection of rolesSelectionChange) {
            if (rolesJson.indexOf(rolesSelection.code) < 0) {
              const rolesObj = Object.assign({}, {
                code: rolesSelection.code,
                name: rolesSelection.name,
                id: rolesSelection.id
              });
              newArray.push(rolesObj);
            }
          }
        } else {
          for (const rolesSelection of rolesSelectionChange) {
            const rolesObj = Object.assign({}, {
              code: rolesSelection.code,
              name: rolesSelection.name,
              id: rolesSelection.id
            });
            newArray.push(rolesObj);
          }
        }
        // 角色添加给用户
        this.postUserManagerDetailRolesAddOk(newArray);
      }
    },
    /**
       * 弹框之后，确定。角色添加给用户
       */
    postUserManagerDetailRolesAddOk(newArray) {
      const userManagerDetailObj = Object.assign({}, {
        userInfo: this.modelUserManagerDetail,
        roleInfos: newArray
      });
      postUserManagerDetailRolesAddOk(userManagerDetailObj)
        .then((response) => {
          if (response.status === 200) {
            if (this.rolesData && this.rolesData.length > 0) {
              this.rolesData = this.rolesData.concat(newArray);
            } else {
              this.rolesData = newArray;
            }
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getUserManagerDetailRolesData();
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    /**
       * 当前选择框，角色可勾选，其他不能勾选
       */
    selectableUserManagerDetailRoles(row, index) {
      if (row.typeCode === '1' || this.roles.rolesSelectedIdArray.includes(row.id)) {
        return 0;// 不可勾选
      } else {
        return 1;// 可勾选
      }
    }
  }
};
</script>
