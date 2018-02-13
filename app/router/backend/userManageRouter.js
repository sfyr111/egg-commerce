module.exports = app => {
  app.router.post('/manage/user/login', app.controller.backend.userManageController.login)
}