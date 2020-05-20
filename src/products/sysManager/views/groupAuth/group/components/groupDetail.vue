<template>
  <div>
    <div class="handler-container">
      <el-button v-if="groupManagerBtnAdd" type="primary" icon="el-icon-plus" size="small" plain @click="handlerRoot">
        新增根
      </el-button>
      <el-button
        v-if="groupManagerBtnAdd"
        :disabled="disabledBranch"
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        plain
        @click="handlerAdd">新增下级
      </el-button>
      <el-button
        v-if="groupManagerBtnEdit"
        :disabled="disabledEdit"
        type="primary"
        icon="el-icon-if-edit"
        size="small"
        plain
        @click="handlerEdit">编辑
      </el-button>
      <el-button
        v-if="groupManagerBtnDel"
        :disabled="disabledDelete"
        type="danger"
        icon="el-icon-delete"
        size="small"
        plain
        @click="handleDelete">删除
      </el-button>
      <!--<el-button v-if="groupManagerMenu" type="primary" size="small" icon="el-icon-if-save-permissions" plain-->
      <!--@click="updateAuthorityDialog" :disabled="disabledAuthority">保存权限</el-button>-->
      <!--<el-button type="primary" v-if="groupManagerBtnResourceManager" size="small" icon="el-icon-if-save-permissions" plain-->
      <!--@click="handlerAuthority" :disabled="disabledAuthority">-->
      <!--权限分配-->
      <!--</el-button>-->
      <el-button
        :disabled="disabledAudit"
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        plain
        @click="clickValidateStatus('form')">审核
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
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <!--<el-button type="primary" v-if="groupManagerBtnUserManager" @click="handlerUser">-->
      <!--关联用户</el-button>-->
    </div>
    <basic-split-pane :default-percent="20" :min-percent="20">
      <template slot="leftContainer">
        <div class="left-container">
          <el-input v-model="filterText" clearable placeholder="请输入关键字" size="small">
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"/>
          </el-input>
          <el-tree
            ref="groupTree"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :default-expand-all="false"
            class="filter-tree"
            node-key="id"
            highlight-current
            @node-click="getNodeData"/>
        </div>
      </template>
      <template slot="rightContainer">
        <div class="right-container white">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
              <el-form
                ref="form"
                :label-position="labelPosition"
                :model="form"
                :rules="rulesGroup"
                :show-message="false"
                label-width="80px">
                <el-form-item v-if="formStatus == 'update'">
                  <el-button
                    v-if="groupManagerBtnEdit"
                    size="small"
                    type="primary"
                    icon="el-icon-if-save"
                    plain
                    @click="update">保存
                  </el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" plain @click="onCancel">取消</el-button>
                </el-form-item>
                <el-form-item v-if="formStatus == 'create'">
                  <el-button
                    v-if="groupManagerBtnAdd"
                    size="small"
                    type="primary"
                    icon="el-icon-if-save"
                    plain
                    @click="create">保存
                  </el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" plain @click="onCancel">取消</el-button>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-radio-group v-model="form.type">
                    <el-radio
                      v-for="(row) in dataEnum.roleType"
                      :label="row.code"
                      :key="row.code"
                      :disabled="formEdit">
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name" hide-required-asterisk>
                  <el-input
                    ref="refName"
                    v-model="form.name"
                    :disabled="formEdit"
                    clearable
                    size="small"
                    placeholder="请输入名称,最大长度50字符"/>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                  <el-input
                    ref="refCode"
                    v-model="form.code"
                    :disabled="true"
                    clearable
                    size="small"
                    placeholder="自动生成编码"/>
                </el-form-item>
                <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                  <el-radio-group v-model="form.validateStatus">
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
                  <el-radio-group v-model="form.enable">
                    <el-radio
                      v-for="(row) in dataEnum.enabled"
                      :label="parseInt(row.code)"
                      :key="row.code"
                      disabled>
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input
                    v-model="form.description"
                    :disabled="formEdit"
                    clearable
                    size="small"
                    placeholder="请输入描述,最大长度200字符"/>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="ifGroupAuthority" title="分配权限" name="2">
              <group-authority ref="groupAuthority" :group-id="currentId" :params="form"/>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </basic-split-pane>
    <basic-dialog v-el-drag-dialog :title="dialogUserName" :visible.sync="dialogUserVisible">
      <group-user ref="groupUser" :group-id="currentId" @closeUserDialog="closeUserDialog"/>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :title="dialogAuthorityName" :visible.sync="dialogAuthorityVisible" size="large">

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAuthorityDialog">取 消</el-button>

      </div>
    </basic-dialog>
  </div>
</template>

<script>
import {
  getObj,
  addObj,
  putObj,
  getRoleTree,
  deleteNoAuditRole,
  validateStatusRole,
  enableRole
} from '@productsSys/api/groupAuth/group/index';
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import { staticDataBasic } from '@coreData/basic';
import { validateLength } from '@coreUtils/validate';

export default {
  name: 'GroupDetail',
  components: {
    'group-user': () => import('./groupUser'),
    'group-authority': () => import('./groupAuthority')
  },
  mixins: [computed, methods],
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      activeNames: ['1', '2'],
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      dialogUserVisible: false,
      dialogUserName: '关联用户',
      dialogAuthorityVisible: false,
      dialogAuthorityName: '权限分配',
      modelSearchFilter: {
        groupType: this.type,
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      labelPosition: 'right',
      groupManagerBtnEdit: false,
      groupManagerBtnDel: false,
      groupManagerBtnAdd: false,
      groupManagerBtnUserManager: false,
      groupManagerBtnResourceManager: false,
      form: {
        type: '1',
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type,
        validateStatus: 2, // 审核状态
        enable: 1 // 当前状态
      },
      rulesGroup: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['名称', 1, 50]);
            },
            trigger: 'change'
          }
        ],
        description: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['描述', 1, 200]);
            },
            trigger: 'change'
          }
        ]
      },
      currentId: -1,
      groupManagerMenu: false
      // disabledDelete: true,
      // disabledAuthority: true
    };
  },
  computed: {
    ifGroupAuthority() {
      if (this.$utils.length(this.form) && this.form.validateStatus == 1 && this.form.type == 2) {
        return true;
      } else {
        return false;
      }
    },
    disabledBranch() {
      if (this.$utils.length(this.form) && this.form.validateStatus == 1 && this.form.enable == 1 && this.form.groupType != 1 && this.form.type == 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledEdit() {
      if (this.$utils.length(this.form) && this.form.enable == 1 && this.form.groupType != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledDelete() {
      if (this.$utils.length(this.form) && this.form.validateStatus == '2') {
        return false;
      } else {
        return true;
      }
    },
    // disabledAuthority() {
    //   if (this.$utils.length(this.form) && this.form.validateStatus == '1' && this.form.enable == '1') {
    //     return false;
    //   } else {
    //     return true
    //   }
    // },
    disabledAudit() {
      if (this.$utils.length(this.form) && this.form.validateStatus == '2' && this.form.groupType != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledDisnable() {
      if (this.$utils.length(this.form) && this.form.validateStatus == '1' && this.form.enable == '1' && this.form.groupType != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledEnable() {
      if (this.$utils.length(this.form) && this.form.validateStatus == '1' && this.form.enable == '2' && this.form.groupType != 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val);
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetRoleTypeData'
    ]);
    this.getList(true);
    this.groupManagerBtnEdit = this.elements['groupManager:btn_edit'];
    this.groupManagerBtnDel = this.elements['groupManager:btn_del'];
    this.groupManagerBtnAdd = this.elements['groupManager:btn_add'];
    this.groupManagerBtnUserManager = this.elements['groupManager:btn_userManager'];
    this.groupManagerBtnResourceManager = this.elements['groupManager:btn_resourceManager'];
    this.groupManagerMenu = this.elements['groupManager:menu'];// 权限分配弹框
  },
  methods: {
    clickRefresh() {
      this.resetData();
      this.getList(true);
    },
    // 重置数据
    resetData() {
      const _self = this;
      _self.formEdit = false;
      _self.formStatus = '';
      _self.treeData.push({});
      _self.currentId = -1;
      _self.resetForm();
      _self.$refs.groupTree.setCurrentKey(null);
      _self.$refs['form'].resetFields();
      // _self.disabledDelete = true;
      // _self.disabledAuthority = true;
      _self.$nextTick(() => {
        if (_self.$refs.groupAuthority) {
          _self.$refs.groupAuthority.selectData = [];
        }
      });
    },
    getList(result) {
      // fetchTree(this.modelSearchFilter).then(data => {
      //   this.treeData = data;
      // });
      getRoleTree().then(response => {
        this.treeData = response.data;
        this.$nextTick(() => {
          this.onCancel();
          // this.disabledAuthority = true;
          if (result) {
            this.form.validateStatus = 1;
            this.form = {};
          }
        });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(row) {
      if (!row.id) {
        return false;
      }
      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getObj(row.id).then(response => {
        this.form = response.data;
        this.$refs['form'].resetFields();
        this.currentId = row.id;
        // if (row.groupType == staticDataBasic.groupType[0].code) {
        //   this.disabledDelete = true;
        // } else {
        //   this.disabledDelete = false;
        // }
        if (row.typeCode == this.dataEnum.roleType[0].code) {
          if (this.$refs.groupAuthority) {
            this.$refs.groupAuthority.selectData = [];
          }
          // this.disabledAuthority = true;
        } else {
          // this.disabledAuthority = false;
          this.$nextTick(() => {
            if (this.$refs.groupAuthority) {
              this.$refs.groupAuthority.initAuthoritys();
            }
          });
        }
      });
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerRoot() {
      const _self = this;
      _self.formEdit = false;
      _self.formStatus = 'create';
      _self.treeData.push({});
      _self.currentId = -1;
      _self.resetForm();
      _self.$refs.groupTree.setCurrentKey(null);
      _self.$refs['form'].resetFields();
      // _self.disabledDelete = true;
      // _self.disabledAuthority = true;

      _self.$nextTick(() => {
        _self.setFocus();
        if (_self.$refs.groupAuthority) {
          _self.$refs.groupAuthority.selectData = [];
        }
      });
    },
    handlerAdd() {
      const _self = this;
      if (this.currentId == -1) {
        this.$message({
          message: '请先选择角色！',
          type: 'warning'
        });
        return false;
      }
      if (this.form.type == this.dataEnum.roleType[1].code) {
        this.$message({
          message: '类型为角色，无法新增下级！',
          type: 'warning'
        });
        return false;
      }
      this.resetForm();
      this.formEdit = false;
      this.formStatus = 'create';
      this.$refs['form'].resetFields();
      // this.disabledDelete = true;
      // this.disabledAuthority = true;
      _self.$refs.groupAuthority.selectData = [];
      _self.$nextTick(() => {
        _self.setFocus();
      });
      // 初始化角色类型默认值
      // this.form.type = this.form.type ? this.form.type : this.dataEnum.roleType[0].code;
    },
    handleDelete() {
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNoAuditRole(this.currentId).then((response) => {
          this.resetData();
          this.getList(true);
          this.$message({
            message: response.message,
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          putObj(this.form.id, this.form).then((response) => {
            this.resetData();
            this.getList(true);
            this.$message({
              message: response.message,
              type: 'success',
              duration: 2000
            });
          });
        } else {
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          return this.setFocus();
        }
      });
    },
    setFocus() {
      if (!this.$refs.refName.value) {
        this.$refs.refName.focus();
        return false;
      }
    },
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addObj(this.form).then((response) => {
            this.resetData();
            this.getList(true);
            this.$message({
              message: response.message,
              type: 'success',
              duration: 2000
            });
          });
        } else {
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          if (!this.$refs.refName.value) {
            this.$refs.refName.focus();
            return false;
          }
        }
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
      this.$refs['form'].clearValidate();
    },
    resetForm() {
      this.form = {
        type: '1',
        parentId: this.currentId,
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type,
        validateStatus: 2, // 审核状态
        enable: 1 // 当前状态
      };
    },
    handlerUser() {
      this.dialogUserVisible = true;
      if (this.$refs.groupUser !== undefined) {
        this.$refs.groupUser.groupId = this.currentId;
        this.$refs.groupUser.initUsers();
      }
    },
    handlerAuthority() {
      this.dialogAuthorityVisible = true;
      if (this.$refs.groupAuthority !== undefined) {
        this.$refs.groupAuthority.groupId = this.currentId;
        this.$refs.groupAuthority.initAuthoritys();
      }
    },
    closeUserDialog() {
      this.dialogUserVisible = false;
    },
    closeAuthorityDialog() {
      console.log('dialogAuthorityVisible');
      this.dialogAuthorityVisible = false;
    },
    updateAuthorityDialog() {
      if (!this.disabledAudit) {
        this.$message({
          message: '亲，请先审核数据！',
          type: 'warning'
        });
        return;
      }
      const getCheckedKeys = this.$refs.groupAuthority.$refs.menuTree.getCheckedKeys();
      if (!this.$utils.isEmpty(getCheckedKeys)) {
        this.$refs.groupAuthority.update();
      } else {
        this.$message({
          message: '亲，请先分配权限！',
          type: 'warning'
        });
      }
    },
    /**
       * 审核
       * @param 当前form数据
       */
    clickValidateStatus(formName) {
      const _self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              let fun;
              if (this.form.id) {
                fun = putObj(this.form.id, this.form);
              } else {
                fun = addObj(this.form);
              }
              fun.then((res) => {
                if (res.status == 200) {
                  _self.validateStatusRole(res.data);
                } else {
                  this.$message({ message: res.message, type: 'error' });
                }
              }).catch((err) => {
                console.log(err);
              });
            }, (cancel) => {
              console.log(cancel);
            });
        } else {
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          if (!this.$refs.refName.value) {
            this.$refs.refName.focus();
            return false;
          }
        }
      });
    },
    validateStatusRole(obj) {
      validateStatusRole(obj).then((res) => {
        if (res.status == 200) {
          if (!this.$utils.isEmpty(res.data)) {
            this.resetData();
            this.getList(true);
          }
          this.$message({ message: res.message, type: 'success' });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    clickEnable(status) {
      const text = status == 1 ? staticDataBasic.info.enable : staticDataBasic.info.disEnable;
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { id: this.form.id, enable: status };
        enableRole(data).then((res) => {
          if (res.status == 200) {
            // 当前对象
            this.form.enable = status;
            this.$message({
              type: 'success',
              message: res.message
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch(() => {
      });
    }
  }
};
</script>
