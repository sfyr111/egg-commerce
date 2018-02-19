const Service = require('egg').Service
const _ = require('lodash')
const { isMobilePhone } = require('validator');

module.exports = app => class ShippingService extends Service {
  constructor (ctx) {
    super(ctx)
    this.session = ctx.session
    this.CartModel = ctx.model.CartModel
    this.ProductModel = ctx.model.ProductModel
    this.CategoryModel = ctx.model.CategoryModel
    this.ShippingModel = ctx.model.ShippingModel
    this.ResponseCode = ctx.response.ResponseCode
    this.ServerResponse = ctx.response.ServerResponse
  }

  /**
   * @feature 新建收货地址
   * @param shipping {Object}
   */
  async add(shipping) {
    // 可以用schema 验证数据完整性, 验证手机
    // console.log(isMobilePhone(shipping.receiverMobile, 'zh-CN'))
    if (!Object.keys(shipping).every(k => !!shipping[k])) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT')
    const { id: userId } = this.session.currentUser
    shipping = { ...shipping, userId }
    const shippingRow = await this.ShippingModel.create(shipping)
    if (!shippingRow) return this.ServerResponse.createByErrorMsg('新建地址失败')
    return this.getAllShipping('新建收货地址成功', shippingRow.toJSON())
  }

  /**
   * @feature 更新收货地址
   * @param id {Number} 收货地址id
   * @param shipping {Object}
   */
  async update(shipping, id) {
    if (!Object.keys(shipping).every(k => !!shipping[k])) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT')
    const { id: userId } = this.session.currentUser
    const [updateCount, [updateRow]] = await this.ShippingModel.update(shipping, { where: { id, userId }, individualHooks: true })
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新收货地址失败')
    return this.getAllShipping('更新收货地址成功', updateRow.toJSON())
  }

  /**
   * @feature 删除收货地址
   * @param id {Number}
   * @returns {Promise.<*>}
   */
  async delete(id) {
    if (!id) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT')
    const { id: userId } = this.session.currentUser
    const deleteCount = await this.ShippingModel.destroy({ where: { userId, id } })
    if (deleteCount < 1) return this.ServerResponse.createByErrorMsg('删除收货地址失败')
    return this.getAllShipping('删除收货地址成功')
  }

  /**
   * @feature 获取收货地址列表
   * @param msg? {String} 返回msg
   * @returns {Promise.<*>}
   */
  async getAllShipping(msg) {
    const { id: userId } = this.session.currentUser
    const allShippingArr = await this.ShippingModel.findAll({
      where: { userId }
    }).map(r => r && r.toJSON())
    return this.ServerResponse.createBySuccessMsgAndData(msg, allShippingArr)
  }
}
