module.exports = app => {
  app.router.post('/manage/user/login', app.controller.backend.manageController.login);
  app.router.get('/manage/count', app.controller.backend.manageController.count);
};
