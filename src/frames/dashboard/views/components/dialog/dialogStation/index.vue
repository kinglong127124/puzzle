<!--岗位（多选及单选）-->
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
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <basic-search
        ref="refBasicSearch"
        :model-search-filter="modelSearchFilter"
        @clickSearchFilter="clickSearchFilter"/>
    </basic-handler>
    <basic-table-tree
      ref="refStationTreeData"
      :default-expand-all="defaultExpandAll"
      :data="station.treeData"
      :columns="station.treeColumns"
      :filter-node-method="filterNodeMethod"
      :height="400"
      @selection-change="selectionChangeStation"
      @current-change="currentChangeStation">
      <template slot="selection">
        <el-table-column
          v-if="isShowChecked"
          :selectable="selectableStation"
          type="selection"
          align="center"
          width="55"/>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
import {
  getStationTreeData
} from '@core/api/common/dialog/dialogStation';

export default {
  name: 'DialogStation',
  props: {
    stationData: {
      type: Array,
      required: false,
      default: () => []
    },
    isShowChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultExpandAll: false,
      filterText: '',
      // 岗位选择
      station: {
        treeData: [],
        treeColumns: [
          {
            text: '类别',
            value: 'typeName',
            width: 60
          },
          {
            expand: true,
            text: '编码',
            value: 'code',
            width: 200,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '名称',
            value: 'name',
            minWidth: 140,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '全名称',
            value: 'orgPathName',
            minWidth: 200,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          }
        ],
        selectedRows: [],
        stationSelectedIdArray: [],
        selectedAll: []
      },
      modelSearchFilter: {
        fuzzy: '',
        fuzzyKeys: ''
      }
    };
  },
  watch: {
    filterText(filterStr) {
      //  this.roles.treeData.filter(val);
    },
    stationData(data) {
      if (!this.$utils.length(data)) {
        this.$refs.refStationTreeData.toggleSelection();
      }
    }
  },
  created() {
    this.getStationTreeData();
  },
  methods: {
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refStationTreeData, this.modelSearchFilter, () => {
        try {
          this.$refs.refStationTreeData.filter(this.modelSearchFilter.fuzzy);
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
      this.station.selectedAll = this.station.selectedRows;
      this.getStationTreeData();
    },
    clickRefresh() {
      this.modelSearchFilter.fuzzy = '';
      this.station.selectedRows = [];
      this.station.roleSelectedIdArray = [];
      this.station.selectedAll = [];
      this.getStationTreeData();
    },
    /**
       * 获得所有岗位
       */
    getStationTreeData() {
      getStationTreeData().then((response) => {
        if (response.data && response.data.length > 0) {
          this.station.treeData = response.data;
          // 单选和多选
          if (!this.isShowChecked) {
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              if (this.$utils.length(this.stationData)) {
                this.$refs.refStationTreeData.setCurrentRow(this.stationData[0], true);
              } else {
                this.$refs.refStationTreeData.setCurrentRow(this.station.treeData[0], true);
              }
            });
          } else {
            // 获得选择的数据
            this.$nextTick(() => {
              this.$refs.refStationTreeData.toggleSelection(this.station.selectedAll);
            });
            // 得到已选择ID
            if (this.stationData && this.stationData.length > 0) {
              const stationData = this.stationData;
              this.station.stationSelectedIdArray = stationData.map(row => {
                return row.id;
              });
            } else {
              this.station.stationSelectedIdArray = [];
            }
          }
        }
      });
    },
    /**
       * 选择当前选择框
       */
    selectionChangeStation(selection) {
      this.station.selectedRows = selection;
      this.$emit('selectionChange', this.station);
    },
    /**
       * 选择当前行
       */
    currentChangeStation(selection) {
      this.station.selectedRow = selection;
      this.$emit('selectionChange', this.station);
    },
    /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
    selectableStation(row, index) {
      if (row.type != 3 || this.station.stationSelectedIdArray.includes(row.id)) {
        return 0;// 不可勾选
      } else {
        return 1;// 可勾选
      }
    }
  }
};
</script>
