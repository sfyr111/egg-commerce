const { ROLE_CUSTOMER } = require('../common/role');

module.exports = app => {
  const { INTEGER, STRING, DATE, UUID, UUIDV4 } = app.Sequelize;

  const UserModel = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    username: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: true,
    },
    phone: {
      type: STRING(20),
      allowNull: true,
    },
    question: {
      type: STRING(100),
      allowNull: true,
    },
    answer: {
      type: STRING(100),
      allowNull: true,
    },
    role: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: ROLE_CUSTOMER,
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
    tablseName: 'user',
  });

  UserModel.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  });

  // UserModel.beforeCreate((user) => {
  //   console.log(user)
  //   return user
  // })

  return UserModel;
};
