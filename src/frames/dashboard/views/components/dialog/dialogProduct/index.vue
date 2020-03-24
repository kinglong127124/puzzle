<!-- 授权产品 -->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <basic-search
        ref="refBasicSearch"
        :model-search-filter="modelSearchFilter"
        @clickSearchFilter="clickSearchFilter"/>
    </basic-handler>
    <basic-table
      ref="refTableData"
      :data-table="basicTable.tableData"
      :columns="basicTable.tableColumns"
      :height="310"
      :pagination="modelSearchFilter"
      @select="selectionChangeProduct"
      @select-all="handleSelectionAllChange"
      @pagination="getPage">
      <template slot="selection">
        <el-table-column
          v-if="isShowChecked"
          :selectable="selectableProduct"
          type="selection"
          align="center"
          width="55"/>
      </template>
    </basic-table>
  </div>
</template>

<script>
import methods from '@coreMixins/methods';
import computed from '@coreMixins/computed';
import formatBasic from '@coreMixins/formatBasic';
import api from '@core/api/common';

export default {
  name: 'DialogProduct',
  mixins: [computed, methods, formatBasic],
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    isShowChecked: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageInfo: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmProductInfo',
        pageName: '产品管理'
      },
      defaultExpandAll: false,
      filterText: '',
      selectData: [],
      selectedData: [],
      basicTable: {
        tableData: {
          data: [],
          total: 0
        },
        tableColumns: [
          {
            text: '编码',
            value: 'code',
            width: 80,
            showOverflowTooltip: true
          },
          {
            text: '名称',
            value: 'name',
            minWidth: 160,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '简称',
            value: 'alias',
            width: 120,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '版本',
            value: 'version',
            width: 120,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '标识',
            value: 'mark',
            width: 120,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '补充说明',
            value: 'explains',
            minWidth: 200,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          }
        ],
        selectedRows: [],
        selectedIdArray: [],
        selectedAll: []
      },
      modelSearchFilter: {
        limit: 10,
        page: 1,
        enable: 1,
        validateStatus: 1,
        fuzzy: '',
        fuzzyKeys: ''
      }
    };
  },
  async created() {
    this.getPage();
  },
  methods: {
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refTableData, this.modelSearchFilter, () => {
        this.getPage();
      });
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.getPage();
    },
    clickRefresh() {
      this.resetData();
      this.getPage();
    },
    resetData() {
      this.basicTable.selectedRows = [];
      this.basicTable.selectedAll = [];
      this.modelSearchFilter.page = 1;
      this.modelSearchFilter.fuzzy = '';
      this.modelSearchFilter.fuzzyKeys = '';
      this.$emit('selectionChange', '');
    },
    getPage() {
      api.static.getPage({ ...this.pageInfo, field: this.modelSearchFilter }).then((response) => {
        this.basicTable.tableData.data = response.data.rows;
        this.basicTable.tableData.total = response.data.total;
        if (!this.isShowChecked) {
          this.defaultExpandAll = true;
          this.$nextTick(() => {
            this.$refs.refTableData.setCurrentRow(this.data[0], true);
          });
        } else {
          // 获得选择的数据
          this.$nextTick(() => {
            this.$refs.refTableData.toggleSelection(this.basicTable.selectedAll);
          });
          if (this.data && this.data.length > 0) {
            this.basicTable.selectedIdArray = this.data.map(row => {
              return row.id;
            });
          } else {
            this.basicTable.selectedIdArray = [];
          }
        }
      });
    },
    handleSelectionAllChange(value) {
      const data = this.basicTable.tableData.data;
      // 当前值大于0,全选
      if (value && value.length > 0) {
        for (const row of value) {
          if (this.$utils.array.indexOf(this.basicTable.selectedAll, row) == -1) {
            this.basicTable.selectedAll.push(row);
          }
        }
      }
      // 当前值小于0,不全选
      if (value.length == 0) {
        for (const row of data) {
          // 删除
          this.$utils.array.remove(this.basicTable.selectedAll, row);
        }
      }
      this.basicTable.selectedRows = this.basicTable.selectedAll;
      this.$emit('selectionChange', this.basicTable);
    },
    selectionChangeProduct(selections, row) {
      let flag = true;
      for (const selection of selections) {
        if (selection.id === row.id) {
          this.basicTable.selectedAll.push(selection);
          flag = false;
          break;
        }
      }
      if (flag) {
        // 删除
        this.$utils.array.remove(this.basicTable.selectedAll, row);
      }
      this.basicTable.selectedRows = this.basicTable.selectedAll;
      this.$emit('selectionChange', this.basicTable);
    },
    selectableProduct(row, index) {
      if (this.basicTable.selectedIdArray.includes(row.id)) {
        return 0;// 不可勾选
      } else {
        return 1;// 可勾选
      }
    }
  }
};
</script>
