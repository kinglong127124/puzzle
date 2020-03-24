<template>
  <basic-container class="handler-table">
    <basic-handler>
      <el-button
        v-if="userManagerBtnAdd"
        type="primary"
        size="small"
        icon="el-icon-plus"
        plain
        @click="clickUserManagerAdd('add')">新增人员
      </el-button>
      <el-button
        v-if="userManagerBtnDetail"
        :disabled="disabledView"
        type="primary"
        size="small"
        icon="el-icon-if-see"
        plain
        @click="clickUserManagerAdd('detail')">查看
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getUserManagerData()">刷新</el-button>
      <template slot="search">
        <basic-search
          ref="refBasicSearch"
          :is-advanced-query="true"
          :model-search-filter="modelSearchFilter"
          @clickSearchFilter="clickSearchFilter"/>
      </template>
    </basic-handler>
    <div class="table-container">
      <el-table
        ref="refUserManagerTable"
        :key="tableKey"
        :data="tableData"
        :height="300"
        border
        fit
        highlight-current-row
        stripe
        @current-change="clickUserManagerCurrentRow">
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"/>
        <el-table-column
          :formatter="formatValidateStatus"
          prop="validateStatus"
          label="审核状态"
          width="80"
          align="center"/>
        <el-table-column
          :formatter="formatEnable"
          prop="enable"
          label="启用状态"
          width="80"
          align="center"/>
        <el-table-column
          prop="code"
          label="系统编码"
          width="120"
          align="center"
          show-overflow-tooltip/>
        <el-table-column
          prop="username"
          label="中文姓名"
          width="80"
          align="center"
          show-overflow-tooltip/>
        <el-table-column
          prop="englishName"
          label="英文姓名"
          width="100"
          align="center"
          show-overflow-tooltip/>
        <el-table-column
          prop="jobNumber"
          label="员工ID号"
          width="120"
          align="center"
          show-overflow-tooltip/>
        <el-table-column
          :formatter="formatIfOperate"
          prop="ifOperate"
          label="是否操作员"
          width="100"
          align="center"/>
        <el-table-column
          prop="mobilePhone"
          label="登录手机号"
          width="120"
          align="center"
          show-overflow-tooltip/>
        <el-table-column
          :formatter="formatIsAdmin"
          prop="isAdmin"
          label="是否系统管理员"
          width="120"
          align="center"
          show-overflow-tooltip/>
        <el-table-column :formatter="formatSex" prop="sex" label="性别" width="60" align="center"/>
        <el-table-column label="名族" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主岗岗位" align="left" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.mainName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="modelSearchFilter.page"
        :limit.sync="modelSearchFilter.limit"
        @pagination="getUserManagerData"/>
    </div>
  </basic-container>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import pagination from '@core/components/Pagination';
import {
  getUserManagerData
} from '@puzzlesSys/api/groupAuth/userManager/index';

export default {
  name: 'UserManager',
  components: {
    pagination
  },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      tableData: [],
      total: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        // selectOwn: '1',//查询是否自己添加操作人员
        fuzzy: '',
        fuzzyKeys: ''
      },
      userManagerBtnAdd: false,
      userManagerBtnDetail: false,
      tableKey: 0,
      currentRow: null
    };
  },
  computed: {
    disabledView: function() {
      return !(this.currentRow && this.currentRow.id && this.tableData.length);
    }
  },
  activated() {
    this.getUserManagerData();
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetIsOrNotData',
      'GetGenderData'
    ]);
    this.userManagerBtnAdd = this.elements['userManager:btn_add'];
    this.userManagerBtnDetail = this.elements['userManager:view'];
  },
  methods: {
    getUserManagerData() {
      getUserManagerData(this.modelSearchFilter)
        .then(response => {
          this.tableData = response.data.rows;
          this.total = response.data.total;
          this.$nextTick(function() {
            if (this.$refs.refUserManagerTable) {
              this.$refs.refUserManagerTable.setCurrentRow(this.tableData[0]);
            }
          });
        });
    },
    /**
     * 关键字搜索
     */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refUserManagerTable, this.modelSearchFilter, () => {
        this.getUserManagerData();
      });
    },
    clickUserManagerCurrentRow(row) {
      if (row) {
        this.currentRow = row;
      }
    },
    isSelectedRow() {
      if (this.currentRow === null) {
        this.$message({
          message: '请先选中一行',
          type: 'warning'
        });
        return false;
      }
      return true;
    },
    clickUserManagerAdd(param) {
      this.$store.dispatch('cacheId', '0');
      if (param === 'add') {
        this.$router.push({ name: 'userManagerDetail', params: { id: 0 }});
      } else {
        if (this.isSelectedRow()) {
          this.$router.push({ name: 'userManagerDetail', params: { id: this.currentRow.id }});
        }
      }
    }
  }
};
</script>
