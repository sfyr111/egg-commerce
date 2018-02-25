const Service = require('egg').Service;
const _ = require('lodash');

class CategoryManageService extends Service {
  constructor(ctx) {
    super(ctx);
    this.CategoryModel = ctx.model.CategoryModel;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @feature 添加分类
   * @param name {String} 类别名称
   * @param parentId {Number} 父类别id
   * @return {*}
   */
  async addCategory(name, parentId = 0) {
    if (!name.trim()) return this.ServerResponse.createByErrorMsg('添加品类参数错误');
    const categoryRow = await this.CategoryModel.create({ name, parentId });
    if (!categoryRow) return this.ServerResponse.createByErrorMsg('添加品类失败');
    const category = categoryRow.toJSON();
    return this.ServerResponse.createBySuccessMsgAndData('添加品类成功', category);
  }

  /**
   * @feature 更新类别名称
   * @param name {String} 类别名称
   * @param id {Number} 类别id
   * @return {Promise.<ServerResponse>}
   */
  async updateCategoryName(name, id) {
    if (!name.trim() || !id) return this.ServerResponse.createByErrorMsg('更新品类名称参数错误');
    const [ updateCount, [ updateRow ]] = await this.CategoryModel.update({ name }, { where: { id }, individualHooks: true });
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新品类名称错误');
    const category = updateRow.toJSON();
    return this.ServerResponse.createBySuccessMsgAndData('更新品类名称成功', category);
  }

  /**
   * @feature 获取某分类下的平级子分类
   * @param parentId
   * @return {Promise.<*>}
   */
  async getChildParallelCagtegory(parentId = 0) {
    const cagtegoryRows = await this.CategoryModel.findAll({
      attributes: [ 'id', 'parentId', 'name', 'status' ],
      where: { parentId },
    }).then(rows => rows && rows.map(r => r.toJSON()));
    if (cagtegoryRows.length < 1) {
      // return this.ServerResponse.createByErrorMsg('未找到当前分类的子分类')
      this.ctx.logger.info('getChildParallelCagtegory: 未找到当前分类的子分类');
    }
    return this.ServerResponse.createBySuccessData(cagtegoryRows);
  }

  /**
   * @feature 递归查询本节点的id及孩子父节点的id
   * @param {Number} categoryId
   */
  async getCategoryAndDeepChildCategory(categoryId = 0) {
    const categoryIdSet = new Set();
    const categoryList = await this._findChildCategory(categoryId);
    const categoryUniqList = _.uniqWith(categoryList, _.isEqual);
    await categoryUniqList.forEach(item => categoryIdSet.add(item.id));
    return this.ServerResponse.createBySuccessData(Array.from(categoryIdSet));
  }

  async _findChildCategory(categoryId, arr = []) {
    const category = await this.CategoryModel.findOne({
      attributes: [ 'id', 'parentId', 'name', 'status' ],
      where: { id: categoryId },
    }).then(row => row && row.toJSON());
    if (category) arr.push(category);
    const categoryList = await this.CategoryModel.findAll({
      attributes: [ 'id', 'parentId', 'name', 'status' ],
      where: { parentId: categoryId },
    });
    if (categoryList.length < 1) return arr;
    let i = 0;
    while (i < categoryList.length) {
      await this._findChildCategory(categoryList[i++].get('id'), arr);
    }
    return arr;
  }
}

module.exports = CategoryManageService;
