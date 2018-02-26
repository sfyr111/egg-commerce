module.exports = app => {
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  app.router.post('/manage/category/addCategory', checkLogin, app.controller.backend.categoryManageController.addCategory);

  app.router.put('/manage/category/updateCategoryName', checkLogin, app.controller.backend.categoryManageController.updateCategoryName);

  app.router.get('/manage/category/parentId/:parentId', checkLogin, app.controller.backend.categoryManageController.getChildParallelCagtegory);

  app.router.get('/manage/category/deep/parentId/:parentId', checkLogin, app.controller.backend.categoryManageController.getCategoryAndDeepChildCategory);
};
