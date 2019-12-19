<template>
  <div class="message-container" title="消息通知" @click="noticeClick">
    <i class="ka ka-icon-message"/>
    <div :class="{'is-notice': isNotice}"/>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    isNotice: {
      type: Boolean,
      default: false
    },
    noticeClick: {
      type: Function,
      default: null
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .message-container{
    margin-top: 6px;
    display: inline-block;
    position: relative;
    top: 0;
    cursor: pointer;
    i{
      &.ka-icon-message{
        background: url("../../../../assets/img/layout/message.png") no-repeat;
        background-position: 8px;
      }
    }
    .is-notice{
      position: absolute;
      right: 0;
      top: 3px;
      width: 8px;
      height: 8px;
      background: red;
      border-radius: 50%;
    }
  }
</style>
