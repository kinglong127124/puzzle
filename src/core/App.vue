<template>
    <div id="app">
        <router-view class="view"/>
    </div>
</template>

<script>
  import { getMenus } from "./api/frame";
  import _import from "./scripts/_import";
  import _import_map from "./scripts/_import_map";
  import { handleMenusApp } from "./scripts/utils";

  export default {
    name: "app",
    methods: {
      async init() {
        console.log('this.$router', this.$router);
        if(!this.$store.getters.frame.routerStatic){
          document.title = PUZZLE_CONFIG.appName;
          // 获取缓存map
          const modulesMap = await _import_map();

          // 获取架构
          let frame = await _import(
            "frames",
            PUZZLE_CONFIG.frame,//localStorage.getItem("frame") ||
            modulesMap
          );
          this.$router.addRoutes(frame.routerStatic);
          console.log('frame.routerStatic', frame.routerStatic);
          this.$store.commit("MODULES_MAP", modulesMap);
          this.$store.commit("FRAME", frame);
        }

        // console.time('async init');
        // document.title = PUZZLE_CONFIG.appName;
        // // 获取缓存map
        // const modulesMap = await _import_map();
        //
        // // 获取架构
        // let frame = await _import(
        //   "frames",
        //   PUZZLE_CONFIG.frame,//localStorage.getItem("frame") ||
        //   modulesMap
        // );
        // this.$router.addRoutes(frame.routerStatic);
        // console.log('frame.routerStatic', frame.routerStatic);
        // this.$store.commit("MODULES_MAP", modulesMap);
        // this.$store.commit("FRAME", frame);
        // let rootMenus = this.$store.getters.rootMenus;
        // console.log('rootMenus', rootMenus);
        // console.timeEnd('async init');
        // if (rootMenus.length > 0) {
        //   // 嵌套路由 / 默认两级路由
        //   let childRouter = frame.routerStatic.filter(item => item.path == "/");
        //   //动态加载Store
        //   for (let name in frame.store)
        //     this.$store.registerModule(name, frame.store[name]);
        //   let pages = childRouter[0].children;
        //   let routesMenuLeaf = [];
        //   console.time('模块加载');
        //   // 获取模块 / 异步获取
        //   for (let puzzle of rootMenus) {
        //     this.$set(puzzle, 'id', puzzle.code);
        //     this.$set(puzzle, 'page', puzzle.href);
        //     this.$set(puzzle, 'name', puzzle.title);
        //     this.$set(puzzle, 'puzzle', puzzle.code);
        //     if (puzzle.type == 'menu') {
        //       this.$set(puzzle, 'leaf', true);
        //     } else {
        //       this.$set(puzzle, 'leaf', false);
        //     }
        //     _import("puzzles", puzzle.id, modulesMap)
        //       .then(p => {
        //         // 需要生成路由的菜单
        //         let menusRouter = [];
        //         handleMenusApp(this, puzzle.children, menusRouter);
        //         // console.log('menusRouter', menusRouter);
        //         // 路由
        //         const pMenusRouter = p.router(menusRouter, puzzle.id);
        //         childRouter[0].children = pMenusRouter
        //           .concat(p.routerStatic);
        //         pages.push(...childRouter[0].children);
        //         routesMenuLeaf.push(...pMenusRouter);
        //         this.$router.addRoutes(childRouter);
        //         // Store
        //         for (let name in p.store)
        //           this.$store.registerModule(name, p.store[name]);
        //       })
        //       .catch(err => {
        //       });
        //   }
        //   console.timeEnd('模块加载');
        //   // 储存路由表
        //   this.$store.commit("SET_PAGES", pages);
        //   // console.log('SET_PAGES', pages);
        //   this.$store.commit("SET_ROUTES_MENU_LEAF", routesMenuLeaf);
        //   this.$store.commit("SET_ROUTERS", frame.routerStatic.concat(pages));
        //   // console.log('pages', pages, frame.routerStatic.concat(pages));
        //
        // }
      }
    },
    created() {
      this.init()
        .then(() => {
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
</script>
