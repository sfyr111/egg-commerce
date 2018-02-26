'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_Yid';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg-commerce',
    host: 'localhost',
    port: '你的端口',
    username: '你的用户名',
    password: '你的密码',
    timezone: '+08:00', // 东八时区
  };

  config.redis = {
    client: {
      port: '你的端口', // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
    agent: true,
  };

  config.sessionRedis = {
    key: 'EGG_SESSION',
    maxAge: 24 * 3600 * 1000,
    httpOnly: true,
    encrypt: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.oss = {
    client: {
      accessKeyId: '你的keyid',
      accessKeySecret: '你的keysecret',
      bucket: 'egg-commerce',
      endpoint: 'oss-cn-hangzhou.aliyuncs.com',
      timeout: '60s',
    },
  };

  config.multipart = {
    // fileSize: '50mb', // default 10M
    // whitelist: [
    //   '.png'
    // ]
  };

  return config;
};
