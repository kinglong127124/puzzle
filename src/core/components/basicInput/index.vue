<template>
  <!-- <el-tooltip :content="String(data)" :disabled="data == null || data == ''" :open-delay="500" class="item" effect="dark" placement="top-start"> -->
  <el-input
    ref="input"
    :disabled="disabled"
    :placeholder="placeholder"
    v-model="modelValue"
    :type="type"
    :min="min"
    :max="max"
    :maxlength="maxlength"
    size="small"
    clearable
    @input="handleInput"
    @blur="blur"
    @focus="focus"
  >
    <slot slot="append" name="append"/>
    <slot/>
  </el-input>
  <!-- </el-tooltip> -->
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    value: {
      type: String,
      default: () => {
        '';
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: () => 'text'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    maxlength: {
      type: Number,
      default: 0
    },
    format: {
      type: Function,
      default: val => val
    },
    formatMoney: {
      type: Boolean,
      default: false
    },
    formatData: {
      type: Function,
      default: val => val
    }
  },
  data() {
    return {
      data: this.value,
      foData: ''
    };
  },
  computed: {
    isFormat() {
      return typeof this.formatData === 'function';
    },
    modelValue() {
      return this.isFormat ? this.foData : this.data;
    }
  },
  watch: {
    value() {
      this.data = this.value;
      this.handleInput();
    }
  },
  created() {
    // this.blur()
    this.handleInput();
  },
  mounted() {
    this.$refs.input.focus();
    this.$refs.input.blur();
  },
  methods: {
    handleInput() {
      if (this.isFormat) {
        this.foData = this.formatData(this.data);
      }
      this.$emit('input', this.data);
    },
    blur() {
      this.data = this.format(this.data);
    },
    focus() {
      if (this.formatMoney) {
        this.data = String(this.data);
        this.data = this.data.replace(/,/g, '');
      }
    }
  }
};
</script>

<style scoped>
  .el-input > > > input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-input > > > input::-webkit-outer-spin-button,
  .el-input > > > input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  .el-input > > > input[type="number"] {
    -webkit-appearance: textfield;
  }
</style>
