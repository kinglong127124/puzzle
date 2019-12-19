/**
 * 表格格式化数据字典
 */
export default {
  methods: {
    /**
     *  培训方式 1：外训  2：内训
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatTrainType(row) {
      return this.$utilsBasic.formatName(this.dataDictionary.trainType, row['way']);
    }
  }
};
