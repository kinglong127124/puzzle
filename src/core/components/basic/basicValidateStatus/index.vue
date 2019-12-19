<!--审核状态(显示一个或者多个)-->
<!--参考页面：src\views\bpmaManager\early\setProject\workPlan\detail.vue-->
<template>
  <basic-form-item v-if="!isShow" label="审核状态" prop="validateStatus" class="add-border disabled">
    <el-radio-group v-model="model.validateStatus">
      <el-radio
        v-for="(row) in dataEnum.validateStatus"
        :label="parseInt(row.code)"
        :key="row.code"
        disabled>
        {{ row.name }}
      </el-radio>
    </el-radio-group>
  </basic-form-item>
  <basic-form-item v-else label="审核状态" prop="validateStatus" class="add-border disabled">
    {{ formatAuditStatusEnum(model) }}
  </basic-form-item>
</template>

<script>
import computed from '@core/utils/mixins/computed';
import methods from '@core/utils/mixins/methods';
import formatEnum from '@core/utils/mixins/formatEnum';

export default {
  name: 'BasicValidateStatus',
  mixins: [computed, methods, formatEnum],
  props: {
    model: {
      type: Object,
      default: () => {
      }
    },
    showMethod: {
      type: String,
      default: 'single' // 显示一个，显示多个
    }
  },
  computed: {
    isShow() {
      if (this.showMethod == 'single') {
        return true;
      }
      return false;
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetAuditStatusEnum'
    ]);
  }
};
</script>
