'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  require('./router/portal/cartRouter')(app);
  require('./router/portal/userRouter')(app);
  require('./router/portal/orderRouter')(app);
  require('./router/portal/productRouter')(app);
  require('./router/portal/shippingRouter')(app);
  require('./router/backend/manageRouter')(app);
  require('./router/backend/orderManageRouter')(app);
  require('./router/backend/productManageRouter')(app);
  require('./router/backend/categoryManageRouter')(app);
};
