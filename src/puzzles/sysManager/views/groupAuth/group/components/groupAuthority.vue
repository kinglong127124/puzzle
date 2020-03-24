<template>
  <div>
    <el-row class="margin-top0">
      <el-button
        :disabled="disabledAuthority"
        type="primary"
        size="small"
        icon="el-icon-if-save-permissions"
        plain
        @click="updateAuthorityDialog">保存权限
      </el-button>
    </el-row>
    <el-row class="margin-top-10">
      <el-col :span="7" style="margin-top:15px;">
        <el-input v-model="filterText" clearable placeholder="请输入关键字" size="small">
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"/>
        </el-input>
        <el-tree
          ref="menuTree"
          :node-key="getTreeNodeKey"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-expand-all="false"
          class="filter-tree treeGray"
          show-checkbox
          highlight-current
          @node-click="getNodeData"/>
      </el-col>
      <el-col :span="17" style="margin-top:15px;">
        <el-table
          ref="elementTable"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
          height="536"
          @select="handleSelectionChange"
          @select-all="handleSelectionAllChange">
          <el-table-column v-if="groupManagerElement" align="center" type="selection" width="40"/>
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"/>
          <el-table-column width="200px" label="资源编码" align="left" header-align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.code }}</span>
            </template>

          </el-table-column>
          <el-table-column width="80px" align="center" label="资源类型">
            <template slot-scope="scope">
              <span>
                {{ scope.row.type }}</span>
            </template>

          </el-table-column>
          <el-table-column width="160px" label="资源名称" align="left" header-align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.name }}</span>
            </template>

          </el-table-column>
          <el-table-column width="160px" label="资源地址" align="left" header-align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.uri }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120px" align="center" label="资源请求类型">
            <template slot-scope="scope">
              <span>
                {{ scope.row.method }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  fetchTree
} from '@puzzlesSys/api/groupAuth/menu/index';
import {
  page
} from '@puzzlesSys/api/groupAuth/element/index';
import {
  removeElementAuthority,
  addElementAuthority,
  getElementAuthority,
  modifyMenuAuthority,
  getMenuAuthority
} from '@puzzlesSys/api/groupAuth/group/index';
import { staticDataBasic } from '@coreData/basic';
import { mapState } from 'vuex';
export default {
  name: 'GroupAuthority',
  props: {
    groupId: {
      type: String,
      default: '1'
    },
    params: Object
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      modelSearchFilter: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      groupManagerElement: false,
      selectData: []
      //   currentId: -1
    };
  },
  computed: {
    ...mapState({
      elements: state => state.user.login.elements
    }),
    disabledAuthority() {
      if (this.$utils.length(this.params) && this.params.groupType == 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.groupManagerElement = this.elements['groupManager:element'];
  },
  methods: {
    disabledTree(data, node) {
      if (staticDataBasic.nodeId.includes(this.groupId) && staticDataBasic.nodeId.includes(data.id)) {
        return true;
      }
    },
    getList() {
      fetchTree(this.modelSearchFilter).then(response => {
        this.treeData = response.data;
        this.initAuthoritys();
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      this.modelSearchFilter.menuId = data.id;
      page(this.modelSearchFilter).then(response => {
        this.list = response.data.rows;
        getElementAuthority(this.groupId).then(data => {
          const obj = {};
          for (let i = 0; i < this.list.length; i++) {
            obj[this.list[i].id] = this.list[i];
          }
          const toggle = {};
          for (let i = 0; i < data.data.length; i++) {
            const id = data.data[i];
            if (obj[id] !== undefined && toggle[id] === undefined) {
              this.$refs.elementTable.toggleRowSelection(obj[data.data[i]]);
              toggle[id] = true;
            }
          }
        });
      });
      this.currentId = data.id;
      this.showElement = true;
    },
    getTreeNodeKey(node) {
      return node.id;
    },
    handleSelectionAllChange(val, row) {
      if (!row && val.length == this.list.length) {
        for (let i = 0; i < val.length; i++) {
          addElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: val[i].id
          });
        }
      }
      if (!row && val.length == 0) {
        for (let i = 0; i < this.list.length; i++) {
          removeElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: this.list[i].id
          });
        }
      }
    },
    handleSelectionChange(val, row) {
      let flag = true;
      for (let i = 0; i < val.length; i++) {
        if (val[i].id === row.id) {
          addElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: row.id
          });
          flag = false;
          break;
        }
      }
      if (flag) {
        removeElementAuthority(this.groupId, {
          menuId: this.currentId,
          elementId: row.id
        });
      }
    },
    /**
     * 弹框之后，取消
     */
    clickGroupAuthorityCancel() {
      this.$emit('closeAuthorityDialog');
    },
    update() {
      this.$emit('closeAuthorityDialog');
      const nodes = this.$refs.menuTree.getCheckedNodes();
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id);
      }
      modifyMenuAuthority(this.groupId, ids).then(() => {
        this.$message({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        });
      });
    },
    initAuthoritys() {
      getMenuAuthority(this.groupId).then(res => {
        this.selectData = [];
        for (let i = 0; i < res.data.length; i++) {
          this.selectData.push(res.data[i].id);
        }
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys(this.selectData);
        });
      });
    },
    updateAuthorityDialog() {
      const getCheckedKeys = this.$refs.menuTree.getCheckedKeys();
      if (!this.$utils.isEmpty(getCheckedKeys)) {
        this.update();
      } else {
        this.$message({
          message: '亲，请先分配权限！',
          type: 'warning'
        });
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-tree{
    height: 500px;
    overflow-y: auto;
  }
</style>
