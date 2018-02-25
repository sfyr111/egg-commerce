const Service = require('egg').Service;
const _ = require('lodash');

class ProductManageService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ProductModel = ctx.model.ProductModel;
    this.CategoryModel = ctx.model.CategoryModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @feature 增加或更新产品
   * @param product {Object} -id 有id 更新，没id 增加
   * @return {Promise.<*>}
   */
  async saveOrUpdateProduct(product) {
    if (!product) return this.ServerResponse.createByErrorMsg('新增或更新产品参数不正确');
    const subImgArr = product.subImages.split(',');
    if (subImgArr.length > 0) product.mainImage = subImgArr[0];
    const resultRow = await this.ProductModel.findOne({ where: { id: product.id } });
    let productRow,
      addOrUpdate;
    if (!resultRow) {
      // TODO 添加
      productRow = await this.ProductModel.create(product);
      addOrUpdate = '添加';
      if (!productRow) return this.ServerResponse.createByErrorMsg('添加产品失败');
    } else {
      // TODO 更新
      const [ updateCount, [ updateRow ]] = await this.ProductModel.update(product, {
        where: { id: product.id },
        individualHooks: true,
      });
      addOrUpdate = '更新';
      if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新产品失败');
      productRow = updateRow;
    }
    return this.ServerResponse.createBySuccessMsgAndData(`${addOrUpdate}产品成功`, productRow.toJSON());
  }

  /**
   * @feature 修改产品销售状态
   * @param id {Number} 产品id
   * @param status {Number} 产品销售状态
   * @return {Promise.<*>}
   */
  async setSaleStatus(id, status) {
    if (!id || !status) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const [ updateCount, [ updateRow ]] = await this.ProductModel.update({ status }, { where: { id }, individualHooks: true });
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('修改产品销售状态失败');
    return this.ServerResponse.createBySuccessMsgAndData('修改产品销售状态成功', updateRow.toJSON());
  }

  /**
   * @feature 获取商品详情
   * @param id {Number} 商品id
   * @return {Promise.<*>}
   */
  async getDetail(id) {
    if (!id) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const productRow = await this.ProductModel.findOne({
      // attributes: { exclude: ['createTime', 'updateTime'] },
      where: { id },
      // include: [
      //   { model: this.CategoryModel, as: 'categoryId', attributes: ['name'] }
      // ]
    });
    if (!productRow) this.ServerResponse.createByErrorMsg('产品已下架或删除');
    return this.ServerResponse.createBySuccessData(productRow.toJSON());
  }

  /**
   * @feature 产品列表获取
   * @param pageNum {Number} 页数
   * @param pageSize {Number} limit
   * @return {Promise.<*>}
   */
  async getProductList({ pageNum = 1, pageSize = 10 }) {
    const { count, rows } = await this.ProductModel.findAndCount({
      // attributes: { exclude: ['createTime', 'updateTime'] },
      order: [[ 'id', 'ASC' ]],
      limit: Number(pageSize | 0),
      offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
    });
    if (rows.length < 1) this.ServerResponse.createBySuccessMsg('已无产品数据');
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
   * @feature 后台产品搜索
   * @param pageNum {Number}
   * @param pageSize {Number}
   * @param productName {String}
   * @param productId {Number}
   * @return {Promise.<void>}
   */
  async productSearch({ pageNum = 1, pageSize = 10, productName, productId }) {
    if (productId && !productName) {
      // TODO 按id 搜索 返回一条产品
      const product = await this.ProductModel.findOne({ where: { id: productId } }).then(row => row && row.toJSON());
      if (!product) return this.ServerResponse.createByErrorMsg('产品id错误');
      return this.ServerResponse.createBySuccessData({
        product,
        host: this.config.oss.client.endpoint,
      });
    } else if (productName && !productId) {
      // TODO 按名称分页搜索 返回产品列表
      const { count, rows } = await this.ProductModel.findAndCount({
        // attributes: { exclude: ['createTime', 'updateTime'] },
        where: { name: { $like: `%${productName}%` } },
        order: [[ 'id', 'ASC' ]],
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
    return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
  }

}

module.exports = ProductManageService;
