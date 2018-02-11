const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const user = await this.ctx.service.userService.find(321)
    this.ctx.body = user
  }

  async login() {
    const { username, password } = this.ctx.request.body
    const user = await this.ctx.service.userService.login(username, password).then(data => data.toJSON())
    this.ctx.body = user
  }
}

module.exports = UserController;
