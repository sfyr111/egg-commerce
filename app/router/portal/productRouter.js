module.exports = app => {
  app.router.get('/product/detail/:id', app.controller.portal.productController.getDetail);

  app.router.get('/product/name/search', app.controller.portal.productController.productSearch);

  app.router.get('/product/categoryId/search', app.controller.portal.productController.getProductListByCategoryId);
};
