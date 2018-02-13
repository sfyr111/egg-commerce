module.exports = app => {
  app.router.post('/manage/category/addCategory', app.controller.backend.categoryManageController.addCategory)

  app.router.put('/manage/category/updateCategoryName', app.controller.backend.categoryManageController.updateCategoryName)
}