<template>
  <div class="flex-layout">
    <div ref="refSplitPane" :style="{height:heightSplitPane + 'px'}" class="splitPane-container">
      <split-pane :min-percent="30" :default-percent="60" split="vertical">
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button
                v-if="!defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-open"
                plain
                @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button
                v-if="defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-fold"
                plain
                @click="clickDefaultExpandAll">全部折叠
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
              <basic-search
                ref="refBasicSearch"
                :model-search-filter="modelSearchFilter"
                @clickSearchFilter="clickSearchFilter"/>
            </div>
            <basic-table-tree
              ref="refUnitTypeTableTree"
              :default-expand-all="defaultExpandAll"
              :data="dataUnitType"
              :columns="columns"
              :filter-node-method="filterNodeMethod"
              @current-change="rowClick">
              <template slot-scope="treeObj" slot="validateStatus">
                {{ formatValidateStatus(treeObj.scope.row) }}
              </template>
              <template slot-scope="treeObj" slot="enable">
                {{ formatEnable(treeObj.scope.row) }}
              </template>
            </basic-table-tree>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container white">
            <div class="handler-container">
              <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickLevel(1,-1)">新增根</el-button>
              <el-button
                :disabled="disabledLevel"
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                plain
                @click="clickLevel(1,1)">新增同级
              </el-button>
              <el-button
                :disabled="disabledBranch"
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                plain
                @click="clickLevel(2,1)">新增下级
              </el-button>
              <el-button
                :disabled="disabledSave"
                type="primary"
                size="small"
                icon="el-icon-if-save"
                plain
                @click="clickSave('refUnitTypeForm')">保存
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                plain
                @click="clickDelete">删除
              </el-button>
              <el-button
                :disabled="disabledAudit"
                type="primary"
                size="small"
                icon="el-icon-if-auth"
                plain
                @click="clickValidateStatus('refUnitTypeForm')">审核
              </el-button>
              <el-button
                :disabled="disabledDisnable"
                type="danger"
                size="small"
                icon="el-icon-circle-close"
                plain
                @click="disableStatus(2)">禁用
              </el-button>
              <el-button
                :disabled="disabledEnable"
                type="success"
                size="small"
                icon="el-icon-circle-check"
                plain
                @click="disableStatus(1)">启用
              </el-button>
            </div>
            <el-form
              ref="refUnitTypeForm"
              :model="modelUnitTypeForm"
              :rules="rules"
              :show-message="false"
              label-position="right"
              label-width="120px"
              class="form-container">
              <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                <el-radio-group v-model="modelUnitTypeForm.validateStatus">
                  <el-radio
                    v-for="(row) in dataEnum.validateStatus"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="启用状态" prop="enable" class="add-border disabled">
                <el-radio-group v-model="modelUnitTypeForm.enable">
                  <el-radio
                    v-for="(row) in dataEnum.enabled"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="编码">
                <el-input
                  ref="refCode"
                  v-model="modelUnitTypeForm.code"
                  clearable
                  size="small"
                  placeholder="请输入编码"
                  @blur="blurChangedStatus"/>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                <el-input
                  ref="refName"
                  v-model="modelUnitTypeForm.name"
                  clearable
                  size="small"
                  maxlength="20"
                  placeholder="请输入名称,最大长度100字符"
                  @blur="blurChangedStatus"/>
              </el-form-item>
              <el-form-item label="补充说明" prop="remark">
                <el-input
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="modelUnitTypeForm.remark"
                  clearable
                  type="textarea"
                  placeholder="请输入补充说明,最大长度200字符"
                  @blur="blurChangedStatus"
                />
              </el-form-item>
              <el-form-item label="上级编码">
                <el-input v-model="modelUnitTypeForm.parentCode" :disabled="true" clearable size="small"/>
              </el-form-item>
              <el-form-item label="上级名称">
                <el-input v-model="modelUnitTypeForm.parentName" :disabled="true" clearable size="small"/>
              </el-form-item>
              <el-form-item label="登记人员">
                <el-input :disabled="true" v-model="modelUnitTypeForm.inputPerson" clearable/>
              </el-form-item>
              <el-form-item label="登记时间">
                <el-input :disabled="true" v-model="modelUnitTypeForm.inputTime" clearable/>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import {
  getUnitTypeData,
  validateStatusUnitType,
  enableUnitType,
  deleteUnitType,
  addOrUpdateUnitType
} from '@productsCustorm/api/sysBaseSet/sysUnitTypeInfo';
import {
  getNowFormatDate,
  deepCloneByObject,
  getChangedTableTreeData,
  updateTableTreeEnableData
} from '@coreUtils';
import { validateLength } from '@coreUtils/validate';
import { staticDataBasic } from '@coreData/basic';
import splitPane from 'vue-splitpane';
import formatEnum from '@coreMixins/formatEnum';

export default {
  components: { computed, methods, splitPane },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      modelUnitTypeForm: {
        validateStatus: 2, // 审核状态
        enable: 1, // 当前状态
        code: '', // 编码
        name: '', // 名称
        parentCode: '', // 上级编码
        parentName: '',
        parentId: '',
        level: '', // 树形级别
        ifLastLevel: '', // 是否末级
        type: '', // 属性类型
        remark: '', // 说明
        inputPerson: '',
        inputTime: ''
      },
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
        remark: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['补充说明', 1, 200]);
            },
            trigger: 'change'
          }
        ]
      },
      defaultExpandAll: false,
      columns: [
        {
          expand: true,
          text: '编码',
          value: 'code',
          width: 160,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '名称',
          value: 'name',
          minWidth: 100,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '审核状态',
          value: 'validateStatus',
          width: '80'
        },
        {
          text: '启用状态',
          value: 'enable',
          width: '80'
        }
      ],
      dataUnitType: [],
      heightSplitPane: 0,
      heightTableLeft: 0,
      heightTableRight: 0,
      oldJsonString: '',
      changedArray: [],
      setCurrentLine: {},
      modelSearchFilter: {
        fuzzy: '',
        fuzzyKeys: ''
      }
    };
  },
  computed: {
    disabledLevel() {
      if (this.$utils.length(this.modelUnitTypeForm) && this.modelUnitTypeForm.validateStatus != '2' && this.modelUnitTypeForm.enable == '1') {
        return false;
      } else {
        return true;
      }
    },
    disabledSave() {
      if (this.$utils.length(this.modelUnitTypeForm)) {
        return false;
      } else {
        return true;
      }
    },
    disabledBranch() {
      if (this.$utils.length(this.modelUnitTypeForm) && this.modelUnitTypeForm.validateStatus != '2' && this.modelUnitTypeForm.enable == '1') {
        return false;
      } else {
        return true;
      }
    },
    disabledAudit() {
      if (this.$utils.length(this.modelUnitTypeForm) && this.modelUnitTypeForm.validateStatus == '2') {
        return false;
      } else {
        return true;
      }
    },
    disabledDisnable() {
      if (this.$utils.length(this.modelUnitTypeForm) && this.modelUnitTypeForm.validateStatus == '1' && this.modelUnitTypeForm.enable == '1') {
        return this.$utilsBasic.parentDisable(this.modelUnitTypeForm);
      } else {
        return true;
      }
    },
    disabledEnable() {
      if (this.$utils.length(this.modelUnitTypeForm) && this.modelUnitTypeForm.validateStatus == '1' && this.modelUnitTypeForm.enable == '2') {
        return this.$utilsBasic.parentDisable(this.modelUnitTypeForm);
      } else {
        return true;
      }
    }
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetIsOrNotData',
      'GetGenderData'
    ]);
    this.getUnitTypeData();
  },

  mounted: function() {
    const _self = this;
    this.$nextTick(() => {
      _self.heightInit(_self.getInnerHeight());
    });
  },
  methods: {
    /**
       * 高度初始化
       * @param innerHeight
       */
    heightInit(innerHeight) {
      const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
      this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.$refs.refUnitTypeTableTree.toggleExpandedAll(this.defaultExpandAll);
    },
    clickRefresh() {
      this.resetData();
      this.getUnitTypeData();
    },
    // 重置数据
    resetData() {
      this.modelUnitTypeForm = {};
      this.changedArray = [];
      // this.modelSearchFilter.fuzzy = '';
      this.$refs['refUnitTypeForm'].resetFields();
    },
    getUnitTypeData() {
      getUnitTypeData().then((res) => {
        if (!this.$utils.isEmpty(res.data)) {
          this.dataUnitType = res.data;
          this.$nextTick(function() {
            this.$refs.refUnitTypeTableTree.setCurrentRow(this.dataUnitType[0]);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    clickLevel(type, pid) {
      const addRowData = {
        validateStatus: 2,
        enable: 1,
        ifLastLevel: 1,
        type: type,
        parentCode: this.modelUnitTypeForm.code ? this.modelUnitTypeForm.code : '00', // 上级编码
        parentId: this.modelUnitTypeForm.id > 0 ? this.modelUnitTypeForm.id : -1,
        parentName: this.modelUnitTypeForm.name ? this.modelUnitTypeForm.name : '',
        level: this.modelUnitTypeForm.level ? 1 + this.modelUnitTypeForm.level : 1, // 树形级别
        crtTime: getNowFormatDate()
      };
      // 追加菜单树
      if (type == 1 && pid == -1) {
        // 新增根
        this.$set(addRowData, 'parentCode', '00');
        this.$set(addRowData, 'parentId', -1);
        this.$set(addRowData, 'parentName', '');
        this.$set(addRowData, 'level', 1);
        this.$set(addRowData, 'orgPathName', '/');
        const treeId = this.dataUnitType.length;
        const row = { treeRowParent: '', treeRowId: treeId, treeId: treeId };
        this.$set(addRowData, 'treeRowId', treeId);
        this.$set(addRowData, 'treeId', treeId);
        this.$refs.refUnitTypeTableTree.addBrother(row, addRowData);
        this.$refs.refUnitTypeTableTree.setCurrentRow(row);
      } else if (type == 1) {
        this.$set(addRowData, 'parentCode', this.modelUnitTypeForm.parentCode);
        this.$set(addRowData, 'parentId', this.modelUnitTypeForm.parentId);
        this.$set(addRowData, 'parentName', this.modelUnitTypeForm.parentName);
        // 新增同级
        const treeId = this.modelUnitTypeForm.treeRowId + '-' + (this.$utils.length(this.modelUnitTypeForm.children) > 0 ? this.modelUnitTypeForm.children.length : '0');
        this.$set(addRowData, 'treeRowId', treeId);
        this.$set(addRowData, 'treeId', treeId);
        this.$refs.refUnitTypeTableTree.addBrother(this.modelUnitTypeForm, addRowData);
        this.$refs.refUnitTypeTableTree.setCurrentRow(addRowData);
      } else {
        // 新增下级
        this.$refs.refUnitTypeTableTree.toggleExpandedRow(this.modelUnitTypeForm.treeRowId);
        const treeId = this.modelUnitTypeForm.treeRowId + '-' + (this.$utils.length(this.modelUnitTypeForm.children) > 0 ? this.modelUnitTypeForm.children.length : '0');
        this.$set(addRowData, 'treeRowId', treeId);
        this.$set(addRowData, 'treeId', treeId);
        this.modelUnitTypeForm.ifLastLevel = '2';
        this.$refs.refUnitTypeTableTree.addChild(this.modelUnitTypeForm, addRowData);
        this.$refs.refUnitTypeTableTree.setCurrentRow(addRowData);
      }
      this.$nextTick(function() {
        this.$refs.refName.focus();
      });
    },
    validateStatusUnitType(obj) {
      validateStatusUnitType(deepCloneByObject(obj)).then((res) => {
        if (res.status == 200) {
          if (!this.$utils.isEmpty(res.data)) {
            this.modelUnitTypeForm.validateStatus = res.data.validateStatus;
            this.modelUnitTypeForm.code = res.data.code;
          }
          this.$message({ message: res.message, type: 'success' });
        } else {
          this.$message({ message: res.message, type: 'error' });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    clickDelete() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$utils.isEmpty(this.modelUnitTypeForm.id)) {
          this.$refs.refUnitTypeTableTree.delete(this.modelUnitTypeForm);
          this.modelUnitTypeForm = {};
          this.changedArray = [];
          this.$refs['refUnitTypeForm'].resetFields();
          this.$nextTick(function() {
            this.$refs.refUnitTypeTableTree.setCurrentRow(this.dataUnitType[0]);
          });
        } else {
          const data = { id: this.modelUnitTypeForm.id };
          deleteUnitType(data).then((res) => {
            if (res.status == 200) {
              this.$refs.refUnitTypeTableTree.delete(this.modelUnitTypeForm);
              this.modelUnitTypeForm = {};
              this.changedArray = [];
              this.$refs['refUnitTypeForm'].resetFields();
              this.$nextTick(function() {
                this.$refs.refUnitTypeTableTree.setCurrentRow(this.dataUnitType[0]);
              });
              this.$message({
                type: 'success',
                message: res.message
              });
            } else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch(() => {

      });
    },
    disableStatus(status) {
      const text = status == 1 ? staticDataBasic.info.enable : staticDataBasic.info.disEnable;
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const modelUnitTypeForm = deepCloneByObject(this.modelUnitTypeForm);
        modelUnitTypeForm.enable = status;
        enableUnitType(deepCloneByObject(modelUnitTypeForm)).then((res) => {
          if (res.status == 200) {
            // 当前对象
            this.modelUnitTypeForm.enable = status;
            updateTableTreeEnableData(this.modelUnitTypeForm, status);

            this.$message({
              type: 'success',
              message: res.message
            });
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch(() => {
      });
    },
    blurChangedStatus(event) {
      if (!this.$utils.isEmpty(this.modelUnitTypeForm.name)) {
        const newJsonString = JSON.stringify(deepCloneByObject(this.modelUnitTypeForm));
        this.changedArray = getChangedTableTreeData(this.changedArray, this.oldJsonString, newJsonString);
      }
    },
    /**
       * 审核
       * @param modelUnitTypeForm 当前form数据
       */
    clickValidateStatus(modelUnitTypeForm) {
      const _self = this;
      this.$refs[modelUnitTypeForm].validate((valid) => {
        if (valid) {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const changedArray = deepCloneByObject(_self.changedArray);
              if (changedArray && changedArray.length > 0) {
                addOrUpdateUnitType(changedArray).then((res) => {
                  if (res.status == 200) {
                    if (!_self.$utils.isEmpty(res.data)) {
                      const responseData = res.data.slice(0);
                      _self.$refs['refUnitTypeTableTree'].updateTableTreeData(responseData, function() {
                        _self.$refs.refUnitTypeTableTree.setCurrentRow(_self.modelUnitTypeForm);
                        _self.validateStatusUnitType(_self.modelUnitTypeForm);
                      });
                      _self.changedArray = [];
                    }
                  } else {
                    this.$message({ message: res.message, type: 'error' });
                  }
                }).catch((err) => {
                  console.log(err);
                });
              } else {
                _self.validateStatusUnitType(this.modelUnitTypeForm);
                this.changedArray = [];
              }
            }, (cancel) => {
              console.log(cancel);
            });
        } else {
          this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
          if (this.$refs.refName && !this.$refs.refName.value) {
            this.$refs.refName.focus();
            return false;
          }
          return false;
        }
      });
    },
    /**
       * 保存
       * @param modelUnitTypeForm 当前form数据
       */
    clickSave(modelUnitTypeForm) {
      const _self = this;
      this.$refs[modelUnitTypeForm].validate((valid) => {
        if (valid) {
          const changedArray = deepCloneByObject(_self.changedArray);
          if (changedArray && changedArray.length > 0) {
            addOrUpdateUnitType(changedArray).then((res) => {
              if (res.status == 200) {
                if (!_self.$utils.isEmpty(res.data)) {
                  const responseData = res.data.slice(0);
                  _self.$refs['refUnitTypeTableTree'].updateTableTreeData(responseData);
                  _self.$refs.refUnitTypeTableTree.setCurrentRow(_self.modelUnitTypeForm);
                  _self.$set(_self.modelUnitTypeForm, 'update', _self.$utils.number.random(1, 10));
                  _self.changedArray = [];
                  _self.$message({ message: res.message, type: 'success' });
                }
              } else {
                this.$message({ message: res.message, type: 'error' });
              }
            }).catch((err) => {
              console.log(err);
            });
          } else {
            _self.$message({ message: staticDataBasic.info.updateEmpty, type: 'warning' });
          }
        } else {
          this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
          if (this.$refs.refName && !this.$refs.refName.value) {
            this.$refs.refName.focus();
            return false;
          }
          return false;
        }
      });
    },
    rowClick(row, oldCurrentRow) {
      if (this.$utils.length(row) && !row.name) {
        this.$refs.refName.focus();
      } else {
        this.$refs.refName.blur();
      }
      if (this.$utils.length(row)) {
        this.modelUnitTypeForm = row;
        // 存放当前选中的对象，转换成字符串值
        this.oldJsonString = JSON.stringify(deepCloneByObject(this.modelUnitTypeForm));
      }
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refUnitTypeTableTree, this.modelSearchFilter, () => {
        try {
          this.$refs.refUnitTypeTableTree.filter(this.modelSearchFilter.fuzzy);
        } catch (error) {
          console.log(error.message);
        }
      });
    },
    filterNodeMethod(value, data, node) {
      if (!value) return true;
      if (node.children && node.children.length > 0) return true;
      const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilter);
      return result;
    }
  }
};
</script>
