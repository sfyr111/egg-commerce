const Controller = require('egg').Controller;
const _ = require('lodash')

class categoryManageController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.session = ctx.session
    this.resquest = ctx.request
    this.UserService = ctx.service.userService
    this.ResponseCode = ctx.response.ResponseCode
    this.ServerResponse = ctx.response.ServerResponse
    this.CategoryManageService = ctx.service.categoryManageService
  }

  // 添加类别
  async addCategory() {
    let response
    // 默认0 根节点
    const { name, parentId = 0 } = this.resquest.body
    // 判断登录及用是否为管理员
    const user = this.session.currentUser
    if (!user) response = this.ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, '用户未登录, 请登录')
    response = await this.UserService.checkAdminRole(user)
    if (!response.isSuccess()) response = this.ServerResponse.createByErrorMsg('无权限操作, 需要管理员权限')
    else {
      // TODO 是管理员 增加分类逻辑
      response = await this.CategoryManageService.addCategory(name, parentId)
    }
    this.ctx.body = response
  }

  // 更新品类的name
  async updateCategoryName() {
    let response
    const { name, id } = this.resquest.body
    // 判断登录及用是否为管理员
    const user = this.session.currentUser
    if (!user) response = this.ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, '用户未登录, 请登录')
    response = await this.UserService.checkAdminRole(user)
    if (!response.isSuccess()) response = this.ServerResponse.createByErrorMsg('无权限操作, 需要管理员权限')
    else {
      // TODO 是管理员 更新类别name
      response = await this.CategoryManageService.updateCategoryName(name, id)
    }

    this.ctx.body = response
  }
}


module.exports = categoryManageController;
