<!-- 组织机构  ex：src/views/custormManager/sysInfo/businessManager/businessContract/detail.vue-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <basic-search
        ref="refBasicSearch"
        :model-search-filter="modelSearchFilter"
        @clickSearchFilter="clickSearchFilter"
      />
    </basic-handler>
    <basic-table
      ref="refUnitTableData"
      :data-table="unit.tableData"
      :columns="unit.tableColumns"
      :pagination="modelSearchFilter"
      @selection-change="selectionChangeUnit"
      @current-change="currentChangeUnit"
      @pagination="getGoodslist"
    >
      <template slot="selection">
        <el-table-column
          v-if="isShowChecked"
          :selectable="selectableUnit"
          type="selection"
          align="center"
          width="55"
        />
      </template>

      <template slot-scope="obj" slot="authEndTime">
        {{ formatDate(obj.scope.row.authEndTime) }}
      </template>
      <template slot-scope="obj" slot="authMode">
        {{ formatAuthMode(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="authWay">
        {{ formatAuthModeType(obj.scope.row) }}
      </template>
    </basic-table>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import formatBasic from '@coreMixins/formatBasic';
import api from '@coreApi/common';
import { tableTitle } from './tableTitle';

export default {
  name: 'DialogUnit',
  mixins: [computed, methods, formatEnum, formatBasic],
  props: {
    params: {
      type: Object,
      required: false,
      default: () => {}
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
      modelSearchFilter: {
        page: 1,
        limit: 10,
        enable: 1,
        validateStatus: 1,
        fuzzyKeys: '',
        fuzzy: ''
      },
      tableShow: false,
      unit: {
        tableData: {
          data: [],
          total: 0
        },
        tableColumns: tableTitle.indexTitle,
        selectedRows: [],
        unitSelectedIdArray: []
      }
    };
  },
  computed: {
    validateStatus() {
      if (!Array.isArray(this.dataEnum.validateStatus)) return {};
      return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0];
    },
    enabled() {
      if (!Array.isArray(this.dataEnum.enabled)) return {};
      return this.dataEnum.enabled.filter(item => item.name === '启用')[0];
    }
  },
  watch: { },
  async created() {
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetAuthData'
    ]);
    this.getGoodslist();
  },
  methods: {
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refUnitTableData, this.modelSearchFilter, () => {
        this.getGoodslist();
      });
    },
    getGoodslist() {
      this.getUnit();
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.getUnit();
    },
    clickRefresh() {
      this.getUnit();
    },
    filterData(data, key, value) {
      return data.filter(item => {
        if (item.children && item.children.length > 0) {
          item.children = this.filterData(item.children, key, value);
        }
        if (item[key] == value) return true;
      });
    },
    getUnit() {
      api.static.getPage({
        productAlias: 'smartpm',
        pageCode: 'sysCrmUserInfo',
        field: this.modelSearchFilter
      }).then((response) => {
        this.unit.tableData.total = response.data.total;
        this.unit.tableData.data = response.data.rows;
        if (!this.isShowChecked) {
          this.defaultExpandAll = true;
          this.$nextTick(() => {
            this.$refs.refUnitTableData.setCurrentRow(response.data.rows[0], true);
          });
        } else {
          if (this.params.data && this.params.data.length > 0) {
            const unitData = this.params.data;
            this.unit.unitSelectedIdArray = unitData.map(row => {
              return row.id;
            });
          }
        }
      });
    },
    selectionChangeUnit(selection) {
      this.unit.selectedRows = selection;
      this.$emit('selectionChange', this.unit);
    },
    currentChangeUnit(selection) {
      this.unit.selectedRow = selection;
      this.$emit('selectionChange', this.unit);
    },
    selectableUnit(row, index) {
      // return 1
      if (this.unit.unitSelectedIdArray.includes(row.id)) {
        return 0;// 不可勾选
      } else {
        return 1;// 可勾选
      }
    },
    formatter(val) {
      console.log(val);
    }
  }
};
</script>
