<template>
  <basic-split-pane :default-percent="40" :min-percent="25">
    <template slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getPage()">刷新</el-button>
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
          @current-change="currentChangeRow"
          @pagination="getPage"/>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <el-row class="content-container margin-top0">
          <basic-handler>
            <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickDialog('product')">引入产品
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="clickDeleteProduct">移除产品
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getPageProduct()">刷新</el-button>
          </basic-handler>
          <basic-table
            ref="refBasicTableProduct"
            :data-table="tableDataProduct"
            :columns="columnsTitleProduct"
            :is-pagination="false"
            :pagination="modelSearchFilterProduct"
            :select-on-indeterminate="false"
            style="height:260px"
            height="254"
            @current-change="currentChangeRowProduct"
            @select="selectionChangeProduct"
            @select-all="selectionChangeProductAll"
          >
            <template slot="selection">
              <el-table-column
                type="selection"
                align="center"
                width="55"/>
            </template>
          </basic-table>
          <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProduct" title="引入产品-选择">
            <dialog-product
              v-if="visibleSyncProduct"
              :data="tableDataProduct.data"
              :is-show-checked="true"
              @selectionChange="selectionChangeDialogProduct"/>
            <div slot="footer" class="dialog-footer">
              <el-button @click="visibleSyncProduct = false">取 消</el-button>
              <el-button type="primary" @click="clickDialogOk('product')">确 定</el-button>
            </div>
          </basic-dialog>
        </el-row>
        <el-row class="content-container">
          <basic-handler>
            <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickDialog('menu')">引入功能
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="clickDeleteMenu">移除功能
            </el-button>
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
            <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getPageMenu">刷新</el-button>
            <template slot="search">
              <basic-search
                ref="refBasicSearchMenu"
                :is-advanced-query="true"
                :model-search-filter="modelSearchFilterMenu"
                @clickSearchFilter="clickSearchFilterMenu"/>
            </template>
          </basic-handler>
          <basic-table-tree
            ref="refBasicTableTreeMenu"
            :default-expand-all="defaultExpandAll"
            :data="tableDataMenu.data"
            :columns="columnsTitleMenu"
            :filter-node-method="filterNodeMethodMenu"
            :height="400"
            @selection-change="selectionChangeMenu"
          >
            <template slot-scope="obj" slot="ifCanOverflow">
              {{ formatIsOrNot(obj.scope.row.ifCanOverflow) }}
            </template>
            <template slot-scope="obj" slot="isAlreadyOverflow">
              {{ formatIsOrNot(obj.scope.row.isAlreadyOverflow) }}
            </template>
          </basic-table-tree>
          <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMenu" title="引入功能-选择">
            <dialog-menu
              v-if="visibleSyncMenu"
              ref="refDialogMenu"
              :data="tableDataMenuData"
              :is-show-checked="true"
              :params="modelSearchFilterMenu"
              @selectionChange="selectionChangeDialogMenu"/>
            <div slot="footer" class="dialog-footer">
              <el-button @click="visibleSyncMenu = false">取 消</el-button>
              <el-button type="primary" @click="clickDialogOk('menu')">确 定</el-button>
            </div>
          </basic-dialog>
        </el-row>
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
import api from '@productsCustorm/api/sysInfo/prodInfo';
const dialogProduct = () => import('@framesDashboardViews/components/dialog/dialogProduct');
const dialogMenu = () => import('@framesDashboardViews/components/dialog/dialogMenu');
export default {
  name: 'AuthInfo',
  components: {
    dialogProduct,
    dialogMenu
  },
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      pageInfo: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmUserInfo',
        pageName: '客户管理'
      },
      type: '',
      modelSearchFilter: {
        page: 1,
        limit: 50,
        fuzzy: '',
        fuzzyKeys: '',
        validateStatus: 1,
        enable: 1
      },
      tableData: {
        data: [],
        total: 0
      },
      currentRow: null,
      columnsTitle: [
        {
          text: '单位名称',
          value: 'name',
          minWidth: 160,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '手机号',
          value: 'mobile',
          width: 120,
          showOverflowTooltip: true
        }
      ],
      pageInfoProduct: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmProductInfo',
        pageName: '产品管理'
      },
      modelSearchFilterProduct: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: '',
        validateStatus: 1,
        enable: 1
      },
      tableDataProduct: {
        data: [],
        total: 0
      },
      currentRowProduct: null,
      columnsTitleProduct: [
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
          text: '版本',
          value: 'version',
          width: 120,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        }
      ],
      selectedRowsProdcut: [],
      visibleSyncProduct: false,
      pageInfoMenu: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmUserInfo',
        pageName: '产品管理'
      },
      modelSearchFilterMenu: {
        fuzzy: '',
        fuzzyKeys: '',
        productId: ''
      },
      tableDataMenu: {
        data: [],
        total: 0
      },
      currentRowMenu: null,
      columnsTitleMenu: [
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
      selectedRowsMenuResult: [],
      selectedRowsMenu: [],
      defaultExpandAll: false,
      defaultCheckAll: false,
      visibleSyncMenu: false
    };
  },
  computed: {
    disabledDeleteProduct: function() {
      if (this.currentRowProduct) {
        return false;
      } else {
        return true;
      }
    },
    disabledDeleteMenu: function() {
      if (this.currentRowMenu) {
        return false;
      } else {
        return true;
      }
    },
    tableDataMenuData: function() {
      if (this.$refs.refBasicTableTreeMenu) {
        return this.$refs.refBasicTableTreeMenu.getData();
      }
    }
  },
  activated() {
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetIsOrNotData'
    ]);
    this.getPage();
  },
  methods: {
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refBasicTable, this.modelSearchFilter, () => {
        this.getPage();
      }
      );
    },
    getPage() {
      api.static.getPage({ ...this.pageInfo, field: this.modelSearchFilter })
        .then(response => {
          this.tableData.data = response.data.rows;
          this.tableData.total = response.data.total;
          this.$nextTick(function() {
            if (this.$refs.refBasicTable && this.tableData.data.length > 0) {
              this.$refs.refBasicTable.setCurrentRow(this.tableData.data[0]);
            } else {
              this.currentRow = undefined;
              this.currentRowProduct = undefined;
              this.currentRowMenu = undefined;
              this.tableData.data = [];
              this.tableDataProduct.data = [];
              this.tableDataMenu.data = [];
            }
          }
          );
        });
    },
    currentChangeRow(row) {
      if (row) {
        this.currentRow = row;
        this.getPageProduct();
      }
    },
    clickDialog(type) {
      switch (type) {
        case 'menu': {
          if (!this.isSelectedRows(this.tableDataProduct.data, '请先引入产品！')) return false;
          break;
        }
      }
      this.$utilsBasic.formatVisibleSync(this, type, true);
    },
    clickDeleteProduct() {
      if (!this.isSelectedRows(this.selectedRowsProdcut)) return false;
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const productIds = this.$utilsBasic.array.getIds(this.selectedRowsProdcut);
          api.deleteProductInfo({ ...this.pageInfo, field: { sysUserId: this.currentRow.id, productIds }})
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getPageProduct();
              }
            }).catch((error) => {
              console.log(error);
            });
        }, (cancel) => {
          console.log(cancel);
        });
    },
    /**
       * 关键字搜索
       */
    clickSearchFilterProduct() {
      this.$refs.refBasicSearchProduct.searchFilter(this.$refs.refBasicTableProduct, this.modelSearchFilterProduct, () => {
        this.getPageProduct();
      }
      );
    },
    getPageProduct() {
      api.getProductInfo({ ...this.pageInfoProduct, field: { ...this.modelSearchFilterProduct, sysUserId: this.currentRow.id }})
        .then(response => {
          this.tableDataProduct.data = response.data;
          this.$nextTick(function() {
            if (this.$refs.refBasicTableProduct && this.tableDataProduct.data.length > 0) {
              this.$refs.refBasicTableProduct.setCurrentRow(this.tableDataProduct.data[0]);
            } else {
              this.currentRowProduct = undefined;
              this.currentRowMenu = undefined;
              this.tableDataProduct.data = [];
              this.tableDataMenu.data = [];
            }
          }
          );
          this.$set(this, 'selectedRowsProdcut', []);
        });
    },
    currentChangeRowProduct(row) {
      if (row) {
        this.currentRowProduct = row;
        this.defaultExpandAll = false;
        this.modelSearchFilterMenu.productId = row.id;
        this.selectedRowsMenuResult = [];
        this.selectedRowsMenu = [];
        this.getPageMenu();
      }
    },
    selectionChangeProductAll(value) {
      const data = this.tableDataProduct.data;
      // 当前值大于0,全选
      if (value && value.length > 0) {
        for (const row of value) {
          if (this.$utils.array.indexOf(this.selectedRowsProdcut, row) == -1) {
            this.selectedRowsProdcut.push(row);
          }
        }
      }
      // 当前值小于0,不全选
      if (value.length == 0) {
        for (const row of data) {
          // 删除
          this.$utils.array.remove(this.selectedRowsProdcut, row);
        }
      }
    },
    selectionChangeProduct(selections, row) {
      let flag = true;
      for (const selection of selections) {
        if (selection.id === row.id) {
          this.selectedRowsProdcut.push(selection);
          flag = false;
          break;
        }
      }
      if (flag) {
        // 删除
        this.$utils.array.remove(this.selectedRowsProdcut, row);
      }
    },
    selectionChangeDialogProduct(row) {
      this.selectedRow = row.selectedRows;
    },
    clickDialogOk(type) {
      let row = this.selectedRow;
      switch (type) {
        case 'product': {
          if (!this.isSelectedRows(row)) return false;
          this.selectedRow = undefined;
          this.saveProduct(row);
          break;
        }
        case 'menu': {
          row = this.$refs.refDialogMenu.$refs.refTreeData.getSelectedRecursion();
          if (!this.isSelectedRows(row)) return false;
          this.selectedRow = undefined;
          this.saveMenu(row);
          break;
        }
      }
      this.selectedRow = [];
      this.$utilsBasic.formatVisibleSync(this, type, false);
    },
    saveProduct(newArray) {
      const productIds = this.$utilsBasic.array.getIds(newArray);
      api.putProductInfo({ ...this.pageInfo, field: { sysUserId: this.currentRow.id, productIds }})
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getPageProduct();
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.modelSearchFilterMenu.fuzzy = '';
      this.selectedRowsMenuResult = this.selectedRowsMenu;
      this.getPageMenu();
    },
    clickRefresh() {
      // 数据加入到列表中
      if (!this.isSelectedRow(this.currentRow)) return false;
      this.modelSearchFilterMenu.fuzzy = '';
      this.selectedRowsMenuResult = [];
      this.selectedRowsMenu = [];
      this.getPageMenu();
    },
    /**
       * 关键字搜索
       */
    clickSearchFilterMenu() {
      this.$refs.refBasicSearchMenu.searchFilter(this.$refs.refBasicTableTreeMenu, this.modelSearchFilterMenu, () => {
        try {
          this.$refs.refBasicTableTreeMenu.filter(this.modelSearchFilterMenu.fuzzy);
        } catch (error) {
          console.log(error.message);
        }
      });
    },
    getPageMenu() {
      this.defaultCheckAll = false;
      api.getProductMenuTree({ ...this.pageInfoMenu, field: { ...this.modelSearchFilterMenu, sysUserId: this.currentRow.id }})
        .then(response => {
          if (!this.$utils.isEmpty(response.data)) {
            this.tableDataMenu.data = response.data[0].children;
          }
          this.$nextTick(function() {
            this.selectedRowsMenu = [];
            if (this.$refs.refBasicTableTreeMenu && this.tableDataMenu.data.length > 0) {
              this.$refs.refBasicTableTreeMenu.setCurrentRow(this.tableDataMenu.data[0]);
              this.$refs.refBasicTableTreeMenu.toggleSelection(this.selectedRowsMenuResult);
            } else {
              this.currentRowMenu = undefined;
              this.tableDataMenu.data = [];
            }
          });
        });
    },
    filterNodeMethodMenu(value, data, node) {
      if (!value) return true;
      if (node.children && node.children.length > 0) return true;
      const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilterMenu);
      return result;
    },
    selectionChangeDialogMenu(row) {
      this.selectedRow = row.selectedRows;
    },
    saveMenu(newArray) {
      const menuIds = this.$utilsBasic.array.getIds(newArray);
      api.putProductMenuTree({ ...this.pageInfo, field: { sysUserId: this.currentRow.id, menuIds }})
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getPageMenu();
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    clickDeleteMenu() {
      this.selectedRowsMenu = this.$refs.refBasicTableTreeMenu.getSelectedRecursion();
      if (!this.isSelectedRows(this.selectedRowsMenu)) return false;
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const menuIds = this.$utilsBasic.array.getIds(this.selectedRowsMenu);
          api.deleteProductMenuTree({ ...this.pageInfo, field: { sysUserId: this.currentRow.id, menuIds }})
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                // this.$refs.refBasicTableTreeMenu.deleteRows(this.selectedRowsMenu);
                this.getPageMenu();
              }
            }).catch((error) => {
              console.log(error);
            });
        }, (cancel) => {
          console.log(cancel);
        });
    },
    selectionChangeMenu(row) {
      this.selectedRowsMenu = row;
    },
    clickCheckedAll() {
      if (this.defaultCheckAll) {
        this.defaultCheckAll = false;
      } else {
        this.defaultCheckAll = true;
      }
      this.$refs.refBasicTableTreeMenu.checkAll({ treeRowSelect: this.defaultCheckAll });
    }
  }
};
</script>
