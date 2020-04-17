<template>
  <basic-split-pane :default-percent="30" :min-percent="25">
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
          node-key="id"
          class="filter-tree treeGray"
          highlight-current
          @node-click="nodeClick"/>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <basic-handler>
          <el-button
            :disabled="!menuId"
            type="primary"
            size="small"
            icon="el-icon-setting"
            plain
            @click="handleCheckedUnit">选中注册单位
          </el-button>
          <el-button
            :disabled="unitSelectionData.length === 0"
            type="danger"
            size="small"
            icon="el-icon-delete"
            plain
            @click="handleDelete">删除</el-button>
          <el-button
            :disabled="!menuId"
            type="primary"
            size="small"
            icon="el-icon-refresh"
            plain
            @click="getPage()">刷新
          </el-button>
          <template slot="search">
            <basic-search
              ref="refBasicSearch"
              :is-advanced-query="true"
              :model-search-filter="modelSearchFilter"
              @clickSearchFilter="clickSearchFilter"/>
          </template>
        </basic-handler>
        <basic-table
          ref="refBasicTable"
          :data-table="tableData"
          :columns="columnsTitle"
          :pagination="modelSearchFilter"
          :is-pagination="false"
          @selection-change="handleSelectionChange">
          <template slot="selection">
            <el-table-column
              type="selection"
              width="50"/>
          </template>

        </basic-table>
        <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUnit" title="选中单位-选择">
          <dialog-unit
            v-if="visibleSyncUnit"
            :params="tableData"
            is-show-checked
            @selectionChange="selectionChange"/>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visibleSyncUnit = false">取 消</el-button>
            <el-button type="primary" @click="handleChange">确 定</el-button>
          </div>
        </basic-dialog>
      </div>
    </template>
  </basic-split-pane>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatBasic from '@coreMixins/formatBasic';
import formatEnum from '@coreMixins/formatEnum';
import { staticDataBasic } from '@coreData/basic';

const dialogUnit = () => import('@framesDashboardViewsComp/dialog/dialogUnit');

import { fetchTree } from '@productsCustorm/api/sysInfo/menu';
import { getUnit, saveUnit, delUnit } from '@productsCustorm/api/sysInfo/authorization';

export default {
  name: 'Authorization',
  components: { dialogUnit },
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      modelSearchFilter: {
        fuzzy: '',
        fuzzyKeys: ''
      },
      tableData: {
        data: [],
        total: 0
      },
      columnsTitle: [
        {
          text: '单位授权码',
          value: 'authCode',
          width: 130
        },
        {
          text: '单位名称',
          value: 'name',
          minWidth: 160,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '登录手机号',
          value: 'mobile',
          width: 120,
          showOverflowTooltip: true
        }
      ],
      modelSearchFilterMenu: {
        fuzzy: '',
        fuzzyKeys: ''
      },
      // tableDataMenu: {
      //   data: [],
      //   total: 0
      // },
      // selectedRowsMenuResult: [],
      // selectedRowsMenu: [],
      defaultExpandAll: false,
      visibleSyncUnit: false,
      selectedRow: null,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      unitSelectionData: [],
      menuId: undefined, // 左边菜单id
      checkedKeys: null, // 选中的子节点
      halfCheckedKeys: null // 选中子节点的父节点
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  activated() {
    // this.getPage();
    this.getPageMenu();
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetIsOrNotData'
    ]);
  },
  methods: {
    handleCheckedUnit() {
      this.visibleSyncUnit = true;
    },
    handleDelete() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await this.delUnitData();
          this.getPage();
        }).catch(err => console.log(err));
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refBasicTable, this.modelSearchFilter, () => {
        this.getPage();
      }
      );
    },
    nodeClick(data) {
      if (!data.id) return false;
      this.menuId = data.id;
      this.getPage();
    },
    getPage() {
      return getUnit(this.menuId).then(res => {
        console.log('get right page', res);
        this.tableData.data = res.data;
        this.$nextTick(() => {
          if (this.$refs.refBasicTable && this.$utils.isEmpty(this.tableData.data)) {
            this.$refs.refBasicTable.setCurrentRow(this.tableData.data[0]);
          }
        });
      }).catch(err => console.log(err));
    },
    saveUnitData(data) {
      return saveUnit({
        menuId: this.menuId,
        sysCrmUserInfo: data
      }).then(res => {
        if (res && res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          console.log('save right page', res);
        }
      }).catch(err => console.log(err));
    },

    getPageMenu() {
      return fetchTree(this.modelSearchFilterMenu).then((res) => {
        if (res.status === 200 && res.data) {
          console.log('res', res);
          this.treeData = res.data;
        }
      }

      ).catch(err => console.log(err));
    },
    menuRefresh() {
      this.modelSearchFilterMenu.fuzzy = '';
      this.getPageMenu();
    },
    filterNodeMethodMenu(value, data, node) {
      if (!value) return true;
      if (node.children && node.children.length > 0) return true;
      const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilterMenu);
      return result;
    },
    handleSelectionChange(data) {
      console.log('selection', data);
      this.unitSelectionData = data;
    },
    selectionChange(rows) {
      console.log('rows', rows);
      this.selectedRow = rows.selectedRows;
    },
    async handleChange() {
      if (!this.isSelectedRows(this.selectedRow)) return false;
      if (this.$utils.isEmpty(this.selectedRow)) return false;
      const newArr = [];
      this.selectedRow.forEach(item => {
        const newRow = { ...item };
        newArr.unshift(newRow);
      });
      this.$set(this.tableData, 'data', newArr.concat(this.tableData.data));
      this.visibleSyncUnit = false;
      await this.saveUnitData(newArr);
      this.getPage();
    },
    /**
     * 左边树
     * */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    delUnitData() {
      const sysUserIds = this.unitSelectionData.map(item => item.id);
      return delUnit({
        menuId: this.menuId,
        sysUserIds: sysUserIds
      }).then((res) => {
        if (res && res.status === 200) {
          this.$message.success(res.message);
        }
      }).catch(err => console.log(err));
    }
  }
};
</script>
