<template>
  <router-view class="view" />
</template>

<script>
import { getMenus } from "./api/frame";
import _import from "./scripts/_import";
import _import_map from "./scripts/_import_map";
import { handleMenus } from "./scripts/utils";

export default {
  name: "app",
  methods: {
    async init() {
      document.title = PUZZLE_CONFIG.appName;
        this.$store.dispatch('GetInfo').then(async response => { // 拉取user_info
          console.log('GetInfo', response);
          // store.dispatch('RootMenusSelected', selectedCode);
      let rootMenus = this.$store.getters.rootMenus;
      // console.log('menus1', rootMenus);
          let res = await getMenus();

          // 保存菜单
          let menus = res.data;
          this.$store.commit("SET_MENUS", rootMenus);
          console.log('menus', menus);
          // 获取缓存map
          const modulesMap = await _import_map();

          // 获取架构
          let frame = await _import(
            "frames",
            PUZZLE_CONFIG.frame,//localStorage.getItem("frame") ||
            modulesMap
          );
          this.$router.addRoutes(frame.routerStatic);
          // 嵌套路由 / 默认两级路由
          let childRouter = frame.routerStatic.filter(item => item.path == "/");
          // Store
          for (let name in frame.store)
            this.$store.registerModule(name, frame.store[name]);

          let pages = childRouter[0].children;
          // 获取模块 / 异步获取
          for (let puzzle of rootMenus) {
            this.$set(puzzle, 'id', puzzle.code);
            this.$set(puzzle, 'page', puzzle.href);
            this.$set(puzzle, 'name', puzzle.title);
            this.$set(puzzle, 'puzzle', puzzle.code);
            if (puzzle.type == 'menu'){
              this.$set(puzzle, 'leaf', true);
            }else{
              this.$set(puzzle, 'leaf', false);
            }
            _import("puzzles", puzzle.id, modulesMap)
              .then(p => {
                // 需要生成路由的菜单
                let menusRouter = [];
                handleMenus(this, puzzle.children, menusRouter);
                console.log('menusRouter', menusRouter);
                // 路由
                childRouter[0].children = p
                  .router(menusRouter, puzzle.id)
                  .concat(p.routerStatic);
                pages.push(...childRouter[0].children);
                this.$router.addRoutes(childRouter);
                // Store
                for (let name in p.store)
                  this.$store.registerModule(name, p.store[name]);
              })
              .catch(err => {
              });
          }
            // 储存路由表
            this.$store.commit("SET_PAGES", pages);
            console.log('pages', pages);
        }).catch((err) => {
          console.log(err);
          // this.$store.dispatch('FedLogOut').then(() => {
          //   this.$router.push({path: '/'});
          // });
        });
    }
  },
  created() {
    this.init()
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
