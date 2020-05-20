<template>
  <div>
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAddPrint">新增
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-if-save" plain @click="clickSave">
        保存
      </el-button>
      <el-button
        :disabled="disabledDelete"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="clickDelete">删除
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getPagePrint">刷新</el-button>
    </basic-handler>
    <basic-table
      ref="refBasicTable"
      :data-table="tableData"
      :columns="columnsTitle"
      :height="210"
      :pagination="modelSearchFilter"
      :is-pagination="false"
      @current-change="currentChangeRow">
      <template slot-scope="obj" slot="schemaName">
        <el-form
          :model="tableData.data[obj.scope.$index]"
          :ref="'formSchemaName' + obj.scope.$index"
          :rules="rules"
          :show-message="false">
          <el-form-item prop="schemaName">
            <el-select
              v-model="obj.scope.row.schemaName"
              filterable
              placeholder="请选择数据库名称"
              size="small"
              value-key="schemaName"
              @change="changeRowSchema($event, obj.scope.row)">
              <el-option v-for="item in schemaList" :key="item.schemaName" :label="item.schemaName" :value="item.schemaName"/>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="obj" slot="tableName">
        <el-form
          :model="tableData.data[obj.scope.$index]"
          :ref="'formTableName' + obj.scope.$index"
          :rules="rules"
          :show-message="false">
          <el-form-item prop="tableName">
            <el-select
              v-model="obj.scope.row.tableName"
              filterable
              placeholder="请选择表英文名称"
              size="small"
              value-key="tableName"
              @change="changeRowTable($event, obj.scope.row)"
              @visible-change="visibleChangeRowTable($event, obj.scope.row)">
              <el-option v-for="item in tableList" :key="item.tableName" :label="item.tableComment" :value="item.tableName">
                <span style="float: left">{{ item.tableName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tableComment }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </basic-table>
  </div>
</template>

<script>
// import { validateLength } from '@coreUtils/validate';
import pageListEdit from '@coreMixins/pageListEdit';
import apiPrint from '@custormManager/api/sysInfo/menu/print';
export default {
  name: 'Print',
  mixins: [pageListEdit],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      modelSearchFilter: {
        page: 1,
        limit: 10000,
        fuzzy: '',
        fuzzyKeys: ''
      },
      columnsTitle: [
        {
          text: '数据库名称',
          value: 'schemaName',
          minWidth: 100,
          className: 'spacing-set'
        },
        {
          text: '表英文名称',
          value: 'tableName',
          minWidth: 300,
          className: 'spacing-set'
        },
        {
          text: '表中文名称',
          value: 'tableComment',
          minWidth: 100,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        }
      ],
      modelSearchFilterPrintData: {},
      pageInfoMenuPrintData: {
        productAlias: 'smartpm',
        pageCode: 'dataBase',
        pageName: '菜单打印数据源'
      },
      rules: [],
      schemaList: [],
      tableList: []
    };
  },
  computed: {
    disabledDelete: function() {
      if (this.currentRow && this.currentRow.id) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    data: {
      handler: function() {
        this.$nextTick(() => {
          this.getPagePrint();
        });
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$set(this.pageInfo, 'productAlias', 'smartpm');
    this.$set(this.pageInfo, 'pageCode', 'menuData');
    this.$set(this.pageInfo, 'pageName', '菜单打印数据源');
  },
  methods: {
    getPagePrint() {
      this.$set(this.modelSearchFilter, 'menuId', this.data.id);
      this.getPage();
      this.getAllSchema();
    },
    clickAddPrint() {
      this.$set(this.addRowField, 'menuId', this.data.id);
      this.$set(this.addRowField, 'menuCode', this.data.code);
      this.clickAdd();
    },
    getAllSchema() {
      if (!this.$utils.isEmpty(this.schemaList)) return;
      apiPrint.getAllSchema({ ...this.pageInfoMenuPrintData }).then((response) => {
        this.schemaList = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getAllSchemaTables(callback) {
      apiPrint.getAllSchemaTables({ ...this.pageInfoMenuPrintData, field: this.modelSearchFilterPrintData }).then((response) => {
        this.tableList = response.data;
        if (typeof callback === 'function') {
          callback(this.tableList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    changeRowSchema(e, row) {
      if (e) {
        this.$set(this.modelSearchFilterPrintData, 'schemaName', row.schemaName);
        this.$set(row, 'tableName', '');
        this.$set(row, 'tableComment', '');
        this.$set(row, 'listId', this.listId++);
        this.changedArray.push(row);
        this.getAllSchemaTables();
      }
    },
    changeRowTable(e, row) {
      if (e) {
        const obj = this.tableList.find((item) => {
          return item.tableName == e;
        });
        this.$set(row, 'tableComment', obj.tableComment);
        this.$set(row, 'listId', this.listId++);
        this.changedArray.push(row);
      }
    },
    visibleChangeRowTable(e, row) {
      if (e) {
        this.$set(this.modelSearchFilterPrintData, 'schemaName', row.schemaName);
        this.getAllSchemaTables((tableList) => {
          this.$nextTick(() => {
            console.log(tableList);
          });
        });
      }
    }
  }
};
</script>
