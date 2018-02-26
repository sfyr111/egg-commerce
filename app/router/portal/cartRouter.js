module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  app.router.post('/cart/update', checkLogin, app.controller.portal.cartController.addOrUpdate);

  app.router.get('/cart/list', checkLogin, app.controller.portal.cartController.getCartList);

  app.router.delete('/cart/delete', checkLogin, app.controller.portal.cartController.deleteCart);

  app.router.put('/cart/selectAll', checkLogin, app.controller.portal.cartController.selectAll);

  app.router.put('/cart/unSelectAll', checkLogin, app.controller.portal.cartController.unSelectAll);

  app.router.put('/cart/select/:productId', checkLogin, app.controller.portal.cartController.select);

  app.router.put('/cart/unSelect/:productId', checkLogin, app.controller.portal.cartController.unSelect);

  app.router.get('/cart/count', checkLogin, app.controller.portal.cartController.getCartProductCount);
};
