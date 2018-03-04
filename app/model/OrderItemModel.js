module.exports = app => {
  const { INTEGER, DATE, BIGINT, DECIMAL, STRING, UUID, UUIDV4 } = app.Sequelize;

  const OrderItemModel = app.model.define('orderItem', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    // 用户id
    userId: {
      type: UUID,
      allowNull: false,
    },
    // 订单号
    orderNum: {
      type: BIGINT(20),
      allowNull: true,
    },
    // 商品id
    productId: {
      type: UUID,
      allowNull: true,
    },
    // 商品名称
    productName: {
      type: STRING(100),
      allowNull: true,
    },
    // 商品图片地址
    productImage: {
      type: STRING(500),
      allowNull: true,
    },
    // 生成订单时的商品单价，单位元，保留2位小数
    currentUnitPrice: {
      type: DECIMAL(20, 2),
      allowNull: true,
    },
    // 商品数量
    quantity: {
      type: INTEGER(10),
      allowNull: true,
    },
    // 商品总价，单位元，保留2位小数
    totalPrice: {
      type: DECIMAL(20, 2),
      allowNull: true,
    },
    createTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updateTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    timestamps: false,
    tablseName: 'orderItem',
  }, {
    indexes: [
      { fields: [ 'userId' ] },
    ],
  }, {
    classMethods: {
      associate() {},
    },
  });

  OrderItemModel.beforeBulkUpdate(orderItem => {
    orderItem.attributes.updateTime = new Date();
    return orderItem;
  });

  return OrderItemModel;
};
