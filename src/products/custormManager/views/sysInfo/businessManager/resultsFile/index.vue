<template>
  <basic-split-pane
    :default-percent="25"
    :min-percent="25"
    class="bpmaManager-container-list list-container">
    <template slot="leftContainer">
      <div class="left-container">
        <page-unit-filter type="bpmaUnitAudited" @change="changeUnit"/>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
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
          <template slot-scope="obj" slot="signDate">
            {{ formatDate(obj.scope.row.signDate) }}
          </template>
        </basic-table>
      </div>
    </template>

  </basic-split-pane>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import formatBasic from '@coreMixins/formatBasic';
const pageUnitFilter = () => import('@framesDashboardViewsComp/page/pageUnitFilter');
import tableTitle from './tableTitle';
/**
   * api
   * */
import api from '@coreApi/common';

export default {
  name: 'ResultsFile',
  components: {
    pageUnitFilter
  },
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      addBtnShowFlag: true, // 待系统菜单配置
      viewBtnShowFlag: true,

      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: '',
        cusOrgId: undefined
      },
      listTableData: {
        data: [],
        total: 0
      },
      currentRow: null, // 表格当前行
      columns: tableTitle.indexTitle,

      proData: {}

    };
  },
  computed: {
    viewBtnDisabledFlag() {
      return !(this.currentRow && this.currentRow.id);
    }
  },
  activated() {
    if (!this.modelSearchFilter.cusOrgId) return;
    this.getAllListData();
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetAuditStatusEnum',
      'GetIsOrNotData'
    ]);
  },
  methods: {
    changeUnit(data) {
      this.proData = data;
      console.log('data', data);
      if (!data) {
        this.listTableData.data = [];
        return;
      }
      this.modelSearchFilter = Object.assign({}, this.modelSearchFilter, {
        cusOrgId: data.id
      });
      this.getAllListData();
    },

    addClick(param) {
      this.$store.dispatch('cacheId', '0');
      if (param === 'add') {
        if (!this.$utils.isEmpty(this.proData)) {
          this.$router.push({
            name: 'resultsFileDetail',
            params: { id: 0 },
            query: {
              name: this.proData.name,
              id: this.modelSearchFilter.cusOrgId
            }
          });
        } else {
          this.$message({ message: '当前无客户注册信息，无法新增!', type: 'warning' });
        }
      } else {
        this.$router.push({ name: 'resultsFileDetail', params: { id: this.currentRow.id }});
      }
    },
    /**
       * 获取列表所有数据
       * */
    getAllListData() {
      // console.log('this.modelSearchFilter',this.modelSearchFilter)
      api.static.getPage({
        productAlias: 'smartpm',
        pageCode: 'sysBusResult',
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
    },

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
    }

  }
};
</script>

