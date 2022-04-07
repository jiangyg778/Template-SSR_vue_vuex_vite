import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
const home = () => import("../views/home/index.vue");
const mine = () => import("../views/mine/index.vue");
const routes = [
  {
    path: "/home", // 路由路径
    name: "home", // 路由名称
    component: home, // 路由所映射到的组件
    meta: {
      // 一些meta配置
      meta: "",
      keepAlive: false,
    },
  },
  {
    path: "/",
    name: "mine",
    component: mine,
    meta: {
      meta: "",
      keepAlive: false,
    },
  },
];
export default function createSSRRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
