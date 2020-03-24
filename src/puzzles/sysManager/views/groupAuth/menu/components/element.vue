<template>
  <div class="element-container-list">
    <div class="handler-container">
      <el-input
        v-model="modelSearchFilter.name"
        clearable
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="请输入资源名称"
        @keyup.enter.native.prevent="handleFilter">
        <i
          slot="suffix"
          class="el-icon-search el-input__icon"/>
      </el-input>
      <el-button
        v-if="menuManagerBtnElementAdd"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        size="small"
        icon="el-icon-plus"
        plain
        @click="handleCreate">新增
      </el-button>
    </div>
    <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="60"
        align="center"/>
      <el-table-column label="资源编码" align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.code }}</span>
        </template>

      </el-table-column>
      <el-table-column width="100px" align="center" label="资源类型">
        <template slot-scope="scope">
          <span>
            {{ scope.row.type }}</span>
        </template>

      </el-table-column>
      <el-table-column width="140px" label="资源名称" align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.name }}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" label="资源地址" align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.uri }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="资源请求类型">
        <template slot-scope="scope">
          <span>
            {{ scope.row.method }}</span>
        </template>

      </el-table-column>
      <el-table-column width="100px" align="center" label="描述">
        <template slot-scope="scope">
          <span>
            {{ scope.row.description }}</span>
        </template>

      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="170">
        <template slot-scope="scope">
          <el-button
            v-if="menuManagerBtnElementEdit"
            size="small"
            type="primary"
            icon="el-icon-if-edit"
            plain
            @click="handleUpdate(scope.row)"/>
          <el-button
            v-if="menuManagerBtnElementDel"
            type="danger"
            size="small"
            icon="el-icon-delete"
            plain
            @click="handleDelete(scope.row)"/>
        </template>

      </el-table-column>
    </el-table>
    <basic-dialog v-el-drag-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" :show-message="false" label-width="120px" class="form-container">
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="form.code" clearable placeholder="请输入资源编码"/>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select v-model="form.type" class="filter-item" placeholder="请输入资源类型">
            <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name" clearable placeholder="请输入资源名称"/>
        </el-form-item>
        <el-form-item label="资源地址" prop="uri">
          <el-input v-model="form.uri" clearable placeholder="请输入资源地址"/>
        </el-form-item>
        <el-form-item label="资源请求类型" prop="method">
          <el-select v-model="form.method" class="filter-item" placeholder="请输入资源请求类型">
            <el-option v-for="item in methodOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import pagination from '@core/components/Pagination';
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from '@puzzlesSys/api/groupAuth/element/index';
import { mapState } from 'vuex';
import { staticDataBasic } from '@coreData/basic';
export default {
  name: 'MenuElement',
  components: { pagination },
  // props: {
  //   menuId: {
  //     default: '1'
  //   }
  // },
  data() {
    return {
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      typeOptions: ['uri', 'button'],
      form: {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      },
      rules: {
        code: [{
          required: true,
          message: '请输入资源编码',
          trigger: 'blur'
        }
        ],
        type: [{
          required: true,
          message: '请输入资源类型',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
        ],
        name: [{
          required: true,
          message: '请输入资源名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
        ],
        uri: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 40,
          message: '长度在 3 到 40 个字符',
          trigger: 'blur'
        }
        ],
        method: [{
          required: true,
          message: '请输入资源请求类型',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }
        ]
      },
      list: [],
      total: 0,

      modelSearchFilter: {
        page: 1,
        limit: 10,
        name: undefined,
        menuId: this.menuId
      },
      dialogFormVisible: false,
      dialogStatus: '',
      menuManagerBtnElementAdd: false,
      menuManagerBtnElementEdit: false,
      menuManagerBtnElementDel: false,
      menuId: -1,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      tableKey: 0
    };
  },
  computed: {
    ...mapState({
      elements: state => state.user.login.elements
    })
  },
  created() {
    this.getListElement();
    this.menuManagerBtnElementAdd = this.elements['elementManager:btn_add'];
    this.menuManagerBtnElementDel = this.elements['elementManager:btn_del'];
    this.menuManagerBtnElementEdit = this.elements['elementManager:btn_edit'];
  },
  methods: {
    getListElement() {
      this.modelSearchFilter.menuId = this.menuId;
      page(this.modelSearchFilter).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter() {
      this.getListElement();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
    },
    handleDelete(row) {
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getListElement();
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
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getListElement();
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
    resetTemp() {
      this.form = {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      };
    }
  }
};
</script>
