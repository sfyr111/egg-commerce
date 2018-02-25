const Controller = require('egg').Controller;
const _ = require('lodash');

class CategoryManageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.resquest = ctx.request;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.CategoryManageService = ctx.service.categoryManageService;
  }

  // 添加类别
  async addCategory() {
    // 默认0 根节点
    const { name, parentId = 0 } = this.resquest.body;
    let response = await this.UserService.checkAdminAndLogin();
    if (response.isSuccess()) {
      // TODO 是管理员 增加分类逻辑
      response = await this.CategoryManageService.addCategory(name, parentId);
    }
    this.ctx.body = response;
  }

  // 更新品类的name
  async updateCategoryName() {
    const { name, id } = this.resquest.body;
    let response = await this.UserService.checkAdminAndLogin();
    if (response.isSuccess()) {
      // TODO 是管理员 更新类别name
      response = await this.CategoryManageService.updateCategoryName(name, id);
    }

    this.ctx.body = response;
  }

  // 获取某分类下平级子分类
  async getChildParallelCagtegory() {
    const { parentId = 0 } = this.ctx.params;
    let response = await this.UserService.checkAdminAndLogin();
    if (response.isSuccess()) {
      // TODO 查询子节点的category 信息，平级查询不递归
      response = await this.CategoryManageService.getChildParallelCagtegory(parentId);
    }
    this.ctx.body = response;
  }

  // 获取某分类下的递归子分类,  返回的是Array<id>
  async getCategoryAndDeepChildCategory() {
    const { parentId = 0 } = this.ctx.params;
    let response = await this.UserService.checkAdminAndLogin();
    if (response.isSuccess()) {
      // TODO 查询子节点的category 信息，递归查询
      response = await this.CategoryManageService.getCategoryAndDeepChildCategory(parentId);
    }
    this.ctx.body = response;
  }

  // 判断登录及用是否为管理员
  // async UserService.checkAdminAndLogin() {
  //   const user = this.session.currentUser
  //   if (!user) return this.ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, '用户未登录, 请登录')
  //   const response = await this.UserService.checkAdminRole(user)
  //   if (!response.isSuccess()) return this.ServerResponse.createByErrorMsg('无权限操作, 需要管理员权限')
  //   return this.ServerResponse.createBySuccess()
  // }
}


module.exports = CategoryManageController;
