<template>
  <div class="calendar-list-container">
    <div class="handler-container">
      <el-button v-if="menuManagerBtnAdd" type="primary" icon="el-icon-plus" size="small" plain @click="handlerRoot">
        新增根
      </el-button>
      <el-button
        v-if="menuManagerBtnAdd"
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        plain
        @click="handlerAdd">新增下级
      </el-button>
      <el-button
        v-if="menuManagerBtnEdit"
        type="primary"
        size="small"
        icon="el-icon-if-edit"
        plain
        @click="handlerEdit">
        编辑
      </el-button>
      <el-button
        v-if="menuManagerBtnDel"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="handleDelete">删除
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
                label-width="120px"
                class="form-container overflowHidden">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="所属菜单" prop="productId">
                      <el-select
                        v-model="form.productId"
                        :disabled="formEdit"
                        size="small"
                        class="filter-item"
                        placeholder="请输入所属菜单">
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
                      <el-input v-model="form.code" :disabled="formEdit" clearable size="small" placeholder="请输入编码"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="form.title" :disabled="formEdit" clearable size="small" placeholder="请输入标题"/>
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
                    <el-form-item label="图标" prop="icon">
                      <el-input v-model="form.icon" :disabled="formEdit" clearable size="small" placeholder="请输入图标"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :class="{disabled:formEdit}" label="是否显示" prop="enable" class="add-border">
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
                    <el-form-item label="类型" prop="type">
                      <el-select
                        v-model="form.type"
                        :disabled="formEdit"
                        size="small"
                        class="filter-item"
                        placeholder="请输入资源请求类型">
                        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"/>
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
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="按钮或资源" name="2">
              <menu-element ref="refMenuElement" :menu-id="currentId"/>
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
  fetchTree, getObj, addObj, delObj, putObj, getCrmProductInfoAll
} from '@sysManager/api/groupAuth/menu/index';
import { mapState } from 'vuex';
import splitPane from 'vue-splitpane';
import { staticDataBasic } from '@coreData/basic';

export default {
  name: 'MenuManager',
  components: {
    'menu-element': () => import('./components/element'),
    splitPane
  },
  mixins: [computed, methods],
  data() {
    return {
      activeNames: ['1', '2'],
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['menu', 'dirt'],
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
        type: undefined,
        component: undefined,
        productId: undefined
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
      menuManagerBtnAdd: false,
      menuManagerBtnEdit: false,
      menuManagerBtnDel: false,
      heightSplitPane: 0
    };
  },
  computed: {
    ...mapState({
      elements: state => state.user.login.elements
    }),
    urlDisbelsd() {
      return this.form.isAffix == 2;
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
      getCrmProductInfoAll().then(response => {
        this.productInfoAll = response.data;
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
        } else {
          this.form = {};
        }
      });
      this.currentId = data.id;
      this.showElement = true;
      this.$refs.refMenuElement.menuId = data.id;
      this.$refs.refMenuElement.getListElement();
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
      if (this.$refs.refMenuElement) {
        this.$refs.refMenuElement.list = [];
      }
    },
    handlerAdd() {
      if (this.currentId == -1) {
        this.$message({
          message: '请先选择菜单！',
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
            this.getList();
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
            this.getList();
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
        isAffix: parseInt(this.dataEnum.static.isOrNot[1].code),
        isCache: parseInt(this.dataEnum.static.isOrNot[0].code),
        enable: this.dataEnum.static.isOrNot[0].code,
        attr5: String(this.dataEnum.static.isOrNot[1].code)
      };
    }
  }
};
</script>
