<!--角色（多选）-->
<template>
  <div class="dialog-container">
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
      ref="refRoleTreeData"
      :default-expand-all="defaultExpandAll"
      :data="role.treeData"
      :columns="role.treeColumns"
      :filter-node-method="filterNodeMethod"
      :height="400"
      @select="selectionChangeRole"
      @select-all="handleSelectionAllChange">
      <template slot="selection">
        <el-table-column :selectable="selectableRole" type="selection" align="center" width="55"/>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
import {
  getRoleTreeData
} from '@core/api/common/dialog/dialogRole';

export default {
  name: 'DialogRole',
  props: {
    roleData: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      defaultExpandAll: false,
      filterText: '',
      // 角色选择
      role: {
        defaultExpandAll: false,
        treeData: [],
        treeColumns: [
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
            text: '类型',
            value: 'typeName',
            width: 80,
            showOverflowTooltip: true
          },
          {
            text: '名称',
            value: 'name',
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          }
        ],
        selectedRows: [],
        roleSelectedIdArray: [],
        selectedAll: []
      },
      modelSearchFilter: {
        fuzzy: '',
        fuzzyKeys: ''
      },
      isExpandHandler: false
    };
  },
  watch: {
    filterText(filterStr) {
      //  this.role.treeData.filter(val);
    },
    roleData(data) {
      if (!this.$utils.length(data)) {
        this.$refs.refRoleTreeData.toggleSelection();
      }
    }
  },
  created() {
    this.getRoleTreeData();
  },
  methods: {
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refRoleTreeData, this.modelSearchFilter, () => {
        try {
          this.$refs.refRoleTreeData.filter(this.modelSearchFilter.fuzzy);
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
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.modelSearchFilter.fuzzy = '';
      this.getRoleTreeData();
      // this.$refs.refRoleTreeData.data = this.role.treeData;
      // this.$refs.refRoleTreeData.toggleExpandedAll(this.defaultExpandAll);
    },
    clickRefresh() {
      this.modelSearchFilter.fuzzy = '';
      this.role.selectedRows = [];
      this.role.roleSelectedIdArray = [];
      this.role.selectedAll = [];
      this.getRoleTreeData();
    },
    /**
       * 获取角色数据
       */
    getRoleTreeData() {
      getRoleTreeData().then((response) => {
        if (response.data) {
          this.role.treeData = response.data;
          // 获得选择的数据
          this.$nextTick(() => {
            this.$refs.refRoleTreeData.toggleSelection(this.role.selectedAll);
          });
          // 得到已选择ID
          if (this.roleData && this.roleData.length > 0) {
            const roleData = this.roleData;
            this.role.roleSelectedIdArray = roleData.map(row => {
              return row.id;
            });
          } else {
            this.role.roleSelectedIdArray = [];
          }
        }
      });
    },
    handleSelectionAllChange(value) {
      const data = this.role.treeData;
      // 当前值大于0,全选
      if (value && value.length > 0) {
        for (const row of value) {
          if (this.$utils.array.indexOf(this.role.selectedAll, row) == -1) {
            this.role.selectedAll.push(row);
          }
        }
      }
      // 当前值小于0,不全选
      if (value.length == 0) {
        for (const row of data) {
          // 删除
          this.$utils.array.remove(this.role.selectedAll, row);
        }
      }
      this.role.selectedRows = this.role.selectedAll;
      this.$emit('selectionChange', this.role);
    },
    /**
       * 选择当前选择框
       */
    selectionChangeRole(selections, row) {
      let flag = true;
      for (const selection of selections) {
        if (selection.id === row.id) {
          this.role.selectedAll.push(selection);
          flag = false;
          break;
        }
      }
      if (flag) {
        // 删除
        this.$utils.array.remove(this.role.selectedAll, row);
      }
      this.role.selectedRows = this.role.selectedAll;
      this.$emit('selectionChange', this.role);
    },
    /**
       * 当前选择框，角色可勾选，其他不能勾选
       */
    selectableRole(row, index) {
      if (row.typeCode === '1' || this.role.roleSelectedIdArray.includes(row.id)) {
        return 0;// 不可勾选
      } else {
        return 1;
      }
    }
  }
};
</script>
