<template>
    <basic-container>
        <basic-handler>
            <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAdd">新增</el-button>
            <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-if-save"
                    plain
                    @click="clickSave">保存
            </el-button>
            <el-button :disabled="disabledDelete" type="danger" size="small" icon="el-icon-delete" plain @click="clickDelete">
                删除
            </el-button>
            <el-button
                    :disabled="disabledAuditTwo"
                    type="primary"
                    size="small"
                    icon="el-icon-if-auth"
                    plain
                    @click="clickAudit">审核
            </el-button>
            <el-button
                    :disabled="disabledDisenable"
                    type="danger"
                    size="small"
                    icon="el-icon-circle-close"
                    plain
                    @click="clickDisenable">禁用
            </el-button>
            <el-button
                    :disabled="disabledEnable"
                    type="success"
                    size="small"
                    icon="el-icon-circle-check"
                    plain
                    @click="clickEnable">启用
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getObjDetail()">
                刷新
            </el-button>
        </basic-handler>
        <el-form
                ref="refModelForm"
                :model="modelForm"
                :rules="rules"
                :show-message="false"
                label-width="120px"
                class="form-container">
            <el-row :gutter="10">
                <el-col :span="8">
                    <basic-validate-status :model="modelForm"/>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="启用状态" prop="enable" class="add-border">
                        <el-radio-group v-model="modelForm.enable">
                            <el-radio
                                    v-for="(row) in dataEnum.enabled"
                                    :label="parseInt(row.code)"
                                    :key="row.code"
                                    disabled>
                                {{ row.name }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位授权码">
                        <el-input v-model="modelForm.authCode" :disabled="true" clearable size="small" placeholder="自动生成单位授权码"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="单位名称" prop="name" hide-required-asterisk>
                        <el-input ref="refName" v-model="modelForm.name" clearable size="small" placeholder="请输入单位名称"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="登录手机号" prop="mobile">
                        <el-input v-model="modelForm.mobile" clearable size="small" placeholder="请输入登录手机号"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="授权模式" prop="authMode" class="add-border">
                        <el-radio-group v-model="modelForm.authMode">
                            <el-radio
                                    v-for="(row) in dataEnum.auth"
                                    :label="parseInt(row.code)"
                                    :key="row.code">
                                {{ row.name }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="授权方式" prop="authWay" class="add-border">
                        <el-radio-group v-model="modelForm.authWay">
                            <el-radio
                                    v-for="(row) in dataEnum.static.authModeType"
                                    :label="parseInt(row.code)"
                                    :key="row.code">
                                {{ row.name }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="授权开始" prop="authBeginTime">
                        <el-date-picker
                                :placeholder="modelForm.authBeginTime?modelForm.authBeginTime:'请输入授权开始时间'"
                                :editable="false"
                                v-model="modelForm.authBeginTime"
                                size="small"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="授权结束" prop="authEndTime">
                        <el-date-picker
                                :placeholder="modelForm.authEndTime?modelForm.authEndTime:'请输入授权结束时间'"
                                :editable="false"
                                v-model="modelForm.authEndTime"
                                size="small"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="授权数" prop="authUserNumber">
                        <el-input
                                v-model="modelForm.authUserNumber"
                                clearable
                                size="small"
                                placeholder="请输入授权数"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系手机" prop="contactPersonMobile">
                        <el-input v-model="modelForm.contactPersonMobile" clearable size="small" placeholder="请输入联系手机,以11位手机号格式标准"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系邮箱" prop="contactPersonEmail">
                        <el-input v-model="modelForm.contactPersonEmail" clearable size="small" placeholder="请输入联系邮箱,以邮箱格式标准"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="信用代码">
                        <el-input v-model="modelForm.creditCode" clearable size="small" placeholder="请输入信用代码"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="法人代表">
                        <el-input v-model="modelForm.legalPerson" clearable size="small" placeholder="请输入法人代表"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="成立日期">
                        <el-date-picker
                                :placeholder="modelForm.foundTime?$utils.date.format(modelForm.foundTime):'请输入成立日期'"
                                :editable="false"
                                v-model="modelForm.foundTime"
                                :picker-options="pickerOptionsFormat"
                                size="small"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="官方网站">
                        <el-input v-model="modelForm.website" clearable size="small" placeholder="请输入官方网站"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="总机号码">
                        <el-input v-model="modelForm.telephone" clearable size="small" placeholder="请输入总机号码"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="行政区划">
                        <el-input v-model="modelForm.districtCode" clearable size="small" placeholder="请输入行政区划"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="详细地址">
                        <el-input v-model="modelForm.address" clearable size="small" placeholder="请输入详细地址"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="主联系人">
                        <el-input v-model="modelForm.contactPerson" clearable size="small" placeholder="请输入主联系人"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系座机">
                        <el-input v-model="modelForm.contactPersonTelephone" clearable size="small" placeholder="请输入联系座机"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item label="补充说明">
                        <el-input
                                :autosize="{ minRows: 3, maxRows: 4}"
                                v-model="modelForm.authExplain"
                                clearable
                                type="textarea"
                                placeholder="请输入补充说明"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </basic-container>
</template>

<script>
  import computed from '@coreMixins/computed';
  import methods from '@coreMixins/methods';
  import { staticDataBasic } from '@coreData/basic';
  import { staticDataEnum } from '@coreData/enum';
  import { deepCloneByObject } from '@coreUtils';
  import { validateLength, validatePhone, validateEmail, validateRegex, isNumber } from '@coreUtils/validate';
  import api from '@coreApi/common';

  export default {
    name: 'UnitInfoDetail',
    mixins: [computed, methods],
    data() {
      return {
        modelForm: {},
        rules: {
          name: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          mobile: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validatePhone(rule, value, callback, true, ['登录手机号']);
              },
              trigger: 'change'
            }
          ],
          authBeginTime: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          authEndTime: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          authUserNumber: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['授权数', 1, 20]);
              },
              trigger: 'change'
            },
            {
              required: true,
              validator: (rule, value, callback) => {
                validateRegex(rule, value, callback, true, ['授权数'], isNumber);
              },
              trigger: 'change'
            }
          ],
          contactPersonMobile: [
            {
              validator: (rule, value, callback) => {
                validatePhone(rule, value, callback, false, ['联系手机']);
              },
              trigger: 'change'
            }
          ],
          contactPersonEmail: [
            {
              validator: (rule, value, callback) => {
                validateEmail(rule, value, callback, false, ['联系邮箱']);
              },
              trigger: 'change'
            }
          ]
        },
        pickerOptionsFormat: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
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
        'GetEnabledData',
        'GetAuthData'
      ]);
      this.$store.dispatch('cacheId', '0');// 刷新
    },
    methods: {
      // 获取详情
      getObjDetail() {
        if (this.modelForm.id) {
          api.static.getObjDetail({ ...this.basePage, field: this.modelForm })
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
            enable: parseInt(staticDataEnum.enable[0].code),
            authMode: parseInt(staticDataEnum.authMode[0].code),
            authWay: parseInt(staticDataEnum.authModeType[0].code)
          };
        });
        return this.$utilsBasic.valideFocus(this, ['refName']);
      },
      putAddAndUpdateAll(callback) {
        if (!this.modelForm.id) {
          api.static.postObj({ ...this.basePage, field: this.modelForm })
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
          api.static.putObj({ ...this.basePage, field: this.modelForm })
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
          if (!this.$utilsBasic.date.compareDatetime(this.modelForm.authBeginTime, this.modelForm.authEndTime)) {
            return this.$message({ message: '授权开始时间不能大于授权结束时间', type: 'warning' });
          }
          // 验证
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          if (validateBasicForm) {
            this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
            return this.$utilsBasic.valideFocus(this, ['refName']);
          }
          if (disabledAudit && validateSubListForm) {
            return false;
          }
        }
      },
      // 审核
      clickAudit() {
        return this.validateAfter(() => {
          this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.putAddAndUpdateAll((id) => {
                api.static.putObjAudit({ ...this.basePage, field: this.modelForm })
                  .then(res => {
                    if (res.status == 200) {
                      this.$message.success(res.message);
                      this.modelForm.validateStatus = res.data.validateStatus;
                      this.modelForm.authCode = res.data.authCode;
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
            api.static.deleteObj({ ...this.basePage, field: this.modelForm })
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
            api.static.putObjEnable({ ...this.basePage, field: model })
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
      },
      changeFoundTime(value) {
        // 时间格式化
        if (value) {
          this.modelForm.foundTime = new Date(value).getTime();
        }
      }
    }
  };
</script>
