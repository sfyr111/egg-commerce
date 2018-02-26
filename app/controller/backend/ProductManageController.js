const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const _ = require('lodash');

class ProductManageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.resquest = ctx.request;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.ProductManageService = ctx.service.productManageService;
    this.CategoryManageService = ctx.service.categoryManageService;
  }

  // 添加产品
  async saveOrUpdateProduct() {
    const product = this.resquest.body;
    const response = await this.ProductManageService.saveOrUpdateProduct(product);
    this.ctx.body = response;
  }

  // 产品上下架
  async setSaleStatus() {
    const { id, status } = this.resquest.body;
    const response = await this.ProductManageService.setSaleStatus(id, status);
    this.ctx.body = response;
  }

  // 获取产品详情
  async getDetail() {
    const { id } = this.ctx.params;
    const response = await this.ProductManageService.getDetail(id);
    this.ctx.body = response;
  }
  // 获取产品列表
  async getProductList() {
    const response = await this.ProductManageService.getProductList(this.resquest.query);
    this.ctx.body = response;
  }

  // 后台产品搜索
  async productSearch() {
    const response = await this.ProductManageService.productSearch(this.resquest.query);
    this.ctx.body = response;
  }

  // 上传图片
  async upload() {
    let response
    const stream = await this.ctx.getFileStream();
    const extname = path.extname(stream.filename);
    const name = path.basename(stream.filename, extname);
    const filename = name + Date.now() + extname;
    let result;
    try {
      // 本地上传
      const ws = fs.createWriteStream(path.resolve('app/public/' + filename));
      stream.pipe(ws);
      // oss 服务
      // result = await this.ctx.oss.put(name + now, stream)
    } catch (e) {
      await sendToWormhole(stream);
      throw new Error(e);
      response = this.ServerResponse.createByError('上传图片失败');
    } finally { await sendToWormhole(stream); }
    response = this.ServerResponse.createBySuccessMsgAndData('上传图片成功', {
      filename,
      url: result ? result.url : 'localhost:7001/public/' + filename,
      fields: stream.fields,
    });
    this.ctx.body = response;
  }

  // 富文本图片上传，对返回值有特别要求 simditor
  // async richUpload() {
  //   this.ctx.body = {
  //     success: true / false,
  //     msg: 'error message',
  //     file_path: '[real file path]'
  //   }
  // }
}


module.exports = ProductManageController;
