const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    // const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    const user = 'yangran' + uid
    return user;
  }

  async login(username, password) {
    if (!username || !password) return this.serverResponse.createByErrorMsg('用户名或密码不得为空')
    const user = await this.ctx.model.UserModel.findOne({
      where: {
        'username': username
      }
    })
    // const user = await this.ctx.model.UserModel.create({
    //   username: username,
    //   password: password
    // })
    return user
  }
}

module.exports = UserService;
