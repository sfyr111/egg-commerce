module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const UserModel = app.model.define('user', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING(50),
      allowNull: false
    },
    email: {
      type: STRING(50),
      allowNull: true
    },
    phone: {
      type: STRING(20),
      allowNull: true
    },
    question: {
      type: STRING(100),
      allowNull: true
    },
    answer: {
      type: STRING(100),
      allowNull: true
    },
    role: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0
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
    tablseName: 'user'
  })

  return UserModel
}