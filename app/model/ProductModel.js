const { ON_SALE } = require('../common/product');

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4 } = app.Sequelize;

  const ProductModel = app.model.define('product', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    // 分类id
    categoryId: {
      type: UUID,
      allowNull: false,
    },
    // 商品名称
    name: {
      type: STRING(50),
      allowNull: false,
    },
    // 商品副标题
    subtitle: {
      type: STRING(200),
      allowNull: true,
    },
    // 产品主图，url相对地址
    mainImage: {
      type: STRING(500),
      allowNull: true,
    },
    // 图片地址，json格式，扩展用
    subImages: {
      type: TEXT,
      allowNull: true,
    },
    // 商品详情
    detail: {
      type: TEXT,
      allowNull: true,
    },
    // 价格，保留两位小数
    price: {
      type: DECIMAL(20, 2),
      allowNull: false,
    },
    // 库存
    stock: {
      type: INTEGER(11),
      allowNull: false,
    },
    // 商品状态 1-在售，2-下架，3-删除
    status: {
      type: INTEGER(6),
      allowNull: true,
      defaultValue: ON_SALE.CODE,
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
    tablseName: 'product',
  }, {
    indexes: [
      { fields: [ 'categoryId' ] },
    ],
  }, {
    classMethods: {
      associate() {
        ProductModel.hasOne(app.model.CartModel, { foreignKey: 'id' });
      },
    },
  });
  // ProductModel.belongsTo(app.model.categoryModel)
  ProductModel.beforeBulkUpdate(product => {
    product.attributes.updateTime = new Date();
    return product;
  });

  return ProductModel;
};
