const Service = require('egg').Service;
const _ = require('lodash');
const { CHECKED } = require('../common/cart');

module.exports = app => class CartService extends Service {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.CartModel = ctx.model.CartModel;
    this.ProductModel = ctx.model.ProductModel;
    this.CategoryModel = ctx.model.CategoryModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.ProductModel.hasOne(this.CartModel, { foreignKey: 'id' });
    this.CartModel.belongsTo(this.ProductModel, { foreignKey: 'productId' });
  }

  /**
   * @feature 添加产品到购物车
   * @param userId {Number}
   * @param productId {Number} 产品id
   * @param cout {Number} 总数
   * @return {Promise.<void>}
   */
  async addOrUpdate({ productId, count }) {
    if (!productId || !count) return this.ServerResponse.createByErrorMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const { id: userId } = this.session.currentUser;
    count = Number(count);
    const productRow = await this.ProductModel.findOne({ where: { id: productId } });
    if (!productRow) return this.ServerResponse.createByErrorMsg('商品不存在');

    const cartRow = await this.CartModel.findOne({ where: { userId, productId } });
    let msg;
    if (!cartRow) {
      // TODO 不存在 进行添加
      await this.CartModel.create({
        userId,
        productId,
        quantity: count < 0 ? 0 : count,
        checked: CHECKED,
      });
      msg = '添加';
    } else {
      // TODO 已存在 增加数量
      const stock = productRow.get('stock');
      const quantity = cartRow.get('quantity');
      count = quantity + count > stock ? stock : quantity + count;
      await cartRow.update({ quantity: count < 0 ? 0 : count }, { individualHooks: true });
      msg = '更新';
    }
    return await this.getCartListByUserId(`${msg}购物车成功`, userId);
  }

  /**
   * @feature 根据产品id 删除购物车
   * @param productIdList {String} 1,2,3,4
   * @return {Promise.<*>}
   */
  async deleteCartByproductIdList({ productIdList }) {
    const productIdArr = productIdList.split(',');
    if (productIdArr.length < 1) return this.ServerResponse.createByErrorMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const { id: userId } = this.session.currentUser;
    const deleteCount = await this.CartModel.destroy({ where: { userId, productId: { $in: productIdArr } } });
    if (deleteCount > 0) return await this.getCartListByUserId('删除购物车成功');
    return this.ServerResponse.createBySuccessMsg('购物车已删除或不存在');
  }

  /**
   * @feature 根据用户id 返回购物车列表
   * @param userId {Number}
   * @param msg {String} 返回的msg
   * @return {Promise.<*>}
   */
  async getCartListByUserId(msg, userId = this.session.currentUser.id) {
    const cartArr = await this.CartModel.findAll({
      where: { userId },
      include: [{ model: this.ProductModel, where: { id: app.Sequelize.col('productId') } }],
    }).map(rows => rows && rows.toJSON());
    const totalPrice = cartArr.reduce((prePrice, curItem) => {
      return curItem.checked ? Number(Number(prePrice) + Number(curItem.quantity) * Number(curItem.product.price)).toFixed(2) : 0;
    }, 0);
    const allChecked = cartArr.every(item => item.checked === CHECKED);
    if (isNaN(totalPrice)) return this.ServerResponse.createByErrorMsg('价格或数量错误');
    return this.ServerResponse.createBySuccessMsgAndData(msg, {
      totalPrice,
      allChecked,
      list: cartArr,
      host: this.config.oss.client.endpoint,
    });
  }

  /**
   * @feature 选中或反选购物车
   * @param checked {Boolean}
   * @param productId {Number}
   * @return {Promise.<*>}
   */
  async selectOrUnselectByProductId(checked, productId) {
    const productRow = await this.ProductModel.findOne({ where: { id: productId } });
    if (!productRow) return this.ServerResponse.createByErrorMsg('商品不存在');

    const { id: userId } = this.session.currentUser;
    const [ updateCount ] = await this.CartModel.update({ checked }, {
      where: { userId, productId },
      individualHooks: true,
    });
    if (updateCount > 0) return await this.getCartListByUserId('', userId);
  }

  /**
   * @feature 全选或全反选购物车
   * @param checked {Boolean}
   * @return {Promise.<*>}
   */
  async selectOrUnselectAll(checked) {
    const { id: userId } = this.session.currentUser;
    const [ updateCount ] = await this.CartModel.update({ checked }, {
      where: { userId },
      individualHooks: true,
    });
    if (updateCount > 0) return await this.getCartListByUserId('选择', userId);
  }

  async getCartProductCount() {
    const { id: userId } = this.session.currentUser;
    const [ countRow ] = await this.CartModel.findAll({
      where: { userId },
      attributes: [
        [ app.Sequelize.fn('sum', app.Sequelize.col('quantity')), 'count' ],
      ],
    });
    const count = countRow.toJSON().count ? countRow.toJSON() : { count: 0 };
    return this.ServerResponse.createBySuccessData(count);
  }
};
