<!--日期(显示日期、时间)-->
<!--参考页面：src\views\custormManager\sysInfo\unitInfo\detail.vue-->
<template>
  <el-date-picker
    v-if="type=='datetime'"
    :editable="false"
    v-model="value"
    size="small"
    type="datetime"
    format="yyyy-MM-dd HH:mm:ss"
    value-format="yyyy-MM-dd HH:mm:ss"
    @change="change"/>
  <el-date-picker
    v-else-if="type=='date'"
    :editable="false"
    v-model="value"
    size="small"
    type="date"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd HH:mm:ss"
    @change="change"/>
</template>

<script>
import computed from '@core/utils/mixins/computed';
import methods from '@core/utils/mixins/methods';
import formatEnum from '@core/utils/mixins/formatEnum';

export default {
  name: 'BasicDate',
  mixins: [computed, methods, formatEnum],
  props: {
    value: {
      type: [String, Date]
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  computed: {
    strDate() {
      let date = this.value;
      if (date instanceof Date || date instanceof Number) {
        date = this.$utilsBasic.date.getDate(date);
      }
      console.log(this.value, typeof this.value);
      return date;
    }
  },
  methods: {
    change(value) {
      // 时间格式化
      if (value) {
        this.value = value;
      }
    }
  }
};
</script>
