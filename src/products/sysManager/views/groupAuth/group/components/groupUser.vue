<template>
  <el-form label-width="80px">
    <el-form-item label="群主|领导">
      <el-select v-model="leaders" :remote-method="remoteLeaderMethod" multiple filterable remote placeholder="请输入关键词">
        <el-option v-for="item in lItems" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="组员|下属">
      <el-select v-model="members" :remote-method="remoteMemberMethod" multiple filterable remote placeholder="请输入关键词">
        <el-option v-for="item in mItems" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button v-if="groupManagerBtnUserManager" type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  getUserManagerData
} from '@productsSys/api/groupAuth/userManager/index';
import {
  getUsers,
  modifyUsers
} from '@productsSys/api/groupAuth/group/index';
import { mapState } from 'vuex';
export default {
  name: 'GroupUser',
  props: {
    groupId: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      lItems: [],
      mItems: [],
      leaders: [],
      members: [],
      list: [],
      groupManagerBtnUserManager: false
    };
  },
  computed: {
    ...mapState({
      elements: state => state.user.login.elements
    })
  },
  created() {
    this.initUsers();
    this.groupManagerBtnUserManager = this.elements['groupManager:btn_userManager'];
  },
  methods: {
    remoteMemberMethod(query) {
      if (query !== '') {
        getUserManagerData({
          name: query
        }).then(response => {
          this.mItems = response.data.rows;
          this.total = response.data.total;
        });
      } else {
        this.mItems = [];
      }
    },
    remoteLeaderMethod(query) {
      if (query !== '') {
        getUserManagerData({
          name: query
        }).then(response => {
          this.lItems = response.data.rows;
          this.total = response.data.total;
        });
      } else {
        this.lItems = [];
      }
    },
    onSubmit() {
      const vals = {};
      if (this.members.length > 0) vals.members = this.members.join();
      if (this.leaders.length > 0) vals.leaders = this.leaders.join();
      modifyUsers(this.groupId, vals).then(() => {
        this.$emit('closeUserDialog');
        this.$message({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        });
      });
    },
    initUsers() {
      getUsers(this.groupId).then(response => {
        this.lItems = response.data.leaders;
        this.mItems = response.data.members;
        const mems = [];
        for (let i = 0; i < response.data.members.length; i++) {
          mems.push(response.data.members[i].id);
        }
        const leas = [];
        for (let i = 0; i < response.data.leaders.length; i++) {
          leas.push(response.data.leaders[i].id);
        }
        this.members = mems;
        this.leaders = leas;
      });
    }
  }
};
</script>
