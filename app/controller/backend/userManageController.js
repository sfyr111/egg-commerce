const Controller = require('egg').Controller;
const _ = require('lodash')
const { ROLE_ADMAIN } = require('../../common/role')

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.UserModel = ctx.model.UserModel
    this.ServerResponse = ctx.response.ServerResponse
    this.ResponseCode = ctx.ResponseCode
  }

  async login() {
    let user, response
    const { username, password } = this.ctx.request.body
    response = await this.ctx.service.userService.login(username, password)
    if (response.isSuccess()) {
      user = response.getData()
      if (user.role === ROLE_ADMAIN) this.ctx.session.currentUser = user
      else response = this.ServerResponse.createByErrorMsg('无法登录，不是管理员')
    }
    this.ctx.body = response
  }
}


module.exports = UserController;
