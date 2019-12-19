/**
 * 公共混合类：基本列表
 */
import computed from '@core/utils/mixins/computed';
import methods from '@core/utils/mixins/methods';
import formatBasic from '@core/utils/mixins/formatBasic';
import formatEnum from '@core/utils/mixins/formatEnum';
import api from '@core/api/common';

export default {
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      pageInfo: {},
      tableData: {
        data: [],
        total: 0
      },
      currentRow: null,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys: ''
      },
      api
    };
  },
  computed: {
    disabledView: function() {
      return !(this.currentRow && this.currentRow.id && this.tableData.data.length);
    }
  },
  created() {
    const fullPathFist = this.$route.fullPath.split('/')[1];
    const productAlias = fullPathFist.substring(0, fullPathFist.length - 7);
    const { name } = this.$route;
    this.$set(this.pageInfo, 'productAlias', productAlias);
    this.$set(this.pageInfo, 'pageCode', name);
    this.$set(this.pageInfo, 'pageName', this.$route.meta.title);
    this.$set(this.pageInfo, 'menuCode', name);
    this.$set(this.pageInfo, 'menuName', this.$route.meta.title);
  },
  methods: {
    /**
     * 关键字搜索
     */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refBasicTable, this.modelSearchFilter, () => { this.getPage(); });
    },
    getPage() {
      api.static.getPage({ ...this.pageInfo, field: this.modelSearchFilter }).then(response => {
        this.tableData.data = response.data.rows;
        this.tableData.total = response.data.total;
        this.$nextTick(function() {
          if (this.$refs.refBasicTable) {
            this.$refs.refBasicTable.setCurrentRow(this.tableData.data[0]);
          }
        }
        );
      });
    },
    clickAdd(param) {
      this.$store.dispatch('cacheId', '0');
      if (param === 'add') {
        this.$router.push({ name: `${this.pageInfo.pageCode}Detail`, params: { id: 0 }});
      } else {
        this.$router.push({ name: `${this.pageInfo.pageCode}Detail`, params: { id: this.currentRow.id }});
      }
    },
    currentChangeRow(row) {
      if (row) {
        this.currentRow = row;
      }
    }
  }
};
