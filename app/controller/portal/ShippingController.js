const Controller = require('egg').Controller;
const _ = require('lodash');

module.exports = app => class ShippingController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ProductService = ctx.service.productService;
    this.ShippingService = ctx.service.shippingService;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async add() {
    const response = await this.ShippingService.add(this.request.body);
    this.ctx.body = response;
  }

  async update() {
    const { id } = this.ctx.params;
    const response = await this.ShippingService.update(this.request.body, id);
    this.ctx.body = response;
  }

  async delete() {
    const { id } = this.ctx.params;
    const response = await this.ShippingService.delete(id);
    this.ctx.body = response;
  }

  async getAllShipping() {
    const response = await this.ShippingService.getAllShipping();
    this.ctx.body = response;
  }
};
