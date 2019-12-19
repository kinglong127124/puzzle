<template>
  <div>
    <basic-form-item :label="label">
      <basic-input v-model="data" :format="formatIsOrNot" disabled/>
    </basic-form-item>
  </div>
</template>

<script>
import formatEnum from '@core/utils/mixins/formatEnum.js';
import methods from '@core/utils/mixins/methods';
import computed from '@core/utils/mixins/computed';
export default {
  name: 'BasicIfOrNot',
  mixins: [formatEnum, methods, computed],
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: () => '是否'
    }
  },
  data() {
    return {
      data: null
    };
  },
  watch: {
    data(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.data = val;
    }
  },
  created() {
    this.getEnumData(['GetValidateStatusData', 'GetIsOrNotData']);
  }
};
</script>

<style>
</style>
