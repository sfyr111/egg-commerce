module.exports = app => {
  app.router.post('/manage/product/saveOrUpdate', app.controller.backend.productManageController.saveOrUpdateProduct);

  app.router.post('/manage/product/setSaleStatus', app.controller.backend.productManageController.setSaleStatus);

  app.router.put('/manage/product/setSaleStatus', app.controller.backend.productManageController.setSaleStatus);

  app.router.get('/manage/product/detail/:id', app.controller.backend.productManageController.getDetail);

  app.router.get('/manage/product/list', app.controller.backend.productManageController.getProductList);

  app.router.get('/manage/product/search', app.controller.backend.productManageController.productSearch);

  app.router.put('/manage/upload', app.controller.backend.productManageController.upload);

};
