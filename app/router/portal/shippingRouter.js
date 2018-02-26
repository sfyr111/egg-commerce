module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  app.router.get('/shipping/list', checkLogin, app.controller.portal.shippingController.getAllShipping);

  app.router.post('/shipping/add', checkLogin, app.controller.portal.shippingController.add);

  app.router.put('/shipping/update/:id', checkLogin, app.controller.portal.shippingController.update);

  app.router.delete('/shipping/delete/:id', checkLogin, app.controller.portal.shippingController.delete);
};
