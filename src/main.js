import { createSSRApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import createSSRRouter from "./router/index";
import App from "./App.vue";
import { createSSRStore, key } from "./store/index";
import { sync } from "vuex-router-sync";

export function createApp() {
  const app = createSSRApp(App);
  const store = createSSRStore();
  const router = createSSRRouter();
  //同步路由状态到vuex中
  sync(store, router);
  app.use(store, key);
  app.use(router);
  app.use(ElementPlus);
  return { app, router, store };
}
export function asyncDataFilter(actived, store, route) {
  return Promise.all(
    actived.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route,
        });
      }
    })
  );
}
