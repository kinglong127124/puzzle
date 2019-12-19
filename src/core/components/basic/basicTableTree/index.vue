<template>
  <el-table
    ref="refElTable"
    :data="tableData"
    :row-style="showRow"
    v-bind="$attrs"
    :height="height"
    :min-height="minHeight"
    :span-method="spanMethod"
    :reserve-selection="reserveSelection"
    :row-key="getKeys"
    :show-summary="showSummary"
    :summary-method="getSummaries"
    border
    class="el-table-tree"
    fit
    highlight-current-row
    stripe
    v-on="$listeners"
    @row-click="rowClick"
  >
    <el-table-column
      :reserve-selection="reserveSelection"
      label="序号"
      type="index"
      width="60"
      align="center"
    />
    <slot name="selection"/>
    <slot name="slot-column"/>
    <el-table-column
      v-for="(item, index) in columns"
      :label="item.text"
      :key="index"
      :prop="item.value"
      :min-width="item.minWidth"
      :width="item.width"
      :align="item.align||'center'"
      :header-align="item.headerAlign"
      :show-overflow-tooltip="item.showOverflowTooltip"
      :class-name="item.className"
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.value">
          <template v-if="item.expand">
            <!--<span v-if="scope.row.parentId==-1" :style="{'padding-left':+'0'}"/>-->
            <span :style="{'padding-left':+scope.row.treeRowLevel*indent-18 + 'px'} "/>
            <span
              v-if="showSperadIcon(scope.row)"
              class="tree-ctrl"
              @click="toggleExpanded(scope.row)"
            >
              <i v-if="!scope.row.treeRowExpand" class="el-icon-if-open"/>
              <i v-else class="el-icon-if-fold"/>
              <!--<svg-icon v-if="!scope.row.treeRowExpand" icon-class="iconwenjianjia"/>-->
              <!--<svg-icon v-else icon-class="iconwenjianjia1"/>-->

            </span>
            <span v-else class="tree-ctrl">
              <!--<svg-icon icon-class="iconmojicaidan"/>-->
              <i class="el-icon-document"/>
            </span>
          </template>
          <template v-if="item.checkbox">
            <el-checkbox
              v-if="scope.row[defaultChildren]&&scope.row[defaultChildren].length>0"
              :indeterminate="scope.row.treeRowSelect"
              v-model="scope.row.treeRowSelect"
              :disabled="scope.row.treeRowSelectDisabled"
              @change="handleCheckAllChange(scope.row)"
            />
            <el-checkbox
              v-else
              v-model="scope.row.treeRowSelect"
              :disabled="scope.row.treeRowSelectDisabled"
              @change="handleCheckAllChange(scope.row)"
            />
          </template>
          <template v-if="scope.row.treeRowShow">{{ scope.row[item.value] }}</template>
        </slot>
      </template>
    </el-table-column>
    <slot name="slot-many-column"/>
  </el-table>
</template>

<script>
import { addAttrs } from './eval.js';

let self = null;
export default {
  name: 'BasicTableTree',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    getSummaries: {
      type: Function,
      default: (param) => {
        return self.getSummariesDefault(param);
      }
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    defaultChildren: {
      type: String,
      default: 'children'
    },
    indent: {
      type: Number,
      default: 18
    },
    height: {
      type: [Number, String],
      default: 500
    },
    rowClick: {
      type: Function,
      default: () => () => {
      }
    },
    minHeight: {
      type: Number,
      default: 500
    },
    filterNodeMethod: Function,
    spanMethod: Function,
    rowKey: {
      type: [String, Function],
      default: () => 'code'
    },
    reserveSelection: Boolean,
    pushData: Array,
    isLoadAll: {
      type: Boolean,
      default: true
    },
    treeSelected: {
      type: Array,
      default: () => []
    },
    defaultCheckAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      guard: 1,
      worker: null,
      selectedIds: []
    };
  },
  computed: {
    children() {
      return this.defaultChildren;
    },
    setTreeSelected: {
      get: function() {
        return this.treeSelected;
      }
    },
    tableData: {
      get: function() {
        const data = this.data;
        if (this.data.length === 0) {
          return [];
        }
        const retval = addAttrs(data, {
          expand: this.defaultExpandAll,
          children: this.defaultChildren,
          isLoadAll: this.isLoadAll
        });
        // const retval = treeToArray(data, this.defaultChildren, this.isLoadAll);
        return retval;
      }
    }
  },
  created() {
    self = this;
  },
  methods: {
    getKeys(row) {
      return row.id || row.code;
    },
    addBrother(row, data) {
      if (row.treeRowParent) {
        row.treeRowParent.children.push(data);
      } else {
        if (this.pushData) {
          this.pushData.push(data);
        } else {
          this.data.push(data);
        }
      }
    },
    addChild(row, data) {
      if (!row.children) {
        this.$set(row, 'children', []);
      }
      row.children.push(data);
      this.$set(row, 'treeRowExpand', true);
    },
    delete(row) {
      const { treeRowIndex, treeRowParent } = row;
      if (treeRowParent) {
        treeRowParent.children.splice(treeRowIndex, 1);
      } else {
        this.data.splice(treeRowIndex, 1);
      }
    },
    deleteAllChildrens(row) {
      const { children } = row;
      if (children) {
        row.children.splice(0, children.length);
      }
    },
    deleteRows(rows) {
      rows.forEach(item => {
        this.delete(item);
      });
    },
    getData() {
      return this.tableData;
    },
    showRow: function({ row }) {
      // console.log('this.data',this.data);
      if (row.treeRowVisible) {
        // console.log("row.name" + row.name, row.code);
        const parent = row.treeRowParent;
        const show = parent ? parent.treeRowExpand && parent.treeRowShow : true;
        row.treeRowShow = show;
        // return show
        //   ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        //   : "display:none;";
        return show
          ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;'
          : 'display:none;';
      } else {
        // console.log("display:none-row.treeRowShow" + row.name, row.treeRowShow);
        return 'display:none;';
      }
    },
    showSperadIcon(row) {
      // ((scope.row[children] && scope.row[children].length<=0) || scope.row.type == 'menu'||scope.row.typeCode == 2
      if (row[this.children] && row[this.children].length > 0) {
        return true;
      } else {
        return false;
      }
    },
    toggleExpandedAll(expand) {
      for (const row of this.tableData) {
        this.$set(row, 'treeRowExpand', expand);
      }
    },
    toggleExpanded(record) {
      const expand = !record.treeRowExpand;
      record.treeRowExpand = expand;
      // this.setSelectedRecursion(record, this.defaultChildren);
      if (this.selectedIds.length > 0 && record[this.defaultChildren] && record[this.defaultChildren].length > 0) {
        this.setSelectedRecursionDisenble(record[this.defaultChildren], this.selectedIds);
      }
      this.$nextTick(() => {
        this.$refs.refElTable.doLayout();
      });
    },
    toggleExpandedRow(treeRowId) {
      if (treeRowId) {
        for (const row of this.tableData) {
          if (treeRowId == row.treeRowId) {
            if (!row.treeRowExpand) {
              this.$set(row, 'treeRowExpand', true);
              break;
            }
          }
        }
      }
    },
    checkAll(row, isDisabled = false) {
      this.tableData.map(item => {
        console.log(item.title, item.treeRowSelectDisabled, this.selectedIds);
        if ((isDisabled && !item.treeRowSelectDisabled && this.selectedIds.length > 0 && !this.selectedIds.includes(item.id)) || !isDisabled || this.selectedIds.length <= 0) {
          item.treeRowSelect = row.treeRowSelect;
        }
      });
      this.isIndeterminate = row.treeRowSelect;
      this.$nextTick(() => {
        this.$refs.refElTable.doLayout();
      });
    },
    handleCheckAllChange(row) {
      this.selectRecursion(row, row.treeRowSelect, this.defaultChildren);
      this.isIndeterminate = row.treeRowSelect;
      this.$nextTick(() => {
        this.$refs.refElTable.doLayout();
      });
    },
    handleCheckChange(row) {
      let allChecked = false;
      if (row.treeRowParent) {
        const subItem = row['treeRowParent'].children;
        if (subItem && subItem.length > 0) {
          for (const parent in subItem) {
            if (subItem[parent].treeRowSelect) {
              allChecked = true;
              break;
            }
          }
          row['treeRowParent'].treeRowSelect = allChecked;
        }
      }
    },
    selectRecursion(row, select, children = 'children') {
      if (select) {
        this.$set(row, 'treeRowExpand', true);
        this.$set(row, 'treeRowShow', true);
      }
      const subItem = row[children];
      if (subItem && subItem.length > 0) {
        subItem.map(child => {
          child.treeRowSelect = select;
          // if (select) {
          //   this.setTreeSelected.push(row.id);
          // } else {
          //   // 删除
          //   this.$utils.array.remove(this.setTreeSelected, row);
          // }
          this.selectRecursion(child, select, children);
        });
      }
    },
    getSelectedRecursion() {
      const getSelectedArray = function treeToArray(data, children = 'children') {
        let tmp = [];
        data.forEach((item, index) => {
          if (item.treeRowSelect && item.treeRowVisible && !item.treeRowSelectDisabled) {
            tmp.push(item);
            if (item[children] && item[children].length > 0) {
              if (item.treeRowSelect && item.treeRowVisible && !item.treeRowSelectDisabled) {
                const res = treeToArray(item[children], children);
                tmp = tmp.concat(res);
              }
            }
          }
        });
        return tmp;
      };

      let selected = Array.from(new Set(getSelectedArray(this.tableData)));
      selected = selected.filter(item => item.treeRowSelect && item.treeRowVisible);
      // const selected = Array.from(new Set(this.setTreeSelected));
      console.log('selected', selected);
      return selected;
    },
    setSelectedRecursion(row, children) {
      const subItem = row[children];
      if (subItem && subItem.length > 0) {
        subItem.map(child => {
          if (this.setTreeSelected.includes(child.id)) {
            child.treeRowSelect = true;
          } else {
            child.treeRowSelect = false;
          }
          this.setSelectedRecursion(child, children);
        });
      }
      // const setSelectedArray = function treeToArray(data, children = 'children') {
      //   data.forEach((item, index) => {
      //     if (this.setTreeSelected.includes(item.id)) {
      //       item.treeRowSelect = true;
      //     } else {
      //       item.treeRowSelect = false;
      //     }
      //     if (item[children] && item[children].length > 0) {
      //       if (item.treeRowSelect && item.treeRowVisible) {
      //         treeToArray(item[children], children);
      //       }
      //     }
      //   });
      // };
      // setSelectedArray(row, 'children');
    },
    setSelectedRecursionDisenble(rows, ids) {
      this.selectedIds = ids;
      if (ids && ids.length > 0) {
        rows.forEach(row => {
          if (ids.includes(row.id)) {
            this.$set(row, 'treeRowSelect', false);
            this.$set(row, 'treeRowSelectDisabled', true);
          } else {
            this.$set(row, 'treeRowSelectDisabled', false);
            if (row.treeRowSelect) {
              this.$set(row, 'treeRowSelect', true);
            } else {
              this.$set(row, 'treeRowSelect', false);
            }
          }
        });
      }
    },
    updateTreeNode(item) {
      return new Promise(resolve => {
        const { treeRowId, treeRowParent } = item;
        const index = treeRowId.split('-').slice(-1)[0]; // get last index
        if (treeRowParent) {
          treeRowParent.children.splice(index, 1, item);
          resolve(this.data);
        } else {
          this.data.splice(index, 1, item);
          resolve(this.data);
        }
      });
    },
    toggleSelection(array) {
      if (array && array.length > 0) {
        this.$refs.refElTable.clearSelection();
        this.tableData.forEach(row => {
          for (const arrayRow of array) {
            if (arrayRow.id == row.id) {
              this.$refs.refElTable.toggleRowSelection(row, true);
              break;
            }
          }
        });
      } else {
        this.$refs.refElTable.clearSelection();
      }
    },
    toggleRowSelection(row, selected) {
      this.$refs.refElTable.toggleRowSelection(row, selected);
    },
    setCurrentRow(currentRow, isId = false) {
      if (currentRow) {
        for (const row of this.tableData) {
          if (isId) {
            if (currentRow.id == row.id) {
              this.$refs.refElTable.setCurrentRow();
              this.$refs.refElTable.setCurrentRow(row);
              break;
            }
          } else {
            if (currentRow.treeId == row.treeId) {
              this.$refs.refElTable.setCurrentRow();
              this.$refs.refElTable.setCurrentRow(row);
              break;
            }
          }
        }
      } else {
        this.$refs.refElTable.setCurrentRow();
      }
    },
    /**
       * 执行常规更新树操作
       * @param changedData 已更改的数据
       * @param treeData 原数据表数据
       */
    updateTableTreeData(changedData, callback) {
      const changedIds = changedData.map(row => row.treeId);
      this.tableData.forEach((row, index, array) => {
        if (changedIds.includes(row.treeId)) {
          for (const changedDataRow of changedData) {
            if (row.treeId == changedDataRow.treeId) {
              Object.assign(row, changedDataRow);
              break;
            }
          }
        }
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
    filter(value) {
      if (!this.filterNodeMethod) {
        throw new Error('无【filterNodeMethod】方法！');
      }
      const filterNodeMethod = this.filterNodeMethod;

      const traverse = function(node) {
        const childNodes = node.root ? node.data : node.children;
        childNodes.forEach(child => {
          child.treeRowVisible = filterNodeMethod.call(
            child,
            value,
            child.children,
            child
          );
          traverse(child);
        });
        // console.log(node.code+'-'+node.name+'-'+node.treeRowVisible)
        if (node.treeRowVisible && childNodes.length) {
          let allHidden = true;

          childNodes.forEach(child => {
            if (child.treeRowVisible) allHidden = false;
          });
          node.treeRowVisible = allHidden === false;
        }
        if (!value) return;

        if (node.treeRowVisible && node.ifLastLevel == 2) {
          node.treeRowExpand = true;
        }
      };
      this.root = true;
      this.treeRowVisible = true;
      traverse(this);
      this.$nextTick(() => {
        this.$refs.refElTable.doLayout();
      });
    },
    /**
       * 表格尾部加总
       * */
    getSummariesDefault(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = this.$utilsBasic.toThousands(sums[index]);
        } else {
          sums[index] = '';
        }
      });

      return sums;
    }
  }
};
</script>

<style>
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    vertical-align: -1px;
  }
  .el-table-tree /deep/ i{
    font-weight: bolder;
  }
</style>
