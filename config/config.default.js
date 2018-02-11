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
    port: '3306',
    username: 'root',
    password: '1234abcd',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
