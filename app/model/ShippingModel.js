module.exports = app => {
  const { INTEGER, DATE, STRING, UUID, UUIDV4 } = app.Sequelize;

  const ShippingModel = app.model.define('shipping', {
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
    // 收货姓名
    receiverName: {
      type: STRING(20),
      allowNull: false,
    },
    // 收货电话
    receiverPhone: {
      type: STRING(20),
      allowNull: false,
    },
    // 收货手机
    receiverMobile: {
      type: STRING(20),
      allowNull: false,
    },
    // 省份
    receiverProvince: {
      type: STRING(20),
      allowNull: false,
    },
    // 城市
    receiverCity: {
      type: STRING(20),
      allowNull: false,
    },
    // 区/县
    receiverDistrict: {
      type: STRING(20),
      allowNull: false,
    },
    // 详细地址
    receiverAddress: {
      type: STRING(200),
      allowNull: false,
    },
    // 邮编
    receiverZip: {
      type: STRING(6),
      allowNull: false,
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
    tablseName: 'shipping',
  }, {
    indexes: [
      { fields: [ 'userId' ] },
    ],
  }, {
    classMethods: {
      associate() {},
    },
  });

  ShippingModel.beforeBulkUpdate(shipping => {
    shipping.attributes.updateTime = new Date();
    return shipping;
  });

  return ShippingModel;
};
