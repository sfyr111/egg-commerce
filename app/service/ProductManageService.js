const Service = require('egg').Service
const _ = require('lodash')

class ProductManageService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ProductModel = ctx.model.ProductModel
    this.CategoryModel = ctx.model.CategoryModel
    this.ResponseCode = ctx.response.ResponseCode
    this.ServerResponse = ctx.response.ServerResponse
  }

  /**
   * @feature 增加或更新产品
   * @param product {Object} -id 有id 更新，没id 增加
   * @returns {Promise.<*>}
   */
  async saveOrUpdateProduct(product) {
    if (!product) return this.ServerResponse.createByErrorMsg('新增或更新产品参数不正确')
    const subImgArr = product.subImages.split(',')
    if (subImgArr.length > 0) product.mainImage = subImgArr[0]
    const resultRow = await this.ProductModel.findOne({ where: { id: product.id } })
    let productRow, addOrUpdate
    if (!resultRow) {
      // TODO 添加
      productRow = await this.ProductModel.create(product)
      addOrUpdate = '添加'
      if (!productRow) return this.ServerResponse.createByErrorMsg('添加产品失败')
    } else {
      // TODO 更新
      const [updateCount, [updateRow]] = await this.ProductModel.update(product, { where: { id: product.id }, individualHooks: true })
      addOrUpdate = '更新'
      if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新产品失败')
      else productRow = updateRow
    }
    return this.ServerResponse.createBySuccessMsgAndData(`${addOrUpdate}产品成功`, productRow.toJSON())
  }

  /**
   * @feature 修改产品销售状态
   * @param id {Number} 产品id
   * @param status {Number} 产品销售状态
   * @returns {Promise.<*>}
   */
  async setSaleStatus(id, status) {
    if (!id || !status) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT')
    const [updateCount, [updateRow]] = await this.ProductModel.update({ status }, { where: { id }, individualHooks: true })
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('修改产品销售状态失败')
      return this.ServerResponse.createBySuccessMsgAndData('修改产品销售状态成功', updateRow.toJSON())
  }
}

module.exports = ProductManageService
