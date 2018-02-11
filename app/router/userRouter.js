module.exports = app => {
  app.router.post('/user/login', app.controller.portal.userController.login);
}