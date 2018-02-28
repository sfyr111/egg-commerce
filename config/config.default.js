'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_Yid';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg_commerce',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    timezone: '+08:00', // 东八时区
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
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
      accessKeyId: 'LTAItynAEvcPJHkE',
      accessKeySecret: '5cZb18s6ZeBxY6K9duVavWL6Aup7T5',
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
