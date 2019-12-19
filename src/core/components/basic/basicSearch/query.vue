<!--日期查询-->
<template>
  <el-form v-if="false" ref="form" :inline="true" :model="modelSearchFilter" class="form-inline-search left float-none" @submit.native.prevent>
    <slot name="search"/>
    <el-form-item label="登记时间">
      <el-date-picker
        :editable="false"
        v-model="inputTime"
        clearable
        size="small"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="changeInputTime"/>
    </el-form-item>
    <el-form-item>
      <el-button size="small" icon="el-icon-search" type="primary" @click="clickQuery">搜索</el-button>
      <el-button size="small" icon="el-icon-minus" type="primary" plain @click="clickReset">重置</el-button>
      <slot name="button"/>
    </el-form-item>
  </el-form>
</template>

<script>
import computed from '@core/utils/mixins/computed';
import methods from '@core/utils/mixins/methods';
import formatEnum from '@core/utils/mixins/formatEnum';
export default {
  name: 'BasicSearchQuery',
  mixins: [computed, methods, formatEnum],
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputTime: [this.$utilsBasic.date.yearDate(), new Date()],
      modelSearchFilter: {
        page: 1,
        limit: 10,
        startTime: this.$utilsBasic.date.yearDate(),
        endTime: new Date()
      }
    };
  },
  created() {
  },
  methods: {
    changeInputTime() {
      this.modelSearchFilter.startTime = this.$utils.date.format(this.inputTime[0], 'YYYY-MM-DD hh:mm:ss');
      this.modelSearchFilter.endTime = this.$utils.date.format(this.inputTime[1], 'YYYY-MM-DD hh:mm:ss');
    },
    /**
       * 搜索按钮
       */
    clickQuery() {
      console.log(this.modelSearchFilter);
      this.changeInputTime();
      this.$emit('clickQueryPage', this.modelSearchFilter);
    },
    /**
       * 搜索重置
       */
    clickReset() {
      this.inputTime = [this.$utilsBasic.date.yearDate(), new Date()];
      this.modelSearchFilter.startTime = '';
      this.modelSearchFilter.endTime = '';
      this.$emit('clickResetPage', this.modelSearchFilter);
    }
  }
};
</script>
