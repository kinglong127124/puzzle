<!--搜索布局-->
<!--参考页面1：src\views\sysManager\sysBaseSet\monthYearManager-->
<!--参考页面2：src\views\sysManager\groupAuth\userManager\index.vue-->
<template>
  <div class="handler-container">
    <slot/>
    <slot name="search"/>
  </div>
</template>

<script>
export default {
  name: 'BasicHandler'
};
</script>
