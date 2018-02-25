const Controller = require('egg').Controller;
const _ = require('lodash');

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.resquest = ctx.request;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.ProductService = ctx.service.productService;
  }

  // 获取商品详情
  async getDetail() {
    const { id } = this.ctx.params;
    const response = await this.ProductService.getDetail(id);
    this.ctx.body = response;
  }

  // 根据产品名称搜索
  async productSearch() {
    const response = await this.ProductService.productSearch(this.ctx.query);
    this.ctx.body = response;
  }

  // 根据分类id 进行搜索
  async getProductListByCategoryId() {
    const response = await this.ProductService.getProductListByCategoryId(this.ctx.query);
    this.ctx.body = response;
  }
}


module.exports = ProductController;
