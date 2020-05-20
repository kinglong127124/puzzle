<template>
  <div class="groupMechanism-container-index flex-layout">
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
              ref="refGroupMechanismTableTree"
              :default-expand-all="defaultExpandAll"
              :data="dataGroupMechanism"
              :columns="columns"
              :filter-node-method="filterNodeMethod"
              @current-change="rowClick">
              <template slot-scope="treeObj" slot="type">
                {{ formatType(treeObj.scope.row) }}
              </template>
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
            <div ref="heightHandlerContainer" class="handler-container">
              <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickLevel(1,-1)">新增根</el-button>
              <el-button
                :disabled="disabledLevel"
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                plain
                @click="clickLevel(1,1)">新增机构
              </el-button>
              <el-button
                :disabled="disabledBranch"
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                plain
                @click="clickLevel(2,1)">新增部门
              </el-button>
              <el-button
                :disabled="disabledJobs"
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                plain
                @click="clickLevel(3,1)">新增岗位
              </el-button>
              <el-button
                :disabled="disabledSave"
                type="primary"
                size="small"
                icon="el-icon-if-save"
                plain
                @click="clickSave('refGroupMechanismForm')">保存
              </el-button>
              <el-button
                :disabled="disabledAudit"
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
                @click="clickValidateStatus('refGroupMechanismForm')">审核
              </el-button>
              <el-button
                :disabled="disabledDisnable"
                type="danger"
                size="small"
                icon="el-icon-circle-close"
                plain
                @click="clickEnable(2)">禁用
              </el-button>
              <el-button
                :disabled="disabledEnable"
                type="success"
                size="small"
                icon="el-icon-circle-check"
                plain
                @click="clickEnable(1)">启用
              </el-button>
            </div>
            <el-form
              ref="refGroupMechanismForm"
              :model="modelGroupMechanismForm"
              :rules="rules"
              :show-message="false"
              :style="{height:heightFormContainer + 'px'}"
              label-position="right"
              label-width="120px"
              class="form-container">
              <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                <el-radio-group v-model="modelGroupMechanismForm.validateStatus">
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
                <el-radio-group v-model="modelGroupMechanismForm.enable">
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
                <el-input v-model="modelGroupMechanismForm.code" clearable size="small" disabled/>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                <el-input
                  ref="refName"
                  v-model="modelGroupMechanismForm.name"
                  :disabled="disabledAudit"
                  clearable
                  size="small"
                  placeholder="请输入名称,最大长度100字符"
                  @blur="blurChangedStatus"/>
              </el-form-item>
              <el-form-item label="简称" prop="alias">
                <el-input
                  v-model="modelGroupMechanismForm.alias"
                  clearable
                  size="small"
                  placeholder="请输入简称,最大长度10字符"
                  @blur="blurChangedStatus"/>
              </el-form-item>
              <el-form-item label="职责" prop="duty">
                <el-input
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="modelGroupMechanismForm.duty"
                  clearable
                  type="textarea"
                  placeholder="请输入职责,最大长度200字符"
                  @blur="blurChangedStatus"
                />
              </el-form-item>
              <el-form-item label="补充说明" prop="remark">
                <el-input
                  :autosize="{ minRows: 2, maxRows: 10}"
                  v-model="modelGroupMechanismForm.remark"
                  clearable
                  type="textarea"
                  placeholder="请输入补充说明,最大长度200字符"
                  @blur="blurChangedStatus"
                />
              </el-form-item>
              <el-form-item label="上级编码">
                <el-input v-model="modelGroupMechanismForm.parentCode" :disabled="true" clearable size="small"/>
              </el-form-item>
              <el-form-item label="属性" prop="type" class="add-border disabled">
                <el-radio-group v-model="modelGroupMechanismForm.type">
                  <el-radio
                    v-for="(row) in dataEnum.type"
                    :label="parseInt(row.code)"
                    :key="row.code"
                    disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="组织全路径">
                <el-input :disabled="true" v-model="modelGroupMechanismForm.orgPathName" clearable/>
              </el-form-item>
              <el-form-item label="登记人员">
                <el-input v-model="modelGroupMechanismForm.crtName" :disabled="true" clearable size="small"/>
              </el-form-item>
              <el-form-item label="登记时间">
                <el-input v-model="modelGroupMechanismForm.crtTime" :disabled="true" clearable size="small"/>
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
import { validateLength } from '@coreUtils/validate';
import { staticDataBasic } from '@coreData/basic';
import splitPane from 'vue-splitpane';
import formatEnum from '@coreMixins/formatEnum';
import {
  deepCloneByObject,
  getChangedTableTreeData,
  updateTableTreeEnableData
} from '@coreUtils';
import {
  getGroupMechanismData,
  validateStatusGroupMechanism,
  deleteGroupMechanism,
  enableGroupMechanism,
  addOrUpdateGroupMechanism
} from '@productsSys/api/groupAuth/groupMechanism';

export default {
  components: { computed, methods, splitPane },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      modelGroupMechanismForm: {
        validateStatus: 2, // 审核状态
        enable: 1 // 当前状态
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
        alias: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['简称', 1, 10]);
            },
            trigger: 'change'
          }
        ],
        duty: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['职责', 1, 200]);
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
          minWidth: 140,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '属性',
          value: 'type',
          width: '50'
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
      dataGroupMechanism: [],
      heightSplitPane: 100,
      heightHandlerContainer: 46,
      heightFormContainer: 100,
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
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '' && this.modelGroupMechanismForm.type == '1' && this.modelGroupMechanismForm.type != '2' && this.modelGroupMechanismForm.validateStatus != '2' && this.modelGroupMechanismForm.enable == '1') {
        return false;
      } else {
        return true;
      }
    },
    disabledSave() {
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '') {
        return false;
      } else {
        return true;
      }
    },
    disabledBranch() {
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '' && this.modelGroupMechanismForm.type != '3' && this.modelGroupMechanismForm.validateStatus != '2' && this.modelGroupMechanismForm.enable == '1') {
        return false;
      } else {
        return true;
      }
    },
    disabledJobs() {
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '' && this.modelGroupMechanismForm.type != '3' && this.modelGroupMechanismForm.validateStatus != '2' && this.modelGroupMechanismForm.enable == '1') {
        return false;
      } else {
        return true;
      }
    },
    disabledAudit() {
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '' && this.modelGroupMechanismForm.validateStatus == '2') {
        return false;
      } else {
        return true;
      }
    },
    disabledDisnable() {
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '' && this.modelGroupMechanismForm.validateStatus == '1' && this.modelGroupMechanismForm.enable == '1') {
        return this.$utilsBasic.parentDisable(this.modelGroupMechanismForm);
      } else {
        return true;
      }
    },
    disabledEnable() {
      if (this.$utils.length(this.modelGroupMechanismForm) && this.modelGroupMechanismForm.type != '' && this.modelGroupMechanismForm.validateStatus == '1' && this.modelGroupMechanismForm.enable == '2') {
        return this.$utilsBasic.parentDisable(this.modelGroupMechanismForm);
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
    this.getGroupMechanismData();
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
      if (this.$refs.refSplitPane && this.$refs.refSplitPane.getBoundingClientRect()) {
        const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
        const offsetGroupMechanismForm = this.$refs.refGroupMechanismForm.$el.offsetParent.getBoundingClientRect().top;
        const offsetHandlerContainer = this.$refs.heightHandlerContainer.getBoundingClientRect().top;
        this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
        this.heightFormContainer = innerHeight - offsetGroupMechanismForm - offsetHandlerContainer;
      }
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.$refs.refGroupMechanismTableTree.toggleExpandedAll(this.defaultExpandAll);
    },
    clickRefresh() {
      this.resetData();
      this.getGroupMechanismData();
    },
    // 重置数据
    resetData() {
      this.modelGroupMechanismForm = {};
      this.changedArray = [];
      this.modelSearchFilter.fuzzy = '';
      this.$refs['refGroupMechanismForm'].resetFields();
    },
    getGroupMechanismData() {
      getGroupMechanismData().then((response) => {
        if (!this.$utils.isEmpty(response.data)) {
          this.dataGroupMechanism = response.data;
          this.$nextTick(function() {
            this.$refs.refGroupMechanismTableTree.setCurrentRow(this.dataGroupMechanism[0]);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 新增
    clickLevel(type, pid) {
      this.modelSearchFilter.fuzzy = '';
      const addRowData = {
        validateStatus: 2,
        enable: 1,
        ifLastLevel: 1
      };
      this.$set(addRowData, 'type', type);
      this.$set(addRowData, 'parentCode', this.modelGroupMechanismForm.code ? this.modelGroupMechanismForm.code : '00'); // 上级编码
      this.$set(addRowData, 'parentId', this.modelGroupMechanismForm.id > 0 ? this.modelGroupMechanismForm.id : -1);
      this.$set(addRowData, 'level', this.modelGroupMechanismForm.level ? 1 + this.modelGroupMechanismForm.level : 1);
      // 新增根
      if (type == 1 && pid == -1) {
        this.$set(addRowData, 'parentCode', '00');
        this.$set(addRowData, 'parentId', -1);
        this.$set(addRowData, 'level', 1);
        this.$set(addRowData, 'orgPathName', '/');
        const treeId = this.dataGroupMechanism.length;
        // 新增根
        const row = { treeRowParent: '', treeRowId: treeId, treeId: treeId };
        this.$set(addRowData, 'treeRowId', treeId);
        this.$set(addRowData, 'treeId', treeId);
        this.$refs.refGroupMechanismTableTree.addBrother(row, addRowData);
        this.$refs.refGroupMechanismTableTree.setCurrentRow(row);
      } else {
        this.$refs.refGroupMechanismTableTree.toggleExpandedRow(this.modelGroupMechanismForm.treeRowId);
        // 新增机构，部门及岗位
        const treeId = this.modelGroupMechanismForm.treeRowId + '-' + (this.$utils.length(this.modelGroupMechanismForm.children) > 0 ? this.modelGroupMechanismForm.children.length : '0');
        this.$set(addRowData, 'treeRowId', treeId);
        this.$set(addRowData, 'treeId', treeId);
        this.modelGroupMechanismForm.ifLastLevel = '2';
        this.$refs.refGroupMechanismTableTree.addChild(this.modelGroupMechanismForm, addRowData);
        this.$refs.refGroupMechanismTableTree.setCurrentRow(addRowData);
      }
      this.$nextTick(function() {
        this.$refs.refName.focus();
      });
    },
    validateStatusGroupMechanism(obj) {
      validateStatusGroupMechanism(deepCloneByObject(obj)).then((res) => {
        if (res.status == 200) {
          if (!this.$utils.isEmpty(res.data)) {
            this.modelGroupMechanismForm.validateStatus = res.data.validateStatus;
            this.modelGroupMechanismForm.code = res.data.code;
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
        if (this.$utils.isEmpty(this.modelGroupMechanismForm.id)) {
          this.$refs.refGroupMechanismTableTree.delete(this.modelGroupMechanismForm);
          this.modelGroupMechanismForm = {};
          this.changedArray = [];
          this.modelSearchFilter.fuzzy = '';
          this.$refs['refGroupMechanismForm'].resetFields();
          this.$nextTick(function() {
            this.$refs.refGroupMechanismTableTree.setCurrentRow(this.dataGroupMechanism[0]);
          });
        } else {
          const data = { orgId: this.modelGroupMechanismForm.id };
          deleteGroupMechanism(data).then((res) => {
            if (res.status == 200) {
              this.$refs.refGroupMechanismTableTree.delete(this.modelGroupMechanismForm);
              this.modelGroupMechanismForm = {};
              this.changedArray = [];
              this.$refs['refGroupMechanismForm'].resetFields();
              this.$nextTick(function() {
                this.$refs.refGroupMechanismTableTree.setCurrentRow(this.dataGroupMechanism[0]);
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
      }).catch((cancel) => {
        console.log(cancel);
      });
    },
    clickEnable(status) {
      const text = status == 1 ? staticDataBasic.info.enable : staticDataBasic.info.disEnable;
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          orgId: this.modelGroupMechanismForm.id,
          enable: status,
          code: this.modelGroupMechanismForm.code
        };
        enableGroupMechanism(data).then((res) => {
          if (res.status == 200) {
            // 当前对象
            this.modelGroupMechanismForm.enable = status;
            updateTableTreeEnableData(this.modelGroupMechanismForm, status);
            this.modelSearchFilter.fuzzy = '';
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
      if (!this.$utils.isEmpty(this.modelGroupMechanismForm.name)) {
        const newJsonString = JSON.stringify(deepCloneByObject(this.modelGroupMechanismForm));
        this.changedArray = getChangedTableTreeData(this.changedArray, this.oldJsonString, newJsonString);
      }
    },
    /**
       * 审核
       * @param modelGroupMechanismForm 当前form数据
       */
    clickValidateStatus(modelGroupMechanismForm) {
      const _self = this;
      this.$refs[modelGroupMechanismForm].validate((valid) => {
        if (valid) {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const changedArray = deepCloneByObject(_self.changedArray);
              if (changedArray && changedArray.length > 0) {
                addOrUpdateGroupMechanism(changedArray).then((res) => {
                  if (res.status == 200) {
                    if (!_self.$utils.isEmpty(res.data)) {
                      const responseData = res.data.slice(0);
                      _self.$refs['refGroupMechanismTableTree'].updateTableTreeData(responseData, function() {
                        _self.$refs.refGroupMechanismTableTree.setCurrentRow(_self.modelGroupMechanismForm);
                        _self.validateStatusGroupMechanism(_self.modelGroupMechanismForm);
                      });
                      _self.changedArray = [];
                      this.modelSearchFilter.fuzzy = '';
                    }
                  } else {
                    this.$message({ message: res.message, type: 'error' });
                  }
                }).catch((err) => {
                  console.log(err);
                });
              } else {
                _self.validateStatusGroupMechanism(this.modelGroupMechanismForm);
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
       * @param modelGroupMechanismForm 当前form数据
       */
    clickSave(modelGroupMechanismForm) {
      const _self = this;
      this.$refs[modelGroupMechanismForm].validate((valid) => {
        if (valid) {
          const changedArray = deepCloneByObject(_self.changedArray);
          if (changedArray && changedArray.length > 0) {
            addOrUpdateGroupMechanism(changedArray).then((res) => {
              if (res.status == 200) {
                if (!_self.$utils.isEmpty(res.data)) {
                  const responseData = res.data.slice(0);
                  _self.$refs['refGroupMechanismTableTree'].updateTableTreeData(responseData);
                  _self.$refs.refGroupMechanismTableTree.setCurrentRow(_self.modelGroupMechanismForm);
                  _self.$set(_self.modelGroupMechanismForm, 'update', _self.$utils.number.random(1, 10));
                  _self.changedArray = [];
                  this.modelSearchFilter.fuzzy = '';
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
        this.modelGroupMechanismForm = row;
        // this.modelGroupMechanismForm.code = row.treeRowCode;//用于生成编码
        // 存放当前选中的对象，转换成字符串值
        this.oldJsonString = JSON.stringify(deepCloneByObject(this.modelGroupMechanismForm));
      }
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refGroupMechanismTableTree, this.modelSearchFilter, () => {
        this.$refs.refGroupMechanismTableTree.filter(this.modelSearchFilter.fuzzy);
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
