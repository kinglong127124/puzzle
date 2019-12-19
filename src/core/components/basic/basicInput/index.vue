<template>
  <el-tooltip :content="typeof format == 'function' ? format(data) : String(data)" :disabled="data == null || data == '' || !disabled" :open-delay="500" class="item" effect="dark" placement="top-start">
    <div class="inputBox" @mousedown="clickInput">
      <el-input
        ref="input"
        :disabled="disabled"
        :placeholder="disabled ? '' : placeholder"
        v-model="data"
        :type="type"
        :min="min"
        :max="max"
        :maxlength="maxlength"
        :class="formatClass"
        :rows="rows"
        :readonly="readonly"
        :key="rowkey"
        size="small"
        clearable
        @input="input"
        @blur="blur"
        @focus="focus"
        @clear="clear"
        @change="change"
      >
        <slot slot="append" name="append"/>
        <slot/>
      </el-input>
      <div
        v-if="typeof format == 'function'"
        :class="{isDisabled: disabled}"
        :key="rowkey"
        class="format el-input el-input--small el-input--suffix">
        <div
          :style="{zIndex: isFocus ? '-1' : ''}"
          :class="{isDisabled: disabled, price: price}"
          :key="rowkey"
          class="format el-input__inner">{{ format(data) }}
        </div>
      </div>
      <div v-else-if="price" :class="{isDisabled: disabled}" class="format el-input el-input--small el-input--suffix">
        <div
          :style="{zIndex: isFocus ? '-1' : ''}"
          :class="{isDisabled: disabled, price: price}"
          :key="rowkey"
          class="format el-input__inner">{{ data }}
        </div>
      </div>
    </div>
  </el-tooltip>
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
    disabled: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: () => 'text'
    },
    min: Number,
    max: Number,
    maxlength: [Number, String],
    format: Function,
    formatValue: Function,
    allowNegative: Boolean,
    rows: [String, Number],
    readonly: Boolean,
    price: Boolean,
    rowkey: [String, Number]
  },
  data() {
    return {
      data: this.value,
      isFocus: false
    };
  },
  computed: {
    formatClass() {
      return {
        notIsFocus: !this.isFocus,
        isFormat: typeof this.format == 'function' || this.price,
        isDisabled: this.disabled && typeof this.format == 'function',
        price: this.price
      };
    }
  },
  watch: {
    value(newVal, old) {
      if (newVal == old) return;
      this.data = this.value;
    },
    data(newVal, old) {
      if (newVal == old) return;
      this.$emit('input', this.data);
    }
  },
  created() {
    // this.formatFun()
  },
  methods: {
    blur() {
      this.isFocus = false;
      this.formatFun();
      this.formatBlur();
      this.$emit('blur');
    },
    formatFun() {
      // if(this.disabled) return
      // this.worker = new WorkerUtil(Worker)
      // let a = this.formatValue
      // this.worker.pushTask('computedValue', {
      //   data: this.data,
      //   allowNegative: this.allowNegative
      // }, data => {
      //   this.data = data
      // })
      if (!this.allowNegative) {
        if (this.data < 0) this.data = 0;
      }
      // 格式化value
      if (typeof this.formatValue == 'function') {
        this.data = this.formatValue(this.data);
      }
    },
    formatBlur() {
      // 格式化输入框失去焦点时的显示
      if (typeof this.format == 'function') {
        setTimeout(() => {
          this.format(this.data);
        });
        // this.format(this.data)
      }
    },
    clickInput() {
      if (this.disabled) return;
      this.isFocus = true;
      this.$refs.input.focus();
    },
    clear() {
      this.$nextTick(() => {
        this.blur();
      });
    },
    change() {
      this.$emit('change', this.data);
    },
    input() {
      this.$emit('input', this.data);
    },
    focus() {
      if (Number(this.data) == 0) this.data = '';
      this.isFocus = true;
      this.$emit('focus', this.data);
    }
  }
};
</script>

<style scoped>
.el-input >>> input {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-input >>> input::-webkit-outer-spin-button,
.el-input >>> input::-webkit-inner-spin-button{
   -webkit-appearance: none !important;
}
.el-input >>> input[type="number"]{-webkit-appearance:textfield;}
.inputBox {
  position: relative;
}
.format {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  background: transparent!important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'sans-serif';
  /* border: 1px solid #ccc; */
  border-color: transparent;
}
.format .price {
  text-align: right;
  padding-right: 10px;
}
.format.isDisabled {
  pointer-events: auto;
  cursor:no-drop;
  /*padding-right: 10px;*/
  /*text-align: right;*/
}
.notIsFocus.isFormat >>> input {
  color: transparent!important;
  user-select: none;
}
.el-input.el-input--small.is-disabled.el-input--suffix.notIsFocus.isFormat.price >>> input {
  color: transparent!important;
  /* visibility: hidden; */
}
.el-table--medium td.spacing-set .cell .isDisabled >>> input.el-input__inner {
  color: transparent!important;
  visibility: hidden;
}
table.el-table__body .isDisabled {
  border-color: transparent!important;
  cursor: pointer;
}
.el-table--medium td.spacing-set .cell .el-form-item.is-error .el-input__inner {
  border-color: transparent;
}
</style>
