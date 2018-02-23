module.exports = app => {
  const checkLogin = app.middleware.checkLogin()
  app.router.post('/order/pay', checkLogin, app.controller.portal.orderController.pay)

  app.router.get('/order/queryOrderPayStatus', checkLogin, app.controller.portal.orderController.queryOrderPayStatus)

  app.router.post('/order/alipaycallback', app.controller.portal.orderController.alipayCallback)
}