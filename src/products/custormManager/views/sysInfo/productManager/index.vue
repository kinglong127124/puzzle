<template>
    <basic-container class="handler-table">
        <basic-handler>
            <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAdd">新增
            </el-button>

            <el-button type="primary" size="small" icon="el-icon-if-save" plain @click="clickSave">
                保存
            </el-button>

            <el-button
                    :disabled="disabledDelete"
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    plain
                    @click="clickDelete">删除
            </el-button>
            <el-button
                    :disabled="disabledAudit"
                    disabled-delete
                    type="primary"
                    size="small"
                    icon="el-icon-if-auth"
                    plain
                    @click="clickAudit">审核
            </el-button>

            <el-button
                    :disabled="disabledDisable"
                    size="small"
                    type="danger"
                    icon="el-icon-circle-close"
                    plain
                    @click="clickDisabledBtn"
            >禁用
            </el-button>
            <el-button
                    :disabled="disabledEnabled"
                    size="small"
                    type="success"
                    icon="el-icon-circle-check"
                    plain
                    @click="clickEnabledBtn"
            >启用
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
                @pagination="getPage">
            <template slot-scope="obj" slot="validateStatus">
                {{ formatValidateStatus(obj.scope.row) }}
            </template>
            <template slot-scope="obj" slot="enable">
                {{ formatEnable(obj.scope.row) }}
            </template>
            <template slot-scope="obj" slot="name">
                <el-form
                        :model="tableData.data[obj.scope.$index]"
                        :ref="'formName' + obj.scope.$index"
                        :rules="rules"
                        :show-message="false">
                    <el-form-item prop="name">
                        <el-input
                                v-model="obj.scope.row.name"
                                :maxlength="50"
                                clearable
                                size="small"
                                placeholder="请输入名称"
                                @change="changeRow(obj.scope.row)"/>
                    </el-form-item>
                </el-form>
            </template>
            <template slot-scope="obj" slot="alias">
                <span v-if="validateStatus(obj.scope.row)">{{ obj.scope.row.alias }}</span>
                <el-form
                        v-else
                        :model="tableData.data[obj.scope.$index]"
                        :ref="'formAlias' + obj.scope.$index"
                        :rules="rules"
                        :show-message="false">
                    <el-form-item prop="alias">
                        <el-input
                                :disabled="validateStatus(obj.scope.row)"
                                v-model="obj.scope.row.alias"
                                :maxlength="20"
                                clearable
                                size="small"
                                placeholder="请输入简称"
                                @change="changeRow(obj.scope.row)"/>
                    </el-form-item>
                </el-form>
            </template>
            <template slot-scope="obj" slot="version">
                <span v-if="validateStatus(obj.scope.row)">{{ obj.scope.row.version }}</span>
                <el-form
                        v-else
                        :model="tableData.data[obj.scope.$index]"
                        :ref="'formVersion' + obj.scope.$index"
                        :rules="rules"
                        :show-message="false">
                    <el-form-item prop="version">
                        <el-input
                                :disabled="validateStatus(obj.scope.row)"
                                v-model="obj.scope.row.version"
                                :maxlength="20"
                                clearable
                                size="small"
                                placeholder="请输入版本"
                                @change="changeRow(obj.scope.row)"/>
                    </el-form-item>
                </el-form>
            </template>
            <template slot-scope="obj" slot="mark">
                <span v-if="validateStatus(obj.scope.row)">{{ obj.scope.row.mark }}</span>
                <el-form
                        v-else
                        :model="tableData.data[obj.scope.$index]"
                        :ref="'formMark' + obj.scope.$index"
                        :rules="rules"
                        :show-message="false">
                    <el-form-item prop="mark">
                        <el-input
                                :disabled="validateStatus(obj.scope.row)"
                                v-model="obj.scope.row.mark"
                                :maxlength="20"
                                clearable
                                size="small"
                                placeholder="请输入标识"
                                @change="changeRow(obj.scope.row)"/>
                    </el-form-item>
                </el-form>
            </template>
            <template slot-scope="obj" slot="explains">
                <el-input
                        v-model="obj.scope.row.explains"
                        :maxlength="100"
                        clearable
                        size="small"
                        placeholder="请输入补充说明"
                        @change="changeRow(obj.scope.row)"/>
            </template>
        </basic-table>
    </basic-container>
</template>

<script>
  import computed from '@core/utils/mixins/computed';
  import methods from '@core/utils/mixins/methods';
  import { arrayUniqueSameObj, deepCloneByObject } from '@core/utils';
  import { validateLength } from '@core/utils/validate';
  import formatEnum from '@core/utils/mixins/formatEnum';
  import { staticDataBasic } from '@core/assets/data/basic';
  import api from '@core/api/common';
  export default {
    name: 'ProductManagerIndex',
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        pageInfo: {
          productAlias: 'smartpm',
          pageCode: 'sysCrmProductInfo',
          pageName: '产品管理'
        },
        tableData: {
          data: [],
          total: 0
        },
        listId: 0,
        currentRow: null, // 当前行
        changedArray: [], // 新增数组
        rules: {
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['名称', 1, 50]);
              },
              trigger: 'change'
            }
          ],
          alias: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['简称', 1, 20]);
              },
              trigger: 'change'
            }
          ],
          version: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['版本', 1, 20]);
              },
              trigger: 'change'
            }
          ],
          mark: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['标识', 1, 20]);
              },
              trigger: 'change'
            }
          ]
        },
        monthNum: '',
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: ''
        },
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
            width: 80,
            showOverflowTooltip: true
          },
          {
            text: '编码',
            value: 'code',
            width: 130,
            showOverflowTooltip: true
          },
          {
            text: '名称(*)',
            value: 'name',
            width: 160,
            align: 'left',
            headerAlign: 'center',
            className: 'spacing-set'
          },
          {
            text: '简称(*)',
            value: 'alias',
            width: 120,
            align: 'left',
            headerAlign: 'center',
            className: 'spacing-set'
          },
          {
            text: '版本(*)',
            value: 'version',
            width: 120,
            align: 'left',
            headerAlign: 'center',
            className: 'spacing-set'
          },
          {
            text: '标识(*)',
            value: 'mark',
            width: 120,
            align: 'left',
            headerAlign: 'center',
            className: 'spacing-set'
          },
          {
            text: '补充说明',
            value: 'explains',
            minWidth: 200,
            align: 'left',
            headerAlign: 'center',
            showOverflowTooltip: true,
            className: 'spacing-set'
          }
        ]
      };
    },
    computed: {
      disabledDelete: function() {
        if (this.currentRow && this.currentRow.enable == 1 && this.currentRow.validateStatus != 1) {
          return false;
        } else {
          return true;
        }
      },
      disabledAudit: function() {
        if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
          return false;
        } else {
          return true;
        }
      },
      disabledDisable: function() {
        if (this.currentRow && this.currentRow.validateStatus === 1) {
          return this.currentRow.enable === 2;
        }
        return true;
      },
      disabledEnabled: function() {
        if (this.currentRow && this.currentRow.validateStatus === 1) {
          return this.currentRow.enable === 1;
        }
        return true;
      }

    },
    mounted() {
      // 初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData'
      ]);
      console.log(this.$route);
      this.getPage();
    },
    methods: {
      // 新增一行加入当前数组
      clickAdd() {
        function addRow() {
          const clickAdd = {
            enable: 1,
            validateStatus: 2,
            type: 1,
            listId: this.listId++
          };
          this.tableData.data.unshift(clickAdd);
          this.changedArray.unshift(clickAdd);
          this.$refs.refBasicTable.setCurrentRow(this.tableData.data[0]);
        }
        if (this.modelSearchFilter.page == 1) {
          addRow.call(this);
        } else {
          this.getPage(() => {
            this.modelSearchFilter.page = 1;
            addRow.call(this);
          });
        }
      },
      changeRow(row) {
        if (row) {
          this.$set(row, 'listId', this.listId++);
          this.changedArray.push(row);
        }
      },
      // 保存方法
      clickSave() {
        return this.validateAfter(() => {
          const changedArray = arrayUniqueSameObj(this.changedArray);
          if (changedArray && changedArray.length > 0) {
            this.addObj(changedArray);
          } else {
            this.$message({ message: staticDataBasic.info.updateEmpty, type: 'warning' });
          }
        });
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true;
        this.tableData.data.some((item, idx) => {
          if (this.$utilsBasic.validateStatus(item)) return true;
          this.$refs['formName' + idx].validate(valid => { valid ? null : result = valid; });
          this.$refs['formAlias' + idx].validate(valid => { valid ? null : result = valid; });
          this.$refs['formVersion' + idx].validate(valid => { valid ? null : result = valid; });
          this.$refs['formMark' + idx].validate(valid => { valid ? null : result = valid; });
          return !result;
        });
        if (result) {
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
          return false;
        }
      },
      // 批量新增或者修改
      addObj(arr) {
        api.static.postListTreeAddEntity({ ...this.pageInfo, field: arr }).then((response) => {
          if (response.status === 200) {
            this.getPage();
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
      },
      // 删除
      clickDelete() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.currentRow.id) {
              api.static.deleteObj({ ...this.pageInfo, field: this.currentRow }).then((response) => {
                if (response.status === 200) {
                  this.getPage();
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
      // 获取当前行
      currentChangeRow(row) {
        if (row) {
          this.currentRow = row;
        }
      },
      // 审核
      clickAudit() {
        return this.validateAfter(() => {
          const currentRow = this.currentRow;
          this.$confirm(staticDataBasic.info.audit, '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const changedArray = arrayUniqueSameObj(this.changedArray);
              if (changedArray && changedArray.length > 0) {
                api.static.postListTreeAddEntity({ ...this.pageInfo, field: changedArray }).then((res) => {
                  if (!this.$utils.isEmpty(res.data)) {
                    // 获得当前行，进行审核
                    this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow) => {
                      this.auditObj(currentRow);
                      return true;
                    });
                  }
                }).catch((error) => {
                  console.log(error);
                });
              } else {
                this.auditObj(currentRow);
              }
            }).catch((cancel) => {
            console.log(cancel);
          });
        });
      },
      auditObj: function(currentRow) {
        return api.static.putObjAudit({ ...this.pageInfo, field: currentRow })
          .then((response) => {
            if (response.status === 200) {
              this.getPage();
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
          });
      },
      clickEnabledBtn() {
        this.$confirm(staticDataBasic.info.enable, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableOrDisable(1).then(() => {
          });
        }).catch((error) => {
          console.log(error);
        });
      },
      clickDisabledBtn() {
        this.$confirm(staticDataBasic.info.disEnable, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableOrDisable(2).then(() => {
          });
        }).catch((error) => {
          console.log(error);
        });
      },

      enableOrDisable(enabled) {
        const currentRowObj = deepCloneByObject(this.currentRow);
        currentRowObj.enable = enabled;
        return api.static.putObjEnable({ ...this.pageInfo, field: currentRowObj })
          .then((response) => {
            if (response.status === 200) {
              this.currentRow.enable = enabled;
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
          });
      },
      // 获取列表
      getPage(callback) {
        api.static.getPage({ ...this.pageInfo, field: this.modelSearchFilter }).then((response) => {
          this.tableData.data = response.data.rows;
          this.tableData.total = response.data.total;
          this.$nextTick(function() {
            if (this.$refs.refBasicTable && this.tableData.total > 0) {
              this.$refs.refBasicTable.setCurrentRow(this.tableData.data[0]);
            }
          });
          this.resetData();
          if (typeof callback === 'function') {
            callback();
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refBasicTable, this.modelSearchFilter, () => {
          this.getPage();
        });
      },
      // 重置数据
      resetData() {
        this.changedArray = [];
        this.currentRow = undefined;
      },
      validateStatus(row) {
        return this.$utilsBasic.validateStatus(row);
      }
    }
  };
</script>
