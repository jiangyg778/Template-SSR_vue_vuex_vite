import { createApp, asyncDataFilter } from "./main";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
// 激活现有html最佳时机是在路由准备好之后,否则会激活失败
router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    const toComponents = router
      .resolve(to)
      .matched.flatMap((record) => Object.values(record.components));
    const fromComponents = router
      .resolve(from)
      .matched.flatMap((record) => Object.values(record.components));

    const actived = toComponents.filter((c, i) => {
      return fromComponents[i] !== c;
    });

    if (!actived.length) {
      return next();
    }
    console.log("开始loading。。。。。");
    asyncDataFilter(actived, store, router.currentRoute).then(() => {
      console.log("结束loading。。。。。");
      next();
    });
  });

  app.mount("#app");
});
