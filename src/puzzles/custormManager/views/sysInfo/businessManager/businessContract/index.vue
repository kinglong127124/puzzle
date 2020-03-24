<template>
  <basic-container class="handler-table">
    <basic-handler>

      <el-button
        v-if="addBtnShowFlag"
        type="primary"
        plain
        icon="el-icon-plus"
        size="small"
        @click="addClick('add')">新增
      </el-button>
      <el-button
        v-if="viewBtnShowFlag"
        :disabled="viewBtnDisabledFlag"
        type="primary"
        plain
        icon="el-icon-if-see"
        size="small"
        @click="addClick">查看
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getAllListData()">刷新</el-button>
      <template slot="search">
        <basic-search
          ref="refBasicSearch"
          :model-search-filter="modelSearchFilter"
          @clickSearchFilter="clickSearchFilter"/>
      </template>
    </basic-handler>
    <basic-table
      ref="refListTableData"
      :data-table="listTableData"
      :columns="columns"
      :pagination="modelSearchFilter"
      @current-change="handleCurrentChange"
      @pagination="getAllListData"

    >
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

  </basic-container>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import api from '@coreApi/common';
import { tableColumns } from './tableColumns';
import formatBasic from '@coreMixins/formatBasic';

export default {
  name: 'BusinessContract',
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      addBtnShowFlag: true, // 待系统菜单配置
      viewBtnShowFlag: true,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: ''
      },
      listTableData: {
        data: [],
        total: 0
      },
      currentRow: null, // 表格当前行
      columns: tableColumns.listColumns

    };
  },
  computed: {
    viewBtnDisabledFlag() {
      return !(this.currentRow && this.currentRow.id);
    }
  },
  activated() {
    this.getAllListData();
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetAuditStatusEnum'
    ]);
  },
  methods: {
    /**
       * 当前行
       * */
    handleCurrentChange(row) {
      console.log(row);
      this.currentRow = row;
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refListTableData, this.modelSearchFilter, () => {
        this.getAllListData();
      });
    },
    addClick(param) {
      this.$store.dispatch('cacheId', '0');
      if (param === 'add') {
        this.$router.push({
          name: 'businessContractDetail',
          params: { id: 0 }
        });
      } else {
        this.$router.push({
          name: 'businessContractDetail',
          params: { id: this.currentRow.id }
        });
      }
    },
    getAllListData() {
      api.static.getPage({
        productAlias: 'smartpm',
        pageCode: 'sysBusContractMaster',
        field: this.modelSearchFilter
      }).then((res) => {
        if (res.status && res.status === 200) {
          this.listTableData.data = res.data.rows;
          this.listTableData.total = res.data.total;
          if (!this.$utils.isEmpty(res.data.rows) && this.$refs.refListTableData) {
            this.$refs.refListTableData.setCurrentRow(res.data.rows[0]);
          }
          console.log('获取列表所有数据', res);
        } else {
          this.$message({ message: res.message, type: 'warning' });
        }
      }).catch(error => {
        console.log(error);
      });
    }

  }

};
</script>

