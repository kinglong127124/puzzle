<template>
  <el-form-item
    :prop="prop"
    :label="label"
    :label-width="labelWidth"
    :required="required"
    :rules="rules"
    :error="error"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :size="size"
  >
    <slot/>
  </el-form-item>
</template>

<script>
export default {
  name: 'BasicFromItem',
  props: {
    prop: String,
    label: String,
    labelWidth: {
      type: String,
      default: () => '120px'
    },
    required: Boolean,
    rules: Object,
    error: String,
    showMessage: {
      type: Boolean,
      default: () => false
    },
    inlineMessage: Boolean,
    size: String
  }
};
</script>

<style>

</style>
