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
      ref="refOrgTableData"
      :data-table="org.tableData"
      :columns="org.tableColumns"
      :pagination="modelSearchFilter"
      @selection-change="selectionChangeOrg"
      @current-change="currentChangeOrg"
      @pagination="getGoodslist"
    >
      <template slot="selection">
        <el-table-column
          v-if="isShowChecked"
          :selectable="selectableOrg"
          type="selection"
          align="center"
          width="55"
        />
      </template>

      <template slot-scope="treeObj" slot="type">
        {{ formatType(treeObj.scope.row) }}
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
  name: 'DialogOrganization',
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
        type: 1,
        fuzzyKeys: '',
        fuzzy: ''
      },
      tableShow: false,
      org: {
        tableData: {
          data: [],
          total: 0
        },
        tableColumns: tableTitle.indexTitle,
        selectedRows: [],
        orgSelectedIdArray: []
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
    this.getEnumData(['GetValidateStatusData', 'GetIsOrNotData']);
    this.getGoodslist();
  },
  methods: {
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refOrgTableData, this.modelSearchFilter, () => {
        this.getGoodslist();
      });
    },
    getGoodslist() {
      this.getOrg();
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.getOrg();
    },
    clickRefresh() {
      this.getOrg();
    },
    filterData(data, key, value) {
      return data.filter(item => {
        if (item.children && item.children.length > 0) {
          item.children = this.filterData(item.children, key, value);
        }
        if (item[key] == value) return true;
      });
    },
    getOrg() {
      api.static.getPage({
        productAlias: 'admin',
        pageCode: 'sysOrgInfo',
        field: this.modelSearchFilter
      }).then((response) => {
        this.org.tableData.total = response.data.total;
        this.org.tableData.data = response.data.rows;
        if (!this.isShowChecked) {
          this.defaultExpandAll = true;
          this.$nextTick(() => {
            this.$refs.refOrgTableData.setCurrentRow(response.data.rows[0], true);
          });
        } else {
          if (this.org.tableData.data && this.org.tableData.data.length > 0) {
            const orgData = this.org.tableData.data;
            this.org.orgSelectedIdArray = orgData.map(row => {
              return row.id;
            });
          }
        }
      });
    },
    selectionChangeOrg(selection) {
      this.org.selectedRows = selection;
      this.$emit('selectionChange', this.org);
    },
    currentChangeOrg(selection) {
      this.org.selectedRow = selection;
      this.$emit('selectionChange', this.org);
    },
    selectableOrg(row, index) {
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
