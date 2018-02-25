const Service = require('egg').Service;
const _ = require('lodash');
const { ON_SALE } = require('../common/product');

class ProductService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ProductModel = ctx.model.ProductModel;
    this.CategoryModel = ctx.model.CategoryModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @feature 返回商品详情
   * @param id {Number} 商品id
   * @return {Promise.<*>}
   */
  async getDetail(id) {
    if (!id) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const productRow = await this.ProductModel.findOne({ where: { id } });
    if (!productRow) return this.ServerResponse.createByErrorMsg('不存在或已删除');
    if (productRow.get('status') !== ON_SALE.CODE) return this.ServerResponse.createByErrorMsg('产品已下架');
    return this.ServerResponse.createBySuccessData(productRow.toJSON());
  }

  /**
   * @feature 根据产品名称搜索
   * @param productName {String}
   * @param pageNum {Number}
   * @param pageSize {Number}
   * @return {Promise.<*>}
   */
  async productSearch({ productName, pageNum = 1, pageSize = 10, sortBy = 'asc' }) {
    const { count, rows } = await this.ProductModel.findAndCount({
      // attributes: { exclude: ['createTime', 'updateTime'] },
      where: { name: { $like: `%${productName}%` }, status: ON_SALE.CODE },
      order: [[ 'price', sortBy ]],
      limit: Number(pageSize | 0),
      offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
    });
    if (rows.length < 1) this.ServerResponse.createBySuccessMsg('无产品数据');
    rows.forEach(row => row && row.toJSON());
    return this.ServerResponse.createBySuccessData({
      pageNum,
      pageSize,
      list: rows,
      total: count,
      host: this.config.oss.client.endpoint,
    });
  }

  /**
   * @feature 根据分类信息搜索产品
   * @param categoryName {String}
   * @param categoryId {Number}
   * @param pageNum {Number}
   * @param pageSize {Number}
   * @return {Promise.<*>}
   */
  async getProductListByCategoryId({ categoryName, categoryId, pageNum = 1, pageSize = 10, sortBy = 'asc' }) {
    if (!categoryName && !categoryId) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    if (categoryName || !categoryId) {
      const { id } = this.CategoryModel.findOne({ where: { $like: categoryName } }).then(row => row && row.toJSON());
      categoryId = id;
    }
    const { data: categoryIdArr } = await this.ctx.service.categoryManageService.getCategoryAndDeepChildCategory(categoryId);
    const { count, rows } = await this.ProductModel.findAndCount({
      where: { categoryId: { $in: categoryIdArr }, status: ON_SALE.CODE },
      order: [[ 'price', sortBy ]],
      limit: Number(pageSize | 0),
      offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
    });
    if (rows.length < 1) this.ServerResponse.createBySuccessMsg('无产品数据');
    rows.forEach(row => row && row.toJSON());
    return this.ServerResponse.createBySuccessData({
      pageNum,
      pageSize,
      categoryName,
      list: rows,
      total: count,
      host: this.config.oss.client.endpoint,
    });
  }
}

module.exports = ProductService;
