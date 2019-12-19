/**
 * 公共混合类：详情页面
 */

import computed from '@core/utils/mixins/computed';
import methods from '@core/utils/mixins/methods';
import formatBasic from '@core/utils/mixins/formatBasic';
import formatEnum from '@core/utils/mixins/formatEnum';
import api from '@core/api/common';
import { staticDataBasic } from '@core/assets/data/basic';
import { staticDataEnum } from '@core/assets/data/enum';
import { deepCloneByObject } from '@core/utils';

export default {
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      pageInfo: {},
      modelForm: {}
    };
  },
  computed: {
    disabledAudit() {
      if (this.modelForm.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    disabledDelete() {
      if (
        this.modelForm.id &&
        this.modelForm.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    disabledAuditTwo() {
      if (
        this.modelForm.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    disabledDisenable: function() {
      if (this.modelForm && this.modelForm.validateStatus == 1 && this.modelForm.enable == 1) {
        return false;
      }
      return true;
    },
    disabledEnable: function() {
      if (this.modelForm && this.modelForm.validateStatus == 1 && this.modelForm.enable == 2) {
        return false;
      }
      return true;
    }
  },
  deactivated() {
    this.$store.dispatch('cacheId', undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(this, (resultInfo) => {
      this.clickAdd();
    }, (id) => {
      this.modelForm.id = id;
      this.getObjDetail();
    });
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData'
    ]);
    this.$store.dispatch('cacheId', '0');// 刷新
  },
  methods: {
    // 获取详情
    getObjDetail() {
      if (this.modelForm.id) {
        api.static.getObjDetail({ ...this.pageInfo, field: this.modelForm })
          .then(res => {
            if (res.status == 200) {
              this.modelForm = res.data;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // this.clickAdd();
      }
    },
    // 新增
    clickAdd() {
      this.$nextTick(() => {
        this.modelForm = {
          validateStatus: 2, // 【1-已审核，2-未审核】 类型：'Integer'，是否为空：'YES'
          enable: parseInt(staticDataEnum.enable[0].code)
        };
      });
      return this.$utilsBasic.valideFocus(this, ['refName']);
    },
    putAddAndUpdateAll(callback) {
      if (!this.modelForm.id) {
        api.static.postObj({ ...this.pageInfo, field: this.modelForm })
          .then(async res => {
            if (res.status == 200) {
              this.modelForm = res.data;
              // 审核
              if (callback && typeof callback === 'function') {
                callback(this.modelForm.id);
              } else {
              // 保存成功
                this.$message({
                  message: res.message,
                  type: 'success'
                });
              }
            }
          }).catch(err => {
            console.log(err);
          });
      } else {
        api.static.putObj({ ...this.pageInfo, field: this.modelForm })
          .then(async res => {
            if (res.status == 200) {
              this.modelForm = res.data;
              // 审核
              if (callback && typeof callback === 'function') {
                callback(this.modelForm.id);
              } else {
              // 保存成功
                this.$message({
                  message: res.message,
                  type: 'success'
                });
              }
            }
          }).catch(err => {
            console.log(err);
          });
      }
    },
    // 保存
    clickSave() {
      return this.validateAfter(() => {
        this.putAddAndUpdateAll();
      }, true, false, false);
    },
    /**
     * 保存或者审核之前验证
     * 基本信息:validateBasicForm = true
     * 子列表验证:validateSubListForm = true
     */
    validateAfter(callback, validateBasicForm = true, validateSubListForm = true, disabledAudit = true) {
      let result = true;
      if (validateBasicForm) {
        // 表单验证
        this.$refs.refModelForm.validate(valid => {
          valid ? null : result = valid;
          return !result;
        });
      }
      if (result) {
        // 验证
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        if (validateBasicForm) {
          this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
          return false;
        }
        if (disabledAudit && validateSubListForm) {
          return false;
        }
      }
    },
    // 审核
    clickAudit() {
      return this.validateAfter(() => {
        this.$confirm(staticDataBasic.info.audit, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.putAddAndUpdateAll((id) => {
              api.static.putObjAudit({ ...this.pageInfo, field: this.modelForm })
                .then(res => {
                  if (res.status == 200) {
                    this.$message.success(res.message);
                    this.modelForm.validateStatus = res.data.validateStatus;
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }, true, true, false);
    },
    // 删除
    clickDelete() {
      this.$confirm(staticDataBasic.info.delete, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.static.deleteObj({ ...this.pageInfo, field: this.modelForm })
            .then(res => {
              if (res.status == 200) {
                this.$message.success(res.message);
                this.$refs.refBasicUpload.clearAttacheFile();
                this.clickAdd();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
        });
    },
    /**
     * 禁用
     */
    clickDisenable() {
      const enable = 2;
      this.putEnable(staticDataBasic.info.disEnable, enable);
    },
    /**
     * 启用
     */
    clickEnable() {
      const enable = 1;
      this.putEnable(staticDataBasic.info.enable, enable);
    },
    /**
     * 启用和禁用
     */
    putEnable(info, enable) {
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const model = deepCloneByObject(this.modelForm);
          model.enable = enable;
          api.static.putObjEnable({ ...this.pageInfo, field: model })
            .then((response) => {
              if (response.status === 200) {
                this.modelForm.enable = enable;
                this.$message({
                  message: response.message,
                  type: 'success'
                });
              }
            }).catch((error) => {
              console.log(error);
            });
        }, (cancel) => {
          console.log(cancel);
        });
    }
  }
};
