module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  app.router.post('/order/pay', checkLogin, app.controller.portal.orderController.pay);

  app.router.get('/order/queryOrderPayStatus', checkLogin, app.controller.portal.orderController.queryOrderPayStatus);

  app.router.post('/order/alipaycallback', app.controller.portal.orderController.alipayCallback);

  app.router.post('/order/mobilePay', checkLogin, app.controller.portal.orderController.mobilePay);

  app.router.post('/order/create', checkLogin, app.controller.portal.orderController.create);

  app.router.put('/order/cancel', checkLogin, app.controller.portal.orderController.cancel);

  app.router.get('/order/getOrderCartProduct', checkLogin, app.controller.portal.orderController.getOrderCartProduct);

  app.router.get('/order/list', checkLogin, app.controller.portal.orderController.list);

  app.router.get('/order/detail', checkLogin, app.controller.portal.orderController.detail);
};
