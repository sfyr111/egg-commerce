module.exports = app => {
  app.router.post('/manage/product/saveOrUpdate', app.controller.backend.productManageController.saveOrUpdateProduct)

  app.router.post('/manage/product/setSaleStatus', app.controller.backend.productManageController.setSaleStatus)

  app.router.put('/manage/product/setSaleStatus', app.controller.backend.productManageController.setSaleStatus)

}