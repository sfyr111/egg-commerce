const Controller = require('egg').Controller;
const _ = require('lodash');
const { ROLE_ADMAIN } = require('../../common/role');

class ManageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.UserModel = ctx.model.UserModel;
    this.OrderModel = ctx.model.OrderModel;
    this.ProductModel = ctx.model.ProductModel;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async login() {
    let user,
      response;
    const { username, password } = this.ctx.request.body;
    response = await this.UserService.login(username, password);
    if (response.isSuccess()) {
      user = response.getData();
      if (!user) return this.ctx.body = response
      if (user.role === ROLE_ADMAIN) this.session.currentUser = user;
      else response = this.ServerResponse.createByErrorMsg('无法登录，不是管理员');
    }
    this.ctx.body = response;
  }

  async count() {
    const [ userCount, orderCount, productCount ] = await Promise.all([ this.UserModel.count({}), this.OrderModel.count({}), this.ProductModel.count({}) ])
    this.ctx.body = this.ServerResponse.createBySuccessMsgAndData('总数', {
      userCount,
      orderCount,
      productCount,
    })
  }
}


module.exports = ManageController;
