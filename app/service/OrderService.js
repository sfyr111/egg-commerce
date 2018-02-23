const Service = require('egg').Service
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const qr = require('qr-image')
const alipayf2fConfig = require('../common/alipayConfig')
const alipayftof = require('alipay-ftof')
const alipayf2f = new alipayftof(alipayf2fConfig)

const OrderStatus = require('../common/orderStatus')
const PayPlatform = require('../common/payPlatform')
const AlipayConst = require('../common/alipayConst')

module.exports = app => {
  // 生成支付信息
  function alipayData(order) {
    let tradeNo = order.orderNum,
        subject = `COOLHEADEDYANG扫码支付,订单号: ${tradeNo}`,
        totalAmount = order.payment,
        body = `订单${tradeNo}购买商品共${totalAmount}元`
    return { tradeNo, subject, totalAmount, body }
  }

  /**
   * @feature 生成二维码并保存，返回二维码地址
   * @param result {Object}
   * @returns {{filename: string, url: string}}
   */
  function saveQrCode(result) {
    const imgStream = qr.image(result['qr_code'], { size: 10 })
    const filename = 'qr_order_' + result['out_trade_no'] + 'timestamps_' + Date.now() + '.png'
    const ws = fs.createWriteStream(path.resolve('app/public/' + filename))
    imgStream.pipe(ws)
    const url = 'localhost:7001/public/' + filename
    return { filename, url }
  }

  /**
   * @feature 生成一个支付信息并存库
   * @param userId
   * @param orderNum
   * @param payPlatform
   * @param platformNumber
   * @param platformStatus
   * @returns {Promise.<*>}
   */
  async function createPayInfo(userId, orderNum, payPlatform, platformNumber, platformStatus) {
    // TODO 创建payInfo
    const payInfo = { userId, orderNum, payPlatform, platformNumber, platformStatus }
    const payInfoRow = await app.model.PayInfoModel.create(payInfo)
    app.logger.info(`\n创建支付信息\n${JSON.stringify(payInfoRow.toJSON())}`)
    return this.ServerResponse.createBySuccess()
  }

  return class OrderService extends Service {
    constructor (ctx) {
      super(ctx)
      this.session = ctx.session
      this.CartModel = ctx.model.CartModel
      this.OrderModel = ctx.model.OrderModel
      this.ProductModel = ctx.model.ProductModel
      this.PayInfoModel = ctx.model.PayInfoModel
      this.CategoryModel = ctx.model.CategoryModel
      this.ShippingModel = ctx.model.ShippingModel
      this.ResponseCode = ctx.response.ResponseCode
      this.OrderItemModel = ctx.model.OrderItemModel
      this.ServerResponse = ctx.response.ServerResponse
    }

    /**
     * @feature 生成支付二维码 用到orderNum、userId、qrcode
     * @param orderNum {Number} 订单号
     * @returns {Promise.<void>}
     */
    async pay(orderNum = '10012') {
      const { id: userId } = this.session.currentUser
      const order = await this.OrderModel.findOne({ where: { userId, orderNum }}).then(row => row && row.toJSON())
      if (!order) this.ServerResponse.createByErrorMsg('用户没有该订单')

      // const orderGoodsDetail = await this.OrderItemModel.findAll({ where: { userId, orderNum }}).map(row => row && row.toJSON())

      const result = await alipayf2f.createQRPay(alipayData(order))
      if (result.code !== '10000') return this.ServerResponse.createByErrorMsg('创建支付宝失败')

      const { filename, url } = saveQrCode(result)
      return this.ServerResponse.createBySuccessMsgAndData('支付宝二维码生成成功', { filename, url })
    }

    /**
     * @feature 处理支付宝支付回调
     * @param body {Object} 支付宝支付回调的请求body
     * @returns {Promise.<*>}
     */
    async alipayCallback(body) {
      const signStatus = alipayf2f.verifyCallback(body)
      if (!signStatus) return this.ServerResponse.createByErrorMsg('非法请求验证不通过')
      // TODO 处理支付回调 1更新订单状态 2判断支付状态
      const { /*支付宝支付状态*/
              trade_status: tradeStatus,
              /*支付宝外部订单号 === 我们的订单号*/
              out_trade_no: orderNum,
              /*支付宝内部订单号*/
              trade_no: tradeNo,
              /*支付宝支付时间*/
              gmt_payment: paymentTime } = body
      const orderRow = await this.OrderModel.findOne({ where: { orderNum }})
      if (!orderRow) return this.ServerResponse.createByErrorMsg('非本系统支付单，回调忽略')
      const order = orderRow.toJSON()
      if (order.status >= OrderStatus.PAID.CODE) return this.ServerResponse.createBySuccessMsg('支付宝支付重复调用')

      if (tradeStatus === AlipayConst.TRADE_SUCCESS) await orderRow.update({ status: OrderStatus.PAID.CODE, paymentTime }, { individualHooks: true })
      return createPayInfo(order.userId, order.orderNum, PayPlatform.ALIPAY.CODE, tradeNo, tradeStatus)
    }

    /**
     * @feature 查询订单状态
     * @param orderNum {Number} 订单号
     * @returns {Promise.<*>}
     */
    async queryOrderPayStatus(orderNum) {
      const { id: userId } = this.session.currentUser
      const order = await this.OrderModel.findOne({ where: { userId, orderNum }}).then(row => row && row.toJSON())
      if (!order) return this.ServerResponse.createByErrorMsg('用户不存在该订单')
      const key = Object.keys(OrderStatus).find(k => OrderStatus[k].CODE === order.status)

      return this.ServerResponse.createBySuccessMsgAndData('订单状态', OrderStatus[key])
    }
  }
}
