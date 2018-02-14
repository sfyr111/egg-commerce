const Controller = require('egg').Controller;
const _ = require('lodash')

class ProductManageController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.session = ctx.session
    this.resquest = ctx.request
    this.UserService = ctx.service.userService
    this.ResponseCode = ctx.response.ResponseCode
    this.ServerResponse = ctx.response.ServerResponse
    this.ProductManageService = ctx.service.productManageService
    this.CategoryManageService = ctx.service.categoryManageService
  }

  // 添加产品
  async saveOrUpdateProduct() {
    const product = this.resquest.body
    let response = await this.UserService.checkAdminAndLogin()
    if (response.isSuccess()) {
      // TODO 验证通过 添加逻辑
      response = await this.ProductManageService.saveOrUpdateProduct(product)
    }
    this.ctx.body = response
  }

  // 产品上下架
  async setSaleStatus() {
    const { id, status } = this.resquest.body
    let response = await this.UserService.checkAdminAndLogin()
    if (response.isSuccess()) {
      // TODO 验证通过 添加逻辑
      response = await this.ProductManageService.setSaleStatus(id, status)
    }
    this.ctx.body = response
  }
}


module.exports = ProductManageController;
