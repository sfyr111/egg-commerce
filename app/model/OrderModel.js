module.exports = app => {
  const { INTEGER, DATE, BIGINT, DECIMAL } = app.Sequelize

  const OrderModel = app.model.define('order', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // 用户id
    userId: {
      type: INTEGER(11),
      allowNull: false
    },
    // 订单号
    orderNum: {
      type: BIGINT(20),
      allowNull: false
    },
    shippingId: {
      type: INTEGER(11),
      allowNull: true
    },
    payment: {
      type: DECIMAL(20, 2),
      allowNull: true
    },
    paymentType: {
      type: INTEGER(4),
      allowNull: true
    },
    postage: {
      type: INTEGER(10),
      allowNull: true
    },
    // 订单状态 0已取消 10未支付 20已支付 40已发货 50订单完成 60订单关闭
    status: {
      type: INTEGER(10),
      allowNull: true
    },
    paymentTime: {
      type: DATE,
      allowNull: true
    },
    sendTime: {
      type: DATE,
      allowNull: true
    },
    endTime: {
      type: DATE,
      allowNull: true
    },
    closeTime: {
      type: DATE,
      allowNull: true
    },
    createTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updateTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    timestamps: false,
    tablseName: 'order'
  }, {
    indexes: [
      { fields: ['userId'] }
    ]
  }, {
    classMethods: {
      associate() {}
    }
  })

  OrderModel.beforeBulkUpdate((order) => {
    order.attributes.updateTime = new Date()
    return order
  })

  return OrderModel
}