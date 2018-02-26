const Controller = require('egg').Controller;
const _ = require('lodash');

module.exports = app => class OrderController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.UserService = ctx.service.userService;
    this.OrderService = ctx.service.orderService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ProductService = ctx.service.productService;
    this.ServerResponse = ctx.response.ServerResponse;
    this.ShippingService = ctx.service.shippingService;
  }

  async list() {
    const response = await this.OrderService.getList(this.request.query);
    this.ctx.body = response;
  }

  async search() {
    const response = await this.OrderService.search(this.request.query);
    this.ctx.body = response;
  }

  async detail() {
    const { orderNum } = this.request.query
    const response = await this.OrderService.getDetail(orderNum);
    this.ctx.body = response;
  }

  async sendGood() {
    const { orderNum } = this.request.body
    const response = await this.OrderService.manageSendGood(orderNum);
    this.ctx.body = response;
  }
};
