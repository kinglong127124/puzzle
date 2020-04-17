<template>
  <basic-container class="handler-table">
    <basic-handler>
      <el-button v-if="AddBtnShowFlag" type="primary" size="small" icon="el-icon-plus" plain @click="clickAreaAdd">新增
      </el-button>

      <el-button v-if="saveBtnShowFlag" type="primary" size="small" icon="el-icon-if-save" plain @click="clickAreaSave">
        保存
      </el-button>

      <el-button
        v-if="deleteBtnShowFlag"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="clickAreaDelete">删除
      </el-button>
      <el-button
        v-if="auditBtnShowFlag"
        :disabled="auditBtnDisabledFlag"
        delete-btn-disabled-flag
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        plain
        @click="clickAreaAudit">审核
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
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getArealist()">刷新</el-button>
      <template slot="search">
        <basic-search
          ref="refBasicSearch"
          :is-advanced-query="true"
          :model-search-filter="modelSearchFilter"
          @clickSearchFilter="clickSearchFilter"/>
      </template>
    </basic-handler>
    <basic-table
      ref="refAreaTable"
      :data-table="dataArea"
      :columns="columns"
      :pagination="modelSearchFilter"
      @current-change="currentChangeRow"
      @pagination="getArealist">
      <template slot-scope="obj" slot="code">
        <el-input
          v-model="obj.scope.row.code"
          clearable
          size="small"
          placeholder="请输入编码"
          maxlength="4"
          @change="changeRow(obj.scope.row)"/>
      </template>
      <template slot-scope="obj" slot="validateStatus">
        {{ formatValidateStatus(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="enable">
        {{ formatEnable(obj.scope.row) }}
      </template>
      <template slot-scope="obj" slot="name">
        <el-form
          :model="dataArea.data[obj.scope.$index]"
          :ref="'formName' + obj.scope.$index"
          :rules="rules"
          :show-message="false">
          <el-form-item prop="name">
            <el-input
              v-model="obj.scope.row.name"
              clearable
              size="small"
              placeholder="请输入名称"
              @change="changeRow(obj.scope.row)"/>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="obj" slot="province">
        <el-form
          :model="dataArea.data[obj.scope.$index]"
          :ref="'formProvince' + obj.scope.$index"
          :rules="rules"
          :show-message="false">
          <el-form-item prop="province">
            <el-input
              v-model="obj.scope.row.province"
              clearable
              size="small"
              placeholder="请输入包括省市"
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
  </basic-container>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import { arrayUniqueSameObj, deepCloneByObject } from '@coreUtils/index';
import { validateLength } from '@coreUtils/validate';
import formatEnum from '@coreMixins/formatEnum';
import { staticDataBasic } from '@coreData/basic';

export default {
  name: 'AreaManager',
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      AddBtnShowFlag: true, // 待系统菜单配置后更改
      saveBtnShowFlag: true,
      deleteBtnShowFlag: true,
      auditBtnShowFlag: true,
      disabledBtnShowFlag: true,
      enabledBtnShowFlag: true,
      dataArea: {
        data: [],
        total: 0
      },
      listId: 0,
      currentRow: null, // 业务区域当前行
      areaChangedArray: [], // 业务区域新增数组
      rules: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['名称', 1, 100]);
            },
            trigger: 'change'
          }
        ],
        province: [
          {
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['包括省市', 1, 200]);
            },
            trigger: 'change'
          }
        ]
      },
      areaNum: '',
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: ''
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
          text: '编码',
          value: 'code',
          minWidth: 100,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true,
          className: 'spacing-set'
        },
        {
          text: '名称',
          value: 'name',
          minWidth: 100,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true,
          className: 'spacing-set'
        },
        {
          text: '包括省市',
          value: 'province',
          minWidth: 200,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true,
          className: 'spacing-set'
        },
        {
          text: '补充说明',
          value: 'reserve',
          minWidth: 100,
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
    this.getArealist();
  },
  methods: {
    // 重置数据
    resetData() {
      this.areaChangedArray = [];
      this.currentRow = undefined;
    },
    // 新增一行业务区域加入当前数组
    clickAreaAdd() {
      function addRow() {
        const clickAreaAdd = {
          enable: 1,
          validateStatus: 2,
          listId: this.listId++
        };
        this.dataArea.data.unshift(clickAreaAdd);
        this.areaChangedArray.unshift(clickAreaAdd);
        this.$refs.refAreaTable.setCurrentRow(this.dataArea.data[0]);
      }

      if (this.modelSearchFilter.page == 1) {
        addRow.call(this);
      } else {
        this.getArealist(() => {
          this.modelSearchFilter.page = 1;
          addRow.call(this);
        });
      }
    },
    changeRow(row) {
      if (row) {
        this.$set(row, 'listId', this.listId++);
        this.areaChangedArray.push(row);
      }
    },
    // 业务区域保存方法
    clickAreaSave() {
      return this.validateAfter(() => {
        const changedArray = arrayUniqueSameObj(this.areaChangedArray);
        if (changedArray && changedArray.length > 0) {
          this.addAreaList(changedArray);
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
      this.dataArea.data.some((item, idx) => {
        this.$refs['formName' + idx].validate(valid => {
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
    // 业务区域批量新增或者修改
    addAreaList(arr) {
      this.$store.dispatch('AddArea', arr).then((response) => {
        if (response.status === 200) {
          this.getArealist();
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
    // 删除业务区域
    clickAreaDelete() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.currentRow.id) {
            this.$store.dispatch('DeleteArea', this.currentRow.id).then((response) => {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getArealist();
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.getArealist();
          }
        })
        .catch(action => {
          console.log(action);
        });
    },
    // 业务区域获取当前行
    currentChangeRow(row) {
      if (row) {
        this.currentRow = row;
      }
    },
    // 审核业务区域
    clickAreaAudit() {
      return this.validateAfter(() => {
        const currentRow = this.currentRow;
        this.$confirm(staticDataBasic.info.audit, '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const changedArray = arrayUniqueSameObj(this.areaChangedArray);
            if (changedArray && changedArray.length > 0) {
              this.$store.dispatch('AddArea', changedArray).then((res) => {
                if (!this.$utils.isEmpty(res.data)) {
                  // 获得当前行，进行审核
                  this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow) => {
                    this.auditArea(currentRow);
                    return true;
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
            } else {
              this.auditArea(currentRow);
            }
          }).catch((cancel) => {
            console.log(cancel);
          });
      });
    },
    auditArea: function(currentRow) {
      return this.$store.dispatch('ConfigArea', currentRow)
        .then((response) => {
          if (response.status === 200) {
            this.getArealist();
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
        this.enableOrDisableArea(1).then(() => {
          // this.getArealist()
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
        this.enableOrDisableArea(2).then(() => {
          // .this.getArealist()
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    enableOrDisableArea(enable) {
      const currentRowObj = deepCloneByObject(this.currentRow);
      currentRowObj.enable = enable;
      return this.$store.dispatch('PutEnableOrDisableArea', currentRowObj)
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
    // 获取业务区域列表
    getArealist(callback) {
      this.$store.dispatch('GetArea', this.modelSearchFilter).then((response) => {
        this.dataArea.data = response.data.rows;
        this.dataArea.total = response.data.total;
        this.resetData();
        if (typeof callback === 'function') {
          callback();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 自动定位业务区域光标
    setArea() {
      if (this.areaNum) {
        this.$refs.refAreaTable.setCurrentRow(this.dataArea.data[this.areaNum]);
      }
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refAreaTable, this.modelSearchFilter, () => {
        this.getArealist();
      });
    }
  }
};
</script>
