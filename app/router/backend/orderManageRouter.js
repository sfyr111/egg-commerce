module.exports = app => {
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  app.router.get('/manage/order/detail', checkLogin, app.controller.backend.orderManageController.detail);

  app.router.get('/manage/order/list', checkLogin, app.controller.backend.orderManageController.list);

  app.router.get('/manage/order/search', checkLogin, app.controller.backend.orderManageController.search);

  app.router.put('/manage/order/sendGood', checkLogin, app.controller.backend.orderManageController.sendGood);
};
