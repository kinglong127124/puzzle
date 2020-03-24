<template>
  <div class="measureUnit-container-list flex-layout">
    <basic-handler>
      <el-button v-if="AddBtnShowFlag" type="primary" size="small" icon="el-icon-plus" plain @click="addRow">新增
      </el-button>

      <el-button v-if="saveBtnShowFlag" type="primary" size="small" icon="el-icon-if-save" plain @click="saveUnit">保存
      </el-button>

      <el-button
        v-if="deleteBtnShowFlag"
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        @click="deleteUnit">删除
      </el-button>

      <el-button
        v-if="auditBtnShowFlag"
        :disabled="auditUnitDisabledFlag"
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        plain
        @click="configMeasureUnit">审核
      </el-button>

      <el-button
        v-if="disabledBtnShowFlag"
        :disabled="disabledBtnDisableFlag"
        size="small"
        type="danger"
        icon="el-icon-circle-close-outline"
        plain
        @click="handleDisabledBtn"
      >禁用
      </el-button>
      <el-button
        v-if="enabledBtnShowFlag"
        :disabled="enabledBtnDisableFlag"
        size="small"
        type="success"
        icon="el-icon-circle-check-outline"
        plain
        @click="handleEnabledBtn"
      >启用
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getMeasureUnit()">刷新</el-button>
      <!--
           <el-button type="primary" >一键初始化</el-button>
        -->
      <template slot="search">
        <basic-search
          ref="refBasicSearch"
          :is-advanced-query="true"
          :model-search-filter="modelSearchFilter"
          @clickSearchFilter="clickSearchFilter"/>
      </template>
    </basic-handler>
    <el-table

      ref="refMeasureUnitlist"
      :data="measureUnitlist"
      :height="unitTableHeight"
      fit
      highlight-current-row
      stripe
      border
      @current-change="currentChangeRow">
      <el-table-column
        label="序号"
        width="50"
        type="index"
        align="center"/>
      <el-table-column
        prop="validateStatus"
        label="审核状态"
        width="80"
        align="center">
        <template slot-scope="scope">
          <span>{{ formatValidateStatus(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="enable"
        label="启用状态"
        width="80"
        align="center">
        <template slot-scope="scope">
          <span>{{ formatEnable(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编码" prop="code" class-name="spacing-set" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.code"
            clearable
            size="small"
            maxlength="4"
            placeholder="请输入编码"
            @change="changeRow(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        class-name="spacing-set"
        label="中文名称(*)"
        align="center">
        <template slot-scope="scope">
          <el-form
            :model="measureUnitlist[scope.$index]"
            :ref="'formName' + scope.$index"
            :rules="rules"
            :show-message="false">
            <el-form-item prop="name">
              <el-input
                v-model="scope.row.name"
                clearable
                size="small"
                placeholder="请输入中文名称"
                @change="changeRow(scope.row)"/>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        class-name="spacing-set"
        prop="englishName"
        label="英文名称"
        align="center">
        <template slot-scope="scope">
          <el-form
            :model="measureUnitlist[scope.$index]"
            :ref="'formEnglishName' + scope.$index"
            :rules="rules"
            :show-message="false">
            <el-form-item prop="englishName">
              <el-input
                v-model="scope.row.englishName"
                clearable
                size="small"
                placeholder="请输入英文名称"
                @change="changeRow(scope.row)"/>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        class-name="spacing-set"
        prop="reserve"
        label="补充说明"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.reserve"
            clearable
            size="small"
            placeholder="请输入补充说明"
            maxlength="100"
            @change="changeRow(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="modelSearchFilter.page"
      :limit.sync="modelSearchFilter.limit"
      @pagination="getMeasureUnit"/>
  </div>
</template>

<script>
import pagination from '@core/components/Pagination';
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import formatEnum from '@coreMixins/formatEnum';
import { arrayUniqueSameObj, deepCloneByObject } from '@coreUtils/index';
import { validateLength } from '@coreUtils/validate';
import { staticDataBasic } from '@coreData/basic';

export default {
  name: 'MeasureUnit',
  components: {
    pagination
  },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      AddBtnShowFlag: true, // 待系统菜单配置后更改
      saveBtnShowFlag: true,
      deleteBtnShowFlag: true,
      auditBtnShowFlag: true,
      disabledBtnShowFlag: true,
      enabledBtnShowFlag: true,
      total: 0,
      listId: 0,
      currentRow: undefined, // 当前行
      changedArray: [], // 新增数组
      measureUnitlist: [], // 列表
      unitid: '', // 选中项ID
      addindex: '',
      unitTableHeight: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: ''
      },
      rules: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['中文名称', 1, 20]);
            },
            trigger: 'change'
          }
        ],
        englishName: [
          {
            required: false,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['英文名称', 1, 20]);
            },
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    deleteUnitDisabledFlag: function() {
      if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    auditUnitDisabledFlag: function() {
      if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledBtnDisableFlag: function() {
      if (this.currentRow && this.currentRow.enable != '' && this.currentRow.enable != 2 && this.currentRow.validateStatus != 2) {
        return false;
      } else {
        return true;
      }
    },
    enabledBtnDisableFlag: function() {
      if (this.currentRow && this.currentRow.enable != '' && this.currentRow.enable != 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    screenHeight(innerHeight) {
      const offsetTopDistanceTable = this.$refs.refMeasureUnitlist.$el.getBoundingClientRect().top;
      this.unitTableHeight = innerHeight - offsetTopDistanceTable - 55;
    }
  },
  mounted() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData'
    ]);
    this.getMeasureUnit();

    this.$nextTick(() => {
      const offsetTopDistanceTable = this.$refs.refMeasureUnitlist.$el.getBoundingClientRect().top;
      this.unitTableHeight = this.getInnerHeight() - offsetTopDistanceTable - 55;
    });
  },
  methods: {
    // 新增一行计量单位加入当前数组
    addRow() {
      function addRow() {
        const addUnit = {
          enable: 1,
          inputPersonId: 0,
          validateStatus: 2,
          listId: this.listId++
        };
        this.measureUnitlist.unshift(addUnit);
        this.changedArray.unshift(addUnit);
        this.$refs.refMeasureUnitlist.setCurrentRow(this.measureUnitlist[0]);
      }

      if (this.modelSearchFilter.page == 1) {
        addRow.call(this);
      } else {
        this.getMeasureUnit(() => {
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
    // 判断是否修改，修改除非方法加入提交数组
    blurUnit(row) {
      this.changedArray.forEach(x => {
        if (row.id && row.id != x.id) {
          this.changedArray.push(row);
        }
      });
      console.log(this.changedArray);
    },
    // 保存方法
    saveUnit() {
      return this.validateAfter(() => {
        const changedArray = arrayUniqueSameObj(this.changedArray);
        if (changedArray && changedArray.length > 0) {
          this.addMeasureUnit(changedArray);
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
      this.measureUnitlist.some((item, idx) => {
        this.$refs['formName' + idx].validate(valid => {
          valid ? null : result = valid;
        });
        this.$refs['formEnglishName' + idx].validate(valid => { valid ? null : result = valid; });
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
    addMeasureUnit(arr) {
      this.$store.dispatch('AddMeasureUnit', arr).then((response) => {
        if (response.status === 200) {
          this.getMeasureUnit();
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      });
    },
    // 删除计量单位
    deleteUnit() {
      if (this.isSelectedRow(this.currentRow)) {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.currentRow.id) {
            this.$store.dispatch('DeleteMeasureUnit', this.currentRow.id).then((response) => {
              this.getMeasureUnit();
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.getMeasureUnit();
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    // 获取当前行
    currentChangeRow(row) {
      if (row) {
        this.currentRow = row;
      }
    },

    // 审核计量单位
    configMeasureUnit() {
      const currentRow = this.currentRow;
      return this.validateAfter(() => {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const changedArray = arrayUniqueSameObj(this.changedArray);
          if (changedArray && changedArray.length > 0) {
            this.$store.dispatch('AddMeasureUnit', changedArray).then((res) => {
              if (!this.$utils.isEmpty(res.data)) {
                // 获得当前行，进行审核
                this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow) => {
                  this.auditMeasureUnit(currentRow);
                  return true;
                });
              }
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.auditMeasureUnit(currentRow);
          }
        }).catch((error) => {
          console.log(error);
        });
      });
    },
    /**
       * 审核
       * */
    auditMeasureUnit: function(currentRow) {
      return this.$store.dispatch('ConfigMeasureUnit', currentRow)
        .then((response) => {
          if (response.status === 200) {
            this.getMeasureUnit();
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
    /**
       * 启用
       * */
    handleEnabledBtn() {
      this.$confirm('亲，您是否确定启用当前数据，启用后数据即可使用！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.enableOrDisableUnits(1).then(() => {
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    /**
       * 禁用
       * */
    handleDisabledBtn() {
      this.$confirm('亲，您是否确定禁用当前数据，禁用后数据不能使用！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.enableOrDisableUnits(2).then(() => {
        });
      }).catch((error) => {
        console.log(error);
      });
    },

    /**
       * 是否启用或禁用
       * */
    enableOrDisableUnits(enable) {
      const currentRowTypeObj = deepCloneByObject(this.currentRow);
      currentRowTypeObj.enable = enable;
      return this.$store.dispatch('PutSysConfigUnits', currentRowTypeObj)
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
        }).catch((error) => {
          console.log(error);
        });
    },
    // 获取计量单位列表
    getMeasureUnit(callback) {
      return this.$store.dispatch('GetMeasureUnit', this.modelSearchFilter).then((response) => {
        if (!this.$utils.isEmpty(response.data.rows)) {
          this.measureUnitlist = response.data.rows;
          this.total = response.data.total;
          this.$nextTick(function() {
            if (this.$refs.refMeasureUnitlist) {
              this.$refs.refMeasureUnitlist.setCurrentRow(this.measureUnitlist[0]);
            }
          });
          this.resetData();
          if (typeof callback === 'function') {
            callback();
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refMeasureUnitlist, this.modelSearchFilter, () => {
        this.getMeasureUnit();
      });
    },
    // 重置数据
    resetData() {
      this.changedArray = [];
      this.currentRow = undefined;
    }
  }
};
</script>
