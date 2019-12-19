/**
 * 公共混合类：基本列表（新增、保存、审核、删除、启用及禁用、刷新）
 */
import computed from '@core/utils/mixins/computed';
import methods from '@core/utils/mixins/methods';
import formatBasic from '@core/utils/mixins/formatBasic';
import formatEnum from '@core/utils/mixins/formatEnum';
import { arrayUniqueSameObj, deepCloneByObject } from '@core/utils';
import { staticDataBasic } from '@/assets/data/basic';
import api from '@core/api/common';

export default {
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      pageInfo: {},
      tableData: {
        data: [],
        total: 0
      },
      listId: 0,
      currentRow: null, // 当前行
      changedArray: [], // 新增数组
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: ''
      },
      addRowField: {},
      api
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
  created() {
    const fullPathFist = this.$route.fullPath.split('/')[1];
    const productAlias = fullPathFist.substring(0, fullPathFist.length - 7);
    const { name } = this.$route;
    this.$set(this.pageInfo, 'productAlias', productAlias);
    this.$set(this.pageInfo, 'pageCode', name);
    this.$set(this.pageInfo, 'pageName', this.$route.meta.title);
    this.$set(this.pageInfo, 'menuCode', name);
    this.$set(this.pageInfo, 'menuName', this.$route.meta.title);
  },
  methods: {
    // 新增一行加入当前数组
    clickAdd() {
      function addRow() {
        const clickAdd = {
          enable: 1,
          validateStatus: 2,
          listId: this.listId++
        };
        Object.assign(clickAdd, this.addRowField);
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
      const result = true;
      this.tableData.data.some((item, idx) => {
        if (this.$utilsBasic.validateStatus(item)) return true;
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
              api.static.postListTreeAddEntity({ ...this.pageInfo, field: changedArray }).then((response) => {
                if (!this.$utils.isEmpty(response.data)) {
                  // 获得当前行，进行审核
                  this.$utilsBasic.getCurrentRowByListId(response.data, this.currentRow, (currentRow) => {
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
          } else {
            this.tableData.data = [];
            this.tableData.total = 0;
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
