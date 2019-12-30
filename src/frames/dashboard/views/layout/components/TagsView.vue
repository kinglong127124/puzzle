<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        <item :icon="tag.meta.icon" :title="tag.title" type="tag"/>
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@core/components/ScrollPane';
import path from 'path';
import Item from './Sidebar/Item';
export default {
  name: 'TagsView',
  components: { Item, ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView ? this.$store.state.tagsView.visitedViews : [];
    },
    routers() {
      return this.$store.state.permission.routers;
    }
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    }
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          tags.push({
            path: path.resolve(basePath, route.path),
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });

      return tags;
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routers);
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('addVisitedView', tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('addView', this);
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);

            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route);
            }

            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', this).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews);
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags(view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews);
      });
    },
    closeAllTagsProduct() {
      this.$store.dispatch('delAllViewsProduct').then(({ visitedViews }) => {
        // if (this.affixTags.some(tag => tag.path === view.path)) {
        //   return
        // }
        // this.toLastView(visitedViews)
      });
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        // You can set another route
        this.$router.push('/');
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY;

      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 36px;
  width: 100%;
  background: #EEF0F6;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      color: #495060;
      background: transparent;
      padding: 0 10px;
      font-size: 12px;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #fff;
        color: #409eff;
      }
      &.active:hover {
        color: #409eff;
      }
    }
    .tags-view-item:hover{
      color: #409eff;
    }
    /deep/ {
      .el-scrollbar__wrap {
        height: 55px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    background: transparent;
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 0;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #FD517E;
        color: #fff;
      }
    }
    .svg-icon{
      height: 10px;
    }
  }
}
</style>
