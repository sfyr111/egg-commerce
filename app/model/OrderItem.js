module.exports = app => {
  const { INTEGER, DATE, BIGINT, DECIMAL, STRING } = app.Sequelize

  const OrderItemModel = app.model.define('orderItem', {
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
    productId: {
      type: INTEGER(11),
      allowNull: true
    },
    productName: {
      type: STRING(100),
      allowNull: true
    },
    productImage: {
      type: STRING(500),
      allowNull: true
    },
    currentUnitPrice: {
      type: DECIMAL(20, 2),
      allowNull: true
    },
    quantity: {
      type: INTEGER(10),
      allowNull: true
    },
    totalPrice: {
      type: DECIMAL(20, 2),
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
    tablseName: 'orderItem'
  }, {
    indexes: [
      { fields: ['userId'] }
    ]
  }, {
    classMethods: {
      associate() {}
    }
  })

  OrderItemModel.beforeBulkUpdate((orderItem) => {
    orderItem.attributes.updateTime = new Date()
    return orderItem
  })

  return OrderItemModel
}