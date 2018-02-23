const Controller = require('egg').Controller;
const _ = require('lodash')

module.exports = app => class OrderController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.session = ctx.session
    this.request = ctx.request
    this.UserService = ctx.service.userService
    this.OrderService = ctx.service.orderService
    this.ResponseCode = ctx.response.ResponseCode
    this.ProductService = ctx.service.productService
    this.ServerResponse = ctx.response.ServerResponse
    this.ShippingService = ctx.service.shippingService
  }

  async pay() {
    const response = await this.OrderService.pay()
    this.ctx.body = response
  }

  async queryOrderPayStatus() {
    const { orderNum } = this.request.query
    const response = await this.OrderService.queryOrderPayStatus(orderNum)
    this.ctx.body = response
  }

  async alipayCallback() {
    // 验证回调是否为支付宝发起，避免重复
    const body = this.ctx.request.body
    const response = await this.OrderService.alipayCallback(body)
    this.ctx.body = response
  }
}
