<template>
  <div class="gateLog-container flex-layout">
    <basic-handler>
      <template slot="search">
        <basic-search
          ref="refBasicSearch"
          :is-advanced-query="true"
          :model-search-filter="modelSearchFilter"
          @clickSearchFilter="clickSearchFilter"/>
      </template>
    </basic-handler>
    <el-table
      ref="refGateLog"
      :key="tableKey"
      :data="list"
      :height="heightGateLog"
      border
      fit
      highlight-current-row
      stripe>
      <el-table-column
        label="序号"
        type="index"
        width="60"
        align="center"/>
      <el-table-column prop="username" width="80px" align="left" header-align="center" show-overflow-tooltip label="操作人">
        <template slot-scope="scope">
          <span>
            {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="logContent" min-width="200px" align="left" header-align="center" show-overflow-tooltip label="日志内容">
        <template slot-scope="scope">
          <span>
            {{ scope.row.logContent }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="日志类型">
        <template slot-scope="scope">
          <span>
            {{ formatLogType(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" width="120px" align="center" label="操作人IP">
        <template slot-scope="scope">
          <span>
            {{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="操作时间">
        <template slot-scope="scope">
          <span>
            {{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="操作类型">
        <template slot-scope="scope">
          <span>
            {{ scope.row.operateType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="requestType" width="100px" align="left" label="请求类型" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.requestType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="requestParam" width="200px" align="left" label="请求参数" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.requestParam }}</span>
        </template>

      </el-table-column>
      <el-table-column prop="requestUrl" min-width="200px" align="left" label="请求路径" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.requestUrl }}</span>
        </template>

      </el-table-column>
      <el-table-column prop="method" min-width="200px" align="left" header-align="center" show-overflow-tooltip label="请求java方法">
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
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import pagination from '@core/components/Pagination';
import {
  page
} from '@productsSys/api/groupAuth/gateLog/index';

export default {
  name: 'GateLog',
  components: { pagination },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      list: [],
      total: 0,
      heightGateLog: '0',

      modelSearchFilter: {
        page: 1,
        limit: 10,
        selectOwn: '1', // 查询是否自己添加操作人员
        fuzzy: '',
        fuzzyKeys: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      gateLogManagerBtnEdit: '1',
      gateLogManagerBtnDel: '1',
      gateLogManagerBtnAdd: '1',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    };
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
      const offsetTopGateLog = this.$refs.refGateLog.$el.getBoundingClientRect().top;
      this.heightGateLog = innerHeight - offsetTopGateLog - 55;
    },
    getList() {
      page(this.modelSearchFilter).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter() {
      this.getList();
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refGateLog, this.modelSearchFilter, () => {
        this.getList();
      });
    }
  }
};
</script>
