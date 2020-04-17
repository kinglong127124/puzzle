<template>
    <basic-container class="handler-table">
        <basic-handler>
            <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAdd('add')">新增</el-button>
            <el-button
                    :disabled="disabledView"
                    type="primary"
                    size="small"
                    icon="el-icon-if-see"
                    plain
                    @click="clickAdd('view')">查看
            </el-button>
            <el-button
                    :disabled="disabledView"
                    type="primary"
                    size="small"
                    icon="el-icon-setting"
                    plain
                    @click="clickPassword">重置密码
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getPage()">刷新</el-button>
            <template slot="search">
                <basic-search
                        ref="refBasicSearch"
                        :is-advanced-query="true"
                        :model-search-filter="modelSearchFilter"
                        @clickSearchFilter="clickSearchFilter"/>
            </template>
        </basic-handler>
        <basic-table
                ref="refBasicTable"
                :data-table="tableData"
                :columns="columnsTitle"
                :pagination="modelSearchFilter"
                @current-change="currentChangeRow"
                @pagination="getPage"
                @filter-change="filterChangeRow"
                @sort-change="sortChangeRow">
            <template slot-scope="obj" slot="validateStatus">
                {{ formatValidateStatus(obj.scope.row) }}
            </template>
            <template slot-scope="obj" slot="enable">
                {{ formatEnable(obj.scope.row) }}
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
    </basic-container>
</template>

<script>
  import computed from '@coreMixins/computed';
  import methods from '@coreMixins/methods';
  import formatBasic from '@coreMixins/formatBasic';
  import formatEnum from '@coreMixins/formatEnum';
  import { staticDataBasic } from '@coreData/basic';
  import api from '@productsCustorm/api/sysInfo/unitInfo';

  export default {
    name: 'UnitInfoFront',
    mixins: [computed, methods, formatBasic, formatEnum],
    data() {
      return {
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: '',
          enable: 1
        },
        tableData: {
          data: [],
          total: 0
        },
        currentRow: null,
        columnsTitle: [
          {
            text: '审核状态',
            value: 'validateStatus',
            width: 80,
            showOverflowTooltip: true
          },
          {
            text: '启用状态',
            value: 'enable',
            width: 100,
            showOverflowTooltip: true,
            columnKey: 'enable',
            filterMultiple: false
          },
          {
            text: '单位授权码',
            value: 'authCode',
            width: 110,
            showOverflowTooltip: true
          },
          {
            text: '单位名称',
            value: 'name',
            minWidth: 160,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '登录手机号',
            value: 'mobile',
            width: 120
          },
          {
            text: '授权方式',
            value: 'authWay',
            width: 80
          },
          {
            text: '授权模式',
            value: 'authMode',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            showOverflowTooltip: true
          },
          {
            text: '授权截止日期',
            value: 'authEndTime',
            width: 110
          },
          {
            text: '注册时间',
            value: 'crtTime',
            width: 160
          }
        ]
      };
    },
    computed: {
      disabledView: function() {
        return !(this.currentRow && this.currentRow.id && this.tableData.data.length);
      }
    },
    activated() {
      this.getPage();
    },
    created() {
      // 初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData',
        'GetAuthData'
      ]);
      this.$set(this.columnsTitle[1], 'filters', this.dataEnum.static.enable);
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refBasicTable, this.modelSearchFilter, () => {
            this.getPage();
          }
        );
      },
      getPage() {
        api.static.getPage({ ...this.basePage, field: this.modelSearchFilter })
          .then(response => {
            this.tableData.data = response.data.rows;
            this.tableData.total = response.data.total;
            this.$nextTick(function() {
                if (this.$refs.refBasicTable) {
                  this.$refs.refBasicTable.setCurrentRow(this.tableData.data[0]);
                }
              }
            );
          });
      },
      clickAdd(param) {
        this.$store.dispatch('cacheId', '0');
        if (param === 'add') {
          this.$router.push({ name: 'unitInfoDetail', params: { id: 0 }});
        } else {
          this.$router.push({ name: 'unitInfoDetail', params: { id: this.currentRow.id }});
        }
      },
      currentChangeRow(row) {
        if (row) {
          this.currentRow = row;
        }
      },
      clickPassword() {
        this.$confirm(staticDataBasic.info.resetPassword, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.currentRow.id) {
              api.putResetPassword({ ...this.basePage, field: this.currentRow }).then((response) => {
                if (response.status === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
            } else {
              this.getPage();
            }
          })
          .catch(action => {
          });
      },
      filterChangeRow(row) {
        if (row.hasOwnProperty('enable')) {
          this.$set(this.modelSearchFilter, 'enable', row.enable[0]);
          this.getPage();
        }
      },
      sortChangeRow(row) {
        if (row.hasOwnProperty('order')) {
          this.$set(this.modelSearchFilter, 'order', row.order);
          this.getPage();
        }
      }
    }
  };
</script>
