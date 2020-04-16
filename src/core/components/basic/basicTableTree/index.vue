<template>
  <el-table
          ref="refElTable"
          :data="tableData"
          :row-class-name="rowClassNameFun"
          v-bind="$attrs"
          :height="height"
          :min-height="minHeight"
          :span-method="spanMethod"
          :reserve-selection="reserveSelection"
          :show-summary="showSummary"
          :summary-method="getSummariesDefault"
          border
          class="el-table-tree"
          fit
          highlight-current-row
          stripe
          default-expand-all
          v-on="$listeners"
          @row-click="rowClick"
          @filter-change="filterChangeRow"
  >
    <el-table-column
            :reserve-selection="reserveSelection"
            label="序号"
            type="index"
            width="60"
            align="center"
    />
    <slot name="selection" />
    <slot name="slot-column" />
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
            <span :style="{'padding-left':+scope.row.treeRowLevel*indent-18 + 'px'} " />
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
                    :style="{'padding-left':+scope.row.treeRowLevel*indent + 'px'} "
                    :indeterminate="scope.row.treeRowSelect"
                    v-model="scope.row.treeRowSelect"
                    @change="handleCheckAllChange(scope.row)"
            />
            <el-checkbox
                    v-else
                    :style="{'padding-left':+scope.row.treeRowLevel*indent + 'px'} "
                    v-model="scope.row.treeRowSelect"
                    @change="handleCheckAllChange(scope.row)"
            />
          </template>
          <template v-if="scope.row.treeRowShow">{{ scope.row[item.value] }}</template>
        </slot>
      </template>
    </el-table-column>
    <slot name="slot-many-column" />
    <slot name="slot-enable" />
  </el-table>
</template>

<script>
  import { addAttrs } from './eval.js';
  let _self = null;
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
        default: (param, sums, column, index) => {
          return _self.defaultGetSummary(param, sums, column, index);
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
        default: () => () => {}
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
      rowClassName: {
        type: [Function],
        default: () => ''
      }
    },
    data() {
      return {
        guard: 1,
        worker: null
      };
    },
    computed: {
      children() {
        return this.defaultChildren;
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
      _self = this;
    },
    methods: {
      filterChangeRow(row) {
        this.$emit('filterChangeRow', row);
      },
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
      getData() {
        return this.tableData;
      },
      rowClassNameFun({ row, rowIndex }) {
        if (row.treeRowVisible) {
          const parent = row.treeRowParent;
          const show = parent ? parent.treeRowExpand && parent.treeRowShow : true;
          row.treeRowShow = show;
          return show
            ? `display-block ${this.rowClassName({ row, rowIndex })}`
            : 'display-none';
        } else {
          return 'display-none';
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
      computedSaveData(data) {
        let arr = [];
        data.forEach(item => {
          if (item.children && item.children.length > 0) {
            arr = arr.concat(this.computedSaveData((item.children)));
          }
          arr.push(item);
        });
        return arr;
      },
      toggleExpandedAll(expand) {
        const data = this.computedSaveData(this.data);
        for (const row of data) {
          this.$set(row, 'treeRowExpand', expand);
        }
      },
      toggleExpanded(record) {
        const expand = !record.treeRowExpand;
        record.treeRowExpand = expand;
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
      handleCheckAllChange(row) {
        this.selectRecursion(row, row.treeRowSelect, this.defaultChildren);
        this.isIndeterminate = row.treeRowSelect;
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
            this.selectRecursion(child, select, children);
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
          const childNodes = node.root ? node.data : (node.children || []);
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

          if (node.treeRowVisible && node.children && node.children.length > 0) {
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
        const { columns } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '汇总';
            return;
          }
          this.getSummaries(param, sums, column, index);
        });
        this.doLayout();
        return sums;
      },
      doLayout() {
        this.$nextTick(() => {
          this.$refs.refElTable.doLayout();
        });
      },
      defaultGetSummary(param, sums, column, index) {
        const values = param.data.map(item => Number(item[column.property]));
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
  .display-show{
    animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;
    display: contents;
  }
  .display-none{
    display: none;
  }
</style>
