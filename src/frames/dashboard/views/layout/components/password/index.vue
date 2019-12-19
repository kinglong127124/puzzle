<template>
  <basic-dialog v-el-drag-dialog :visible.sync="visiblePassword" :show-close="false" title="修改密码" width="30">
    <el-form
      ref="refModelForm"
      :model="modelForm"
      :rules="rules"
      :show-message="false"
      label-width="120px"
      class="modelForm-container"
      auto-complete="off"
      autocomplete="off">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="modelForm.userName" :disabled="true" clearable size="small"/>
      </el-form-item>
      <el-form-item label="手机账号" prop="mobilePhone">
        <el-input v-model="modelForm.mobilePhone" :disabled="true" clearable size="small"/>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPassword">
        <input
          id="test"
          type="text"
          class="test"
          autocomplete="off"
          onfocus="this.type='password'"
          style="display: none">
        <el-input
          ref="refOldPassword"
          v-model="modelForm.oldPassword"
          clearable
          size="small"
          type="password"
          placeholder="请输入旧密码"
          auto-complete="off"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          ref="refNewPassword"
          v-model="modelForm.newPassword"
          clearable
          size="small"
          type="password"
          placeholder="请输入新密码"
          auto-complete="off"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPasswordConfirm">
        <el-input
          ref="refNewPasswordConfirm"
          v-model="modelForm.newPasswordConfirm"
          clearable
          size="small"
          type="password"
          placeholder="请再次输入确认新密码"
          auto-complete="off"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="备注">
        1、至少为字母、数字、下划线两种组合。
        2、密码长度6-18位。
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickOk('cancel')">取 消</el-button>
      <el-button type="primary" @click="clickOk('ok')">确 定</el-button>
    </div>
  </basic-dialog>
</template>

<script>
import computed from '@core/utils/mixins/computed';
import { validateLength, validateRegex, isValidEleven } from '@core/utils/validate';
import { staticDataBasic } from '@core/assets/data/basic';
import {
  modifyPasswordObj
} from '@framesDashboard/api/user/login';

export default {
  name: 'Password',
  mixins: [computed],
  props: {
    visiblePassword: Boolean
  },
  data() {
    return {
      rules: {
        oldPassword: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['旧密码', 6, 18]);
            },
            trigger: 'change'
          }
        ],
        newPassword: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateRegex(rule, value, callback, true, ['新密码'], isValidEleven);
            },
            trigger: 'change'
          }
        ],
        newPasswordConfirm: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateRegex(rule, value, callback, true, ['确认新密码'], isValidEleven);
            },
            trigger: 'change'
          }
        ]
      },
      modelForm: {
        userName: undefined,
        mobilePhone: undefined,
        oldPassword: undefined,
        newPassword: undefined,
        newPasswordConfirm: undefined
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.modelForm.mobilePhone = this.userLogin.mobilePhone;
      this.modelForm.userName = this.userLogin.username;
    });
  },
  methods: {
    clickOk(type) {
      if (type == 'ok') {
        this.clickUpdatePassword(type);
      } else {
        this.$emit('confirm', { type, modelForm: this.modelForm });
      }
    },
    /**
       * 修改密码之前验证
       */
    validateAfter(callback) {
      let result = true;
      // 表单验证
      this.$refs.refModelForm.validate(valid => {
        valid ? null : result = valid;
        return !result;
      });
      if (result) {
        // 验证
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' });
        return this.$utilsBasic.valideFocus(this, ['refOldPassword', 'refNewPassword', 'refNewPasswordConfirm']);
      }
    },
    clickUpdatePassword(type) {
      return this.validateAfter(() => {
        if (this.modelForm.newPassword != this.modelForm.newPasswordConfirm) {
          this.$message({ message: '亲，【新密码】与【确认新密码】不相等！', type: 'warning' });
          return;
        }
        modifyPasswordObj(this.modelForm)
          .then(res => {
            if (res.status == 200) {
              this.$emit('confirm', { type, modelForm: this.modelForm });
              this.$message.success(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style scoped>

</style>
