module.exports = app => {
  app.router.post('/manage/category/addCategory', app.controller.backend.categoryManageController.addCategory);

  app.router.put('/manage/category/updateCategoryName', app.controller.backend.categoryManageController.updateCategoryName);

  app.router.get('/manage/category/parentId/:parentId', app.controller.backend.categoryManageController.getChildParallelCagtegory);

  app.router.get('/manage/category/deep/parentId/:parentId', app.controller.backend.categoryManageController.getCategoryAndDeepChildCategory);
};
