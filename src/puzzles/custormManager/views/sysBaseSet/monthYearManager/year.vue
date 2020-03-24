<template>
  <div class="right-container">
    <basic-handler>
      <el-button v-if="AddBtnShowFlag" type="primary" size="small" icon="el-icon-plus" plain @click="clickYearAdd">新增
      </el-button>

      <el-button v-if="saveBtnShowFlag" type="primary" size="small" icon="el-icon-if-save" plain @click="clickYearSave">
        保存
      </el-button>

      <el-button
        v-if="deleteBtnShowFlag"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="clickYearDelete">删除
      </el-button>
      <el-button
        v-if="auditBtnShowFlag"
        :disabled="auditBtnDisabledFlag"
        delete-btn-disabled-flag
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        plain
        @click="clickYearAudit">审核
      </el-button>

      <el-button
        v-if="disabledBtnShowFlag"
        :disabled="disabledBtnDisableFlag"
        size="small"
        type="danger"
        icon="el-icon-circle-close-outline"
        plain
        @click="clickDisabledBtn"
      >禁用
      </el-button>
      <el-button
        v-if="enabledBtnShowFlag"
        :disabled="enabledBtnDisableFlag"
        size="small"
        type="success"
        icon="el-icon-circle-check-outline"
        plain
        @click="clickEnabledBtn"
      >启用
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getYearlist()">刷新</el-button>
    </basic-handler>
    <basic-table
      ref="refYearTable"
      :data-table="dataYear"
      :columns="columns"
      :pagination="modelSearchFilterYear"
      @current-change="currentChangeRow"
      @pagination="getYearlist">
      <template slot-scope="obj" slot="validateStatus">
        {{ formatValidateStatus(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="enable">
        {{ formatEnable(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="year">
        <el-form
          :model="dataYear.data[obj.scope.$index]"
          :ref="'formYear' + obj.scope.$index"
          :rules="rules"
          :show-message="false">
          <el-form-item prop="year">
            <el-input
              v-model="obj.scope.row.year"
              size="small"
              type="number"
              placeholder="请输入会计年度，4位数字"
              @change="changeRow(obj.scope.row)"/>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="obj" slot="reserve">
        <el-input
          v-model="obj.scope.row.reserve"
          clearable
          size="small"
          placeholder="请输入补充说明"
          @change="changeRow(obj.scope.row)"/>
      </template>
    </basic-table>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import { arrayUniqueSameObj, deepCloneByObject } from '@coreUtils/index';
import { validateLength } from '@coreUtils/validate';
import formatEnum from '@coreMixins/formatEnum';
import { staticDataBasic } from '@coreData/basic';

export default {
  name: 'YearManager',
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      AddBtnShowFlag: true, // 待系统菜单配置后更改
      saveBtnShowFlag: true,
      deleteBtnShowFlag: true,
      auditBtnShowFlag: true,
      disabledBtnShowFlag: true,
      enabledBtnShowFlag: true,
      dataYear: {
        data: [],
        total: 0
      },
      listIdYear: 0,
      currentRow: undefined, // 年份当前行
      yearChangedArray: [], // 年份新增数组
      rules: {
        year: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['会计年度', 4, 4]);
            },
            trigger: 'change'
          }
        ]
      },
      yearNum: '',
      modelSearchFilterYear: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          text: '审核状态',
          value: 'validateStatus',
          width: '80',
          align: 'center'
        },
        {
          text: '启用状态',
          value: 'enable',
          width: '80',
          align: 'center'
        },
        {
          text: '会计年度',
          value: 'year',
          minWidth: 100,
          align: 'left',
          headerAlign: 'center',
          className: 'spacing-set'
        },
        {
          text: '补充说明',
          value: 'reserve',
          minWidth: 140,
          align: 'left',
          headerAlign: 'center',
          className: 'spacing-set'
        }
      ]
    };
  },
  computed: {
    deleteBtnDisabledFlag: function() {
      if (this.currentRow && this.currentRow.enable == 1 && this.currentRow.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    auditBtnDisabledFlag: function() {
      if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledBtnDisableFlag: function() {
      if (this.currentRow && this.currentRow.validateStatus === 1) {
        return this.currentRow.enable === 2;
      }
      return true;
    },
    enabledBtnDisableFlag: function() {
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

    this.getYearlist();
  },
  methods: {
    // 新增一行年份加入当前数组
    clickYearAdd() {
      function addRowYear() {
        const clickYearAdd = {
          enable: 1,
          validateStatus: 2,
          listId: this.listIdYear++
        };
        this.dataYear.data.unshift(clickYearAdd);
        this.yearChangedArray.unshift(clickYearAdd);
        this.$refs.refYearTable.setCurrentRow(this.dataYear.data[0]);
      }

      if (this.modelSearchFilterYear.page == 1) {
        addRowYear.call(this);
      } else {
        this.getYearlist(() => {
          this.modelSearchFilterYear.page = 1;
          addRowYear.call(this);
        });
      }
    },
    changeRow(row) {
      if (row) {
        this.$set(row, 'listId', this.listIdYear++);
        this.yearChangedArray.push(row);
      }
    },
    // 年份保存方法
    clickYearSave() {
      return this.validateAfter(() => {
        const changedArray = arrayUniqueSameObj(this.yearChangedArray);
        if (changedArray && changedArray.length > 0) {
          this.addYearList(changedArray);
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
      this.dataYear.data.some((item, idx) => {
        this.$refs['formYear' + idx].validate(valid => {
          valid ? null : result = valid;
        });
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
    // 年份批量新增或者修改
    addYearList(arr) {
      this.$store.dispatch('AddAccountancyYear', arr).then((response) => {
        if (response.status === 200) {
          this.getYearlist();
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
    // 删除年份
    clickYearDelete() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.currentRow.id) {
            this.$store.dispatch('DeleteAccountancyYear', this.currentRow.id).then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getYearlist();
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
            this.getYearlist();
          }
        })
        .catch(action => {
        });
    },
    // 年份获取当前行
    currentChangeRow(row) {
      if (row) {
        this.currentRow = row;
      }
    },
    // 审核年份
    clickYearAudit() {
      return this.validateAfter(() => {
        const currentRow = this.currentRow;
        this.$confirm(staticDataBasic.info.audit, '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const changedArray = arrayUniqueSameObj(this.yearChangedArray);
            if (changedArray && changedArray.length > 0) {
              this.$store.dispatch('AddAccountancyYear', changedArray).then((res) => {
                if (!this.$utils.isEmpty(res.data)) {
                  // 获得当前行，进行审核
                  this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow) => {
                    this.auditYear(currentRow);
                    return true;
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
            } else {
              this.auditYear(currentRow);
            }
          }).catch((cancel) => {
            console.log(cancel);
          });
      });
    },
    auditYear: function(currentRow) {
      return this.$store.dispatch('ConfigAccountancyYear', currentRow)
        .then((response) => {
          if (response.status === 200) {
            this.getYearlist();
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
        this.enableOrDisableYear(1).then(() => {
          // this.getYearlist()
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
        this.enableOrDisableYear(2).then(() => {
          // .this.getYearlist()
        });
      }).catch((error) => {
        console.log(error);
      });
    },

    enableOrDisableYear(enable) {
      const currentRowObj = deepCloneByObject(this.currentRow);
      currentRowObj.enable = enable;
      return this.$store.dispatch('EnableOrDisabledYear', currentRowObj)
        .then((response) => {
          if (response.status === 200) {
            this.currentRow.enable = enable;
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
    // 获取年份列表
    getYearlist(callback) {
      // this.yearNum = this.dataYear.data.indexOf(this.currentRow);
      this.$store.dispatch('GetAccountancyYear', this.modelSearchFilterYear).then((response) => {
        this.dataYear.data = response.data.rows;
        this.dataYear.total = response.data.total;
        this.$nextTick(function() {
          if (this.$refs.refYearTable) {
            this.$refs.refYearTable.setCurrentRow(this.dataYear.data[0]);
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
    // 重置数据
    resetData() {
      this.yearChangedArray = [];
      this.currentRow = undefined;
    }
  }
};
</script>
