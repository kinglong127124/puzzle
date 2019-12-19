import { mapState, mapGetters } from 'vuex';

/**
 * 公共混合类
 */
export default {
  computed: {
    ...mapState({
      app: state => state.app,
      screenHeight: state => state.app.screenHeight,
      screenWidth: state => state.app.screenWidth,
      userLogin: state => state.user.login,
      menus: state => state.user.login.menus,
      elements: state => state.user.login.elements,
      dataEnum: state => state.common.dataEnum,
      dataDictionary: state => state.common.dataDictionary,
      dataBasic: state => state.common.dataBasic
    }),
    ...mapGetters([
      'sidebar',
      'menuViews'
    ])
  }
};
