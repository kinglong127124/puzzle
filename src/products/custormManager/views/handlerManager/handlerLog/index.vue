<template>
  <basic-container class="handler-table">
    <basic-handler>
      <el-button :disabled="disabledView" type="primary" size="small" icon="el-icon-if-see" plain @click="clickView">查看</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getList()">刷新</el-button>
      <template slot="search">
        <basic-search
          ref="refBasicSearch"
          :is-advanced-query="true"
          :model-search-filter="modelSearchFilter"
          @clickSearchFilter="clickSearchFilter"/>
      </template>
    </basic-handler>
    <el-table
      ref="refBasicTable"
      :key="tableKey"
      :data="list"
      :height="heightGateLog"
      border
      fit
      highlight-current-row
      stripe
      @current-change="currentChangeRow"
      @filter-change="filterChangeRow"
      @sort-change="sortChangeRow">
      <el-table-column
        label="序号"
        type="index"
        width="60"
        align="center"/>
      <el-table-column prop="inputPerson" min-width="200px" align="left" header-align="center" show-overflow-tooltip label="操作人">
        <template slot-scope="scope">
          <span>
            {{ scope.row.inputPerson }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inputTime" width="160px" align="center" label="操作时间">
        <template slot-scope="scope">
          <span>
            {{ scope.row.inputTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" width="140px" align="center" label="操作人IP">
        <template slot-scope="scope">
          <span>
            {{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column :filters="getLogType" :filter-multiple="false" column-key="logType" width="100px" align="center" label="日志类型" class-name="spacing-set" prop="logType">
        <template slot-scope="scope">
          <el-tag :type="scope.row.logType == 2 ? 'success': 'danger'"><i class="el-icon-document"/>&nbsp;{{ formatLogType(scope.row) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logContent" min-width="200px" align="left" header-align="center" show-overflow-tooltip label="日志内容">
        <template slot-scope="scope">
          <span>
            {{ scope.row.logContent }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="消耗时间" class-name="spacing-set" prop="costTime" align="right" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag :type="scope.row.costTime >=0 && scope.row.costTime <= 3000 ? 'success': 'danger'">{{ scope.row.costTime?scope.row.costTime:'0' }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="requestType" width="120px" align="left" label="终端/浏览器" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ formatBrowserTerminal(scope.row.ua) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="requestParam" width="80px" align="center" label="请求类型" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.requestType }}</span>
        </template>

      </el-table-column>
      <el-table-column prop="requestUrl" min-width="300px" align="left" label="请求路径" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.requestUrl }}</span>
        </template>

      </el-table-column>
      <el-table-column prop="method" min-width="400px" align="left" header-align="center" show-overflow-tooltip label="请求java方法">
        <template slot-scope="scope">
          <span>
            {{ scope.row.method }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="modelSearchFilter.page"
      :limit.sync="modelSearchFilter.limit"
      @pagination="getList"/>
  </basic-container>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatBasic from '@coreMixins/formatBasic';
import formatEnum from '@coreMixins/formatEnum';
import pagination from '@coreComp/Pagination';
import {
  page
} from '@custormManager/api/handlerManager/handlerLog/index';

export default {
  name: 'GateLog',
  components: { pagination },
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      list: [],
      total: 0,
      heightGateLog: '0',

      modelSearchFilter: {
        page: 1,
        limit: 10,
        // selectOwn: '1', // 查询是否自己添加操作人员
        fuzzy: '',
        fuzzyKeys: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      // gateLogManager_btn_edit: '1',
      // gateLogManager_btn_del: '1',
      // gateLogManager_btn_add: '1',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      currentRow: null
    };
  },
  computed: {
    disabledView: function() {
      return !(this.currentRow && this.currentRow.id && this.list.length);
    },
    getLogType() {
      const logType = this.dataEnum.static.logType.map((item) => ({ text: item.name, value: item.code }));
      return logType;
    }
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  created() {
    this.getList();
  },
  mounted: function() {
    const _self = this;
    this.$nextTick(() => {
      _self.heightInit(_self.getInnerHeight());
    });
  },
  methods: {
    /**
       * 高度初始化
       * @param innerHeight
       */
    heightInit(innerHeight) {
      const offsetTopGateLog = this.$refs.refBasicTable.$el.getBoundingClientRect().top;
      this.heightGateLog = innerHeight - offsetTopGateLog - 55;
    },
    getList() {
      page(this.modelSearchFilter).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.$nextTick(function() {
          if (this.$refs.refBasicTable) {
            this.$refs.refBasicTable.setCurrentRow(this.list[0]);
          }
        });
      });
    },
    handleFilter() {
      this.getList();
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refBasicTable, this.modelSearchFilter, () => {
        this.getList();
      });
    },
    clickView() {
      this.$store.dispatch('cacheId', '0');
      console.log(this.currentRow);
      this.$router.push({
        name: 'handlerLogDetail',
        params: {
          id: this.currentRow.id
        }
      });
    },
    currentChangeRow(row) {
      if (row) {
        this.currentRow = row;
      }
    },
    filterChangeRow(row) {
      if (row.hasOwnProperty('logType')) {
        this.$set(this.modelSearchFilter, 'logType', row.logType[0]);
        this.getList();
      }
    },
    sortChangeRow(row) {
      if (row.hasOwnProperty('order')) {
        this.$set(this.modelSearchFilter, 'order', row.order);
        this.getList();
      }
    }
  }
};
</script>
