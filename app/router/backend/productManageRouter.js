module.exports = app => {
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });

  app.router.post('/manage/product/saveOrUpdate', checkLogin, app.controller.backend.productManageController.saveOrUpdateProduct);

  app.router.post('/manage/product/setSaleStatus', checkLogin, app.controller.backend.productManageController.setSaleStatus);

  app.router.put('/manage/product/setSaleStatus', checkLogin, app.controller.backend.productManageController.setSaleStatus);

  app.router.get('/manage/product/detail/:id', checkLogin, app.controller.backend.productManageController.getDetail);

  app.router.get('/manage/product/list', checkLogin, app.controller.backend.productManageController.getProductList);

  app.router.get('/manage/product/search', checkLogin, app.controller.backend.productManageController.productSearch);

  app.router.put('/manage/upload', checkLogin, app.controller.backend.productManageController.upload);

};
