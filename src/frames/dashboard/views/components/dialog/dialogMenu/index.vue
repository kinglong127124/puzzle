<!--菜单（多选及单选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <span v-show="isShowChecked">
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
      </span>
      <el-button
        v-if="!defaultCheckAll"
        type="primary"
        size="small"
        icon="el-icon-circle-check"
        plain
        @click="clickCheckedAll">全选
      </el-button>
      <el-button
        v-if="defaultCheckAll"
        type="primary"
        size="small"
        icon="el-icon-circle-close"
        plain
        @click="clickCheckedAll">取消全选
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <basic-search
        ref="refBasicSearch"
        :model-search-filter="modelSearchFilter"
        @clickSearchFilter="clickSearchFilter"/>
    </basic-handler>
    <basic-table-tree
      ref="refTreeData"
      :default-expand-all="defaultExpandAll"
      :default-check-all="defaultCheckAll"
      :data="basicTree.treeData"
      :columns="basicTree.treeColumns"
      :filter-node-method="filterNodeMethod"
      :height="400"
      @selection-change="selectionChangeMenu"
      @current-change="currentChangeMenu">
      <template slot-scope="obj" slot="ifCanOverflow">
        {{ formatIsOrNot(obj.scope.row.ifCanOverflow) }}
      </template>
      <template slot-scope="obj" slot="isAlreadyOverflow">
        {{ formatIsOrNot(obj.scope.row.isAlreadyOverflow) }}
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatBasic from '@coreMixins/formatBasic';
import formatEnum from '@coreMixins/formatEnum';
import api from '@custormManager/api/sysInfo/prodInfo';

export default {
  name: 'DialogMenu',
  mixins: [computed, methods, formatBasic, formatEnum],
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
    params: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      pageInfo: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmUserInfo',
        pageName: '客户管理'
      },
      defaultExpandAll: false,
      defaultCheckAll: false,
      filterText: '',
      // 岗位选择
      basicTree: {
        treeDataAll: [],
        treeData: [],
        treeColumns: [
          {
            expand: true,
            checkbox: true,
            text: '菜单名称',
            value: 'title',
            minWidth: 160,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '是否可配审批流程',
            value: 'ifCanOverflow',
            width: 140,
            align: 'center'
          },
          {
            text: '是否已配审批流程',
            value: 'isAlreadyOverflow',
            width: 140,
            align: 'center'
          }
        ],
        selectedRows: [],
        selectedIdArray: [],
        selectedAll: []
      },
      modelSearchFilter: {
        fuzzy: '',
        fuzzyKeys: '',
        validateStatus: 1,
        enable: 1,
        productId: ''
      }
    };
  },
  watch: {
    filterText(filterStr) {
      //  this.roles.treeData.filter(val);
    },
    data(data) {
      if (!this.$utils.length(data)) {
        this.$refs.refTreeData.toggleSelection();
      }
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetIsOrNotData'
    ]);
    this.getMenuTreeData();
  },
  methods: {
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refTreeData, this.modelSearchFilter, () => {
        try {
          this.$refs.refTreeData.filter(this.modelSearchFilter.fuzzy);
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
      this.getMenuTreeData(1);
    },
    clickRefresh() {
      this.modelSearchFilter.fuzzy = '';
      this.basicTree.selectedRows = [];
      this.basicTree.selectedAll = [];
      this.getMenuTreeData(1);
    },
    /**
       * 获得所有岗位
       */
    getMenuTreeData(status) {
      const model = {
        productId: this.params.productId
      };
      Object.assign(this.modelSearchFilter, model);
      this.defaultCheckAll = false;
      api.getProductMenuTreeAll({ ...this.pageInfo, field: this.modelSearchFilter }).then((response) => {
        if (response.data && response.data.length > 0) {
          this.basicTree.treeDataAll = response.data[0];
          this.basicTree.treeData = response.data[0].children;
          // 单选和多选
          if (!this.isShowChecked) {
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              if (this.$utils.length(this.data)) {
                this.$refs.refTreeData.setCurrentRow(this.data[0], true);
              } else {
                this.$refs.refTreeData.setCurrentRow(this.basicTree.treeData[0], true);
              }
            });
          } else {
            // // 获得选择的数据
            // this.$nextTick(() => {
            //   this.$refs.refTreeData.toggleSelection(this.basicTree.selectedAll);
            // });
            // 得到已选择ID

            if (this.data && this.data.length > 0) {
              const data = this.data;
              this.basicTree.selectedIdArray = data.map(row => {
                return row.id;
              });
              this.$nextTick(() => {
                let resultRows = [];
                if (status) {
                  resultRows = this.$refs.refTreeData.getData();
                } else {
                  resultRows = this.$refs.refTreeData.getData().filter((item) => item.treeRowLevel == 1);
                }
                console.log('resultRows', resultRows);
                this.$refs.refTreeData.setSelectedRecursionDisenble(resultRows, this.basicTree.selectedIdArray);
              });
            } else {
              this.basicTree.selectedIdArray = [];
            }
          }
        }
      });
    },
    /**
       * 选择当前选择框
       */
    selectionChangeMenu(selection) {
      this.basicTree.selectedRows = selection;
      this.$emit('selectionChange', this.basicTree);
    },
    /**
       * 选择当前行
       */
    currentChangeMenu(selection) {
      this.basicTree.selectedRow = selection;
      this.$emit('selectionChange', this.basicTree);
    },
    /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
    selectableMenu(row, index) {
      if (this.basicTree.selectedIdArray.includes(row.id)) {
        return 0;// 不可勾选
      } else {
        return 1;// 可勾选
      }
    },
    clickCheckedAll() {
      if (this.defaultCheckAll) {
        this.defaultCheckAll = false;
      } else {
        this.defaultCheckAll = true;
      }
      this.$refs.refTreeData.checkAll({ treeRowSelect: this.defaultCheckAll }, true);
    }
  }
};
</script>
