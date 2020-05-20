<template>
  <div class="flex-layout">
    <div ref="refSplitPane" :style="{height:heightSplitPane + 'px'}" class="splitPane-container">
      <split-pane :min-percent="20" :default-percent="50" split="vertical">
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button
                v-if="sysDataDictionaryBtnAdd"
                type="primary"
                size="small"
                icon="el-icon-plus"
                plain
                @click="handleSysDataDictionaryAdd">新增
              </el-button>
              <el-button
                v-if="sysDataDictionaryBtnEdit"
                type="primary"
                size="small"
                icon="el-icon-if-save"
                plain
                @click="handleSysDataDictionaryEdit"
              >
                保存
              </el-button>
              <el-button
                v-if="sysDataDictionaryBtnDelete"
                type="danger"
                size="small"
                icon="el-icon-delete"
                plain
                @click="handleSysDataDictionaryDelete">删除
              </el-button>
              <el-button
                v-if="sysDataDictionaryBtnAudit"
                :disabled="disableSysDataDictionaryAudit"
                type="primary"
                size="small"
                icon="el-icon-if-auth"
                plain
                @click="handleSysDataDictionaryAudit">审核
              </el-button>
              <el-button
                v-if="sysDataDictionaryBtnDisable"
                :disabled="disableSysDataDictionaryDisable"
                type="danger"
                size="small"
                icon="el-icon-circle-close"
                plain
                @click="handleSysDataDictionaryDisable">禁用
              </el-button>
              <el-button
                v-if="sysDataDictionaryBtnEnable"
                :disabled="disableSysDataDictionaryEnable"
                type="success"
                size="small"
                icon="el-icon-circle-check"
                plain
                @click="handleSysDataDictionaryEnable">启用
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getSysTypeDataDictionary()">
                刷新
              </el-button>
            </div>
            <el-table
              ref="refSysDataDictionary"
              :data="sysDataDictionary"
              border
              fit
              highlight-current-row
              stripe
              height="500"
              @current-change="handleCurrentChange">
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"/>
              <el-table-column
                :formatter="formatValidateStatus"
                prop="validateStatus"
                label="审核状态"
                width="80"
                align="center"/>
              <el-table-column
                :formatter="formatEnable"
                prop="enable"
                label=" 禁用状态"
                width="80"
                align="center"
                header-align="center"/>
              <el-table-column align="center" label="编码" prop="code" class-name="spacing-set" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.code"
                    clearable
                    size="small"
                    maxlength="4"
                    placeholder="请输入编码"
                    @change="changeRow(scope.row)"/>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="名称"
                align="left"
                header-align="center"
                show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-form
                    :model="sysDataDictionary[scope.$index]"
                    :ref="'formName' + scope.$index"
                    :rules="rules"
                    :show-message="false">
                    <el-form-item prop="name">
                      <el-input
                        v-model="scope.row.name"
                        clearable
                        size="small"
                        placeholder="请输入名称"
                        @change="changeRow(scope.row)"/>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="数据标识"
                align="left"
                header-align="center"
                show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-form
                    :model="sysDataDictionary[scope.$index]"
                    :ref="'formLabel' + scope.$index"
                    :rules="rules"
                    :show-message="false">
                    <el-form-item prop="label">
                      <el-input
                        v-model="scope.row.label"
                        clearable
                        size="small"
                        placeholder="请输入数据标识"
                        @change="changeRow(scope.row)"/>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="补充说明"
                min-width="120"
                align="left"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.remark"
                    clearable
                    size="small"
                    placeholder="请输入补充说明"
                    maxlength="100"
                    @change="changeRow(scope.row)"/>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="total"
              :page.sync="modelSearchFilter.page"
              :limit.sync="modelSearchFilter.limit"
              @pagination="getSysTypeDataDictionary"/>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <div class="handler-container">
              <el-button
                v-if="sysDataDictionaryDetailBtnAdd"
                :disabled="disableSysDataDictionaryDetailAdd"
                type="primary"
                size="small"
                icon="el-icon-plus"
                plain
                @click="handleSysDataDictionaryDetailAdd">新增
              </el-button>
              <el-button
                v-if="sysDataDictionaryDetailBtnEdit"
                :disabled="disableSysDataDictionaryDetailEdit"
                type="primary"
                size="small"
                icon="el-icon-if-save"
                plain
                @click="handleSysDataDictionaryDetailEdit"
              >
                保存
              </el-button>
              <el-button
                v-if="sysDataDictionaryDetailBtnDelete"
                type="danger"
                size="small"
                icon="el-icon-delete"
                plain
                @click="handleSysDataDictionaryDetailDelete">删除
              </el-button>
              <el-button
                v-if="sysDataDictionaryDetailBtnAudit"
                :disabled="disableSysDataDictionaryDetailAudit"
                type="primary"
                size="small"
                icon="el-icon-if-auth"
                plain
                @click="handleSysDataDictionaryDetailAudit">审核
              </el-button>
              <el-button
                v-if="sysDataDictionaryDetailBtnDisable"
                :disabled="disableSysDataDictionaryDetailDisable"
                type="danger"
                size="small"
                icon="el-icon-circle-close"
                plain
                @click="handleSysDataDictionaryDetailDisable">禁用
              </el-button>
              <el-button
                v-if="sysDataDictionaryDetailBtnEnable"
                :disabled="disableSysDataDictionaryDetailEnable"
                type="success"
                size="small"
                icon="el-icon-circle-check"
                plain
                @click="handleSysDataDictionaryDetailEnable">启用
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh"
                plain
                @click="getSysDataDictionaryDetail()">刷新
              </el-button>
            </div>
            <el-table
              ref="refSysDataDictionaryDetail"
              :data="sysDataDictionaryDetail"
              min-height="500"
              border
              fit
              highlight-current-row
              stripe
              height="500"
              @current-change="handleCurrentChangeDetail">
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"/>
              <el-table-column
                :formatter="formatValidateStatus"
                prop="validateStatus"
                label="审核状态"
                width="80"
                align="center"/>
              <el-table-column
                :formatter="formatEnable"
                prop="enable"
                label=" 禁用状态"
                width="80"
                align="center"
                header-align="center"/>
              <el-table-column align="center" label="编码" prop="code" class-name="spacing-set" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.code"
                    clearable
                    size="small"
                    maxlength="4"
                    placeholder="请输入编码"
                    @change="changeRowDetail(scope.row)"/>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="名称"
                align="left"
                header-align="center"
                show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-form
                    :model="sysDataDictionaryDetail[scope.$index]"
                    :ref="'formNameDetail' + scope.$index"
                    :rules="rulesDetail"
                    :show-message="false">
                    <el-form-item prop="name">
                      <el-input
                        v-model="scope.row.name"
                        clearable
                        size="small"
                        placeholder="请输入名称"
                        @change="changeRowDetail(scope.row)"/>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="数据标识"
                align="left"
                header-align="center"
                show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.dataTypeLabel"
                    size="small"
                    placeholder="请输入数据标识"
                    @change="changeRowDetail(scope.row)"/>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="补充说明"
                min-width="120"
                align="left"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.remark"
                    clearable
                    size="small"
                    placeholder="请输入补充说明"
                    maxlength="100"
                    @change="changeRowDetail(scope.row)"/>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="detailTotal"
              :page.sync="modelSearchFilterDetail.page"
              :limit.sync="modelSearchFilterDetail.limit"
              @pagination="getSysDataDictionaryDetail()"/>

          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import { arrayUniqueSameObj, deepCloneByObject } from '@coreUtils/index';
import { staticDataBasic } from '@coreData/basic';
import { validateLength } from '@coreUtils/validate';
import formatEnum from '@coreMixins/formatEnum';
import splitPane from 'vue-splitpane';
import pagination from '@core/components/Pagination';

export default {
  name: 'DataDictionaryManager',
  components: {
    splitPane,
    pagination
  },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      sysDataDictionaryBtnAdd: true,
      sysDataDictionaryBtnEdit: true,
      sysDataDictionaryBtnDelete: true,
      sysDataDictionaryBtnAudit: true,
      sysDataDictionaryBtnDisable: true,
      sysDataDictionaryBtnEnable: true,

      // sysDataDictionaryL: 600, //左表高度
      // sysDataDictionaryR: 600,  //右表高度
      listId: 0,
      heightSplitPane: '',
      sysDataChangedArray: [], // 点新增没有保存
      sysDataDictionary: [],
      total: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10
      },
      currentRowType: null,
      sysDataDictionaryDetailBtnAdd: true,
      sysDataDictionaryDetailBtnEdit: true,
      sysDataDictionaryDetailBtnDelete: true,
      sysDataDictionaryDetailBtnAudit: true,
      sysDataDictionaryDetailBtnDisable: true,
      sysDataDictionaryDetailBtnEnable: true,

      sysDataDictionaryDetailShow: true, // 类型字典是否显示
      sysDataChangedArrayDetail: [], // 点新增没有保存
      sysDataDictionaryDetail: [],
      detailTotal: 0,
      modelSearchFilterDetail: {
        page: 1,
        limit: 10,
        dataTypeId: '' // 左边类型id
      },
      listIdDetail: 0,
      currentRowDetail: null,
      rules: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['名称', 1, 100]);
            },
            trigger: 'change'
          }
        ],
        label: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['数据标识', 1, 20]);
            },
            trigger: 'change'
          }
        ]
      },
      rulesDetail: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['名称', 1, 100]);
            },
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    disableSysDataDictionaryEnable: function() {
      if (this.currentRowType && this.currentRowType.validateStatus === 1) {
        return this.currentRowType.enable === 1;
      }
      return true;
    },
    disableSysDataDictionaryDisable: function() {
      if (this.currentRowType && this.currentRowType.validateStatus === 1) {
        return this.currentRowType.enable === 2;
      }
      return true;
    },
    disableSysDataDictionaryAudit: function() {
      if (this.currentRowType && this.currentRowType.validateStatus != '' && this.currentRowType.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disableSysDataDictionaryDelete: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowType.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disableSysDataDictionaryDetailAdd: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowType.validateStatus == 1) {
        return false;
      } else {
        return true;
      }
    },
    disableSysDataDictionaryDetailEdit: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowType.validateStatus == 1 && this.currentRowDetail) {
        return false;
      } else {
        return true;
      }
    },
    disableSysDataDictionaryDetailDelete: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disableSysDataDictionaryDetailAudit: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus != '' && this.currentRowDetail.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disableSysDataDictionaryDetailEnable: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus === 1) {
        return this.currentRowDetail.enable === 1;
      }
      return true;
    },
    disableSysDataDictionaryDetailDisable: function() {
      if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus === 1) {
        return this.currentRowDetail.enable === 2;
      }
      return true;
    }

  },
  watch: {
    currentRowType: function(newRow, oldRow) {
      if (newRow) {
        this.$refs['refSysDataDictionary'].setCurrentRow(newRow);
        if (newRow.id) {
          this.modelSearchFilterDetail.dataTypeId = newRow.id;
          this.getSysDataDictionaryDetail();
        } else {
          this.sysDataDictionaryDetail = [];
        }
      }
    },
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }

  },
  mounted() {
    const _self = this;
    this.$nextTick(() => {
      _self.heightInit(_self.getInnerHeight());
    });
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData'
    ]);
    this.getSysTypeDataDictionary();
  },
  methods: {
    /**
       * 高度初始化
       * @param innerHeight
       */
    heightInit(innerHeight) {
      // const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
      // this.heightSplitPane = innerHeight - offsetTopSplitPane - 12
    },
    /**
       * 获取类型数据
       * */
    getSysTypeDataDictionary(callback) {
      return this.$store.dispatch('GetSysConfigDataDictionary', this.modelSearchFilter)
        .then((res) => {
          this.total = res.data.total;
          this.sysDataDictionary = res.data.rows;
          this.$nextTick(function() {
            if (this.$refs.refSysDataDictionary) {
              this.$refs.refSysDataDictionary.setCurrentRow(this.sysDataDictionary[0]);
            }
          });
          this.resetData();
          if (typeof callback === 'function') {
            callback();
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    // 重置数据
    resetData() {
      this.sysDataChangedArray = [];
      this.currentRowType = undefined;
    },
    saveSysDataDictionary: function(sysDataDictionary) {
      return this.$store.dispatch('PutSysConfigDataDictionary', sysDataDictionary)
        .then((response) => {
          if (response.status === 200) {
            this.getSysTypeDataDictionary();
            this.$message({
              message: response.message,
              type: 'success'
            });
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        });
    },
    auditSysConfigDataDictionary: function(sysConfigDataDictionary) {
      return this.$store.dispatch('PutSysConfigDataDictionaryAudit', sysConfigDataDictionary)
        .then((response) => {
          if (response.status === 200) {
            this.getSysTypeDataDictionary();
            this.$message({
              message: response.message,
              type: 'success'
            });
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        });
    },
    handleSysDataDictionaryAdd() {
      function addRow() {
        const newVal = {
          validateStatus: 2,
          enable: 1,
          listId: this.listId++
        };
        this.sysDataChangedArray.unshift(newVal);
        this.sysDataDictionary.unshift(newVal);
        this.$refs.refSysDataDictionary.setCurrentRow(this.sysDataDictionary[0]);
      }

      if (this.modelSearchFilter.page == 1) {
        addRow.call(this);
      } else {
        this.getSysTypeDataDictionary(() => {
          this.modelSearchFilter.page = 1;
          addRow.call(this);
        });
      }
    },
    handleSysDataDictionaryEdit() {
      return this.validateAfter(() => {
        const changedArray = arrayUniqueSameObj(this.sysDataChangedArray);
        if (changedArray && changedArray.length > 0) {
          this.saveSysDataDictionary(changedArray);
        } else {
          this.$message({ message: staticDataBasic.info.updateEmpty, type: 'warning' });
        }
      });
    },
    /**
       * 保存或者审核之前验证
       */
    validateAfter(callback) {
      let result = true;
      this.sysDataDictionary.some((item, idx) => {
        this.$refs['formName' + idx].validate(valid => {
          valid ? null : result = valid;
        });
        this.$refs['formLabel' + idx].validate(valid => {
          if (valid) {
            return null;
          } else {
            return (result = valid);
          }
        });
        return !result;
      });
      if (result) {
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
        return false;
      }
    },
    handleSysDataDictionaryDelete() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.currentRowType.id) {
          this.$store.dispatch('DeleteSysConfigDataDictionary', this.currentRowType.id)
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getSysTypeDataDictionary();
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
        } else {
          this.getSysTypeDataDictionary();
        }
      }).catch((cancel) => {
        console.log(cancel);
      });
    },
    handleSysDataDictionaryAudit() {
      return this.validateAfter(() => {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const changedArray = arrayUniqueSameObj(this.sysDataChangedArray);
          if (changedArray && changedArray.length > 0) {
            this.$store.dispatch('PutSysConfigDataDictionary', changedArray).then((res) => {
              if (!this.$utils.isEmpty(res.data)) {
                // 获得当前行，进行审核
                this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRowType, (currentRow) => {
                  this.auditSysConfigDataDictionary(currentRow);
                  return true;
                });
              }
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.auditSysConfigDataDictionary(this.currentRowType);
          }
        }).catch((cancel) => {
          console.log(cancel);
        });
      });
    },
    handleSysDataDictionaryEnable() {
      if (this.isSelectedRow(this.currentRowType)) {
        if (this.currentRowType.enable === 2) {
          this.handleSysDataDictionaryEnableOrDisable(staticDataBasic.info.enable, 1);
        }
      }
    },
    handleSysDataDictionaryDisable() {
      if (this.isSelectedRow(this.currentRowType)) {
        if (this.currentRowType.enable === 1) {
          this.handleSysDataDictionaryEnableOrDisable(staticDataBasic.info.disEnable, 2);
        }
      }
    },
    handleSysDataDictionaryEnableOrDisable(info, enable) {
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.currentRowType.id) {
          const currentRowTypeObj = deepCloneByObject(this.currentRowType);
          currentRowTypeObj.enable = enable;
          this.$store.dispatch('PutSysConfigDataDictionaryEnable', currentRowTypeObj)
            .then((response) => {
              if (response.status === 200) {
                this.currentRowType.enable = enable;
                this.getSysDataDictionaryDetail();
                this.$message({
                  message: response.message,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    /**
       * 获取对应类型的数据
       * */
    getSysDataDictionaryDetail(callback) {
      this.$store.dispatch('GetSysConfigDataDictionaryDetail', this.modelSearchFilterDetail)
        .then((res) => {
          if (!this.$utils.isEmpty(res.data.rows)) {
            this.sysDataDictionaryDetail = res.data.rows;
            this.detailTotal = res.data.total;
            this.$nextTick(function() {
              if (this.$refs.refSysDataDictionaryDetail) {
                this.$refs.refSysDataDictionaryDetail.setCurrentRow(this.sysDataDictionaryDetail[0]);
              }
            });
          } else {
            this.currentRowDetail = undefined;
            this.sysDataDictionaryDetail = [];
            this.detailTotal = 0;
          }
          this.resetDataDetail();
          if (typeof callback === 'function') {
            callback();
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    handleSysDataDictionaryDetailAdd() {
      function addRowDetail() {
        const newVal = {
          dataTypeLabel: this.currentRowType.label,
          validateStatus: 2,
          enable: 1,
          dataTypeId: this.currentRowType.id,
          listId: this.listIdDetail++
        };
        this.sysDataChangedArrayDetail.unshift(newVal);
        this.sysDataDictionaryDetail.unshift(newVal);
        this.$refs.refSysDataDictionaryDetail.setCurrentRow(this.sysDataDictionaryDetail[0]);
      }

      if (this.modelSearchFilterDetail.page == 1) {
        addRowDetail.call(this);
      } else {
        this.getSysDataDictionaryDetail(() => {
          this.modelSearchFilterDetail.page = 1;
          addRowDetail.call(this);
        });
      }
    },
    // 重置数据
    resetDataDetail() {
      this.sysDataChangedArrayDetail = [];
      this.currentRowDetail = undefined;
    },
    handleSysDataDictionaryDetailEdit() {
      return this.validateAfterDetail(() => {
        const changedArray = arrayUniqueSameObj(this.sysDataChangedArrayDetail);
        if (changedArray && changedArray.length > 0) {
          this.$store.dispatch('PutSysConfigDataDictionaryDetail', changedArray)
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getSysDataDictionaryDetail();
              }
            });
        } else {
          this.$message({ message: staticDataBasic.info.updateEmpty, type: 'warning' });
        }
      });
    },
    /**
       * 保存或者审核之前验证
       */
    validateAfterDetail(callback) {
      let result = true;
      this.sysDataDictionaryDetail.some((item, idx) => {
        this.$refs['formNameDetail' + idx].validate(valid => {
          valid ? null : result = valid;
        });
        return !result;
      });
      if (result) {
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
        return false;
      }
    },
    handleSysDataDictionaryDetailDelete() {
      if (this.isSelectedRow(this.currentRowDetail)) {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.currentRowDetail.id) {
            this.$store.dispatch('DeleteSysConfigDataDictionaryDetail', this.currentRowDetail.id)
              .then((response) => {
                if (response.status === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getSysDataDictionaryDetail(); // 删除后需刷新页面
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              });
          } else {
            this.getSysDataDictionaryDetail(); // 删除后需刷新页面
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    auditSysConfigDataDictionaryDetail(currentRow) {
      this.$store.dispatch('PutSysConfigDataDictionaryDetailAudit', currentRow)
        .then((response) => {
          if (response.status === 200) {
            this.getSysDataDictionaryDetail();
            this.$message({
              message: response.message,
              type: 'success'
            });
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        });
    },
    handleSysDataDictionaryDetailAudit() {
      return this.validateAfterDetail(() => {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const changedArray = arrayUniqueSameObj(this.sysDataChangedArrayDetail);
          if (changedArray && changedArray.length > 0) {
            this.$store.dispatch('PutSysConfigDataDictionaryDetail', changedArray).then((res) => {
              if (!this.$utils.isEmpty(res.data)) {
                // 获得当前行，进行审核
                this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRowDetail, (currentRow) => {
                  this.auditSysConfigDataDictionaryDetail(currentRow);
                  return true;
                });
              }
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.auditSysConfigDataDictionaryDetail(this.currentRowDetail);
          }
        }).catch((cancel) => {
          console.log(cancel);
        });
      });
    },
    handleSysDataDictionaryDetailDisable() {
      if (this.isSelectedRow(this.currentRowDetail)) {
        if (this.currentRowDetail.enable === 1) {
          this.handleSysDataDictionaryDetailEnableOrDisable(staticDataBasic.info.disEnable, 2);
        }
      }
    },
    handleSysDataDictionaryDetailEnable() {
      if (this.isSelectedRow(this.currentRowDetail)) {
        if (this.currentRowDetail.enable === 2) {
          this.handleSysDataDictionaryDetailEnableOrDisable(staticDataBasic.info.enable, 1);
        }
      }
    },
    handleSysDataDictionaryDetailEnableOrDisable(info, enable) {
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.currentRowDetail.id) {
          const currentRowDetail = deepCloneByObject(this.currentRowDetail);
          currentRowDetail.enable = enable;
          this.$store.dispatch('PutSysConfigDataDictionaryDetailEnable', currentRowDetail)
            .then((response) => {
              this.currentRowDetail.enable = enable;
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    changeRow(row) {
      if (row) {
        this.$set(row, 'listId', this.listId++);
        this.sysDataChangedArray.push(row);
      }
    },
    /**
       * 获得当前类型信息
       */
    handleCurrentChange(row, oldRow) {
      if (row) {
        this.currentRowType = row;
      }
    },
    changeRowDetail(row) {
      if (row) {
        this.$set(row, 'listId', this.listIdDetail++);
        this.sysDataChangedArrayDetail.push(row);
      }
    },
    /**
       * 获得当前类型详细信息
       */
    handleCurrentChangeDetail(row) {
      if (row) {
        this.currentRowDetail = row;
      }
    }
  }
};
</script>
