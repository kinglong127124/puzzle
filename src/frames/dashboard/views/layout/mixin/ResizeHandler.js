import store from '@core/store';

const { body } = document;
const WIDTH = 1100; // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('closeSideBar', { withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile');
      store.dispatch('closeSideBar', { withoutAnimation: true });
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          store.dispatch('closeSideBar', { withoutAnimation: true });
        }
      }
      const innerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      store.dispatch('screenHeight', { innerHeight: innerHeight });
      const innerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      store.dispatch('screenWidth', { innerWidth: innerWidth });
    }
  }
};
