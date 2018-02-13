const Service = require('egg').Service
const _ = require('lodash')

class CategoryManageService extends Service {
  constructor(ctx) {
    super(ctx)
    this.CategoryModel = ctx.model.CategoryModel
    this.ServerResponse = ctx.response.ServerResponse
  }

  /**
   * @feature 添加分类
   * @param name {String} 类别名称
   * @param parentId {Number} 父类别id
   * @returns {*}
   */
  async addCategory(name, parentId = 0) {
    if (!name.trim()) return this.ServerResponse.createByErrorMsg('添加品类参数错误')
    const category = await this.CategoryModel.create({ name, parentId })
    if (!category) return this.ServerResponse.createByErrorMsg('添加品类失败')
    return this.ServerResponse.createBySuccessMsg('添加品类成功')
  }

  /**
   * @feature 更新类别名称
   * @param name {String} 类别名称
   * @param id {Number} 类别id
   * @returns {Promise.<ServerResponse>}
   */
  async updateCategoryName(name, id) {
    if (!name.trim() || !id) return this.ServerResponse.createByErrorMsg('更新品类名称参数错误')
    const [updateCount, [updateRow]] = await this.CategoryModel.update({ name }, { where: { id }, individualHooks: true })
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新品类名称错误')
    const category = updateRow.toJSON()
    return this.ServerResponse.createBySuccessMsgAndData('更新品类名称成功', category)
  }
}

module.exports = CategoryManageService
