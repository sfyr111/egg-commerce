const { ROLE_ADMAIN } = require('../common/role')
module.exports = options => {

  return async function checkLogin(ctx, next) {
    const user = ctx.session.currentUser;
    if (!user) return ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(ctx.response.ResponseCode.NEED_LOGIN, '用户未登录');
    else {
      if (options.checkAdmin && user.role !== ROLE_ADMAIN) return ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(ctx.response.ResponseCode.NO_AUTH, '用户不是管理员无权操作');
      // else await next();
    }
    await next()
  };
};
