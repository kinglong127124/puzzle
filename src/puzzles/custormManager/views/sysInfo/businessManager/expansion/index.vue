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
      <template slot="slot-many-column">
        <el-table-column label="申请前" header-align="center">
          <el-table-column
            v-for="item in before"
            :prop="item.value"
            :label="item.text"
            :key="item.value"
            :min-width="item.minWidth"
            :width="item.width"
            :align="item.align||'center'"
            :header-align="item.headerAlign"
            :show-overflow-tooltip="item.showOverflowTooltip"
            :class-name="item.className"
            :formatter="format"
          />
        </el-table-column>
        <el-table-column label="申请后" header-align="center">
          <el-table-column
            v-for="item in after"
            :prop="item.value"
            :label="item.text"
            :key="item.value"
            :min-width="item.minWidth"
            :width="item.width"
            :align="item.align||'center'"
            :header-align="item.headerAlign"
            :show-overflow-tooltip="item.showOverflowTooltip"
            :class-name="item.className"
            :formatter="format"
          />
        </el-table-column>
        <el-table-column label="扩容合同" header-align="center">
          <el-table-column
            v-for="item in contract"
            :prop="item.value"
            :label="item.text"
            :key="item.value"
            :min-width="item.minWidth"
            :width="item.width"
            :align="item.align||'center'"
            :header-align="item.headerAlign"
            :show-overflow-tooltip="item.showOverflowTooltip"
            :class-name="item.className"
            :formatter="format"
          />
        </el-table-column>
        <el-table-column
          prop="inputPerson"
          label="登记人员"
          width="100"
          align="center"
          header-align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="inputTime"
          label="登记时间"
          width="160"
          align="center"
          header-align="center"
          show-overflow-tooltip
        />
      </template>
      <template slot-scope="obj" slot="validateStatus">
        {{ formatAuditStatusEnum(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="isHandle">
        {{ formatIsOrNot(obj.scope.row.isHandle) }}
      </template>
      <template slot-scope="obj" slot="appTime">
        {{ formatDate(obj.scope.row.appTime) }}
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
  name: 'Expansion',
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      addBtnShowFlag: false, // 待系统菜单配置
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
      columns: tableColumns.listColumns,
      before: tableColumns.before,
      after: tableColumns.after,
      contract: tableColumns.contract
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
      'GetAuditStatusEnum',
      'GetIsOrNotData',
      'GetAuthData'
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
          name: 'expansionDetail',
          params: { id: 0 }
        });
      } else {
        this.$router.push({
          name: 'expansionDetail',
          params: { id: this.currentRow.id }
        });
      }
    },
    getAllListData() {
      api.static.getPage({
        productAlias: 'smartpm',
        pageCode: 'sysBusAppCapacity',
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
    format(row, column, cellValue, index) {
      switch (column.property) {
        case 'beforAuthModel':
          return this.$utilsBasic.formatName(this.dataEnum.static.authMode, row.beforAuthModel);
        case 'beforAuthWay':
          return this.$utilsBasic.formatName(this.dataEnum.static.authModeType, row.beforAuthWay);
        case 'beforAuthNum':
          return this.$utilsBasic.toThousands(cellValue, 0);
        case 'afterAuthModel':
          return this.$utilsBasic.formatName(this.dataEnum.static.authMode, row.afterAuthModel);
        case 'afterAuthWay':
          return this.$utilsBasic.formatName(this.dataEnum.static.authModeType, row.afterAuthWay);
        case 'afterAuthNum':
          return this.$utilsBasic.toThousands(cellValue, 0);
        case 'signDate':
          if (!cellValue) return;
          return this.$utils.date.format(cellValue);
        case 'signPrice':
          return this.$utilsBasic.toThousands(cellValue, 2);
        default:
          return cellValue;
      }
    }

  }

};
</script>

