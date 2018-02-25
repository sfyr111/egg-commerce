const Controller = require('egg').Controller;
const _ = require('lodash');
const { CHECKED, UN_CHECKED } = require('../../common/cart');

module.exports = app => class CartController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.CartService = ctx.service.cartService;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.ProductService = ctx.service.productService;
  }

  // 添加或更新购物车
  async addOrUpdate() {
    const response = await this.CartService.addOrUpdate(this.request.body);
    this.ctx.body = response;
  }

  // 获取购物车列表
  async getCartList() {
    const response = await this.CartService.getCartListByUserId();
    this.ctx.body = response;
  }

  // 删除购物车
  async deleteCart() {
    const response = await this.CartService.deleteCartByproductIdList(this.request.query);
    this.ctx.body = response;
  }

  // 全选购物车
  async selectAll() {
    const response = await this.CartService.selectOrUnselectAll(CHECKED);
    this.ctx.body = response;
  }

  // 全反选购物车
  async unSelectAll() {
    const response = await this.CartService.selectOrUnselectAll(UN_CHECKED);
    this.ctx.body = response;
  }

  // 选择购物车
  async select() {
    const { productId } = this.ctx.params;
    const response = await this.CartService.selectOrUnselectByProductId(CHECKED, productId);
    this.ctx.body = response;
  }

  // 反选购物车
  async unSelect() {
    const { productId } = this.ctx.params;
    const response = await this.CartService.selectOrUnselectByProductId(UN_CHECKED, productId);
    this.ctx.body = response;
  }

  // 获取购物车产品数量
  async getCartProductCount() {
    const response = await this.CartService.getCartProductCount();
    this.ctx.body = response;
  }
};
