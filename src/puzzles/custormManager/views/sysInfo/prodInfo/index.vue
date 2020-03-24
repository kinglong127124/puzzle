<template>
  <div class="flex-layout">
    <div ref="refSplitPane" :style="{height:heightSplitPane + 'px'}" class="splitPane-container">
      <split-pane :min-percent="30" :default-percent="60" split="vertical">
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getGoodslist()">刷新</el-button>
              <basic-search
                ref="refBasicSearch"
                :model-search-filter="modelSearchFilter"
                @clickSearchFilter="clickSearchFilter"/>
            </div>
            <el-table
              ref="refGoods"
              :data="goodslist"
              :height="heightTableLeft"
              highlight-current-row
              border
              fit
              stripe
              @current-change="handleCurrentChange">
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"/>
              <el-table-column
                property="code"
                align="center"
                width="80"
                label="编码"/>
              <el-table-column
                property="name"
                align="center"
                label="名称"
                show-overflow-tooltip/>
              <el-table-column
                property="alias"
                align="center"
                width="100"
                label="简称"/>
              <el-table-column
                property="version"
                align="center"
                width="100"
                label="版本"/>
              <el-table-column
                property="mark"
                align="center"
                width="100"
                label="标识"
                show-overflow-tooltip/>
              <el-table-column
                property="explains"
                align="left"
                header-align="center"
                show-overflow-tooltip
                label="补充说明"
                min-width="150"
              />
            </el-table>
            <pagination
              :total="total"
              :page.sync="modelSearchFilter.page"
              :limit.sync="modelSearchFilter.limit"
              @pagination="getGoodslist"/>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <div class="handler-container">
              <el-button
                v-if="!defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-open"
                plain
                @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button
                v-if="defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-fold"
                plain
                @click="clickDefaultExpandAll">全部折叠
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefreshMenu">刷新
              </el-button>
              <basic-search
                ref="refBasicSearchMenu"
                :model-search-filter="modelSearchFilterMenu"
                @clickSearchFilter="clickSearchFilterMenu"/>
            </div>
            <basic-table-tree
              ref="refGoodsProject"
              :default-expand-all="defaultExpandAll"
              :data="goods"
              :columns="columns"
              :filter-node-method="filterNodeMethodMenu"
            >
              <template slot-scope="obj" slot="ifCanOverflow">
                {{ formatIsOrNot(obj.scope.row.ifCanOverflow) }}
              </template>
              <template slot-scope="obj" slot="isAlreadyOverflow">
                {{ formatIsOrNot(obj.scope.row.isAlreadyOverflow) }}
              </template>
            </basic-table-tree>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import computed from '@coreMixins/computed';
import methods from '@coreMixins/methods';
import pagination from '@core/components/Pagination';
import splitPane from 'vue-splitpane';
import formatEnum from '@coreMixins/formatEnum';
import api from '@puzzlesCustorm/api/sysInfo/prodInfo';
export default {
  name: 'ProdInfoList',
  components: { pagination, splitPane },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      pageInfo: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmProductInfo',
        pageName: '产品管理'
      },
      pageInfoUser: {
        productAlias: 'smartpm',
        pageCode: 'sysCrmUserInfo',
        pageName: '客户信息'
      },
      total: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: '',
        validateStatus: 1,
        enable: 1
      },
      columns: [
        {
          expand: true,
          text: '菜单名称',
          value: 'title',
          minWidth: 160,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '是否可配审批流程',
          value: 'ifCanOverflow',
          width: 140,
          align: 'center'
        },
        {
          text: '是否已配审批流程',
          value: 'isAlreadyOverflow',
          width: 140,
          align: 'center'
        }
      ],
      currentRow: null,
      page: 1,
      limit: 10,
      currentPage: 1,
      goodslist: [],
      goods: [],
      heightSplitPane: 0,
      heightTableLeft: 0,
      heightTableRight: 0,
      defaultExpandAll: false,
      modelSearchFilterMenu: {
        fuzzy: '',
        fuzzyKeys: ''
      }
    };
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetIsOrNotData'
    ]);
    this.getGoodslist();
  },
  mounted: function() {
    const _self = this;
    this.$nextTick(() => {
      _self.heightInit(_self.getInnerHeight());
    });
  },
  methods: {
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refGoods, this.modelSearchFilter, () => {
        this.getGoodslist();
      });
    },
    /**
       * 高度初始化
       * @param innerHeight
       */
    heightInit(innerHeight) {
      const offsetTopLeft = this.$refs.refGoods.$el.getBoundingClientRect().top;
      const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
      const offsetTopRight = this.$refs.refGoodsProject.$el.getBoundingClientRect().top;
      this.heightTableLeft = innerHeight - offsetTopLeft - 66;
      this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
      this.heightTableRight = innerHeight - offsetTopRight - 66;
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.$refs.refGoodsProject.toggleExpandedAll(this.defaultExpandAll);
    },
    getGoodslist() {
      api.static.getPage({ ...this.pageInfo, field: { ...this.modelSearchFilter }}).then((response) => {
        if (response && response.data) {
          this.total = response.data.total;
          this.goodslist = response.data.rows;
          this.$nextTick(function() {
            if (this.goodslist && this.goodslist.length > 0) {
              this.$refs.refGoods.setCurrentRow(this.goodslist[0]);
              // this.getGoods(this.goodslist[0].id);
            } else {
              this.goods = [];
            }
          });
        }
      }).catch(() => {
      });
    },
    clickRefreshMenu() {
      // 数据加入到列表中
      if (!this.isSelectedRow(this.currentRow)) return false;
      this.modelSearchFilterMenu.fuzzy = '';
      this.getGoods(this.currentRow.id);
    },
    getGoods(productId) {
      if (productId) {
        api.getProductMenuTreeAll({ ...this.pageInfoUser, field: { ...this.modelSearchFilterMenu, productId }}).then((response) => {
          if (!this.$utils.isEmpty(response.data)) {
            this.goods = response.data[0].children;
          } else {
            this.goods = [];
          }
        }).catch(() => {
        });
      }
    },
    setCurrent(row) {
      this.$refs.refGoods.setCurrentRow(row);
    },
    handleCurrentChange(row) {
      if (row) {
        this.currentRow = row;
        this.defaultExpandAll = false;
        this.getGoods(row.id);
      }
    },
    /**
       * 关键字搜索
       */
    clickSearchFilterMenu() {
      this.$refs.refBasicSearchMenu.searchFilter(this.$refs.refGoodsProject, this.modelSearchFilterMenu, () => {
        try {
          this.$refs.refGoodsProject.filter(this.modelSearchFilterMenu.fuzzy);
        } catch (error) {
          console.log(error.message);
        }
      });
    },
    filterNodeMethodMenu(value, data, node) {
      if (!value) return true;
      if (node.children && node.children.length > 0) return true;
      const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilterMenu);
      return result;
    }
  }
};
</script>
