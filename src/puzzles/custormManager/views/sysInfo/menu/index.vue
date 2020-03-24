<template>
  <div class="calendar-list-container">
    <div class="handler-container">
      <el-button v-if="menuManagerBtnAdd" type="primary" icon="el-icon-plus" size="small" plain @click="handlerRoot">
        新增根
      </el-button>
      <el-button
        v-if="menuManagerBtnAdd"
        :disabled="disabledBranch"
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        plain
        @click="handlerAdd">新增下级
      </el-button>
      <el-button
        v-if="menuManagerBtnEdit"
        :disabled="disabledAudit"
        type="primary"
        size="small"
        icon="el-icon-if-edit"
        plain
        @click="handlerEdit">
        编辑
      </el-button>
      <el-button
        v-if="menuManagerBtnDel"
        :disabled="disabledDelete"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="handleDelete">删除
      </el-button>
      <el-button
        :disabled="disabledAudit"
        type="primary"
        size="small"
        icon="el-icon-setting"
        plain
        @click="clickIconBackgroudColor">重置首页背景颜色
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getList()">刷新</el-button>
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
            ref="menuTree"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :default-expand-all="false"
            class="filter-tree"
            node-key="id"
            highlight-current
            @node-click="getNodeData"
          />
        </div>
      </template>
      <template slot="rightContainer">
        <div class="right-container white">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
              <div v-if="formStatus == 'update'" class="handler-container">
                <el-button type="primary" size="small" icon="el-icon-if-save" plain @click="update">更新</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="onCancel">取消</el-button>
              </div>
              <div v-if="formStatus == 'create'" class="handler-container">
                <el-button type="primary" size="small" icon="el-icon-if-save" plain @click="create">保存</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="onCancel">取消</el-button>
              </div>
              <el-form
                ref="form"
                :label-position="labelPosition"
                :model="form"
                :rules="rulesMenu"
                :show-message="false"
                label-width="140px"
                class="form-container bottom-height">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="所属产品" prop="productId">
                      <el-select
                        v-model="form.productId"
                        :disabled="formEdit"
                        size="small"
                        class="filter-item"
                        placeholder="请输入所属产品">
                        <el-option
                          v-for="item in productInfoAll"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="编码" prop="code">
                      <el-input v-model="form.code" :disabled="formEdit||form.id" clearable size="small" placeholder="请输入编码"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="类型" prop="type" class="add-border">
                      <el-radio-group v-model="form.type" :disabled="formEdit">
                        <el-radio
                          v-for="(row) in dataEnum.static.menuTreeType"
                          :label="row.code"
                          :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="父级节点" prop="parentId">
                      <el-input v-model="form.parentId" :disabled="true" clearable size="small" placeholder="请输入父级节点"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="是否打印" prop="isPrint" class="add-border">
                      <el-radio-group v-model="form.isPrint" :disabled="formEdit">
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
                    <el-form-item :class="{disabled:formEdit}" label="是否注册可见" prop="enable" class="add-border">
                      <el-radio-group v-model="form.enable" :disabled="formEdit">
                        <el-radio
                          v-for="(row) in dataEnum.static.isOrNot"
                          :label="row.code"
                          :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="首页图标背景颜色" prop="attr6">
                      <el-select
                        v-model="form.attr6"
                        :disabled="formEdit"
                        size="small"
                        class="filter-item"
                        placeholder="请选择背景颜色">
                        <el-option
                          v-for="item in dataEnum.static.iconBackgroudColor"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="排序" prop="orderNum">
                      <el-input
                        v-model="form.orderNum"
                        :disabled="formEdit"
                        clearable
                        size="small"
                        placeholder="请输入排序"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="是否可配审批流程" prop="ifCanOverflow" class="add-border">
                      <el-radio-group v-model="form.ifCanOverflow" :disabled="formEdit">
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
                    <el-form-item :class="{disabled:formEdit}" label="是否缓存" prop="isCache" class="add-border">
                      <el-radio-group v-model="form.isCache" :disabled="formEdit">
                        <el-radio
                          v-for="(row) in dataEnum.isOrNot"
                          :label="parseInt(row.code)"
                          :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="资源地址" prop="href" title="资源地址">
                      <el-input v-model="form.href" :disabled="formEdit" clearable size="small" placeholder="请输入资源路径"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="是否固定页签" class="add-border">
                      <el-radio-group v-model="form.isAffix" :disabled="formEdit">
                        <el-radio
                          v-for="(row) in dataEnum.isOrNot"
                          :label="parseInt(row.code)"
                          :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="前端组件" prop="component" title="组件地址">
                      <el-input v-model="form.component" :disabled="formEdit" clearable size="small" placeholder="请输入前端组件"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="PATH路径及参数" prop="path" title="路径与编码一致，首页路径加入/;">
                      <el-input v-model="form.path" :disabled="formEdit" clearable size="small" placeholder="请输入PATH路径及参数"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="一级菜单跳转" prop="redirect">
                      <el-input v-model="form.redirect" :disabled="formEdit" clearable size="small" placeholder="请输入一级菜单跳转"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="API接口地址" prop="apiUrl" title="后端api接口路径如:'/api/产品简称/一级目录';">
                      <el-input v-model="form.apiUrl" :disabled="formEdit" clearable size="small" placeholder="请输入API接口地址"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="16">
                    <el-form-item label="PC标题" prop="title">
                      <el-input v-model="form.title" :disabled="formEdit" clearable size="small" placeholder="请输入PC标题"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="PC图标" prop="icon">
                      <el-input v-model="form.icon" :disabled="formEdit" clearable size="small" placeholder="请输入PC图标"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="显示方式" class="add-border">
                      <el-radio-group v-model="form.attr8" :disabled="formEdit">
                        <el-radio
                          v-for="(row) in dataEnum.static.isShowMenu"
                          :label="row.code"
                          :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="APP标题">
                      <el-input v-model="form.attr5" :disabled="formEdit" clearable size="small" placeholder="请输入APP标题"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="APP图标">
                      <el-input v-model="form.attr7" :disabled="formEdit" clearable size="small" placeholder="请输入APP图标"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="16">
                    <el-form-item label="APP资源路径">
                      <el-input v-model="form.attr4" :disabled="formEdit" clearable size="small" placeholder="请输入APP资源路径"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="APP是否显示" prop="attr1" class="add-border">
                      <el-radio-group v-model="form.attr1" :disabled="formEdit">
                        <el-radio
                          v-for="(row) in dataEnum.isOrNot"
                          :label="row.code"
                          :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24">
                    <el-form-item label="描述" prop="description">
                      <el-input
                        v-model="form.description"
                        :disabled="formEdit"
                        clearable
                        size="small"
                        placeholder="请输入描述"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="ifShowPrint" title="打印模板数据源配置" name="2">
              <print v-if="ifShowPrint" ref="refPrint" :data="currentRow"/>
            </el-collapse-item>
            <el-collapse-item v-if="ifShow" title="按钮或资源" name="3">
              <menu-element v-if="ifShow" ref="refMenuElement" :data="currentRow"/>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </basic-split-pane>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import {
  fetchTree, getObj, addObj, delObj, putObj, putIconBackgroudColor
} from '@puzzlesCustorm/api/sysInfo/menu';
import { mapState } from 'vuex';
import splitPane from 'vue-splitpane';
import { staticDataBasic } from '@coreData/basic';
import api from '@core/api/common';
export default {
  name: 'MenuManager',
  components: {
    'menu-element': () => import('./components/element'),
    'Print': () => import('./components/print'),
    splitPane
  },
  mixins: [computed, methods],
  data() {
    return {
      activeNames: ['1', '2', '3'],
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      modelSearchFilter: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enable: 1,
        isCache: 1,
        isAffix: 1,
        type: 'dirt',
        productId: undefined,
        attr: 1,
        attr6: '#3396FB'
      },
      rulesMenu: {
        type: [
          {
            required: true,
            message: '编码',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        title: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        icon: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        productId: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        href: [
          {
            required: true,
            trigger: 'change'
          }
        ]
      },
      productInfoAll: [],
      currentId: -1,
      currentRow: undefined,
      menuManagerBtnAdd: false,
      menuManagerBtnEdit: false,
      menuManagerBtnDel: false,
      heightSplitPane: 0,
      pageInfoProduct: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmProductInfo',
        pageName: '产品管理'
      },
      modelSearchFilterProduct: {
        limit: 10000,
        page: 1,
        enable: 1,
        validateStatus: 1,
        fuzzy: '',
        fuzzyKeys: ''
      }
    };
  },
  computed: {
    ...mapState({
      elements: state => state.user.login.elements
    }),
    disabledBranch() {
      if (this.$utils.length(this.form) && this.form.id) {
        return false;
      } else {
        return true;
      }
    },
    disabledDelete() {
      if (this.$utils.length(this.form) && this.form.id) {
        return false;
      } else {
        return true;
      }
    },
    disabledAudit() {
      if (this.$utils.length(this.form) && this.form.id) {
        return false;
      } else {
        return true;
      }
    },
    ifShow() {
      if (!(this.currentRow && this.currentRow.children.length > 0) && !this.disabledAudit) {
        return true;
      } else {
        return false;
      }
    },
    ifShowPrint() {
      if (this.ifShow && this.form.isPrint == 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetIsOrNotData'
    ]);
    this.getCrmProductInfoAll();
    this.getList();
    this.menuManagerBtnAdd = this.elements['menuManager:btn_add'];
    this.menuManagerBtnDel = this.elements['menuManager:btn_del'];
    this.menuManagerBtnEdit = this.elements['menuManager:btn_edit'];
  },
  methods: {
    getList() {
      fetchTree(this.modelSearchFilter).then(response => {
        this.treeData = response.data;
        this.handlerRoot();
        this.onCancel();
      });
    },
    getCrmProductInfoAll() {
      api.static.getPage({ ...this.pageInfoProduct, field: this.modelSearchFilterProduct }).then(response => {
        this.productInfoAll = response.data.rows;
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getObj(data.id).then(response => {
        if (this.$utils.length(response.data)) {
          this.form = response.data;
          this.currentId = data.id;
          this.currentRow = data;
        } else {
          this.form = {};
          this.currentId = -1;
          this.currentRow = undefined;
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
      this.currentId = -1;
      const productId = this.form.productId;
      this.resetForm();
      _self.$refs.menuTree.setCurrentKey(null);
      this.formEdit = false;
      this.formStatus = 'create';
      if (productId) {
        this.form.productId = productId;
      }
      this.$nextTick(() => {
        if (this.$refs.refMenuElement) {
          this.$refs.refMenuElement.list = [];
        }
      });
    },
    handlerAdd() {
      if (this.currentId == -1) {
        this.$message({
          message: '请先选择菜单！',
          type: 'warning'
        });
        return false;
      }
      if (this.form.type == this.dataEnum.static.menuTreeType[1].code) {
        this.$message({
          message: '类型为菜单，无法新增下级！',
          type: 'warning'
        });
        return false;
      }
      const productId = this.form.productId;
      this.resetForm();
      this.formEdit = false;
      this.formStatus = 'create';
      if (productId) {
        this.form.productId = productId;
      }
      if (this.$refs.refMenuElement) {
        this.$refs.refMenuElement.list = [];
      }
    },
    handleDelete() {
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    save() {
      if (this.formStatus == 'update') {
        this.update();
      }
      if (this.formStatus == 'create') {
        this.create();
      }
    },
    update() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          putObj(this.form.id, this.form).then(() => {
            this.$message({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
          return false;
        }
      });
    },
    create() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addObj(this.form).then(() => {
            this.$message({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
          return false;
        }
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        type: 'dirt',
        attr6: '#3396FB',
        ifCanOverflow: parseInt(this.dataEnum.static.isOrNot[1].code),
        isPrint: parseInt(this.dataEnum.static.isOrNot[1].code),
        attr1: String(this.dataEnum.static.isOrNot[0].code),
        enable: this.dataEnum.static.isOrNot[0].code,
        isCache: this.dataEnum.static.isOrNot[0].code,
        isAffix: this.dataEnum.static.isOrNot[0].code,
        attr8: this.dataEnum.static.isShowMenu[0].code
      };
    },
    clickIconBackgroudColor() {
      this.$confirm('亲，您是否重置首页icon图标！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putIconBackgroudColor().then((response) => {
          this.$message({
            message: response.message,
            type: 'success'
          });
        });
      });
    }
  }
};
</script>
