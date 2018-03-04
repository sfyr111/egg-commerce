module.exports = app => {
  const { INTEGER, DATE, STRING, BIGINT, UUID, UUIDV4 } = app.Sequelize;

  const PayInfoModel = app.model.define('payInfo', {
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
      allowNull: false,
    },
    // 支付平台: 1-支付宝, 2-微信
    payPlatform: {
      type: INTEGER(10),
      allowNull: false,
    },
    // 支付宝支付流水号
    platformNumber: {
      type: STRING(200),
      allowNull: false,
    },
    // 支付宝支付状态
    platformStatus: {
      type: STRING(20),
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
    tablseName: 'payInfo',
  }, {
    indexes: [
      { fields: [ 'userId' ] },
    ],
  }, {
    classMethods: {
      associate() {},
    },
  });

  PayInfoModel.beforeBulkUpdate(payInfo => {
    payInfo.attributes.updateTime = new Date();
    return payInfo;
  });

  return PayInfoModel;
};
