<template>
  <div class="tab-container">
    <tab-pane/>
    <!--<el-tabs style='margin-top:15px;' v-model="activeName">-->
    <!--<el-tab-pane v-for="item in tabMapOptions" :label="item.name" :key='item.id' :name="item.code">-->
    <!--<keep-alive>-->
    <!--<tab-pane v-if='activeName==item.code' :type='item.id'></tab-pane>-->
    <!--</keep-alive>-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </div>
</template>

<script>
import tabPane from './components/groupDetail';
import {
  getAllGroupTypes
} from '@puzzlesSys/api/groupAuth/group/index';
export default {
  name: 'Group',
  components: {
    tabPane
  },
  data() {
    return {
      tabMapOptions: [
      ],
      activeName: 'role'
    };
  },
  created() {
    // this.fetchData();
  },
  methods: {
    fetchData() {
      getAllGroupTypes().then(response => {
        this.tabMapOptions = response.data;
      });
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 0px;
}
</style>
