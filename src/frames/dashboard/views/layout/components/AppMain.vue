<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="this.$route.meta.isCache">
        <router-view :key="key"/>
      </keep-alive>
      <router-view v-if="!this.$route.meta.isCache" :key="key"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // isKeepAlive() {
    // if (this.$route && this.$route.name && !this.$route.meta.isCache) {
    //   return true;
    // } else {
    //   return false;
    // }
    // },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>
