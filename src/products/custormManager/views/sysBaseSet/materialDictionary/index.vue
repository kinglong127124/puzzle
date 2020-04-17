<template>
  <div class="flex-layout">
    <div ref="refSplitPane" :style="{height:heightSplitPane + 'px'}" class="splitPane-container">
      <split-pane :min-percent="30" :default-percent="30" split="vertical">
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button
                v-if="!defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-open"
                plain
                @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button
                v-if="defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-fold"
                plain
                @click="clickDefaultExpandAll">全部折叠
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefreshType()">刷新
              </el-button>
              <basic-search
                ref="refBasicSearchType"
                :model-search-filter="modelSearchFilterType"
                @clickSearchFilter="clickSearchFilterType"/>
            </div>
            <basic-table-tree
              ref="refMaterialDictionaryTableTree"
              :default-expand-all="defaultExpandAll"
              :data="dataMaterialDictionary"
              :columns="columns"
              :filter-node-method="filterNodeMethodType"
              @current-change="rowClick"/>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <basic-handler>
              <el-button
                :disabled="false"
                icon="el-icon-circle-plus-outline"
                plain
                size="small"
                type="primary"
                @click="add">
                新增
              </el-button>
              <el-button
                icon="el-icon-if-save"
                plain
                size="small"
                type="primary"
                @click="save">保存
              </el-button>
              <el-button
                icon="el-icon-delete"
                plain
                size="small"
                type="danger"
                @click="delDic">删除
              </el-button>
              <el-button
                :disabled="disabledAudit"
                icon="el-icon-if-auth"
                plain
                size="small"
                type="primary"
                @click="clickValidateStatus">
                审核
              </el-button>
              <el-button
                :disabled="disabledEnable"
                icon="el-icon-circle-close-outline"
                plain
                size="small"
                type="danger"
                @click="enableDicr(2)">禁用
              </el-button>
              <el-button
                :disabled="disabledEnableTwo"
                icon="el-icon-circle-check-outline"
                plain
                size="small"
                type="success"
                @click="enableDicr(1)">启用
              </el-button>
              <basic-button-more :page-info="pageInfo" :type="['downloadTemplate', 'importExcel']"/>
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
              <template slot="search">
                <basic-search
                  ref="refBasicSearch"
                  :model-search-filter="modelSearchFilter"
                  @clickSearchFilter="clickSearchFilter"/>
              </template>
            </basic-handler>
            <el-table
              ref="refDictionaryTable"
              :data="tableData.data"
              :row-class-name="rowClass"
              border
              fit
              highlight-current-row
              stripe
              height="500"
              @current-change="currentChange">
              <el-table-column align="center" label="序号" type="index" width="50"/>
              <el-table-column
                :formatter="formatValidateStatus"
                align="center"
                label="审核状态"
                prop="validateStatus"
                width="80"/>
              <el-table-column :formatter="formatEnable" align="center" label="启用状态" prop="enable" width="80"/>
              <el-table-column align="center" label="编码" prop="code" class-name="spacing-set" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.code"
                    clearable
                    size="small"
                    placeholder="请输入编码"
                    @change="changeRow(scope.row)"/>
                </template>
              </el-table-column>
              <el-table-column
                label="名称(*)"
                prop="name"
                class-name="spacing-set"
                min-width="200"
                align="left"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form
                    :model="tableData.data[scope.$index]"
                    :ref="'formName' + scope.$index"
                    :rules="rules"
                    :show-message="false">
                    <el-form-item prop="name">
                      <el-input
                        v-model="scope.row.name"
                        clearable
                        size="small"
                        placeholder="请输入名称"
                        @change="changeRow(scope.row)"/>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="规格型号(*)"
                prop="model"
                class-name="spacing-set"
                min-width="200"
                align="left"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form
                    :model="tableData.data[scope.$index]"
                    :ref="'formModel' + scope.$index"
                    :rules="rules"
                    :show-message="false">
                    <el-form-item prop="model">
                      <el-input
                        v-model="scope.row.model"
                        clearable
                        size="small"
                        placeholder="请输入规格型号"
                        @change="changeRow(scope.row)"/>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="计量单位"
                prop="unit"
                class-name="spacing-set"
                min-width="120"
                align="center"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.unit"
                    placeholder="请选择单位"
                    size="small"
                    @change="changeRow(scope.row)">
                    <el-option v-for="item in unit" :key="item.name" :label="item.name" :value="item.name"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="参考单价"
                prop="price"
                class-name="spacing-set"
                min-width="160"
                align="right"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <basic-input
                    :format="formatToThousandsFour"
                    :format-value="formatToMoneyFour"
                    v-model="scope.row.price"
                    :min="0.0000"
                    clearable
                    size="small"
                    price
                    @change="changeRow(scope.row)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="补充说明"
                prop="remark"
                class-name="spacing-set"
                min-width="200"
                align="left"
                header-align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <basic-tooltip :data="scope.row.remark">
                    <el-input
                      v-model="scope.row.remark"
                      clearable
                      size="small"
                      placeholder="请输入补充说明"
                      maxlength="100"
                      @change="changeRow(scope.row)"/>
                  </basic-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="total"
              :page.sync="modelSearchFilter.page"
              :limit.sync="modelSearchFilter.limit"
              @pagination="selectDictionary()"/>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import { validateLength } from '@coreUtils/validate';
import { staticDataBasic } from '@coreData/basic';
import splitPane from 'vue-splitpane';
import formatBasic from '@coreMixins/formatBasic';
import formatEnum from '@coreMixins/formatEnum';
import pagination from '@coreComp/Pagination';
import {
  arrayUniqueSameObj,
  deepCloneByObject
} from '@coreUtils';
import {
  getMaterial,
  getDiction,
  addDictionary,
  auditDic,
  deleteDic,
  enableDic
} from '@productsCustorm/api/sysBaseSet/materialDictionary';
import { getMeasureUnitData } from '@coreApi/common/dataBasic';

export default {
  components: {
    computed, methods, splitPane, pagination
  },
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      pageInfo: {
        productAlias: 'smartpm',
        pageCode: 'materialDictionaryExcel',
        pageName: '物资字典',
        field: {
          excelFileName: '物资字典'
        }
      },
      // 右边数据
      tableData: {
        changedArray: [], // 点新增没有保存
        data: []// 数据库查询数据
      },
      unit: [],
      defaultExpandAll: false,
      columns: [
        {
          expand: true,
          text: '编码',
          value: 'code',
          minWidth: 120,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '名称',
          value: 'name',
          minWidth: 140,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        }
      ],
      dataMaterialDictionary: [],
      expandAll: true,
      listId: 0,
      currentRow: undefined,
      currentType: {},
      total: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: '',
        typeCode: ''
      },
      modelSearchFilterType: {
        fuzzy: '',
        fuzzyKeys: '',
        validateStatus: 1,
        enable: 1
      },
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
        model: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['规格型号', 1, 100]);
            },
            trigger: 'change'
          }
        ]
      },
      heightSplitPane: 500,
      oldJsonString: '',
      setCurrentLine: {}
    };
  },
  computed: {
    disabledAudit() {
      if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledDelete() {
      if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledEnable() {
      if (this.currentRow && this.currentRow.validateStatus === 1) {
        return this.currentRow.enable === 2;
      }
      return true;
    },
    disabledEnableTwo() {
      if (this.currentRow && this.currentRow.validateStatus === 1) {
        return this.currentRow.enable === 1;
      }
      return true;
    }
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData'
    ]);
    this.getUnits();
    this.getMaterialType();
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
      const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
      this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.$refs.refMaterialDictionaryTableTree.toggleExpandedAll(this.defaultExpandAll);
    },
    clickRefreshType() {
      this.resetData();
      this.getMaterialType();
    },
    clickRefresh() {
      this.modelSearchFilter.fuzzy = '';
      this.selectDictionary(this.currentType.code);
    },
    add() {
      if (this.currentType.ifLastLevel != 1) {
        this.$message.warning('请选择【物资类型】末级!');
        return;
      }

      function addRow() {
        const modelDictionary = {
          enable: 1,
          typeCode: this.currentType.code,
          typeId: this.currentType.id,
          typeName: this.currentType.name,
          price: 0.0000,
          validateStatus: 2,
          listId: this.listId++
        };
        this.tableData.data.unshift(modelDictionary);
        this.tableData.changedArray.unshift(modelDictionary);
        this.$refs.refDictionaryTable.setCurrentRow(this.tableData.data[0]);
        console.log(modelDictionary);
      }

      if (this.modelSearchFilter.page == 1) {
        addRow.call(this);
      } else {
        this.selectDictionary(() => {
          this.modelSearchFilter.page = 1;
          addRow.call(this);
        });
      }
    },
    changeRow(row) {
      if (row) {
        this.$set(row, 'listId', this.listId++);
        this.tableData.changedArray.push(row);
      }
    },
    save() {
      let result = true;
      this.tableData.data.some((item, idx) => {
        if (this.$utilsBasic.validateStatus(item)) return true;
        this.$refs['formName' + idx].validate(valid => {
          // return (valid ? null : result = valid);
          if (valid) {
            return null;
          } else {
            return (result = valid);
          }
        });
        this.$refs['formModel' + idx].validate(valid => {
          if (valid) {
            return null;
          } else {
            return (result = valid);
          }
        });
        return !result;
      });
      if (result) {
        const changedArray = arrayUniqueSameObj(this.tableData.changedArray);
        if (changedArray && changedArray.length > 0) {
          addDictionary(changedArray).then((res) => {
            if (res.status == 200) {
              this.selectDictionary();
              this.tableData.changedArray = [];
              this.$message.success(res.message);
            } else {
              this.$message.success(res.message);
            }
          }).catch((err) => {
            this.$message.warning(err.message);
          });
        } else {
          this.$message({ message: staticDataBasic.info.updateEmpty, type: 'warning' });
        }
      } else {
        this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
        return false;
      }
    },
    // 获取字典类别
    getMaterialType() {
      getMaterial(this.modelSearchFilterType).then((res) => {
        if (!this.$utils.isEmpty(res.data)) {
          this.dataMaterialDictionary = res.data;
          this.$nextTick(function() {
            this.$refs.refMaterialDictionaryTableTree.setCurrentRow(this.dataMaterialDictionary[0], true);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
      this.tableData.changedArray = [];
    },
    rowClick(e) {
      if (e) {
        this.currentType = e;
        this.modelSearchFilter.page = 1;
        this.modelSearchFilter.typeCode = e.code;
        this.selectDictionary();
      }
    },
    // 查询字典
    selectDictionary(callback) {
      getDiction(this.modelSearchFilter).then((res) => {
        this.tableData.data = res.data.rows;
        this.total = res.data.total;
        this.$nextTick(function() {
          if (this.$refs.refDictionaryTable) {
            this.$refs.refDictionaryTable.setCurrentRow(this.tableData.data[0]);
          }
        });
        this.resetData();
        if (typeof callback === 'function') {
          callback();
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 重置数据
    resetData() {
      this.tableData.changedArray = [];
      this.currentRow = undefined;
      this.modelSearchFilterType.fuzzy = '';
    },
    getUnits() {
      getMeasureUnitData().then((res) => {
        this.unit = res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    currentChange(row) {
      if (row) {
        this.currentRow = row;
      }
    },
    clickValidateStatus() {
      let result = true;
      this.tableData.data.some((item, idx) => {
        if (this.$utilsBasic.validateStatus(item)) return true;
        this.$refs['formName' + idx].validate(valid => {
          if (valid) {
            return null;
          } else {
            return (result = valid);
          }
        });
        this.$refs['formModel' + idx].validate(valid => {
          if (valid) {
            return null;
          } else {
            return (result = valid);
          }
        });
        return !result;
      });
      if (result) {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const changedArray = arrayUniqueSameObj(this.tableData.changedArray);
          if (changedArray && changedArray.length > 0) {
            addDictionary(changedArray).then((res) => {
              if (!this.$utils.isEmpty(res.data)) {
                // 获得当前行，进行审核
                this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow) => {
                  this.audit(currentRow);
                  return true;
                });
              }
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.audit(this.currentRow);
          }
        }, (cancel) => {
          console.log(cancel);
        });
      } else {
        this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
        return false;
      }
    },
    // 审核
    audit(currentRow) {
      auditDic(deepCloneByObject(currentRow)).then((res) => {
        if (res.status == 200) {
          this.selectDictionary();
          this.$message.success(res.message);
        } else {
          this.$message.warning(res.message);
        }
      }).catch(err => {
        console.log(err.message);
      });
    },
    // 删除
    delDic() {
      this.$confirm(staticDataBasic.info.delete, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$utils.isEmpty(this.currentRow.id)) {
          this.selectDictionary();
        } else {
          deleteDic(this.currentRow.id).then(res => {
            this.selectDictionary();
            this.$message.success(res.message);
          }).catch(err => {
            this.$message.warning(err.message);
          });
        }
      }).catch((cancel) => {
        console.log(cancel);
      });
    },
    // 禁用
    enableDicr(enable) {
      const text = status == 1 ? staticDataBasic.info.enable : staticDataBasic.info.disEnable;
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          id: this.currentRow.id,
          enable: enable
        };
        enableDic(data).then(res => {
          this.currentRow.enable = enable;
          this.$message.success(res.message);
        }).catch(err => {
          this.$message.warning(err.message);
        });
      }).catch(() => {
      });
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (row.id == '') {
        return 'noSave';
      }
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refDictionaryTable, this.modelSearchFilter, () => {
        this.selectDictionary();
      });
    },
    /**
       * 关键字搜索
       */
    clickSearchFilterType() {
      this.$refs.refBasicSearchType.searchFilter(this.$refs.refMaterialDictionaryTableTree, this.modelSearchFilterType, () => {
        try {
          this.$refs.refMaterialDictionaryTableTree.filter(this.modelSearchFilterType.fuzzy);
        } catch (error) {
          console.log(error.message);
        }
      });
    },
    filterNodeMethodType(value, data, node) {
      if (!value) return true;
      if (node.children && node.children.length > 0) return true;
      const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilterType);
      return result;
    },
    validateStatus(obj) {
      return this.$utilsBasic.validateStatus(obj.row);
    }
  }
};
</script>
