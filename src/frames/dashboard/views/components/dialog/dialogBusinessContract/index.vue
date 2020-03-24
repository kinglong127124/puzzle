<!-- 商务合同  ex：src\views\custormManager\sysInfo\businessManager\expansion\detail.vue-->
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
      ref="refBusinessContractTableData"
      :data-table="businessContract.tableData"
      :columns="businessContract.tableColumns"
      :pagination="modelSearchFilter"
      @selection-change="selectionChangeBusinessContract"
      @current-change="currentChangeBusinessContract"
      @pagination="getGoodslist"
    >
      <template slot="selection">
        <el-table-column
          v-if="isShowChecked"
          :selectable="selectableBusinessContract"
          type="selection"
          align="center"
          width="55"
        />
      </template>
      <template slot-scope="obj" slot="validateStatus">
        {{ formatAuditStatusEnum(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="signPrice">
        {{ formatToThousands(obj.scope.row.signPrice) }}
      </template>
      <template slot-scope="obj" slot="signDate">
        {{ formatDate(obj.scope.row.signDate) }}
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
  name: 'DialogBusinessContract',
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
      businessContract: {
        tableData: {
          data: [],
          total: 0
        },
        tableColumns: tableTitle.indexTitle,
        selectedRows: [],
        businessContractSelectedIdArray: []
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
      this.$refs.refBasicSearch.searchFilter(this.$refs.refBusinessContractTableData, this.modelSearchFilter, () => {
        this.getGoodslist();
      });
    },
    getGoodslist() {
      this.getBusinessContract();
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.getBusinessContract();
    },
    clickRefresh() {
      this.getBusinessContract();
    },
    filterData(data, key, value) {
      return data.filter(item => {
        if (item.children && item.children.length > 0) {
          item.children = this.filterData(item.children, key, value);
        }
        if (item[key] == value) return true;
      });
    },
    getBusinessContract() {
      api.static.getPage({
        productAlias: 'smartpm',
        pageCode: 'sysBusContractMaster',
        field: this.modelSearchFilter
      }).then((response) => {
        this.businessContract.tableData.total = response.data.total;
        this.businessContract.tableData.data = response.data.rows;
        if (!this.isShowChecked) {
          this.defaultExpandAll = true;
          this.$nextTick(() => {
            this.$refs.refBusinessContractTableData.setCurrentRow(response.data.rows[0], true);
          });
        } else {
          if (this.businessContract.tableData.data && this.businessContract.tableData.data.length > 0) {
            const businessContractData = this.businessContract.tableData.data;
            this.businessContract.businessContractSelectedIdArray = businessContractData.map(row => {
              return row.id;
            });
          }
        }
      });
    },
    selectionChangeBusinessContract(selection) {
      this.businessContract.selectedRows = selection;
      this.$emit('selectionChange', this.businessContract);
    },
    currentChangeBusinessContract(selection) {
      this.businessContract.selectedRow = selection;
      this.$emit('selectionChange', this.businessContract);
    },
    selectableBusinessContract(row, index) {
      // return 1
      const lock = this.dataEnum.isOrNot.some(item => {
        if (item.code == row.ifLastLevel && item.name == '是') {
          return true;
        }
      });
      if (lock) {
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
