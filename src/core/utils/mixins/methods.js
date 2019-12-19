
/**
 * 公共方法
 */
export default {
  methods: {
    /**
     * 获取枚举数据方式
     */
    getEnumData(arrays) {
      for (const obj of arrays) {
        this.$store.dispatch(obj);
      }
    },
    /**
     * 获取浏览器高度
     */
    getInnerHeight() {
      return window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    },
    /**
     * 获取浏览器宽度
     */
    getInnerWidth() {
      return window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    },
    /**
     * 弹框
     * isStrNegative -1 是否加入字符串中
     * */
    isEmpty(str, message, type = 'string') {
      let isTrue = true;
      if (type == 'string' || type == 'number') {
        isTrue = !str;
      } else if (type == 'number-1') {
        isTrue = str == -1;
      }

      if (str == undefined || str == null || isTrue) {
        if (message) {
          this.$message({
            message: '亲，' + message,
            type: 'warning'
          });
        } else {
          this.$message({
            message: '亲，请先选择数据！',
            type: 'warning'
          });
        }
        return false;
      }
      return true;
    },
    /**
     * 是否有当前行
     * */
    isSelectedRow(currentRow, message) {
      if (currentRow == undefined || currentRow == null || currentRow == -1 || !this.$utils.isObject(currentRow) || Object.keys(currentRow).length <= 0) {
        if (message) {
          this.$message({
            message: '亲，' + message,
            type: 'warning'
          });
        } else {
          this.$message({
            message: '亲，请先选择数据！',
            type: 'warning'
          });
        }
        return false;
      }
      return true;
    },
    /**
     * 是否有选择框
     * */
    isSelectedRows(currentRows, message) {
      if (currentRows == undefined || currentRows == null || !this.$utils.isArray(currentRows) || currentRows.length <= 0) {
        if (message) {
          this.$message({
            message: '亲，' + message,
            type: 'warning'
          });
        } else {
          this.$message({
            message: '亲，请先选择数据！',
            type: 'warning'
          });
        }
        return false;
      }
      return true;
    },
    /**
     * 删除方法，eg:直入直出
     * @param data  删除数组列表
     * @param currentRow 当前行
     * @param callBack 删除过滤之后的操作过程
     */
    deleteByIdData(data, currentRow, callBack) {
      let resultAll = data;
      let result = [];
      if (currentRow.id) {
        this.$set(currentRow, 'persistStatus', 'fdel');
        result = this.getNotDeletedData(data);
      } else {
        result = data.filter(item => {
          return item != currentRow;
        });
        resultAll = result;
      }
      currentRow = {};
      if (typeof callBack == 'function') {
        callBack(resultAll, result);
      }
    },
    getNotDeletedData(data) {
      return data.filter(item => {
        return !(item.persistStatus && item.persistStatus == 'fdel');
      });
    },
    /**
     *  根据ID删除数据
     * @param data
     */
    deletedDataById(data) {
      return data.filter(item => {
        if (!item.id) return false;
        this.$set(item, 'persistStatus', 'fdel');
        return true;
      });
    }
  }
};
