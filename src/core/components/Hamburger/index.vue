<template>
  <div class="hamburger-container" title="打开或折叠左边导航">
    <i :class="{'is-active':isActive}" class="ka ka-icon-top-nav" @click="toggleClick"/>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hamburger-container {
    margin-top: 8px;
    display: inline-block;
    cursor: pointer;
    i {
      &.ka-icon-top-nav {
        background: url("../../assets/img/layout/top-nav.png") no-repeat;
        background-position: 8px;
        transform: rotate(0deg);
        transition: .38s;
        transform-origin: 50% 50%;
        &.is-active {
          transform: rotate(90deg);
        }
      }
    }
  }

</style>
